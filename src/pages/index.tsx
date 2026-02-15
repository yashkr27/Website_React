import React, { useState, useMemo } from "react";
import Link from "next/link";
import { GetServerSideProps } from "next";
import { getAllCountries, Country } from "@/lib/data";
import SEO from "@/components/SEO";
import { Search, Globe, TrendingUp, Info, ArrowRight } from "lucide-react";
import { m, LazyMotion, domAnimation, AnimatePresence } from "framer-motion";

type HomeProps = {
  initialCountries: Country[];
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  const initialCountries = await getAllCountries();
  return {
    props: {
      initialCountries,
    },
  };
};

/**
 * HomePage Component
 * Displays a list of countries with filtering capabilities.
 * Optimized for Lighthouse Performance (Mobile > 75) and SEO.
 */
export default function Home({ initialCountries }: HomeProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCountries = useMemo(() => {
    const query = searchQuery.toLowerCase();
    const filtered = (initialCountries || []).filter((country: Country) =>
      country.name.toLowerCase().includes(query) ||
      country.region.toLowerCase().includes(query)
    );

    // Sort to prioritize Exact/Start matches in Name over matches in Region
    return filtered.sort((a, b) => {
      const aName = a.name.toLowerCase();
      const bName = b.name.toLowerCase();
      const aStarts = aName.startsWith(query) ? 1 : 0;
      const bStarts = bName.startsWith(query) ? 1 : 0;
      return bStarts - aStarts;
    });
  }, [searchQuery, initialCountries]);

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Global Economic Insights",
    "url": "https://country-profiles.com",
    "description": "Explore detailed economic profiles for countries worldwide.",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://country-profiles.com/?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <LazyMotion features={domAnimation}>
      <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-900">
        <SEO
          title="Explore Global Economic Profiles"
          description="Comprehensive economic data and capital statistics for countries worldwide. Updated monthly insights."
          schemaData={websiteSchema}
        />

        {/* Hero Section - Optimized with CSS pattern to reduce LCP */}
        <header className="relative py-16 md:py-24 px-6 bg-indigo-950 text-white overflow-hidden">
          <div className="absolute inset-0 opacity-5 pointer-events-none"
            style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '24px 24px' }}
            aria-hidden="true"
          />

          <div className="max-w-6xl mx-auto text-center relative z-10">
            <m.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 text-white drop-shadow-sm">
                Global Economic Insights
              </h1>
              <p className="text-lg md:text-xl text-blue-100/90 mb-10 max-w-2xl mx-auto leading-relaxed font-medium">
                Navigate through economic indicators and regional classifications for a data-driven worldview.
              </p>
            </m.div>

            {/* Search Bar - Optimized for Mobile TBT */}
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              className="max-w-xl mx-auto relative px-4"
            >
              <div className="relative group">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-400 transition-colors" size={20} />
                <input
                  type="text"
                  aria-label="Search countries"
                  placeholder="Search by country or region..."
                  className="w-full pl-14 pr-6 py-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl shadow-xl text-white placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/40 transition-all font-medium"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </m.div>
          </div>
        </header>

        <main className="max-w-6xl mx-auto py-12 md:py-20 px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                <Globe className="text-blue-600" size={28} aria-hidden="true" />
                Featured Profiles
              </h2>
              <p className="text-slate-500 font-medium">{filteredCountries.length} active country reports</p>
            </div>

            <div className="flex gap-3">
              <div className="px-4 py-2 bg-white rounded-xl shadow-sm border border-slate-200 flex items-center gap-2 text-sm font-bold text-slate-600">
                <TrendingUp size={16} className="text-green-500" />
                Growth Analytics
              </div>
              <div className="px-4 py-2 bg-white rounded-xl shadow-sm border border-slate-200 flex items-center gap-2 text-sm font-bold text-slate-600">
                <Info size={16} className="text-blue-500" />
                2024 Index
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            <AnimatePresence mode="popLayout">
              {filteredCountries.map((country: Country, index: number) => (
                <m.div
                  key={country.id}
                  layout
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link href={`/country/${country.id}`} className="group block h-full outline-none focus:ring-2 focus:ring-blue-500 rounded-3xl">
                    <article className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-200 transition-all h-full flex flex-col relative overflow-hidden active:scale-[0.98]">
                      {/* Performance Tip: Use CSS for visual flair instead of extra SVG nodes when possible */}
                      <div className="absolute -top-12 -right-12 w-24 h-24 bg-blue-50 rounded-full opacity-50 group-hover:scale-150 transition-transform duration-500" />

                      <header className="mb-6 relative z-10">
                        <span className="inline-block px-3 py-1 bg-blue-50 text-blue-700 text-[10px] font-extrabold uppercase tracking-widest rounded-full mb-3">
                          {country.region}
                        </span>
                        <h3 className="text-2xl font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                          {country.name}
                        </h3>
                      </header>

                      <div className="space-y-3 mb-8 relative z-10">
                        <div className="flex justify-between items-center text-sm border-b border-slate-50 pb-2">
                          <span className="text-slate-400 font-medium">Capital</span>
                          <span className="font-bold text-slate-700">{country.capital}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-slate-400 font-medium">Income Tier</span>
                          <span className={`font-bold ${country.incomeLevel.includes('High') ? 'text-green-600' : 'text-amber-600'}`}>
                            {country.incomeLevel}
                          </span>
                        </div>
                      </div>

                      <footer className="mt-auto pt-4 flex items-center text-blue-600 font-bold text-sm tracking-tight group-hover:gap-2 transition-all">
                        Deep Dive Profile
                        <ArrowRight size={18} className="ml-1 opacity-100 translate-x-0 transition-transform group-hover:translate-x-1" />
                      </footer>
                    </article>
                  </Link>
                </m.div>
              ))}
            </AnimatePresence>
          </div>

          {filteredCountries.length === 0 && (
            <m.div key="no-results" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-24 bg-white rounded-[2rem] border border-dashed border-slate-300">
              <Search className="mx-auto text-slate-200 mb-6" size={64} />
              <h3 className="text-2xl font-bold text-slate-800 mb-3">No profiles found</h3>
              <p className="text-slate-500 max-w-xs mx-auto mb-8 font-medium">Try searching for a different country or region.</p>
              <button
                onClick={() => setSearchQuery("")}
                className="px-8 py-3 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-all active:scale-95 shadow-lg shadow-blue-200"
              >
                Reset Filters
              </button>
            </m.div>
          )}
        </main>

        <footer className="bg-slate-950 text-slate-400 py-16 px-6 relative overflow-hidden">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12 relative z-10">
            <div className="max-w-xs">
              <h4 className="text-white font-black text-2xl mb-4 tracking-tighter italic">GEI<span className="text-blue-500">.</span></h4>
              <p className="text-sm leading-relaxed font-medium">
                Standardized economic classifications and capital city statistics for international strategic analysis.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-16">
              <div>
                <h5 className="text-white font-bold mb-6 text-sm uppercase tracking-widest">Reports</h5>
                <ul className="space-y-3 text-sm font-medium">
                  <li><a href="#" className="hover:text-blue-400 transition-colors">Methodology</a></li>
                  <li><a href="#" className="hover:text-blue-400 transition-colors">Data Integrity</a></li>
                  <li><a href="#" className="hover:text-blue-400 transition-colors">API Portal</a></li>
                </ul>
              </div>
              <div>
                <h5 className="text-white font-bold mb-6 text-sm uppercase tracking-widest">Connect</h5>
                <ul className="space-y-3 text-sm font-medium">
                  <li><a href="#" className="hover:text-blue-400 transition-colors">Newsletter</a></li>
                  <li><a href="#" className="hover:text-blue-400 transition-colors">Twitter</a></li>
                  <li><a href="#" className="hover:text-blue-400 transition-colors">Institutional</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="max-w-6xl mx-auto mt-20 pt-8 border-t border-white/5 text-[11px] font-bold uppercase tracking-widest text-center md:text-left">
            &copy; {new Date().getFullYear()} Global Economic Insights. Optimized for Speed & Accessibility.
          </div>
        </footer>
      </div>
    </LazyMotion>
  );
}
