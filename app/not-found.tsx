"use client"

import Link from "next/link"
import { motion } from "framer-motion"

export default function NotFound() {
  return (
    <main className="min-h-screen bg-black flex items-center justify-center px-6">
      <div className="text-center">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 to-cyan-500 mb-8 overflow-hidden">
            <img src="/yyc3-dist/yanyu_cloud_128x128.png" alt="YYC³" className="w-full h-full object-contain" />
          </div>
        </motion.div>
        <motion.h1 className="text-8xl font-bold bg-gradient-to-r from-violet-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.1 }}>
          404
        </motion.h1>
        <motion.p className="mt-4 text-white/50 text-lg" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
          页面未找到
        </motion.p>
        <motion.p className="mt-2 text-white/25 text-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
          您访问的页面不存在或已被移除
        </motion.p>
        <motion.div className="mt-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
          <Link href="/" className="inline-flex items-center gap-2 bg-gradient-to-r from-violet-600 to-cyan-600 text-white px-8 py-3 rounded-full font-medium text-sm tracking-wide hover:opacity-90 transition-opacity">
            返回首页
          </Link>
        </motion.div>
      </div>
    </main>
  )
}
