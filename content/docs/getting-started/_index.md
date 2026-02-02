+++
title = "Getting Started"
description = "Get started with Hyperlight"
weight = 10
sort_by = "weight"

[extra]
toc = true
top = false
+++

This guide will help you get started with Hyperlight.

## Prerequisites

- **Linux** with KVM support, **Windows** with Hyper-V/WHP, or **WSL2**
- **Rust** toolchain (for building from source)
- Nested virtualization enabled if running in a VM

## Quick Start

Add Hyperlight to your Rust project:

```toml
[dependencies]
hyperlight-host = "0.3"
```

Create and run a micro-VM:

```rust
use hyperlight_host::prelude::*;

fn main() -> Result<()> {
    // Create a sandbox configuration
    let config = SandboxConfiguration::default();
    
    // Load a guest binary
    let guest = GuestBinary::from_file("path/to/guest.bin")?;
    
    // Create and run the sandbox
    let mut sandbox = UninitializedSandbox::new(guest, config)?;
    let mut sandbox = sandbox.evolve()?;
    
    // Call a function in the guest
    let result: i32 = sandbox.call_guest_function("add", (1i32, 2i32))?;
    println!("Result: {}", result);
    
    Ok(())
}
```

## Next Steps

- [Ecosystem](/docs/ecosystem/) — Explore Hyperlight Wasm and Nanvix
- [Architecture](/docs/architecture/) — Understand how Hyperlight works
- [API Documentation](https://docs.rs/hyperlight-host/latest/) — Full API reference

## Examples

The [examples directory](https://github.com/hyperlight-dev/hyperlight/tree/main/examples) in the main repository contains working examples for common use cases.
