import { useMemo, useState } from "react";
import SchemeCard from "../components/SchemeCard";
import AccessibilityControls from "../components/AccessibilityControls";
import { exploreCategories, schemes } from "../data/mockData";

export default function ExplorePage({ language = "en-IN", onCheckEligibility, onVoiceCommand }) {
  const [activeCategory, setActiveCategory] = useState(exploreCategories[0]);

  const filteredSchemes = useMemo(() => {
    return schemes.filter((scheme) => scheme.category === activeCategory);
  }, [activeCategory]);

  const visibleSchemeCount = filteredSchemes.length;
  const schemeCountText = `${visibleSchemeCount} ${visibleSchemeCount === 1 ? "scheme" : "schemes"}`;
  const autoReadText = [
    "Selected Explore tab.",
    "Explore page.",
    "Browse scheme categories and choose Check Eligibility on a scheme.",
    `Selected category: ${activeCategory}.`,
    `${schemeCountText} visible.`,
    "Use Read Page for scheme details.",
  ].join(" ");
  const pageText = [
    "Explore page. Find schemes by need.",
    `Current category: ${activeCategory}.`,
    `Visible scheme count: ${visibleSchemeCount}.`,
    ...filteredSchemes.map(
      (scheme, index) =>
        `Scheme ${index + 1}: ${scheme.name}. Category: ${scheme.category}. Description: ${scheme.description}. Eligibility summary: ${scheme.eligibilitySummary}. Action available: Check Eligibility.`,
    ),
  ].join(" ");

  return (
    <section className="px-4 pb-48 pt-4">
      <div className="rounded-[28px] border border-gray-200 bg-white p-5 shadow-[0_16px_40px_rgba(15,23,42,0.06)]">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">Explore</p>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight text-gray-900">Find schemes by need</h2>
        <p className="mt-2 text-sm leading-6 text-gray-600">
          Browse support programs across core categories and open the schemes most relevant to your current situation.
        </p>
      </div>

      <div className="scrollbar-hide mt-5 flex gap-2 overflow-x-auto pb-1">
        {exploreCategories.map((category) => {
          const isActive = activeCategory === category;
          return (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              aria-label={`Show ${category} schemes`}
              className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition ${
                isActive
                  ? "bg-gray-900 text-white shadow-sm"
                  : "border border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:text-gray-900"
              }`}
            >
              {category}
            </button>
          );
        })}
      </div>

      <div className="mt-5 space-y-4">
        {filteredSchemes.map((scheme) => (
          <div key={scheme.id}>
            <SchemeCard scheme={scheme} />
            <div className="-mt-3 px-5 pb-1">
              <button
                type="button"
                onClick={() => scheme.relatedEligibleId && onCheckEligibility(scheme.relatedEligibleId)}
                aria-label={`Check eligibility for ${scheme.name}`}
                className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-semibold text-gray-800 transition-all duration-200 hover:-translate-y-0.5 hover:border-gray-300 hover:bg-white"
              >
                Check Eligibility
              </button>
            </div>
          </div>
        ))}
      </div>

      <AccessibilityControls
        autoReadText={autoReadText}
        language={language}
        onVoiceCommand={onVoiceCommand}
        pageText={pageText}
      />
    </section>
  );
}
