import { Analytics } from "@vercel/analytics/next"
import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
    { media: "(prefers-color-scheme: light)", color: "#fafafa" },
  ],
}

export const metadata: Metadata = {
  title: "YYC³ | 言启象限 · 语枢未来",
  description:
    "YanYuCloudCube — 万象归元于云枢，深栈智启新纪元。以五高五标五化五维核心机制，构建面向AI时代的智能应用开发范式。",
  keywords: [
    "YYC³",
    "YanYuCloudCube",
    "AI",
    "智能应用",
    "云原生",
    "言渝云枢",
    "Nexus Portal",
    "AI Family",
    "五高五标五化五维",
  ],
  authors: [{ name: "YanYuCloudCube Team", url: "https://0379.email" }],
  creator: "YanYuCloudCube Team",
  publisher: "YYC³",
  metadataBase: new URL("https://portal.yyc3.top"),
  openGraph: {
    type: "website",
    locale: "zh_CN",
    siteName: "YYC³ Nexus Portal",
    title: "YYC³ | 言启象限 · 语枢未来",
    description: "万象归元于云枢，深栈智启新纪元 — YYC³ AI Family 3D 交互展示门户",
    url: "https://portal.yyc3.top",
    images: [
      {
        url: "/YYC3-Family-001.png",
        width: 1920,
        height: 1080,
        alt: "YYC³ Nexus Portal Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "YYC³ Nexus Portal",
    description: "万象归元于云枢，深栈智启新纪元",
    images: ["/YYC3-Family-001.png"],
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    title: "YYC³ Portal",
    statusBarStyle: "black-translucent",
  },
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/yyc3-dist/yanyu_cloud_32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/yyc3-dist/yanyu_cloud_16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [
      { url: "/yyc3-dist/yanyu_cloud_192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/yyc3-dist/yanyu_cloud_256x256.png", sizes: "256x256", type: "image/png" },
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning className="scroll-smooth">
      <head>
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="apple-touch-icon" href="/yyc3-dist/yanyu_cloud_192x192.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="YYC³ Portal" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="application-name" content="YYC³ Nexus Portal" />
        <meta name="theme-color" content="#000000" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="msapplication-TileImage" content="/yyc3-dist/yanyu_cloud_256x256.png" />
        <link rel="manifest" href="/manifest.json" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ("serviceWorker" in navigator) {
                window.addEventListener("load", function() {
                  navigator.serviceWorker.register("/sw.js").then(function(reg) {
                    console.log("SW registered:", reg.scope);
                    reg.addEventListener("updatefound", function() {
                      var installing = reg.installing;
                      installing.addEventListener("statechange", function() {
                        if (installing.state === "installed" && navigator.serviceWorker.controller) {
                          console.log("SW update available");
                        }
                      });
                    });
                  }).catch(function(err) {
                    console.warn("SW registration failed:", err);
                  });
                });
              }
            `,
          }}
        />
      </head>
      <body className="font-sans antialiased bg-black">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
