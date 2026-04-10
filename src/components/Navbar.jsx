export default function Navbar({ activeTab, user }) {
  const titles = {
    explore: "Explore",
    eligible: "Eligible Schemes",
    assistant: "AI Assistant",
    profile: "Profile",
  }

  return (
    <header className="fixed left-0 right-0 top-0 z-40 border-b border-gray-200/80 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-[var(--app-header-height)] w-full max-w-lg items-center justify-between gap-3 px-4">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <p className="truncate text-lg font-semibold tracking-tight text-gray-900">SevaAI</p>
            <span className="rounded-full bg-gray-100 px-2.5 py-1 text-[11px] font-semibold text-gray-600">
              {titles[activeTab]}
            </span>
          </div>
          <p className="truncate text-xs text-gray-500">Smart Access to Government Benefits</p>
        </div>
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gray-900 text-sm font-semibold text-white shadow-[0_10px_20px_rgba(17,24,39,0.12)]">
          {user.name
            .split(" ")
            .map((part) => part[0])
            .join("")}
        </div>
      </div>
    </header>
  )
}
