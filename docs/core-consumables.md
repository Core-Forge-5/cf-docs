# Core-Consumables

## Requirements

- [ox_lib](https://github.com/overextended/ox_lib)
- [ox_inventory](https://github.com/overextended/ox_inventory)
- QBCore / ESX / QBox

---

## Installation

1. Place the `core-consumables` folder in your server's `resources` directory

2. Add to your `server.cfg`

```
ensure core-consumables
```

3. Import the SQL file from the `install/` folder into your database

4. Configure items to match your server — see [Configuration](#configuration)

5. Restart your server or run `refresh` then `ensure core-consumables` in console

---

## Configuration

All items are defined in `config/`. Adding a new item takes under a minute.

### Item Example

```lua
drug_moonshine = {
    time = 3000,                                                  -- Use time in ms
    effect = 'moonshine',                                         -- Effect function name
    progressbartext = "Drinking ",                                -- Progress bar label
    remove = true,                                                -- Remove item on use
    add = { stress = -10, buffs = {} },                           -- Stat changes
    anim = {
        dict = 'amb@world_human_drinking@coffee@male@idle_a',
        clip = 'idle_c'
    },
    prop = {
        model = 'prop_beer_bottle',
        bone = 57005,                                             -- Right hand
        pos = vector3(0.14, -0.05, -0.05),
        rot = vector3(-80.0, 0.0, 0.0)
    }
},
```

### Stat Keys

| Key | Effect |
|-----|--------|
| `stress` | Adjusts stress level (negative = reduces) |
| `health` | Adjusts player health |
| `armor` | Adjusts armor value |
| `stamina` | Restores stamina |
| `buffs` | Custom buff table for extended effects |

---

## Drug Effects

Effects are defined as named functions and referenced by the `effect` key in config.
Included out of the box:

- **Ecstasy** — screen effects, stamina restore, random flash, ragdoll on run
- **Weed** — stoned_monkeys timecycle filter, weedsmell evidence status
- **Alcohol/Moonshine** — configurable stress reduction, prop animation
- More included — easy to add your own by defining a new effect function and referencing it in config

Evidence integration fires automatically when a drug is used:

```lua
TriggerEvent('evidence:client:SetStatus', 'widepupils', 200)
TriggerEvent('evidence:client:SetStatus', 'weedsmell', 200)
```

---

## Support

- 💬 Discord: [discord.gg/TBb4QKHQtm](https://discord.gg/TBb4QKHQtm)
- 🛒 Tebex: [core-forge.tebex.io/package/7255680](https://core-forge.tebex.io/package/7255680)
- 💎 Full Drug Empire: [core-forge.tebex.io/package/7497769](https://core-forge.tebex.io/package/7497769)
- 📺 YouTube: [youtube.com/@CoreForgeFivem](https://youtube.com/@CoreForgeFivem)
- 📁 GitHub: [github.com/Core-Forge-5](https://github.com/Core-Forge-5)