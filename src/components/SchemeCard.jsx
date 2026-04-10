const categoryStyles = {
  Education: "bg-sky-50 text-sky-700",
  Health: "bg-emerald-50 text-emerald-700",
  Employment: "bg-amber-50 text-amber-700",
  Travel: "bg-indigo-50 text-indigo-700",
  "Financial Support": "bg-rose-50 text-rose-700",
  "Assistive Devices": "bg-violet-50 text-violet-700",
}

const categoryAccentStyles = {
  Education: "border-l-[#185FA5]",
  Health: "border-l-[#0F6E56]",
  Employment: "border-l-[#854F0B]",
  Travel: "border-l-[#4F46E5]",
  "Financial Support": "border-l-[#0F6E56]",
  "Assistive Devices": "border-l-[#6D28D9]",
}

export default function SchemeCard({ scheme }) {
  return (
    <article
      className={`rounded-3xl border border-gray-200 border-l-4 bg-white p-5 shadow-[0_12px_32px_rgba(15,23,42,0.06)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(15,23,42,0.08)] ${
        categoryAccentStyles[scheme.category] || "border-l-gray-300"
      }`}
    >
      <div className="mb-4 flex items-start justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <span
            className={`rounded-full px-3 py-1 text-[11px] font-semibold ${
              categoryStyles[scheme.category] || "bg-gray-100 text-gray-600"
            }`}
          >
            {scheme.category}
          </span>
          {scheme.recommended && (
            <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[11px] font-semibold text-emerald-700">
              Recommended
            </span>
          )}
        </div>
      </div>

      <h3 className="text-base font-semibold leading-tight text-gray-900">{scheme.name}</h3>
      <p className="mt-2 text-sm leading-6 text-gray-600">{scheme.description}</p>

      <div className="mt-4 rounded-2xl bg-gray-50 px-4 py-3">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gray-400">Eligibility Summary</p>
        <p className="mt-1 text-sm leading-6 text-gray-700">{scheme.eligibilitySummary}</p>
      </div>
    </article>
  )
}
