import React, { useState, useMemo } from "react";
import Link from "next/link";
import { countries } from "@/lib/data";
import SEO from "@/components/SEO";
import { Search, Globe, TrendingUp, Info, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * HomePage Component
 * Displays a list of countries with filtering capabilities.
 * Built with SEO-best practices and responsive design in mind.
 */
export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter countries based on search query
  const filteredCountries = useMemo(() => {
    return countries.filter((country) =>
      country.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      country.region.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  // JSON-LD Schema for the Website
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Global Economic Insights",
    "url": "https://country-profiles.com",
    "description": "Explore detailed economic profiles, statistics, and trends for countries worldwide.",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://country-profiles.com/?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* SEO Component for Dynamic Metadata */}
      <SEO
        title="Explore Global Economic Profiles"
        description="Comprehensive economic data, capital cities, and income levels for countries across the globe. Analyze trends and insights effortlessly."
        schemaData={websiteSchema}
      />

      {/* Hero Section */}
      <header className="relative py-20 px-6 bg-gradient-to-br from-indigo-900 via-blue-900 to-slate-900 text-white overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5" />
            </pattern>
            <rect width="100" height="100" fill="url(#grid)" />
          </svg>
        </div>

        <div className="max-w-6xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-indigo-100">
              Global Economic Insights
            </h1>
            <p className="text-lg md:text-xl text-blue-100 mb-10 max-w-2xl mx-auto leading-relaxed">
              Navigate through real-time economic indicators, regional classifications,
              and capital statistics for a data-driven worldview.
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="max-w-xl mx-auto relative px-4"
          >
            <div className="relative group">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={20} />
              <input
                type="text"
                placeholder="Search by country or region..."
                className="w-full pl-14 pr-6 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl text-white placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </motion.div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-6xl mx-auto py-16 px-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
          <div>
            <h2 className="text-3xl font-bold text-slate-800 mb-2 flex items-center gap-2">
              <Globe className="text-blue-600" size={28} />
              Featured Countries
            </h2>
            <p className="text-slate-500">Showing {filteredCountries.length} active country profiles</p>
          </div>

          <div className="flex gap-4">
            {/* Simple stats badges */}
            <div className="px-4 py-2 bg-white rounded-xl shadow-sm border border-slate-200 flex items-center gap-2">
              <TrendingUp size={16} className="text-green-500" />
              <span className="text-sm font-semibold text-slate-600">Growth Analysis</span>
            </div>
            <div className="px-4 py-2 bg-white rounded-xl shadow-sm border border-slate-200 flex items-center gap-2">
              <Info size={16} className="text-blue-500" />
              <span className="text-sm font-semibold text-slate-600">Updated Monthly</span>
            </div>
          </div>
        </div>

        {/* Country Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredCountries.map((country, index) => (
              <motion.div
                key={country.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Link href={`/country/${country.id}`} className="group block h-full">
                  <article className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-blue-200 transition-all h-full flex flex-col relative overflow-hidden">
                    {/* Visual embellishment */}
                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                      <Globe size={120} />
                    </div>

                    <header className="mb-6">
                      <span className="inline-block px-3 py-1 bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-wider rounded-full mb-3">
                        {country.region}
                      </span>
                      <h3 className="text-2xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                        {country.name}
                      </h3>
                    </header>

                    <div className="space-y-3 mb-8">
                      <div className="flex justify-between items-center text-sm border-b border-slate-50 pb-2">
                        <span className="text-slate-400">Capital</span>
                        <span className="font-semibold text-slate-700">{country.capital}</span>
                      </div>
                      <div className="flex justify-between items-center text-sm border-b border-slate-50 pb-2">
                        <span className="text-slate-400">Income Level</span>
                        <span className={`font-semibold ${country.incomeLevel.includes('High') ? 'text-green-600' : 'text-amber-600'
                          }`}>
                          {country.incomeLevel}
                        </span>
                      </div>
                    </div>

                    <footer className="mt-auto pt-4 flex items-center text-blue-600 font-bold group-hover:gap-2 transition-all">
                      View Profile
                      <ArrowRight size={18} className="ml-1 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                    </footer>
                  </article>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* No results state */}
        {filteredCountries.length === 0 && (
          <div className="text-center py-20 px-10 bg-white rounded-3xl border border-dashed border-slate-300">
            <Search className="mx-auto text-slate-300 mb-4" size={48} />
            <h3 className="text-xl font-bold text-slate-800 mb-2">No countries found</h3>
            <p className="text-slate-500">Try adjusting your search query or looking for a different region.</p>
            <button
              onClick={() => setSearchQuery("")}
              className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-full font-bold hover:bg-blue-700 transition-colors"
            >
              Clear Search
            </button>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 px-6 mt-20">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
          <div>
            <h4 className="text-white font-bold text-xl mb-2">Global Economic Insights</h4>
            <p className="max-w-xs">Connecting data with strategy for a better understanding of world economies.</p>
          </div>
          <div className="flex gap-12">
            <div>
              <h5 className="text-white font-semibold mb-4">Resources</h5>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-blue-400 transition-colors">API Docs</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Data Sources</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Methodology</a></li>
              </ul>
            </div>
            <div>
              <h5 className="text-white font-semibold mb-4">Company</h5>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-blue-400 transition-colors">About</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Terms</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-12 pt-8 border-t border-slate-800 text-xs text-center">
          &copy; {new Date().getFullYear()} Global Economic Insights. All rights reserved. Built for SEO and performance.
        </div>
      </footer>
    </div>
  );
}
