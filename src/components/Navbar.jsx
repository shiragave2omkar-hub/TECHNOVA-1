export default function Navbar({ activeTab, user }) {
  const titles = {
    explore: "Explore",
    eligible: "Eligible Schemes",
    assistant: "AI Assistant",
    profile: "Profile",
  }

  return (
    <header className="fixed left-0 right-0 top-0 z-40 border-b border-gray-200/80 bg-white/95 backdrop-blur">
      <div className="mx-auto flex w-full max-w-lg items-center justify-between px-4 py-3">
        <div className="min-w-0">
          <p className="text-lg font-semibold tracking-tight text-gray-900">SevaAI</p>
          <p className="mt-0.5 text-xs text-gray-500">Smart Access to Government Benefits</p>
          <div className="mt-2 h-px w-16 bg-gray-200" />
          <h1 className="mt-2 text-sm font-medium text-gray-700">{titles[activeTab]}</h1>
        </div>
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gray-900 text-sm font-semibold text-white shadow-[0_10px_20px_rgba(17,24,39,0.12)]">
          {user.name
            .split(" ")
            .map((part) => part[0])
            .join("")}
        </div>
      </div>
    </header>
  )
}
