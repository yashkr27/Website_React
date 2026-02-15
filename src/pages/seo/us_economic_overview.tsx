import React from "react";
import Link from "next/link";
import { countries } from "@/lib/data";
import SEO from "@/components/SEO";
import { ArrowLeft, Landmark, MapPin, DollarSign, Flag } from "lucide-react";
import { motion } from "framer-motion";

const country = countries.find((c) => c.id === "USA")!;

/**
 * USEconomicOverview - Static SEO Landing Page
 * Optimized for keywords: "United States Economic Overview", "USA Economy Analysis"
 */
export default function USEconomicOverview() {
    const title = "United States Economic Overview | High Income Analytics";
    const description = "Analyze the economic strength of the United States. Detailed reports on North American market position, Washington D.C. capital insights, and high-income classification.";

    const schema = {
        "@context": "https://schema.org",
        "@type": "Country",
        "name": country.name,
        "identifier": country.id,
        "description": description,
        "publicAccess": true,
        "location": {
            "@type": "Place",
            "name": country.region
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900">
            {/* Dynamic SEO Props */}
            <SEO
                title={title}
                description={description}
                schemaData={schema}
                url="https://country-profiles.com/seo/US_economic_overview"
            />

            {/* Navigation */}
            <nav className="p-6 bg-white border-b border-slate-200">
                <div className="max-w-4xl mx-auto flex justify-between items-center">
                    <Link href="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 font-semibold transition-all">
                        <ArrowLeft size={18} />
                        Back to List
                    </Link>
                    <div className="flex items-center gap-2">
                        <Flag className="text-blue-700" size={20} />
                        <span className="font-bold text-slate-700">USA REPORT</span>
                    </div>
                </div>
            </nav>

            <main className="max-w-4xl mx-auto px-6 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="lg:col-span-12"
                    >
                        <h1 className="text-5xl md:text-7xl font-black mb-8 text-slate-900 tracking-tight">
                            United States <span className="text-blue-700">Economy</span>
                        </h1>
                        <p className="text-2xl text-slate-500 leading-relaxed max-w-3xl">
                            Key structural figures and regional classifications for the world&apos;s leading high-income economy.
                        </p>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 italic">
                    <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
                        <Landmark className="text-blue-600 mb-4" size={32} />
                        <h3 className="font-bold text-slate-400 uppercase text-xs tracking-widest mb-2">Capital</h3>
                        <p className="text-2xl font-black text-slate-800">{country.capital}</p>
                    </div>
                    <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
                        <MapPin className="text-red-500 mb-4" size={32} />
                        <h3 className="font-bold text-slate-400 uppercase text-xs tracking-widest mb-2">Region</h3>
                        <p className="text-2xl font-black text-slate-800">{country.region}</p>
                    </div>
                    <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
                        <DollarSign className="text-green-600 mb-4" size={32} />
                        <h3 className="font-bold text-slate-400 uppercase text-xs tracking-widest mb-2">Income</h3>
                        <p className="text-2xl font-black text-slate-800">{country.incomeLevel}</p>
                    </div>
                </div>

                <motion.section
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="bg-indigo-900 rounded-[2.5rem] p-12 text-white shadow-2xl overflow-hidden relative"
                >
                    <div className="relative z-10 max-w-2xl">
                        <h2 className="text-3xl font-bold mb-6">Strategic Economic Position</h2>
                        <p className="text-indigo-100 text-lg mb-8 leading-relaxed">
                            The United States maintains a dominant role in North American trade and global finance.
                            As a high-income nation, its economic performance serves as a primary benchmark for international markets.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <span className="px-4 py-2 bg-white/10 rounded-full text-sm font-semibold border border-white/20">Market Leader</span>
                            <span className="px-4 py-2 bg-white/10 rounded-full text-sm font-semibold border border-white/20">Innovation Hub</span>
                            <span className="px-4 py-2 bg-white/10 rounded-full text-sm font-semibold border border-white/20">Trade Focus</span>
                        </div>
                    </div>
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
                </motion.section>
            </main>

            <footer className="max-w-4xl mx-auto py-12 px-6 text-center text-slate-400 text-sm">
                &copy; {new Date().getFullYear()} Global Economic Insights. USA SEO Vertical.
            </footer>
        </div>
    );
}
