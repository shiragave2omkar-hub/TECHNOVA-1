export default function ProfileCard({ user }) {
  return (
    <section className="rounded-[28px] border border-gray-200 bg-white p-5 shadow-[0_16px_40px_rgba(15,23,42,0.06)]">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-900 text-lg font-semibold text-white">
            {user.name
              .split(" ")
              .map((part) => part[0])
              .join("")}
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">Personal Details</p>
            <h2 className="mt-1 text-xl font-semibold text-gray-900">{user.name}</h2>
            <p className="text-sm text-gray-500">{user.state}</p>
          </div>
        </div>

        <span className="rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-semibold text-emerald-700">Verified</span>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3">
        <InfoTile label="Name" value={user.name} />
        <InfoTile label="UDID" value={user.udid} />
        <InfoTile label="State" value={user.state} />
        <InfoTile label="Disability Type" value={user.disabilityType} />
        <InfoTile label="Disability %" value={user.disabilityPercentage} />
        <InfoTile label="Income Category" value={user.incomeCategory} />
      </div>
    </section>
  )
}

function InfoTile({ label, value }) {
  return (
    <div className="rounded-2xl bg-gray-50 px-4 py-3">
      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gray-400">{label}</p>
      <p className="mt-1 text-sm font-medium leading-6 text-gray-800">{value}</p>
    </div>
  )
}
