const isDev = process.env.NODE_ENV !== "production"
const BUILD_MODE = process.env.BUILD_MODE || "standalone"
const isStatic = BUILD_MODE === "export"

const ContentSecurityPolicy = isDev
  ? undefined
  : [
      "default-src 'self'",
      "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://vercel.live https://va.vercel-scripts.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' blob: data: https://prod.spline.design",
      "connect-src 'self' https://*.spline.design http://localhost:11434 https://va.vercel-scripts.com",
      "frame-src 'none'",
      "object-src 'none'",
    ].join("; ")

const securityHeaders = [
  { key: "X-DNS-Prefetch-Control", value: "on" },
  { key: "X-XSS-Protection", value: "1; mode=block" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "origin-when-cross-origin" },
  ...(isDev ? [] : [
    { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
    { key: "Content-Security-Policy", value: ContentSecurityPolicy },
  ]),
]

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: isStatic ? "export" : (process.env.NODE_ENV === "production" ? "standalone" : undefined),
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
