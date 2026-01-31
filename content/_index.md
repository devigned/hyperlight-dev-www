+++
title = "Hyperlight"

# Homepage contents
[extra]
lead = '<b>Hyperlight</b> is a lightweight Virtual Machine Manager (VMM) designed to run hardware-isolated micro-VMs with <b>single-digit millisecond cold starts</b>. A <a href="https://www.cncf.io/projects/hyperlight/">CNCF Sandbox</a> project.'
url = "/docs/getting-started/"
url_button = "Get Started"
repo_version = "CNCF Sandbox"
repo_license = "Open-source Apache 2.0 License."
repo_url = "https://github.com/hyperlight-dev/hyperlight"

# Menu items
[[extra.menu.main]]
name = "Docs"
section = "docs"
url = "/docs/getting-started/"
weight = 10

[[extra.menu.main]]
name = "Ecosystem"
section = "docs"
url = "/docs/ecosystem/"
weight = 20

[[extra.menu.main]]
name = "API Docs"
section = "docs"
url = "https://docs.rs/hyperlight-host/latest/"
weight = 30

[[extra.menu.main]]
name = "Community"
section = "docs"
url = "/docs/community/"
weight = 40

# Feature cards
[[extra.list]]
title = "Ultra-fast VM creation ⚡️"
content = "Create hardware-isolated micro-VMs in 1-2 milliseconds. No guest OS overhead—just your code running at near-native speed."

[[extra.list]]
title = "Hypervisor-level security 🔒"
content = "True hardware isolation via KVM, Hyper-V, or mshv. Defense-in-depth with optional WebAssembly double-sandboxing."

[[extra.list]]
title = "Explicit host interface"
content = "Guests can only call functions you explicitly expose. Zero implicit syscalls means minimal attack surface by design."

[[extra.list]]
title = "Multi-language support"
content = "Run Rust, C, JavaScript, and Python guests via <a href='/docs/ecosystem/hyperlight-wasm/'>Hyperlight Wasm</a> and <a href='/docs/ecosystem/hyperlight-nanvix/'>Hyperlight Nanvix</a>."

[[extra.list]]
title = "Cross-platform"
content = "Works on Windows (WHP), Linux (KVM/mshv), and WSL2. Deploy anywhere you need hardware-grade isolation."

[[extra.list]]
title = "CNCF Project"
content = "Accepted as a <a href='https://www.cncf.io/projects/hyperlight/'>CNCF Sandbox project</a>. Active community with bi-weekly meetings and Slack channel."

+++
