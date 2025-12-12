import type { NextConfig } from "next";

const nextConfig = {
  images: {
    domains: ["img.itch.zone", "itch.io"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.itch.zone",
        port: "",
      },
      {
        protocol: "https",
        hostname: "itch.io",
        port: "",
      },
    ],
  },
  turbopack: {
    rules: {
      "*.svg": {
        loaders: ["@svgr/webpack"],
        as: "*.js",
      },
    },
  },
};
export default nextConfig;
