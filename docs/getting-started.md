# Getting Started

Welcome to **Core-Forge** documentation.

This guide will help you quickly install and configure our FiveM resources.

## Prerequisites

- A working FiveM server
- One of the supported frameworks:
  - **QBCore**
  - **QBox**
  - **ESX**
- [ox_lib](https://github.com/overextended/ox_lib) (required for most resources)
- [ox_inventory](https://github.com/overextended/ox_inventory) (required for most resources with items)

## Installation Steps

1. **Download** the resource from your CFX Portal
2. **Extract** the zip file
3. **Make** a folder in your server's `resources/` folder called `[core]/`
4. **Place** the resource folder in your server's `core/` folder
4. **Add** the `[core]` folder to your `server.cfg` after your framework and after `ox`:

```cfg
ensure ox_lib
ensure qb-core        # or qbox / es_extended
ensure [core]
```