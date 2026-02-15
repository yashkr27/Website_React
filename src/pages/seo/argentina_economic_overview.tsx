import React, { useState } from "react";
import Link from "next/link";
import { countries } from "@/lib/data";
import SEO from "@/components/SEO";
import { ArrowLeft, TrendingUp, Info } from "lucide-react";
import { motion } from "framer-motion";

const country = countries.find((c) => c.id === "ARG")!;

/**
 * ArgentinaEconomicOverview - Static SEO Landing Page
 * Optimized for keywords: "Argentina Economic Overview", "Latin America Economy"
 */
export default function ArgentinaEconomicOverview() {
    const [downloading, setDownloading] = useState(false);
    const [downloaded, setDownloaded] = useState(false);

    const handleDownload = () => {
        setDownloading(true);
        setTimeout(() => {
            setDownloading(false);
            setDownloaded(true);
        }, 1500);
    };

    const title = "Argentina Economic Overview | Latin America Market Insights";
    const description = "Explore Argentina's economic landscape. Insights into Latin America & Caribbean regional dynamics, Buenos Aires statistics, and upper-middle income status analysis.";

    const schema = {
        "@context": "https://schema.org",
        "@type": "Country",
        "name": country.name,
        "identifier": country.id,
        "description": description,
        "location": {
            "@type": "Place",
            "name": country.region
        }
    };

    return (
        <div className="min-h-screen bg-[#fafafa] text-slate-900">
            {/* Dynamic SEO Tags */}
            <SEO
                title={title}
                description={description}
                schemaData={schema}
                url="https://country-profiles.com/seo/argentina_economic_overview"
            />

            <nav className="p-8 flex justify-between items-center">
                <Link href="/" className="group flex items-center gap-2 text-blue-600 font-bold hover:gap-3 transition-all">
                    <ArrowLeft size={20} />
                    Back
                </Link>
                <div className="text-xs font-black tracking-widest text-slate-300 uppercase">
                    Economic Profiles &copy; 2026
                </div>
            </nav>

            <main className="max-w-5xl mx-auto px-8 py-12">
                <motion.header
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-20"
                >
                    <h1 className="text-6xl md:text-8xl font-black mb-10 text-slate-900 tracking-tighter">
                        Argentina <span className="block text-blue-500">Overview</span>
                    </h1>
                    <div className="h-1 w-24 bg-blue-500 mb-10"></div>
                </motion.header>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start italic">
                    <div className="space-y-12">
                        <section>
                            <h2 className="text-xs font-bold text-blue-500 uppercase tracking-widest mb-4">Regional Hub</h2>
                            <p className="text-3xl font-bold text-slate-800 mb-2">{country.region}</p>
                            <p className="text-slate-500 leading-relaxed">
                                Positioned as a key player in the Southern Cone, Argentina influences trade patterns across Latin America.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xs font-bold text-blue-500 uppercase tracking-widest mb-4">Capital Insight</h2>
                            <p className="text-3xl font-bold text-slate-800 mb-2">{country.capital}</p>
                            <p className="text-slate-500 leading-relaxed">
                                The political and economic heart of the nation, serving as a gateway for international investments.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xs font-bold text-blue-500 uppercase tracking-widest mb-4">Economic Category</h2>
                            <p className="text-3xl font-bold text-slate-800 mb-2">{country.incomeLevel}</p>
                            <p className="text-slate-500 leading-relaxed">
                                Classified as an Upper Middle Income nation, reflecting its diverse industrial and agricultural base.
                            </p>
                        </section>
                    </div>

                    <div className="sticky top-24">
                        <div className="bg-white p-10 rounded-3xl shadow-xl border border-slate-100 italic">
                            <TrendingUp className="text-blue-500 mb-6" size={40} />
                            <h3 className="text-2xl font-bold mb-6">Market Potential</h3>
                            <div className="space-y-6">
                                <div className="p-4 bg-slate-50 rounded-xl flex items-start gap-4">
                                    <Info className="text-slate-400 shrink-0 mt-1" size={18} />
                                    <p className="text-sm text-slate-600">Rich natural resources and a highly educated workforce drive emerging sectors.</p>
                                </div>
                                <div className="p-4 bg-slate-50 rounded-xl flex items-start gap-4">
                                    <Info className="text-slate-400 shrink-0 mt-1" size={18} />
                                    <p className="text-sm text-slate-600">Strategic member of Mercosur, facilitating regional economic integration.</p>
                                </div>
                            </div>
                            <button
                                onClick={handleDownload}
                                disabled={downloading || downloaded}
                                className={`w-full mt-10 py-4 ${downloaded ? 'bg-green-600' : 'bg-blue-600 hover:bg-blue-700'
                                    } text-white font-bold rounded-2xl transition-all shadow-lg shadow-blue-200 disabled:opacity-70`}
                            >
                                {downloading ? 'Preparing Report...' : downloaded ? 'Report Downloaded ✓' : 'Download Full Report'}
                            </button>
                        </div>
                    </div>
                </div>
            </main>

            <footer className="mt-32 py-16 px-8 bg-slate-900 text-white italic">
                <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="text-2xl font-black tracking-tighter">GEI<span className="text-blue-500">.</span></div>
                    <div className="text-slate-500 text-sm italic">
                        &copy; 2026 Global Economic Insights. Argentina SEO Landing Module.
                    </div>
                </div>
            </footer>
        </div>
    );
}
