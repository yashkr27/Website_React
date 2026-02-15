import React, { useState } from "react";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { countries, Country } from "@/lib/data";
import SEO from "@/components/SEO";
import { ArrowLeft, MapPin, Landmark, Wallet, ShieldCheck, ExternalLink, Share2 } from "lucide-react";
import { motion } from "framer-motion";

type CountryPageProps = {
    country: Country;
};

/**
 * CountryPage Component
 * Generic template for displaying detailed information about a country.
 * Uses Server-Side Rendering (SSR) for optimal SEO.
 */
export const getServerSideProps: GetServerSideProps<CountryPageProps> = async ({
    params,
}) => {
    const code = params?.code as string;
    const country = countries.find((c) => c.id === code);

    // Return 404 if country code is invalid
    if (!country) {
        return { notFound: true };
    }

    return {
        props: {
            country,
        },
    };
};

export default function CountryPage({ country }: CountryPageProps) {
    const [email, setEmail] = useState("");
    const [isSubscribed, setIsSubscribed] = useState(false);

    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault();
        if (email) {
            setIsSubscribed(true);
            setEmail("");
        }
    };

    const title = `${country.name} Economic Overview & Statistics`;
    const description = `Discover comprehensive economic data for ${country.name}. Explore regional insights, its capital ${country.capital}, and current income classification: ${country.incomeLevel}.`;

    // JSON-LD Schema for the Country
    const countrySchema = {
        "@context": "https://schema.org",
        "@type": "Country",
        "name": country.name,
        "alternateName": country.id,
        "identifier": country.id,
        "containedInPlace": {
            "@type": "Place",
            "name": country.region
        },
        "description": description,
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `https://country-profiles.com/country/${country.id}`
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
            {/* dynamic SEO metadata */}
            <SEO
                title={title}
                description={description}
                type="article"
                schemaData={countrySchema}
                url={`https://country-profiles.com/country/${country.id}`}
            />

            <nav className="bg-white border-b border-slate-200 sticky top-0 z-30 px-6 py-4 shadow-sm backdrop-blur-md bg-white/80">
                <div className="max-w-4xl mx-auto flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 text-slate-600 hover:text-blue-600 font-semibold transition-colors">
                        <ArrowLeft size={20} />
                        Back to Explorer
                    </Link>
                    <div className="flex gap-4">
                        <button className="p-2 text-slate-400 hover:text-blue-600 transition-colors">
                            <Share2 size={20} />
                        </button>
                        <button className="p-2 text-slate-400 hover:text-blue-600 transition-colors">
                            <ExternalLink size={20} />
                        </button>
                    </div>
                </div>
            </nav>

            <main className="max-w-4xl mx-auto py-12 px-6">
                {/* Hero Header */}
                <motion.header
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-12"
                >
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div>
                            <span className="inline-block px-4 py-1.5 bg-blue-600 text-white text-xs font-bold uppercase tracking-widest rounded-lg mb-4 shadow-lg shadow-blue-500/20">
                                {country.id} / {country.region}
                            </span>
                            <h1 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tight">
                                {country.name}
                            </h1>
                        </div>
                        <div className="hidden md:block">
                            <div className="px-6 py-3 bg-white border border-slate-200 rounded-2xl shadow-sm text-right">
                                <p className="text-xs text-slate-400 uppercase font-bold tracking-tighter mb-1">Status</p>
                                <div className="flex items-center gap-2 text-green-600 font-bold">
                                    <ShieldCheck size={16} />
                                    Verified Data
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.header>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                    {/* Stat Cards */}
                    {[
                        { icon: <MapPin className="text-blue-600" />, label: "Region", value: country.region, color: "bg-blue-50" },
                        { icon: <Landmark className="text-indigo-600" />, label: "Capital City", value: country.capital || "Not Listed", color: "bg-indigo-50" },
                        { icon: <Wallet className="text-amber-600" />, label: "Income Level", value: country.incomeLevel, color: "bg-amber-50" }
                    ].map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.1 * i }}
                            className={`p-6 rounded-3xl ${item.color} border border-white/50 shadow-sm`}
                        >
                            <div className="mb-4">{item.icon}</div>
                            <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">{item.label}</p>
                            <p className="text-xl font-extrabold text-slate-800">{item.value}</p>
                        </motion.div>
                    ))}
                </div>

                {/* detailed breakdown table section */}
                <motion.section
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xl mb-12"
                >
                    <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between">
                        <h2 className="text-xl font-bold text-slate-800">Key Economic Indicators</h2>
                        <span className="text-xs font-bold text-slate-400 uppercase">Year 2024 Source</span>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-slate-50 text-slate-500 text-xs font-bold uppercase">
                                <tr>
                                    <th className="px-8 py-4">Metric</th>
                                    <th className="px-8 py-4">Value</th>
                                    <th className="px-8 py-4">Benchmark</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 italic">
                                <tr>
                                    <td className="px-8 py-5 font-semibold text-slate-700 not-italic">Capital City</td>
                                    <td className="px-8 py-5 text-slate-600">{country.capital}</td>
                                    <td className="px-8 py-5 text-slate-400 text-sm">Administrative</td>
                                </tr>
                                <tr>
                                    <td className="px-8 py-5 font-semibold text-slate-700 not-italic">Global Region</td>
                                    <td className="px-8 py-5 text-slate-600">{country.region}</td>
                                    <td className="px-8 py-5 text-slate-400 text-sm">World Bank</td>
                                </tr>
                                <tr>
                                    <td className="px-8 py-5 font-semibold text-slate-700 not-italic">Economic Tier</td>
                                    <td className="px-8 py-5 text-slate-600">{country.incomeLevel}</td>
                                    <td className="px-8 py-5 text-slate-400 text-sm">GDP Threshold</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="p-6 bg-slate-50 border-t border-slate-100">
                        <div className="flex items-start gap-4 p-4 bg-white rounded-2xl border border-slate-200">
                            <Info className="text-blue-500 shrink-0" size={20} />
                            <p className="text-sm text-slate-600 leading-relaxed italic">
                                * Data provided is based on standardized classifications. Actual localized economic conditions may vary based on exchange rates and demographic shifts.
                            </p>
                        </div>
                    </div>
                </motion.section>

                {/* Newsletter / CTA Section */}
                <section className="bg-indigo-900 rounded-3xl p-8 text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
                    {isSubscribed ? (
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="w-full text-center py-4"
                        >
                            <h3 className="text-2xl font-bold mb-2">Welcome Aboard! 🚀</h3>
                            <p className="text-indigo-200">You&apos;ve successfully subscribed to our economic deep dives.</p>
                        </motion.div>
                    ) : (
                        <>
                            <div>
                                <h3 className="text-2xl font-bold mb-2">Want more deep dives?</h3>
                                <p className="text-indigo-200">Get weekly economic analysis and regional reports delivered to your inbox.</p>
                            </div>
                            <form onSubmit={handleSubscribe} className="flex gap-2 w-full md:w-auto">
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Email address"
                                    className="px-6 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full"
                                />
                                <button type="submit" className="px-6 py-3 bg-white text-indigo-900 font-bold rounded-xl hover:bg-blue-50 transition-colors shrink-0">
                                    Join
                                </button>
                            </form>
                        </>
                    )}
                </section>
            </main>

            <footer className="max-w-4xl mx-auto py-12 px-6 border-t border-slate-200 text-center">
                <p className="text-sm text-slate-400">
                    &copy; {new Date().getFullYear()} Global Economic Insights. Optimized for search and accessibility.
                </p>
            </footer>
        </div>
    );
}

const Info = ({ className, size }: { className?: string, size?: number }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size || 24}
        height={size || 24}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <circle cx="12" cy="12" r="10" /><path d="M12 16v-4" /><path d="M12 8h.01" />
    </svg>
);
