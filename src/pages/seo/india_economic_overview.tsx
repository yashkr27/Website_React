import React from "react";
import Link from "next/link";
import { countries } from "@/lib/data";
import SEO from "@/components/SEO";
import { ArrowLeft, Landmark, BarChart3, Globe2 } from "lucide-react";
import { motion } from "framer-motion";

const country = countries.find((c) => c.id === "IND")!;

/**
 * IndiaEconomicOverview - Static SEO Landing Page
 * Optimized for keywords: "India Economic Overview", "India Economy Statistics"
 */
export default function IndiaEconomicOverview() {
    const title = "India Economic Overview | Detailed Statistics & Insights";
    const description = "Explore the complete economic profile of India. Includes insights into South Asian regional trends, capital city (New Delhi) data, and income level classification.";

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
        <div className="min-h-screen bg-white text-slate-900">
            {/* Dynamic SEO Props */}
            <SEO
                title={title}
                description={description}
                schemaData={schema}
                url="https://country-profiles.com/seo/india_economic_overview"
            />

            {/* Navigation */}
            <nav className="p-6">
                <Link href="/" className="inline-flex items-center gap-2 text-blue-600 font-bold hover:underline transition-all">
                    <ArrowLeft size={18} />
                    Back to Home
                </Link>
            </nav>

            <main className="max-w-4xl mx-auto px-6 py-12">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-16"
                >
                    <h1 className="text-4xl md:text-6xl font-black mb-6 bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-green-600">
                        India Economic Profile
                    </h1>
                    <p className="text-xl text-slate-500 max-w-2xl leading-relaxed italic">
                        &quot;A comprehensive deep-dive into the structural economic indicators of the world&apos;s largest democracy.&quot;
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
                    <div className="space-y-8">
                        <section className="flex items-start gap-4">
                            <div className="p-3 bg-orange-100 rounded-2xl text-orange-600">
                                <Landmark size={24} />
                            </div>
                            <div>
                                <h2 className="text-lg font-bold mb-1">Administrative Center</h2>
                                <p className="text-slate-600">{country.capital} (National Capital Territory)</p>
                            </div>
                        </section>

                        <section className="flex items-start gap-4">
                            <div className="p-3 bg-blue-100 rounded-2xl text-blue-600">
                                <Globe2 size={24} />
                            </div>
                            <div>
                                <h2 className="text-lg font-bold mb-1">Regional Classification</h2>
                                <p className="text-slate-600">{country.region}</p>
                            </div>
                        </section>

                        <section className="flex items-start gap-4">
                            <div className="p-3 bg-green-100 rounded-2xl text-green-600">
                                <BarChart3 size={24} />
                            </div>
                            <div>
                                <h2 className="text-lg font-bold mb-1">World Bank Income Tier</h2>
                                <p className="text-slate-600">{country.incomeLevel}</p>
                            </div>
                        </section>
                    </div>

                    <div className="bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden shadow-2xl">
                        <div className="relative z-10">
                            <h3 className="text-2xl font-bold mb-4">Quick Insights</h3>
                            <ul className="space-y-4 text-slate-300">
                                <li className="flex items-center gap-3">
                                    <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                                    Rapidly expanding technology sector
                                </li>
                                <li className="flex items-center gap-3">
                                    <span className="w-2 h-2 bg-white rounded-full"></span>
                                    Strategic South Asian focus
                                </li>
                                <li className="flex items-center gap-3">
                                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                                    Diversified manufacturing base
                                </li>
                            </ul>
                        </div>
                        <div className="absolute -bottom-10 -right-10 opacity-10">
                            <Globe2 size={200} />
                        </div>
                    </div>
                </div>

                {/* Machine-readable table for better SEO indexing of values */}
                <section className="bg-slate-50 border border-slate-200 rounded-3xl p-8">
                    <h2 className="text-2xl font-bold mb-6">Structural Data Summary</h2>
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-slate-300">
                                <th className="py-4 font-bold text-slate-400 uppercase text-xs">Category</th>
                                <th className="py-4 font-bold text-slate-400 uppercase text-xs text-right">Value</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b border-slate-100 italic">
                                <td className="py-4 font-medium">Official Capital</td>
                                <td className="py-4 text-right font-bold text-blue-600">{country.capital}</td>
                            </tr>
                            <tr className="border-b border-slate-100 italic">
                                <td className="py-4 font-medium">IMF/World Bank Region</td>
                                <td className="py-4 text-right font-bold text-blue-600">{country.region}</td>
                            </tr>
                            <tr className="italic">
                                <td className="py-4 font-medium">Income Level Status</td>
                                <td className="py-4 text-right font-bold text-blue-600">{country.incomeLevel}</td>
                            </tr>
                        </tbody>
                    </table>
                </section>
            </main>

            <footer className="bg-slate-50 border-t border-slate-200 py-12 px-6 mt-20 text-center">
                <p className="text-slate-400 text-sm">
                    &copy; {new Date().getFullYear()} Global Economic Insights. India SEO Landing Module.
                </p>
            </footer>
        </div>
    );
}
