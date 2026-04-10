import { useMemo, useState } from "react"
import SchemeCard from "../components/SchemeCard"
import { exploreCategories, schemes } from "../data/mockData"

export default function ExplorePage({ onCheckEligibility }) {
  const [activeCategory, setActiveCategory] = useState(exploreCategories[0])
  const [searchQuery, setSearchQuery] = useState("")

  const filteredSchemes = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase()

    return schemes.filter((scheme) => {
      const matchesCategory = scheme.category === activeCategory
      const matchesSearch =
        normalizedQuery.length === 0 ||
        scheme.name.toLowerCase().includes(normalizedQuery) ||
        scheme.category.toLowerCase().includes(normalizedQuery) ||
        scheme.description.toLowerCase().includes(normalizedQuery)

      return matchesCategory && matchesSearch
    })
  }, [activeCategory, searchQuery])

  return (
    <section className="space-y-5 px-4 pb-6 pt-3">
      <div className="rounded-[28px] border border-gray-200 bg-white p-5 shadow-[0_16px_40px_rgba(15,23,42,0.06)]">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">Explore</p>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight text-gray-900">Find schemes by need</h2>
        <p className="mt-2 text-sm leading-6 text-gray-600">
          Browse support programs across core categories and open the schemes most relevant to your current situation.
        </p>
      </div>

      <div className="rounded-[28px] border border-gray-200 bg-white p-4 shadow-[0_12px_32px_rgba(15,23,42,0.05)]">
        <label className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 transition focus-within:border-gray-300 focus-within:bg-white">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4 shrink-0 text-gray-400">
            <circle cx="11" cy="11" r="7" />
            <path d="m21 21-4.35-4.35" strokeLinecap="round" />
          </svg>
          <input
            type="search"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Search schemes, benefits, scholarships..."
            className="w-full bg-transparent text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none"
          />
        </label>
      </div>

      <div className="scrollbar-hide flex gap-2 overflow-x-auto pb-1">
        {exploreCategories.map((category) => {
          const isActive = activeCategory === category
          return (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition ${
                isActive
                  ? "bg-gray-900 text-white shadow-sm"
                  : "border border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:text-gray-900"
              }`}
            >
              {category}
            </button>
          )
        })}
      </div>

      {filteredSchemes.length > 0 ? (
        <div className="space-y-4">
          {filteredSchemes.map((scheme) => (
            <div key={scheme.id}>
              <SchemeCard scheme={scheme} />
              <div className="-mt-3 px-5 pb-1">
                <button
                  onClick={() => scheme.relatedEligibleId && onCheckEligibility(scheme.relatedEligibleId)}
                  className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-semibold text-gray-800 transition-all duration-200 hover:-translate-y-0.5 hover:border-gray-300 hover:bg-white"
                >
                  Check Eligibility
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-[28px] border border-dashed border-gray-200 bg-white px-6 py-10 text-center shadow-[0_12px_32px_rgba(15,23,42,0.04)]">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-100 text-gray-500">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
              <circle cx="11" cy="11" r="7" />
              <path d="m21 21-4.35-4.35" strokeLinecap="round" />
            </svg>
          </div>
          <h3 className="mt-4 text-base font-semibold text-gray-900">No schemes found</h3>
          <p className="mt-2 text-sm leading-6 text-gray-600">
            Try a different search term or switch categories to see more schemes.
          </p>
        </div>
      )}
    </section>
  )
}
