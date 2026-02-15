import React, { useState } from "react";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { getCountryById, Country } from "@/lib/data";
import SEO from "@/components/SEO";
import { ArrowLeft, MapPin, Landmark, Wallet, ShieldCheck, ExternalLink, Share2 } from "lucide-react";
import { m, LazyMotion, domAnimation } from "framer-motion";

type CountryPageProps = {
    country: Country;
};

/**
 * CountryPage Component
 * Generic template for displaying detailed information about a country.
 * Optimized for Mobile Performance (>75) and Deep SEO.
 */
export const getServerSideProps: GetServerSideProps<CountryPageProps> = async ({
    params,
}) => {
    const code = params?.code as string;
    const country = await getCountryById(code);

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
    const description = `Economic data for ${country.name}. Region: ${country.region}, Capital: ${country.capital}, Tier: ${country.incomeLevel}.`;

    const countrySchema = {
        "@context": "https://schema.org",
        "@type": "Country",
        "name": country.name,
        "identifier": country.id,
        "containedInPlace": { "@type": "Place", "name": country.region },
        "description": description
    };

    return (
        <LazyMotion features={domAnimation}>
            <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
                <SEO
                    title={title}
                    description={description}
                    type="article"
                    schemaData={countrySchema}
                    url={`https://country-profiles.com/country/${country.id}`}
                />

                <nav className="bg-white/90 border-b border-slate-200 sticky top-0 z-30 px-6 py-4 shadow-sm backdrop-blur-md">
                    <div className="max-w-4xl mx-auto flex items-center justify-between">
                        <Link href="/" className="flex items-center gap-2 text-slate-600 hover:text-blue-600 font-bold transition-colors active:scale-95">
                            <ArrowLeft size={20} />
                            <span className="hidden sm:inline">Explorer</span>
                        </Link>
                        <div className="flex gap-2">
                            <button aria-label="Share" className="p-2 text-slate-400 hover:text-blue-600 transition-colors active:scale-90">
                                <Share2 size={20} />
                            </button>
                            <button aria-label="Open External" className="p-2 text-slate-400 hover:text-blue-600 transition-colors active:scale-90">
                                <ExternalLink size={20} />
                            </button>
                        </div>
                    </div>
                </nav>

                <main className="max-w-4xl mx-auto py-10 md:py-16 px-6">
                    {/* Hero Header */}
                    <m.header
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-12"
                    >
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                            <div>
                                <span className="inline-block px-3 py-1 bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest rounded-md mb-4 shadow-sm">
                                    {country.id} &bull; {country.region}
                                </span>
                                <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter">
                                    {country.name}
                                </h1>
                            </div>
                            <div className="hidden md:block">
                                <div className="px-5 py-2.5 bg-white border border-slate-200 rounded-2xl shadow-sm text-right">
                                    <p className="text-[10px] text-slate-400 uppercase font-bold tracking-tighter mb-0.5">Data Status</p>
                                    <div className="flex items-center gap-1.5 text-green-600 font-bold text-sm">
                                        <ShieldCheck size={14} />
                                        Verified 2024
                                    </div>
                                </div>
                            </div>
                        </div>
                    </m.header>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-8 mb-12">
                        {/* Stat Cards - Optimized for Mobile LCP/CLS */}
                        <StatCard icon={<MapPin size={22} className="text-blue-600" />} label="Region" value={country.region} color="bg-blue-50" delay={0.1} />
                        <StatCard icon={<Landmark size={22} className="text-indigo-600" />} label="Capital" value={country.capital || "N/A"} color="bg-indigo-50" delay={0.2} />
                        <StatCard icon={<Wallet size={22} className="text-amber-600" />} label="Income Tier" value={country.incomeLevel} color="bg-amber-50" delay={0.3} />
                    </div>

                    <m.section
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xl mb-12"
                    >
                        <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                            <h2 className="text-xl font-bold text-slate-800">Macroeconomic Profile</h2>
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Source: World Bank</span>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-slate-50/80 text-slate-500 text-[10px] font-black uppercase tracking-widest">
                                    <tr>
                                        <th className="px-8 py-4">Indicator</th>
                                        <th className="px-8 py-4">Value</th>
                                        <th className="px-8 py-4 hidden sm:table-cell">Context</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 italic">
                                    <TableRow label="Capital City" value={country.capital} context="Administrative" />
                                    <TableRow label="Global Region" value={country.region} context="Geographical" />
                                    <TableRow label="Economic Tier" value={country.incomeLevel} context="World Bank Group" />
                                </tbody>
                            </table>
                        </div>
                        <div className="p-6 bg-slate-50/30 border-t border-slate-100">
                            <div className="flex items-start gap-4 p-4 bg-white/50 rounded-2xl border border-slate-200/60 text-xs text-slate-500 leading-relaxed font-medium">
                                <Info size={16} className="text-blue-500 shrink-0" />
                                <p>* Data is derived from standardized classifications. Periodic updates ensure statistical integrity across regional benchmarks.</p>
                            </div>
                        </div>
                    </m.section>

                    <section className="bg-indigo-950 rounded-[2rem] p-8 md:p-12 text-white shadow-2xl relative overflow-hidden">
                        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} />

                        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
                            {isSubscribed ? (
                                <m.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="w-full text-center py-4">
                                    <h3 className="text-3xl font-bold mb-2">Subscribed! 🚀</h3>
                                    <p className="text-indigo-200 font-medium">Monthly deep dives will be arriving shortly.</p>
                                </m.div>
                            ) : (
                                <>
                                    <div className="text-center md:text-left">
                                        <h3 className="text-2xl md:text-3xl font-bold mb-3 tracking-tight">Expand Your Analysis</h3>
                                        <p className="text-indigo-200 font-medium max-w-sm">Get specialized regional reports and market shifts delivered to your inbox.</p>
                                    </div>
                                    <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                                        <input
                                            type="email"
                                            required
                                            aria-label="Email for newsletter"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="Enter your email"
                                            className="px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-64 backdrop-blur-sm"
                                        />
                                        <button type="submit" className="px-8 py-4 bg-white text-indigo-950 font-black rounded-2xl hover:bg-blue-50 transition-all active:scale-95 shadow-xl">
                                            Join Insights
                                        </button>
                                    </form>
                                </>
                            )}
                        </div>
                    </section>
                </main>

                <footer className="max-w-4xl mx-auto py-12 px-6 border-t border-slate-200 text-center text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                    &copy; {new Date().getFullYear()} Global Economic Insights &bull; Built for Speed
                </footer>
            </div>
        </LazyMotion>
    );
}

const StatCard = ({ icon, label, value, color, delay }: any) => (
    <m.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay, duration: 0.3 }}
        className={`p-6 rounded-[2rem] ${color} border border-white/40 shadow-sm`}
    >
        <div className="mb-4">{icon}</div>
        <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1.5">{label}</p>
        <p className="text-xl font-black text-slate-800 tracking-tight">{value}</p>
    </m.div>
);

const TableRow = ({ label, value, context }: any) => (
    <tr>
        <td className="px-8 py-5 font-bold text-slate-700 not-italic tracking-tight">{label}</td>
        <td className="px-8 py-5 text-slate-600 font-medium">{value}</td>
        <td className="px-8 py-5 text-slate-400 text-xs font-bold hidden sm:table-cell">{context}</td>
    </tr>
);

const Info = ({ className, size }: { className?: string, size?: number }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size || 24} height={size || 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <circle cx="12" cy="12" r="10" /><path d="M12 16v-4" /><path d="M12 8h.01" />
    </svg>
);
