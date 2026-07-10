**Installation (2 minutes):**
```bash
# 1. Import SQL (one file, two tables)
mysql -u user -p database < sql/cf_outfitbag.sql

# 2. Add to server.cfg
ensure ox_lib
ensure oxmysql
ensure ox_inventory
ensure cf-outfitbag

# 3. Add the outfit bag item from install/item.lua to your ox_inventory data/items.lua


# 4. Add the picture to ox_inventory web/images


# 5. Optional: tweak max outfits, bag prop, debug in shared/config.lua
```

---