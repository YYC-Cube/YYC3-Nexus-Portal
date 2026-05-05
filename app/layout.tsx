import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'YYC³ | 言启象限 · 语枢未来',
  description: 'YanYuCloudCube — 万象归元于云枢，深栈智启新纪元。以五高五标五化五维核心机制，构建面向AI时代的智能应用开发范式。',
  keywords: ['YYC³', 'YanYuCloudCube', 'AI', '智能应用', '云原生', '言渝云枢'],
  authors: [{ name: 'YanYuCloudCube Team', url: 'https://0379.email' }],
  icons: {
    icon: '/yyc3-dist/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning className="scroll-smooth">
      <body className={`font-sans antialiased bg-black`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
