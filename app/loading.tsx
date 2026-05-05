export default function Loading() {
  return (
    <main className="min-h-screen bg-black flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 rounded-full border-2 border-violet-500 border-t-transparent animate-spin" />
        <p className="text-white/30 text-sm tracking-widest uppercase">Loading</p>
      </div>
    </main>
  )
}
