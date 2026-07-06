## Requirements

- [ox_lib](https://github.com/overextended/ox_lib)
- [ox_inventory](https://github.com/overextended/ox_inventory)
- QBCore / ESX / QBox

---

## Installation

1. Place the `core-crutches` folder in your server's `resources` directory

2. Add to your `server.cfg`

```
ensure core-crutches
```

3. Add the `crutch` item to your ox_inventory items list

4. Configure to match your server — see [Configuration](#configuration)

5. Restart your server or run `refresh` then `ensure core-crutches` in console

---

## Configuration

All settings are in `config/`

### Knockout

```lua
Config.Knockout.Enabled = true        -- Enable or disable the knockout system
Config.Knockout.Duration = 5500       -- How long the knockout lasts in ms
Config.Knockout.HealthAmount = 155    -- Health threshold to trigger knockout (100 = 0hp, 200 = full)
Config.Knockout.RegenInterval = 450   -- Time in ms between health regen ticks
Config.Knockout.Regeneration = 2      -- Health restored per regen tick
```

### Crutch

```lua
Config.Crutch.DefaultDuration = 30   -- Default crutch time in minutes if not specified in command
Config.Crutch.AdminOnly = false       -- Restrict /applycrutch to admins only (false allows EMS job too)
```

---

## Commands

| Command | Permission | Description |
|---------|-----------|-------------|
| `/applycrutch [id] [minutes]` | EMS / Admin | Apply a crutch to a player for a set duration |
| `/crutchtime` | Player | Check how much crutch time you have remaining |

---

## Support

- 💬 Discord: [discord.gg/TBb4QKHQtm](https://discord.gg/TBb4QKHQtm)
- 🛒 Tebex: [core-forge.tebex.io/package/7240624](https://core-forge.tebex.io/package/7240624)
- 📺 YouTube: [youtube.com/@CoreForgeFivem](https://youtube.com/@CoreForgeFivem)
- 📁 GitHub: [github.com/Core-Forge-5](https://github.com/Core-Forge-5)