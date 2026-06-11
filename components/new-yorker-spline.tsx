"use client"

import dynamic from "next/dynamic"

import { AIAssistant } from "@/components/ai-assistant"
import { Navbar, ScrollProgress } from "@/components/layout/navbar"

const HeroSection = dynamic(() => import("@/components/sections/hero").then((m) => ({ default: m.HeroSection })), { ssr: false })
const PhilosophySection = dynamic(() => import("@/components/sections/philosophy").then((m) => ({ default: m.PhilosophySection })))
const ScenarioSection = dynamic(() => import("@/components/sections/scenario").then((m) => ({ default: m.ScenarioSection })))
const ArchitectureSection = dynamic(() => import("@/components/sections/architecture").then((m) => ({ default: m.ArchitectureSection })))
const AIFamilySection = dynamic(() => import("@/components/sections/ai-family").then((m) => ({ default: m.AIFamilySection })))
const KnowledgeSection = dynamic(() => import("@/components/sections/ai-family").then((m) => ({ default: m.KnowledgeSection })))
const Footer = dynamic(() => import("@/components/sections/footer").then((m) => ({ default: m.Footer })))

export function NewYorkerSpline() {
  return (
    <main className="min-h-screen transition-colors duration-500" style={{ backgroundColor: "var(--yyc-bg)", color: "var(--yyc-text)" }}>
      <ScrollProgress />
      <Navbar />
      <HeroSection />
      <PhilosophySection />
      <ScenarioSection />
      <ArchitectureSection />
      <AIFamilySection />
      <KnowledgeSection />
      <Footer />
      <AIAssistant />
    </main>
  )
}
