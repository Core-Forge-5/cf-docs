# Core-Injuries

## 📦 Requirements

| Dependency | Minimum Version | Purpose |
|------------|-----------------|---------|
| **FiveM Server Artifacts** | 3095+ (June 2024) | Statebags, modern natives |
| **ox_lib** | v3.28.0+ | Notifications, context menus, callbacks, commands |
| **ox_inventory** | Latest | Crutch/wheelchair/armsling usable items |
| **oxmysql** | Latest | **Optional** — only for persistence feature |

> ⚠️ **oxmysql is optional** — disable `Config.Persistence.Enabled = false` if not using.

---

## 🚀 Installation

### 1. Download & Place
```bash
# Place in your resources directory
/resources/[core]/core-injuries/
```
Download [core-wheelchair](https://github.com/Core-Forge-5/cf-wheelchair)
Place in same folder.

### 2. Server.cfg Load Order
```cfg
ensure ox_lib
ensure ox_inventory
ensure oxmysql          # Only if using persistence
ensure core-injuries
```

### 3. Configure (Required)
Edit files in `config/` — all are **unescrow'd and fully editable**:
```bash
config/
├── ems.lua             # EMS commands, menu settings
├── knockout.lua        # Knockout thresholds
├── main.lua            # Main toggles | Job names, framework override
├── persistence.lua     # Database settings
└── injury.lua          # Injury tier definitions | Prop models, bones, offsets

```

### 4. Add ox_inventory Items
Add to your `ox_inventory/data/items.lua`:
```lua
['crutch'] = {
    label = 'Crutch',
    weight = 1500,
    stack = false,
    close = true,
    description = 'A medical crutch for walking assistance'
},
```

### 5. Database (If Persistence Enabled)
```sql
-- Run database/schema.sql manually, or enable AutoCreateTable in config/persistence.
-- Then restart once if using Auto Create
-- Table: core_crutches_injuries
```

### 6. Start Server
```bash
# Check console for:
# [core-injuries] Framework bridge: QBox (or QBCore/ESX/Standalone)
# [core-injuries] Version check: Latest version .x.x
```

---

## ⚙️ Configuration

All configuration files are in `config/` and **unescrow'd** — modify freely without touching encrypted core logic.

### config/main.lua — Main Toggles
```lua
Config.Enabled = true
Config.Debug = false
Config.DefaultTier = "minor"

Config.Features = {
    InjuryTiers = true,      -- Enable tier system
    Knockout = true,         -- Enable knockout mechanics
    Persistence = false,     -- Requires oxmysql
    EMSMenu = true,          -- Enable EMS context menu
    Commands = true,         -- Enable all commands
    LegacyCompat = true,     -- v1 event/command compatibility
    SkinReloadWatch = true,  -- Re-apply props on clothing change
    PropValidation = true    -- Periodic prop re-attachment check
}
```

### config/main.lua — Framework Overrides
```lua
Config.Framework = {
    ForceFramework = nil,     -- nil=auto, or "qbox"/"qbcore"/"esx"/"standalone"
    EMSJobName = "ambulance",
    AdminPermission = "admin"
}
```

### config/main.lua — EMS Commands & Menu
```lua
Config.EMS = {
    Commands = {
        ApplyInjury = "emsinjury",
        Heal = "emsheal",
        Menu = "emsmenu"
    },
    ContextMenu = {
        Enabled = true,
        Title = "EMS Injury Management",
        Icon = "fa-solid fa-user-injured"
    },
    DurationBounds = {
        minor = { min = 5, max = 30 },
        moderate = { min = 15, max = 60 },
        severe = { min = 30, max = 120 },
        wheelchair = { min = 60, max = 240 },
        armsling = { min = 10, max = 60 }
    },
    AllowCustomDuration = true,
    InteractionRange = 3.0
}
```

### config/injury.lua — Define Tiers
```lua
Config.Tiers = {
    minor = {
        Label = "Minor Injury",
        ClipSet = "move_lester_CaneUp",
        Prop = "crutch",
        RequiredItem = "crutch",
        MovementPenalty = { Sprint = true, Jump = true, WalkSpeed = 0.8 },
        MinDuration = 5, MaxDuration = 15, DefaultDuration = 5,
        CanSelfRemove = true
    },
    -- moderate, severe, wheelchair, armsling...
}
```

### config/injury.lua — Prop Definitions
```lua
Config.Props = {
    crutch = {
        Model = `v_med_crutch01`,
        Bone = "SKEL_R_Hand",
        Offsets = { x = 1.18, y = -0.36, z = -0.20, rotX = -20.0, rotY = -87.0, rotZ = -20.0 },
        Collision = false, Scale = 1.0
    }
}
```

### config/knockout.lua — Knockout Settings
```lua
Config.Knockout = {
    Enabled = true,
    MeleeEnabled = true,
    MeleeHealthThreshold = 155,
    WeaponEnabled = true,
    WeaponDamageThreshold = 35,
    Duration = 5500,          -- ms unconscious
    Regeneration = 2,         -- HP per tick
    RegenInterval = 450,      -- ms per tick
    Cooldown = 30000,         -- ms before re-knockout
    PostKnockoutTier = "minor",
    PostKnockoutDuration = nil  -- nil = tier default
}
```

### config/persistence.lua — Database
```lua
Config.Persistence = {
    Enabled = false,
    TableName = "core_crutches_injuries",
    AutoCreateTable = true,
    LoadOnStart = true,
    SyncInterval = 30000,     -- ms between DB flushes
    CleanupInterval = 300000  -- ms between expired row cleanup
}
```

---

## 🎒 ox_inventory Items Setup

The system requires **usable items** in ox_inventory. Each tier's `RequiredItem` must exist in your items.lua.

### Required Items
| Item Name | Used By Tiers | Type | Weight |
|-----------|---------------|------|--------|
| `crutch` | minor, moderate, severe | Usable | 1000 |

### Item Usage Flow
1. Player has active injury requiring specific item
2. Player uses item from inventory (right-click → Use)
3. Client calls `exports['core-injuries']:UseCrutch()`
4. Server validates: injury active + item count ≥ 1 + tier matches item
5. Server removes 1 item, clears injury, syncs to client

> 💡 **Tip**: Configure `CanSelfRemove = false` on severe/wheelchair tiers to force EMS interaction.

---

## 🗄️ Database Setup (Persistence)

### Auto-Create (Recommended)
Enable in `config/persistence.lua`:
```lua
Config.Persistence = {
    Enabled = true,
    AutoCreateTable = true,  -- Creates table on resource start
    -- ...
}
```

### Manual Schema
Run `database/schema.sql`:
```sql
CREATE TABLE `core_crutches_injuries` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `identifier` VARCHAR(60) NOT NULL,
    `tier` VARCHAR(32) NOT NULL,
    `expiry` BIGINT NOT NULL,
    `source` VARCHAR(16) NOT NULL,
    `custom_duration` BOOLEAN DEFAULT FALSE,
    `cleared_by` VARCHAR(32) DEFAULT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY `unique_player` (`identifier`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

### Persistence Behavior
| Event | Database Action |
|-------|-----------------|
| Injury Applied | Saved to DB |
| Injury Cleared | Deleted from DB |
| Server Start |  Restores active injuries |

---

## 💬 Commands

### EMS Commands (Requires EMS job)
| Command | Syntax | Description |
|---------|--------|-------------|
| `/emsinjury` | `/emsinjury <id> <tier> [minutes]` | Apply injury to player |
| `/emsheal` | `/emsheal <id>` | Clear player's injury |
| `/emsmenu` | `/emsmenu` | Open proximity context menu |

### Admin (Requires Admin permission)
| Command | Syntax | Description |
|---------|--------|-------------|
| `/admininjury` | `/admininjury <id> <tier> [minutes]` | Apply injury (bypasses EMS check) |
| `/adminheal` | `/adminheal <id>` | Clear injury (bypasses EMS check) |
| `/knockout` | `/knockout <id> [duration]` | Force knockout on player |

### Player Commands
| Command | Syntax | Description |
|---------|--------|-------------|
| `/injury` | `/injury` | Check your injury status & time remaining |
| `/crutchtime` | `/crutchtime` | Legacy v1 — check remaining time |

### Legacy v1 Commands (Compatibility)
| Command | Syntax | Notes |
|---------|--------|-------|
| `/applycrutch` | `/applycrutch [id] [minutes]` | Applies "minor" tier |
| `/crutchtime` | `/crutchtime` | Shows remaining time |

---

## 🔌 Exports API

### Client Exports (Lua)
```lua
-- Check if player has ANY injury tier active
local isInjured = exports['core-injuries']:IsInjured()
-- Returns: boolean

-- Get current injury tier name
local tier = exports['core-injuries']:GetInjuryTier()
-- Returns: string|nil ("minor", "moderate", "severe", "wheelchair", "armsling")

-- Get remaining time in seconds
local seconds = exports['core-injuries']:GetRemainingTime()
-- Returns: number|nil

-- Get injury source ("ems", "admin", "knockout", "command")
local source = exports['core-injuries']:GetInjurySource()
-- Returns: string|nil

-- Set injury VISUALLY ONLY (no server sync) — for cutscenes, scenes
local success = exports['core-injuries']:SetInjuryTier("moderate")
-- Returns: boolean

-- Clear injury VISUALLY ONLY (no server sync)
local success = exports['core-injuries']:ClearInjury()
-- Returns: boolean

-- Attempt to use crutch item from inventory (triggers server validation)
local success = exports['core-injuries']:UseCrutch()
-- Returns: boolean

-- Force re-apply visuals (prop + clipset) — useful after clothing change
exports['core-injuries']:ReapplyInjuryVisuals()
-- Returns: void
```

### Server Exports (Lua)
```lua
-- Apply injury to player (REPLACES existing injury — tier transition)
-- @param src number - Player server ID
-- @param tier string - Tier key from Config.Tiers
-- @param minutes number|nil - Duration in minutes (nil = tier default, clamped to min/max)
-- @return boolean, string - success, errorMessage
local success, err = exports['core-injuries']:ApplyInjury(src, "moderate", 30)

-- Clear injury from player
-- @param src number - Player server ID
-- @param clearedBy string|nil - "ems_cleared", "expired", "self_removed", "crutch_used"
-- @return boolean, string - success, errorMessage
local success, err = exports['core-injuries']:ClearInjury(src, "ems_cleared")

-- Get full injury data for player
-- @param src number - Player server ID
-- @return table|nil - { tier, expiry, source, customDuration, clearedBy } or nil
local injury = exports['core-injuries']:GetInjury(src)

-- Check if player has active injury
-- @param src number - Player server ID
-- @return boolean
local isInjured = exports['core-injuries']:IsInjured(src)

-- Get remaining time in seconds
-- @param src number - Player server ID
-- @return number|nil - Seconds remaining or nil if not injured
local seconds = exports['core-injuries']:GetRemainingTime(src)
```

---