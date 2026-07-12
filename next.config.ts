import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    // /concierge is a static, self-contained page in public/ (the on-device
    // AI concierge). Public assets are served by exact path only, so the
    // clean URL needs a rewrite to the real file.
    return [{ source: "/concierge", destination: "/concierge/index.html" }];
  },
};

export default nextConfig;
