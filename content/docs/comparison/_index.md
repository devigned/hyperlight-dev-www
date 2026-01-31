+++
title = "Comparison"
description = "How Hyperlight compares to other isolation technologies"
weight = 50
sort_by = "weight"

[extra]
toc = true
top = false
+++

## Performance Comparison

| Solution | Cold Start | Source |
|----------|-----------|--------|
| **Hyperlight** | **1-2ms** | [Microsoft OSS Blog, Nov 2024](https://opensource.microsoft.com/blog/2024/11/07/introducing-hyperlight-virtual-machine-based-security-for-functions-at-scale/) |
| **Hyperlight + Nanvix** | **Double-digit ms** | [Nanvix Blog, Jan 2026](https://opensource.microsoft.com/blog/2026/1/28/hyperlight-nanvix-bringing-multi-language-support-for-extremely-fast-hardware-isolated-micro-vms) |
| Wasm (Wasmtime) | <0.03ms | [Microsoft OSS Blog](https://opensource.microsoft.com/blog/2024/11/07/introducing-hyperlight-virtual-machine-based-security-for-functions-at-scale/) |
| Firecracker | ~125ms | [AWS Blog, Nov 2018](https://aws.amazon.com/blogs/aws/firecracker-lightweight-virtualization-for-serverless-computing/) |
| gVisor | Varies* | [gVisor Performance Guide](https://gvisor.dev/docs/architecture_guide/performance/) |
| Traditional VMs | >120ms | [Microsoft OSS Blog](https://opensource.microsoft.com/blog/2024/11/07/introducing-hyperlight-virtual-machine-based-security-for-functions-at-scale/) |

*gVisor and Kata Containers don't publish official cold-start benchmarks; performance varies by configuration.

## The Serverless Trilemma

Traditional serverless platforms face a fundamental trade-off: **Fast Cold Start** vs **Secure Isolation** vs **Runtime Compatibility**—pick two.

Hyperlight breaks this trilemma:

| Configuration | Fast | Secure | Compatible | Notes |
|---------------|------|--------|------------|-------|
| **Hyperlight alone** | ✅ | ✅ | ❌ | No OS, explicit host functions only |
| **Hyperlight + Wasm** | ✅ | ✅ | ⚡ | WASI interface, many languages via Component Model |
| **Hyperlight + Nanvix** | ✅ | ✅ | ✅ | 150+ POSIX syscalls, Python/JS/C++ support |

## Security Model

### Hardware Virtualization (Hyperlight, Firecracker)

- Ring -1/VMX root mode with hardware-enforced memory isolation (EPT/NPT)
- VM escapes are rare—[VENOM (CVE-2015-3456)](https://nvd.nist.gov/vuln/detail/CVE-2015-3456) is a historical example
- Minimal trusted computing base

### Hyperlight's Explicit Interface

- **Zero implicit capabilities**—guests start with nothing
- All guest-host communication through explicitly defined host functions
- Compare to containers' ~400+ syscall exposure

### Double-Sandboxing with Hyperlight Wasm

> "One layer of sandboxing is good. But having two layers is even better."
> — [Hyperlight Wasm blog](https://opensource.microsoft.com/blog/2025/03/26/hyperlight-wasm-fast-secure-and-os-free)

Wasmtime sandbox runs inside the hardware VM, providing defense-in-depth.

### Syscall Interposition with Nanvix

- Accept/Intercept/Block individual syscalls at the hardware boundary
- Fine-grained control over untrusted code behavior
- Source: [Nanvix blog](https://opensource.microsoft.com/blog/2026/1/28/hyperlight-nanvix-bringing-multi-language-support-for-extremely-fast-hardware-isolated-micro-vms)

### Container Escapes (for comparison)

Container escapes like [CVE-2019-5736](https://nvd.nist.gov/vuln/detail/CVE-2019-5736) (runC) illustrate the shared kernel risk. Hardware isolation eliminates this attack vector.

## Security vs Compatibility

| Technology | Security | Compatibility | Notes |
|------------|----------|---------------|-------|
| **Hyperlight** | Highest (HW) | Lowest | No OS, explicit host functions only |
| **Hyperlight + Wasm** | Very High (HW + SW) | Medium | WASI interface, many languages via Component Model |
| **Hyperlight + Nanvix** | High (HW) | High | 150+ POSIX syscalls, Python/JS/C++ support |
| Firecracker | High (HW) | High | Full Linux guests |
| gVisor | Medium-High | Medium | Reimplemented syscalls, incomplete |
| Containers | Lowest | Highest | Shared kernel, full syscall access |
