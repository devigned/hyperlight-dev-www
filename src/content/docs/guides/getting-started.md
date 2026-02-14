---
title: Getting Started with Hyperlight
description: A step-by-step guide to building your first Hyperlight host and guest on Linux
---

This guide walks you through building a complete Hyperlight application from scratch on Linux. By the end, you'll have a **guest** program running inside a hardware-isolated micro-VM and a **host** program that creates the VM and calls a function inside it.

## What you're building

Hyperlight applications have two parts:

- **Guest** — a small program that runs *inside* a micro-VM. It has no operating system, no file system access, and no network. It can only do what the host explicitly allows.
- **Host** — a normal program that creates the micro-VM, loads the guest into it, and calls functions the guest exposes.

In this guide, the guest will expose a `PrintOutput` function. The host will call it with a string, and the guest will ask the host to print it.

## Prerequisites

You need a Linux machine (or WSL2) with **KVM** enabled. Most modern Linux distributions ship with KVM support in the kernel.

### 1. Check that KVM is available

```sh
ls -l /dev/kvm
```

You should see output like `crw-rw---- 1 root kvm ...`. If the file doesn't exist, your CPU may not support hardware virtualization, or KVM modules aren't loaded. See the [Ubuntu KVM installation guide](https://help.ubuntu.com/community/KVM/Installation) for help.

Make sure your user has permission to access `/dev/kvm`:

```sh
groups | grep kvm
```

If `kvm` isn't listed, add yourself to the group:

```sh
sudo usermod -aG kvm $USER
```

Then log out and log back in for the change to take effect.

### 2. Install build tools

On Ubuntu/Debian:

```sh
sudo apt update && sudo apt install -y build-essential
```

On Azure Linux:

```sh
sudo dnf install -y build-essential
```

### 3. Install Rust

If you don't have Rust installed yet:

```sh
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

Hyperlight requires Rust **1.89 or later**. After installing, verify your version:

```sh
rustc --version
```

### 4. Install cargo-hyperlight

`cargo-hyperlight` is a Cargo subcommand that handles cross-compiling guest binaries for the Hyperlight target. Install it with:

```sh
cargo install --locked cargo-hyperlight
```

This gives you the `cargo hyperlight build` command, which takes care of all the special compilation settings that guests need — no extra configuration required.

---

## Step 1: Create a workspace

We'll use a Cargo workspace to keep the host and guest in one place. Create a project directory:

```sh
mkdir hyperlight-hello && cd hyperlight-hello
```

Create a `Cargo.toml` at the root that declares both crates:

```toml
[workspace]
members = ["guest", "host"]
resolver = "2"
```

---

## Step 2: Create the guest

The guest is the program that will run inside the micro-VM. Generate the crate:

```sh
cargo new --name guest guest
```

### 2a. Set up `guest/Cargo.toml`

Replace the contents of `guest/Cargo.toml` with:

```toml
[package]
name = "guest"
version = "0.1.0"
edition = "2024"

[dependencies]
hyperlight-common = { version = "0.11.0", default-features = false }
hyperlight-guest = "0.11.0"
hyperlight-guest-bin = "0.11.0"
```

Here's what each dependency does:

| Crate | Purpose |
|---|---|
| `hyperlight-common` | Shared types used by both host and guest (function call wrappers, parameter types, etc.) |
| `hyperlight-guest` | Core guest library — provides the low-level VM exit mechanism and host communication |
| `hyperlight-guest-bin` | Higher-level guest utilities — panic handler, heap initialization, host function helpers, and the `#[guest_function]` / `#[host_function]` macros |

### 2b. Write the guest code

Replace `guest/src/main.rs` with:

```rust
#![no_std]
#![no_main]
extern crate alloc;

use alloc::string::String;
use alloc::vec::Vec;

use hyperlight_common::flatbuffer_wrappers::function_call::FunctionCall;
use hyperlight_common::flatbuffer_wrappers::guest_error::ErrorCode;

use hyperlight_guest::bail;
use hyperlight_guest::error::Result;
use hyperlight_guest_bin::{guest_function, host_function};

// Declare a host function that the guest can call.
// The host must register a function with this exact name ("HostPrint")
// before the guest tries to use it.
#[host_function("HostPrint")]
fn host_print(message: String) -> Result<i32>;

// Define a guest function that the host can call.
// When the host calls "PrintOutput", this function runs inside the VM.
#[guest_function("PrintOutput")]
fn print_output(message: String) -> Result<i32> {
    // Call the host function to print the message.
    // The guest can't print directly — it has no OS or stdout.
    // Instead, it asks the host to do it.
    let result = host_print(message)?;
    Ok(result)
}

/// Called once when the guest starts up.
/// Use this for any initialization your guest needs.
#[no_mangle]
pub extern "C" fn hyperlight_main() {
    // Nothing to initialize for this simple example.
}

/// The dispatch function routes incoming function calls from the host.
/// If the host calls a function name the guest doesn't recognize, this
/// returns an error.
#[no_mangle]
pub fn guest_dispatch_function(function_call: FunctionCall) -> Result<Vec<u8>> {
    let function_name = function_call.function_name;
    bail!(ErrorCode::GuestFunctionNotFound => "{function_name}");
}
```

Let's break down what's happening:

- **`#![no_std]` and `#![no_main]`** — The guest runs inside a bare-metal micro-VM with no operating system. There's no `std` library and no normal `main()` entry point.
- **`extern crate alloc`** — Even without `std`, Hyperlight provides a heap allocator so you can use `String`, `Vec`, and other heap types.
- **`#[host_function("HostPrint")]`** — This macro declares that a function called `HostPrint` exists on the host side. When the guest calls `host_print(...)`, it triggers a VM exit, the host executes the function, and the result comes back.
- **`#[guest_function("PrintOutput")]`** — This macro registers a function that the host can call into the guest. The host will call `"PrintOutput"` by name.
- **`hyperlight_main()`** — This is the guest's entry point, called once when the VM starts. You can register functions or perform setup here.
- **`guest_dispatch_function()`** — This handles any function calls that aren't covered by the `#[guest_function]` macro. In this example, it just returns an error for unknown functions.

### 2c. Build the guest

```sh
cargo hyperlight build --release -p guest
```

This cross-compiles the guest for the `x86_64-hyperlight-none` target. The resulting binary will be at:

```
target/x86_64-hyperlight-none/release/guest
```

This binary is a tiny, self-contained program — no OS, no kernel, just your code and the Hyperlight guest runtime.

---

## Step 3: Create the host

The host is a normal Linux program. It creates a micro-VM, loads the guest binary into it, and calls guest functions. Generate the crate:

```sh
cargo new --name host host
```

### 3a. Set up `host/Cargo.toml`

Replace the contents of `host/Cargo.toml` with:

```toml
[package]
name = "host"
version = "0.1.0"
edition = "2024"

[dependencies]
hyperlight-host = "0.11.0"
anyhow = "1.0"
```

| Crate | Purpose |
|---|---|
| `hyperlight-host` | The Hyperlight host library — creates and manages micro-VMs, calls guest functions |
| `anyhow` | Convenient error handling (optional, but makes the example cleaner) |

### 3b. Write the host code

Replace `host/src/main.rs` with:

```rust
use anyhow::Context as _;
use hyperlight_host::GuestBinary;
use hyperlight_host::sandbox::SandboxConfiguration;

fn main() -> anyhow::Result<()> {
    // Path to the guest binary we built in Step 2.
    let guest_path = std::env::args()
        .nth(1)
        .context("Usage: host <path-to-guest-binary>")?;

    // Tell Hyperlight where to find the guest binary.
    let guest = GuestBinary::FilePath(guest_path);

    // Configure the micro-VM's memory.
    // The guest runs in a fixed-size memory region — there's no virtual memory
    // or swap. 1 MiB each for heap and stack is plenty for this example.
    let mut config = SandboxConfiguration::default();
    config.set_heap_size(1024 * 1024); // 1 MiB heap
    config.set_stack_size(1024 * 1024); // 1 MiB stack

    // Create the sandbox (micro-VM).
    // `new()` sets up the VM and loads the guest binary.
    // `evolve()` initializes it — this calls `hyperlight_main()` in the guest,
    // which registers the guest's functions and makes them callable.
    let mut sandbox = hyperlight_host::UninitializedSandbox::new(
        guest,
        Some(config),
    )?.evolve()?;

    // Call the guest's "PrintOutput" function.
    // This triggers the VM to start executing guest code.
    // Inside the guest, `print_output()` will call the host's "HostPrint"
    // function, which prints the message to stdout.
    let bytes_printed: i32 = sandbox.call(
        "PrintOutput",
        "Hello from Hyperlight! I am running inside a micro-VM.\n".to_string(),
    )?;

    println!("Guest function returned: {bytes_printed} bytes printed");

    Ok(())
}
```

Here's the flow, step by step:

1. **Load the guest binary** — `GuestBinary::FilePath(...)` tells Hyperlight to read the compiled guest from disk.
2. **Configure memory** — `SandboxConfiguration` controls how much heap and stack memory the guest gets. The guest can't grow beyond this.
3. **Create the sandbox** — `UninitializedSandbox::new(...)` creates the micro-VM using KVM. This sets up the hardware isolation — the guest gets its own memory region that the host CPU enforces.
4. **Evolve** — `.evolve()` transitions the sandbox from "uninitialized" to "ready." During this step, Hyperlight runs `hyperlight_main()` in the guest, which registers guest functions.
5. **Call a guest function** — `sandbox.call("PrintOutput", ...)` tells the VM to execute the guest's `PrintOutput` function. The guest runs, calls back to the host to print, and returns the result.

### 3c. Build the host

```sh
cargo build --release -p host
```

---

## Step 4: Run it

```sh
./target/release/host ./target/x86_64-hyperlight-none/release/guest
```

You should see:

```text
Hello from Hyperlight! I am running inside a micro-VM.
Guest function returned: 57 bytes printed
```

That message was printed by the **host**, but the request to print it came from the **guest** running inside a hardware-isolated micro-VM. The guest called `host_print(...)`, which triggered a VM exit, the host executed the print, and the result was sent back to the guest — all in under a millisecond.

---

## What just happened?

Here's the full sequence of events:

```
Host                              Guest (inside micro-VM)
─────────────────────────────     ─────────────────────────────
1. Creates micro-VM via KVM
2. Loads guest binary into VM
3. Calls evolve()
                                  4. hyperlight_main() runs
                                     (registers PrintOutput)
5. Calls "PrintOutput"
                                  6. print_output() executes
                                  7. Calls host_print() → VM exit
8. Host prints the message
9. Returns result to guest
                                  10. Guest receives result
                                  11. Returns to host
12. Receives return value
```

The key insight is that the guest **never has direct access to the host's memory, file system, or network**. Every interaction goes through explicitly registered functions — the host controls exactly what the guest can do.

---

## Next steps

- **Add more guest functions** — Use `#[guest_function("Name")]` to expose additional functions, and call them from the host with `sandbox.call("Name", ...)`.
- **Register host functions** — Before calling `.evolve()`, use `sandbox.register("FunctionName", |args| { ... })` to make host-side functions available to the guest.
- **Explore Hyperlight Wasm** — If you want to run WebAssembly inside a micro-VM, check out [hyperlight-wasm](https://github.com/hyperlight-dev/hyperlight-wasm).
- **Browse more examples** — The [cargo-hyperlight examples](https://github.com/hyperlight-dev/cargo-hyperlight/tree/main/examples) show additional patterns including C FFI in guests.
- **Join the community** — Chat with the team on the [CNCF Slack #hyperlight channel](https://cloud-native.slack.com/archives/hyperlight).
