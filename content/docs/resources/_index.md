+++
title = "Resources"
description = "External resources about Hyperlight"
weight = 60
sort_by = "weight"

[extra]
toc = true
top = false
+++

## Microsoft Open Source Blog Posts

| Title | Date | Summary |
|-------|------|---------|
| [Introducing Hyperlight](https://opensource.microsoft.com/blog/2024/11/07/introducing-hyperlight-virtual-machine-based-security-for-functions-at-scale/) | Nov 7, 2024 | Launch announcement explaining hypervisor-based security for functions with 1-2ms cold starts |
| [Hyperlight joins CNCF as Sandbox Project](https://opensource.microsoft.com/blog/2025/01/21/hyperlight-joins-cncf-as-a-sandbox-project/) | Jan 21, 2025 | Announcement of CNCF sandbox acceptance |
| [Achieving 0.0009-second micro-VM execution](https://opensource.microsoft.com/blog/2025/02/11/hyperlight-creating-a-0-0009-second-micro-vm-execution-time) | Feb 11, 2025 | KubeCon NA 2024 demo walkthrough showing sub-millisecond execution with warm pools |
| [Build a Hyperlight C guest to securely execute JavaScript](https://opensource.microsoft.com/blog/2025/03/10/build-a-hyperlight-c-guest-to-securely-execute-javascript) | Mar 10, 2025 | Tutorial on creating C guests that run JavaScript securely |
| [Hyperlight Wasm: Fast, secure, and OS-free](https://opensource.microsoft.com/blog/2025/03/26/hyperlight-wasm-fast-secure-and-os-free) | Mar 26, 2025 | Introduction of Hyperlight Wasm guest for multi-language support via WASI Component Model |
| [Debugging hardware-protected guests](https://opensource.microsoft.com/blog/2025/07/14/hyperlight-debugging-hardware-protected-guests) | Jul 14, 2025 | Tutorial on attaching GDB to debug Hyperlight guest micro-VMs |
| [Hyperlight Nanvix: POSIX support for Micro-VMs](https://opensource.microsoft.com/blog/2026/1/28/hyperlight-nanvix-bringing-multi-language-support-for-extremely-fast-hardware-isolated-micro-vms) | Jan 28, 2026 | Introduction of Nanvix microkernel providing 150+ POSIX syscalls for Python/JS/C++ support |

## Conference Talks

| Title | Event | Date | Speaker(s) |
|-------|-------|------|------------|
| Hyperlight and Edge Actions | Microsoft Ignite 2024 | Nov 2024 | Mark Russinovich |
| KubeCon NA 2024 Keynote Demo | KubeCon North America 2024 | Nov 2024 | Rita Zhang |

## CNCF Resources

| Resource | Description |
|----------|-------------|
| [CNCF Project Page](https://www.cncf.io/projects/hyperlight/) | Official CNCF sandbox project page |
| [DevStats Dashboard](https://hyperlight.devstats.cncf.io/) | Development metrics and contributor analytics |
| [LFX Insights](https://insights.linuxfoundation.org/project/hyperlight) | Project health metrics and software value analysis |

## GitHub Repositories

| Repository | Description |
|------------|-------------|
| [hyperlight-dev/hyperlight](https://github.com/hyperlight-dev/hyperlight) | Core Hyperlight library |
| [hyperlight-dev/hyperlight-wasm](https://github.com/hyperlight-dev/hyperlight-wasm) | WebAssembly guest support |
| [hyperlight-dev/hyperlight-nanvix](https://github.com/hyperlight-dev/hyperlight-nanvix) | POSIX-compatible microkernel guest |

## API Documentation

- [hyperlight-host on docs.rs](https://docs.rs/hyperlight-host/latest/) — Host-side API documentation
- [hyperlight-guest on docs.rs](https://docs.rs/hyperlight-guest/latest/) — Guest-side API documentation
