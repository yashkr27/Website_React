import { GetServerSideProps } from "next";
import Head from "next/head";
import Link from "next/link";
import { fetchCountryByCode, Country } from "@/lib/worldBank";

type CountryPageProps = {
    country: Country;
};

export const getServerSideProps: GetServerSideProps<
    CountryPageProps
> = async ({ params }) => {
    const code = params?.code as string;
    const country = await fetchCountryByCode(code);

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
    const title = `${country.name} Economic Overview`;
    const description = `${country.name} economic overview including capital city, region, and income classification based on World Bank data.`;

    return (
        <>
            {/* SEO */}
            <Head>
                <title>{title}</title>
                <meta name="description" content={description} />
                <meta property="og:title" content={title} />
                <meta property="og:description" content={description} />
                <meta property="og:type" content="website" />
            </Head>

            {/* JSON-LD */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Country",
                        name: country.name,
                        identifier: country.id,
                    }),
                }}
            />

            {/* UI */}
            <div className="min-h-screen bg-neutral-900 text-neutral-100">
                <main className="mx-auto max-w-2xl px-6 py-10">
                    <Link
                        href="/"
                        className="text-sm text-blue-400 hover:underline"
                    >
                        ← Back to country list
                    </Link>

                    <div className="mt-6 rounded-xl border border-neutral-700 bg-neutral-800 p-6">
                        <h1 className="text-3xl font-bold mb-4">
                            {country.name}
                        </h1>

                        <div className="divide-y divide-neutral-700">
                            <div className="py-3 flex justify-between">
                                <span className="text-neutral-400">Region</span>
                                <span>{country.region.value}</span>
                            </div>

                            <div className="py-3 flex justify-between">
                                <span className="text-neutral-400">Capital</span>
                                <span>{country.capitalCity || "N/A"}</span>
                            </div>

                            <div className="py-3 flex justify-between">
                                <span className="text-neutral-400">Income Level</span>
                                <span>{country.incomeLevel.value}</span>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}
