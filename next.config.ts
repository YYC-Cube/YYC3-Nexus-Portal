import { contentSecurityPolicy } from "./lib/csp"

const isDev = process.env.NODE_ENV !== "production"
const BUILD_MODE = process.env.BUILD_MODE || "standalone"
const isStatic = BUILD_MODE === "export"

const securityHeaders = [
  { key: "X-DNS-Prefetch-Control", value: "on" },
  { key: "X-XSS-Protection", value: "1; mode=block" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "origin-when-cross-origin" },
  ...(isDev
    ? []
    : [
        { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
        { key: "Content-Security-Policy", value: contentSecurityPolicy },
      ]),
]

const nextConfig = {
  output: isStatic ? "export" : process.env.NODE_ENV === "production" ? "standalone" : undefined,
  trailingSlash: isStatic,
  images: {
    unoptimized: isStatic,
    formats: ["image/avif", "image/webp"],
    remotePatterns: [{ protocol: "https", hostname: "prod.spline.design" }],
  },
  async headers() {
    if (isStatic) return []
    return [{ source: "/(.*)", headers: securityHeaders }]
  },
  poweredByHeader: false,
}

export default nextConfig
