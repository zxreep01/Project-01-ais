// stats-snapshot.js — bundled data module.
//
// This is an ES module rather than a .json file on purpose: Cloudflare Pages compiles
// Functions with its own pinned wrangler (3.x) and esbuild 0.17.19, which cannot parse
// ES import attributes (`with { type: 'json' }`). Node 22 ESM, in turn, *requires* that
// attribute for .json imports. `export default <object literal>` is the one form both
// accept. Keep this file as plain data — no imports, no modern-only syntax.

export default {
  "_note": "Status/latency/TPS snapshot scraped from the gateway pricing page (not exposed by the public pricing API).",
  "scrapedAt": "2026-09-25",
  "models": {
    "/data/models/GLM-5.3-Flash": { "status": "85.98%", "latency": "16.22s", "tps": "75.1" },
    "/data/Models/MiniMax-H3": { "status": "0.00%", "latency": "1.41s", "tps": null },
    "dall-e-3": { "status": "50.00%", "latency": "10.19s", "tps": null },
    "deepseek-0731": { "status": "66.67%", "latency": "9.18s", "tps": "1.31" },
    "deepseek-ai/DeepSeek-V4.1-Flash": { "status": "100.00%", "latency": "7.67s", "tps": "308.1" },
    "deepseek-expert": { "status": "0.00%", "latency": "755ms", "tps": null },
    "deepseek-reasoner": { "status": "0.00%", "latency": "786ms", "tps": null },
    "deepseek-v4-flash": { "status": "100.00%", "latency": "13.57s", "tps": "1.36" },
    "deepseek-v4-flash-0731": { "status": "0.00%", "latency": "5.52s", "tps": null },
    "deepseek-v4-flash-vision-exp": { "status": "66.67%", "latency": "7.51s", "tps": "1.24" },
    "deepseek-v4-pro": { "status": "100.00%", "latency": "14.52s", "tps": "1.38" },
    "deepseek-v4-pro-0813": { "status": "0.00%", "latency": "2.93s", "tps": null },
    "deepseek-v4.1-flash": { "status": "100.00%", "latency": "1.96s", "tps": "44.6" },
    "DeepSeek-V4.1-Flash": { "status": "80.00%", "latency": "32.19s", "tps": "1.44" },
    "deepseek/deepseek-v4-pro": { "status": "100.00%", "latency": "9.53s", "tps": "42.8" },
    "flux-image": { "status": "100.00%", "latency": "25.45s", "tps": "0.04" },
    "gemini-2.5-flash": { "status": "0.00%", "latency": "1.01s", "tps": null },
    "gemini-2.5-flash-lite": { "status": "0.00%", "latency": "1.06s", "tps": null },
    "gemini-2.5-flash-thinking": { "status": "0.00%", "latency": "1.06s", "tps": null },
    "gemini-3-flash-preview": { "status": "0.00%", "latency": "1.01s", "tps": null }
  }
};
