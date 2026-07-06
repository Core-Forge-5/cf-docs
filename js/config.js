/* ============================================================================
   CORE-FORGE — SITE CONFIG
   Central place to control data source + static fallback content.
   Flip USE_TEBEX_API to true once you have a Headless API webstore token.
   ============================================================================ */

const CF_CONFIG = {
  // Set to true to fetch live data from Tebex Headless API instead of the
  // static SCRIPTS array below. Docs: https://docs.tebex.io/developers/headless-api
  USE_TEBEX_API: false,

  TEBEX_API_BASE: "https://headless.tebex.io/api",
  TEBEX_WEBSTORE_TOKEN: "YOUR_WEBSTORE_TOKEN_HERE",

  BRAND: {
    name: "Core-Forge",
    tagline: "Commercial FiveM scripting, built to spec.",
    discord: "https://discord.gg/TBb4QKHQtm",
    tebex: "https://core-forge.tebex.io",
    github: "https://github.com/Core-Forge-5",
    youtube: "https://youtube.com/@CoreForgeFivem",
  },

  // Static fallback / default dataset. Each entry maps loosely to a Tebex
  // package so swapping to the live API later is a straight field-mapping job.
  SCRIPTS: [
    // {
    //   id: "cf-hud",
    //   name: "cf-hud",
    //   tagline: "Feature-complete HUD system",
    //   description: "A fully modular HUD built on the cf-ui design token system, with code-split React panels and buttery-smooth state transitions.",
    //   price: 24.99,
    //   currency: "USD",
    //   category: "HUD & UI",
    //   frameworks: ["QBCore", "QBox", "ESX"],
    //   badges: [{ label: "Popular", type: "success" }],
    //   image: null,
    // },
    {
      id: "core-injuries",
      name: "core-injuries",
      tagline: "Crutches, slings & knockout mechanics",
      description: "Full injury system: crutch tiers, arm slings, knockout states, wheelchair vehicle, and statebag-replicated status across all clients.",
      price: 19.99,
      currency: "USD",
      category: "Gameplay",
      frameworks: ["QBCore", "QBox", "ESX"],
      badges: [{ label: "Updated", type: "info" }],
      image: null,
      checkoutLink: "https://core-forge.tebex.io/package/7519751",
    },
    // {
    //   id: "core-gruppe6",
    //   name: "core-gruppe6",
    //   tagline: "Armored delivery job",
    //   description: "Full Gruppe 6 armored truck delivery job with a complete React NUI, route logic, and payout tuning.",
    //   price: 22.99,
    //   currency: "USD",
    //   category: "Jobs",
    //   frameworks: ["QBCore", "ESX"],
    //   badges: [],
    //   image: null,
    // },
    // {
    //   id: "cf-outfitbag",
    //   name: "cf-outfitbag",
    //   tagline: "Prop-based outfit management",
    //   description: "Manage clothing and prop-based outfits with a clean NUI, networked prop spawning, and saved loadouts.",
    //   price: 17.99,
    //   currency: "USD",
    //   category: "HUD & UI",
    //   frameworks: ["QBCore", "QBox", "ESX"],
    //   badges: [{ label: "New", type: "success" }],
    //   image: null,
    // },
    // {
    //   id: "core-fuel",
    //   name: "core-fuel",
    //   tagline: "Realistic vehicle fuel system",
    //   description: "Lightweight fuel consumption, station interactions, and per-vehicle tank configs with framework auto-detection.",
    //   price: 12.99,
    //   currency: "USD",
    //   category: "Vehicles",
    //   frameworks: ["QBCore", "QBox", "ESX"],
    //   badges: [],
    //   image: null,
    // },
    {
      id: "coreforge-drugs",
      name: "coreforge-drugs",
      tagline: "Drug empire economy system",
      description: "A complete drug production, distribution, and economy with selling and consumeables framework.",
      price: 59.99,
      currency: "USD",
      category: "Economy",
      frameworks: ["QBCore", "QBox", "ESX"],
      badges: [{ label: "Popular", type: "success" }],
      image: '../img/cf-drugs2.jpg',
      checkoutLink: "https://core-forge.tebex.io/package/7497769",
    },
    {
      id: "core-consumables",
      name: "core-consumables",
      tagline: "Food, drink & item effects",
      description: "Configurable consumable items with stat effects, animations, and framework-agnostic item hooks.",
      price: 0.00,
      currency: "USD",
      category: "Gameplay",
      frameworks: ["QBCore", "ESX"],
      badges: [],
      image: null,
      checkoutLink: "https://core-forge.tebex.io/package/7255680",
    },
    {
      id: "core-billing",
      name: "core-billing",
      tagline: "Invoicing & billing system",
      description: "Send, track, and manage invoices between players with a clean ledger UI and notification hooks.",
      price: 0.00,
      currency: "USD",
      category: "Economy",
      frameworks: ["QBCore", "QBox", "ESX"],
      badges: [],
      image: null,
      checkoutLink: "https://core-forge.tebex.io/package/7254081",
    },
    {
      id: "cf_atmrobbery",
      name: "cf_atmrobbery",
      tagline: "ATM robbery minigame",
      description: "Skill-based ATM hacking minigame with police alerting, cooldowns, and configurable payout tiers.",
      price: 9.99,
      currency: "USD",
      category: "Gameplay",
      frameworks: ["QBCore", "ESX"],
      badges: [{ label: "New", type: "success" }],
      image: null,
      checkoutLink: "https://core-forge.tebex.io/package/7089269",
    }
  ],
};

/**
 * Fetch script/package data — from the static config or the live Tebex
 * Headless API, depending on CF_CONFIG.USE_TEBEX_API.
 *
 * To go live:
 *  1. Set USE_TEBEX_API = true above
 *  2. Set TEBEX_WEBSTORE_TOKEN to your store's public token
 *  3. Adjust the field-mapping below to match the Headless API package shape
 */
async function cfGetScripts() {
  if (!CF_CONFIG.USE_TEBEX_API) {
    return CF_CONFIG.SCRIPTS;
  }

  try {
    const res = await fetch(
      `${CF_CONFIG.TEBEX_API_BASE}/accounts/${CF_CONFIG.TEBEX_WEBSTORE_TOKEN}/categories?includePackages=1`
    );
    if (!res.ok) throw new Error(`Tebex API error: ${res.status}`);
    const json = await res.json();

    const packages = (json.data || []).flatMap((cat) => cat.packages || []);

    return packages.map((pkg) => ({
      id: pkg.id,
      name: pkg.name,
      tagline: pkg.description ? pkg.description.slice(0, 80) : "",
      description: pkg.description || "",
      price: pkg.total_price ?? pkg.base_price,
      currency: pkg.currency || "USD",
      category: pkg.category?.name || "Scripts",
      frameworks: [],
      badges: pkg.discount ? [{ label: "Sale", type: "warning" }] : [],
      image: pkg.image || null,
      checkoutLink: pkg.links?.checkout || null,
    }));
  } catch (err) {
    console.error("Falling back to static script data:", err);
    return CF_CONFIG.SCRIPTS;
  }
}

/**
 * Build a Tebex checkout URL/link for a given package.
 * Swap this out once you have real package IDs + a Tebex.js checkout embed.
 * Docs: https://docs.tebex.io/plugin/tutorials/checkout
 */
function cfCheckoutUrl(script) {
  if (script.checkoutLink) return script.checkoutLink;
  return `${CF_CONFIG.BRAND.tebex}/checkout?package=${encodeURIComponent(script.id)}`;
}