+++
title = "Ecosystem"
description = "The Hyperlight ecosystem of projects"
weight = 20
sort_by = "weight"

[extra]
toc = true
top = false
+++

The Hyperlight ecosystem extends the core VMM with additional capabilities for different use cases.

## Projects

### [Hyperlight Wasm](/docs/ecosystem/hyperlight-wasm/)

WebAssembly support via the WASI Component Model. Run code written in any language that compiles to Wasm inside a hardware-isolated micro-VM with double-sandboxing.

### [Hyperlight Nanvix](/docs/ecosystem/hyperlight-nanvix/)

POSIX compatibility layer providing 150+ syscalls. Run Python, JavaScript, C, and C++ applications with minimal modification inside hardware-isolated micro-VMs.

## How They Relate

```
┌─────────────────────────────────────────────────┐
│                  Your Application               │
├─────────────────────┬───────────────────────────┤
│   Hyperlight Wasm   │   Hyperlight Nanvix       │
│   (WASI Component)  │   (POSIX Microkernel)     │
├─────────────────────┴───────────────────────────┤
│              Hyperlight (Core VMM)              │
├─────────────────────────────────────────────────┤
│        Hardware Hypervisor (KVM/mshv/WHP)       │
└─────────────────────────────────────────────────┘
```

## Choosing the Right Project

| Need | Solution |
|------|----------|
| Maximum security, minimal surface | Hyperlight (core) |
| Multi-language via Wasm | Hyperlight Wasm |
| POSIX compatibility, existing code | Hyperlight Nanvix |
