export const cspDirectives = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://vercel.live https://va.vercel-scripts.com",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com",
  "img-src 'self' blob: data: https://prod.spline.design",
  "connect-src 'self' https://*.spline.design http://localhost:11434 https://va.vercel-scripts.com",
  "frame-src 'none'",
  "object-src 'none'",
]

export const contentSecurityPolicy = cspDirectives.join("; ")
