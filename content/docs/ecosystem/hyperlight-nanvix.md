+++
title = "Hyperlight Nanvix"
description = "POSIX-compatible microkernel for Hyperlight"
weight = 20

[extra]
toc = true
top = false
+++

[Hyperlight Nanvix](https://github.com/hyperlight-dev/hyperlight-nanvix) provides POSIX compatibility for Hyperlight through a lightweight microkernel, enabling Python, JavaScript, C, and C++ applications to run in hardware-isolated micro-VMs.

## Overview

Nanvix is a microkernel that implements 150+ POSIX syscalls while running inside a Hyperlight micro-VM. It uses a split OS design where the kernel runs in the guest and can selectively proxy syscalls to the host.

## Features

- **150+ POSIX syscalls** — Broad compatibility with existing code
- **Multi-language support** — Python, JavaScript, C, C++, Rust
- **Syscall interposition** — Accept, intercept, or block individual syscalls
- **Double-digit ms cold starts** — Fast startup despite full OS capabilities

## Syscall Security Model

Nanvix provides fine-grained control over syscall handling:

| Mode | Description |
|------|-------------|
| **Accept** | Allow the syscall to proceed |
| **Intercept** | Handle the syscall with custom logic |
| **Block** | Deny the syscall entirely |

This enables defense-in-depth where you can restrict capabilities even within a hardware-isolated VM.

## Use Cases

- **Legacy application isolation** — Run existing code without modification
- **Multi-language serverless** — Support Python and JavaScript workloads
- **Industrial automation** — Isolate control system components

## Getting Started

See the [hyperlight-nanvix repository](https://github.com/hyperlight-dev/hyperlight-nanvix) for installation and usage instructions.

## Resources

- [GitHub Repository](https://github.com/hyperlight-dev/hyperlight-nanvix)
- [Hyperlight Nanvix: POSIX support for Micro-VMs](https://opensource.microsoft.com/blog/2026/1/28/hyperlight-nanvix-bringing-multi-language-support-for-extremely-fast-hardware-isolated-micro-vms) — Introduction blog post
