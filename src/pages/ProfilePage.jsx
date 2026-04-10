import ProfileCard from "../components/ProfileCard"
import { recentActivity } from "../data/mockData"

const activityIcons = {
  eligibility: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4">
      <path d="M9 11 12 14 22 4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  application: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4">
      <path d="M14 2H6a2 2 0 0 0-2 2v16l4-3 4 3 4-3 4 3V8z" strokeLinejoin="round" />
      <path d="M14 2v6h6" strokeLinejoin="round" />
    </svg>
  ),
  document: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" strokeLinejoin="round" />
      <path d="M14 2v6h6" strokeLinejoin="round" />
      <path d="M8 13h8M8 17h5" strokeLinecap="round" />
    </svg>
  ),
}

export default function ProfilePage({ user }) {
  return (
    <section className="space-y-5 px-4 pb-6 pt-4">
      <ProfileCard user={user} />

      <div className="rounded-[28px] border border-gray-200 bg-white p-5 shadow-[0_16px_40px_rgba(15,23,42,0.06)]">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">Recent Activity</p>
        <div className="mt-4 space-y-3">
          {recentActivity.map((item) => (
            <div key={item.id} className="flex gap-3 rounded-2xl bg-gray-50 px-4 py-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white text-gray-700 shadow-sm">
                {activityIcons[item.type]}
              </div>
              <div className="flex items-center justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-sm font-semibold text-gray-900">{item.title}</h3>
                    <span className="rounded-full bg-white px-3 py-1 text-[11px] font-semibold text-gray-500 shadow-sm">
                      {item.time}
                    </span>
                  </div>
                  <p className="mt-1 text-sm leading-6 text-gray-600">{item.detail}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
