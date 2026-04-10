const tabs = [
  {
    id: "explore",
    label: "Explore",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
        <circle cx="11" cy="11" r="7" />
        <path d="m21 21-4.35-4.35" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "eligible",
    label: "Eligible Schemes",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
        <path d="M9 11 12 14 22 4" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: "assistant",
    label: "AI Assistant",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
        <path d="M12 3c3.866 0 7 2.91 7 6.5S15.866 16 12 16H8l-4 4V9.5C4 5.91 8.134 3 12 3Z" strokeLinejoin="round" />
        <path d="M9 9h6M9 12h4" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "profile",
    label: "Profile",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" strokeLinejoin="round" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
]

export default function BottomNav({ activeTab, setActiveTab }) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-gray-200/80 bg-white/95 backdrop-blur">
      <div className="mx-auto grid h-20 w-full max-w-lg grid-cols-4 gap-2 px-3 py-3">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              aria-current={isActive ? "page" : undefined}
              aria-label={`Open ${tab.label}`}
              className={`flex flex-col items-center justify-center rounded-2xl px-2 py-2 text-center transition-all duration-200 ${
                isActive
                  ? "bg-gray-900 text-white shadow-[0_10px_24px_rgba(17,24,39,0.16)]"
                  : "text-gray-400 hover:-translate-y-0.5 hover:bg-gray-50 hover:text-gray-700"
              }`}
            >
              {tab.icon}
              <span className="mt-1 text-[11px] font-medium leading-tight">{tab.label}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
