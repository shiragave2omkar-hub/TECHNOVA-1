import { useEffect, useMemo, useRef, useState } from "react"
import { eligibleFilters, eligibleSchemes, udidProfiles } from "../data/mockData"

const statusStyles = {
  "Ready to Apply": "bg-emerald-50 text-emerald-700",
  "Missing Documents": "bg-amber-50 text-amber-700",
  "Partially Eligible": "bg-sky-50 text-sky-700",
}

export default function EligibleSchemesPage({ currentUser, highlightedSchemeId, onUserLoaded }) {
  const [activeFilter, setActiveFilter] = useState("All")
  const [udidInput, setUdidInput] = useState("")
  const [searchState, setSearchState] = useState("idle")
  const [searchMessage, setSearchMessage] = useState("")
  const cardRefs = useRef({})

  const filteredSchemes = useMemo(() => {
    if (activeFilter === "All") return eligibleSchemes
    if (activeFilter === "Ready to Apply") {
      return eligibleSchemes.filter((scheme) => scheme.status === "Ready to Apply")
    }
    if (activeFilter === "Missing Documents") {
      return eligibleSchemes.filter((scheme) => scheme.status === "Missing Documents")
    }
    return eligibleSchemes.filter((scheme) => scheme.category === activeFilter)
  }, [activeFilter])

  useEffect(() => {
    if (!highlightedSchemeId) return

    const targetScheme = eligibleSchemes.find((scheme) => scheme.id === highlightedSchemeId)
    if (!targetScheme) return

    setActiveFilter("All")

    window.requestAnimationFrame(() => {
      cardRefs.current[highlightedSchemeId]?.scrollIntoView({ behavior: "smooth", block: "center" })
    })
  }, [highlightedSchemeId])

  const handleSearch = () => {
    const query = udidInput.trim().toUpperCase()
    if (!query) {
      setSearchState("error")
      setSearchMessage("Enter a valid UDID number to continue.")
      return
    }

    setSearchState("loading")
    setSearchMessage("")

    window.setTimeout(() => {
      const foundProfile = udidProfiles.find((profile) => profile.udid.toUpperCase() === query)

      if (!foundProfile) {
        setSearchState("error")
        setSearchMessage("No user found for this UDID number.")
        return
      }

      onUserLoaded(foundProfile)
      setSearchState("success")
      setSearchMessage("Profile loaded successfully")
    }, 900)
  }

  return (
    <section className="px-4 pb-6 pt-4">
      <div className="rounded-[28px] border border-gray-200 bg-white p-5 shadow-[0_16px_40px_rgba(15,23,42,0.06)]">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">Find Your Benefits</p>
            <h2 className="mt-2 text-xl font-semibold tracking-tight text-gray-900">Search with UDID</h2>
            <p className="mt-2 text-sm leading-6 text-gray-600">
              Load an existing citizen profile to surface schemes and document gaps faster.
            </p>
          </div>
          <span className="rounded-full bg-gray-100 px-3 py-1 text-[11px] font-semibold text-gray-600">
            {currentUser.udid}
          </span>
        </div>

        <div className="mt-4 flex gap-3">
          <input
            type="text"
            value={udidInput}
            onChange={(event) => setUdidInput(event.target.value)}
            placeholder="Enter UDID number"
            className="flex-1 rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700 outline-none transition focus:border-gray-300 focus:bg-white"
          />
          <button
            onClick={handleSearch}
            disabled={searchState === "loading"}
            className="inline-flex min-w-[96px] items-center justify-center rounded-2xl bg-gray-900 px-5 py-3 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-300"
          >
            {searchState === "loading" ? (
              <span className="flex items-center gap-2">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                Searching
              </span>
            ) : (
              "Search"
            )}
          </button>
        </div>

        {searchMessage && (
          <p
            className={`mt-3 text-sm ${
              searchState === "success" ? "text-emerald-600" : "text-rose-600"
            }`}
          >
            {searchMessage}
          </p>
        )}
      </div>

      <div className="rounded-[28px] border border-gray-200 bg-white p-5 shadow-[0_16px_40px_rgba(15,23,42,0.06)]">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">Eligible Schemes</p>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight text-gray-900">Schemes You Can Apply For</h2>
        <p className="mt-2 text-sm leading-6 text-gray-600">
          These matches use {currentUser.name.split(" ")[0]}'s profile and document status to show what is ready now and what still needs attention.
        </p>
      </div>

      <div className="mt-5 scroll-mt-24 rounded-[28px] border border-gray-200 bg-white p-4 shadow-[0_12px_32px_rgba(15,23,42,0.05)]">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gray-400">Loaded Profile</p>
        <div className="mt-3 grid grid-cols-2 gap-3">
          <ProfileFact label="Name" value={currentUser.name} />
          <ProfileFact label="State" value={currentUser.state} />
          <ProfileFact label="Disability Type" value={currentUser.disabilityType} />
          <ProfileFact label="Income Category" value={currentUser.incomeCategory} />
        </div>
      </div>

      <div className="scrollbar-hide mt-5 flex gap-2 overflow-x-auto pb-1">
        {eligibleFilters.map((filter) => {
          const isActive = filter === activeFilter
          return (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "bg-gray-900 text-white shadow-sm"
                  : "border border-gray-200 bg-white text-gray-600 hover:-translate-y-0.5 hover:border-gray-300 hover:text-gray-900"
              }`}
            >
              {filter}
            </button>
          )
        })}
      </div>

      <div className="mt-5 space-y-4">
        {filteredSchemes.map((scheme) => (
          <article
            key={scheme.id}
            ref={(node) => {
              cardRefs.current[scheme.id] = node
            }}
            className={`scroll-mt-24 rounded-3xl border bg-white p-5 shadow-[0_12px_32px_rgba(15,23,42,0.06)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(15,23,42,0.08)] ${
              highlightedSchemeId === scheme.id ? "border-gray-900 ring-1 ring-gray-900/10" : "border-gray-200"
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="rounded-full bg-gray-100 px-3 py-1 text-[11px] font-semibold text-gray-600">
                  {scheme.category}
                </span>
                <h3 className="mt-3 text-base font-semibold leading-tight text-gray-900">{scheme.name}</h3>
              </div>
              <span className={`shrink-0 rounded-full px-3 py-1 text-[11px] font-semibold ${statusStyles[scheme.status]}`}>
                {scheme.status}
              </span>
            </div>

            <div className="mt-4 rounded-2xl bg-gray-50 px-4 py-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gray-400">Why Eligible</p>
              <div className="mt-3 space-y-2">
                {scheme.whyEligibleItems.map((item) => (
                  <div key={item.label} className="flex items-center gap-2 text-sm text-gray-700">
                    <span className={item.met ? "text-emerald-600" : "text-rose-500"}>{item.met ? "✔" : "❌"}</span>
                    <span>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <p className="mt-4 text-sm leading-6 text-gray-600">{scheme.insight}</p>

            <div className="mt-4 flex gap-3">
              <button className="flex-1 rounded-2xl bg-gray-900 px-4 py-3 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-gray-800">
                Apply Now
              </button>
              <button className="flex-1 rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-700 transition-all duration-200 hover:-translate-y-0.5 hover:border-gray-300 hover:bg-gray-50">
                View Requirements
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

function ProfileFact({ label, value }) {
  return (
    <div className="rounded-2xl bg-gray-50 px-4 py-3">
      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gray-400">{label}</p>
      <p className="mt-1 text-sm font-medium text-gray-800">{value}</p>
    </div>
  )
}
