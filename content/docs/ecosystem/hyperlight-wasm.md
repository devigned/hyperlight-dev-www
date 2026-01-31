+++
title = "Hyperlight Wasm"
description = "WebAssembly support for Hyperlight via the WASI Component Model"
weight = 10

[extra]
toc = true
top = false
+++

[Hyperlight Wasm](https://github.com/hyperlight-dev/hyperlight-wasm) provides WebAssembly support for Hyperlight through the WASI Component Model, enabling multi-language guests with double-sandboxing.

## Overview

Hyperlight Wasm embeds the [Wasmtime](https://wasmtime.dev/) runtime inside a Hyperlight micro-VM, creating two layers of isolation:

1. **Hardware isolation** — The Hyperlight VM boundary
2. **Software isolation** — The WebAssembly sandbox

> "One layer of sandboxing is good. But having two layers is even better."

## Features

- **Component Model support** — Use the latest WASI interfaces
- **Multi-language** — Any language that compiles to Wasm (Rust, Go, JavaScript, Python, C/C++, etc.)
- **Double-sandboxing** — Hardware VM + Wasm sandbox
- **Fast cold starts** — Inherit Hyperlight's millisecond startup times

## Use Cases

- **Plugin systems** — Run untrusted plugins with strong isolation
- **Serverless functions** — Execute functions with minimal cold start
- **AI-generated code** — Safely run LLM-generated code

## Getting Started

See the [hyperlight-wasm repository](https://github.com/hyperlight-dev/hyperlight-wasm) for installation and usage instructions.

## Resources

- [GitHub Repository](https://github.com/hyperlight-dev/hyperlight-wasm)
- [Hyperlight Wasm: Fast, secure, and OS-free](https://opensource.microsoft.com/blog/2025/03/26/hyperlight-wasm-fast-secure-and-os-free) — Introduction blog post
