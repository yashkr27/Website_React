import Head from "next/head";
import Link from "next/link";
import { countries } from "@/lib/data";

const country = countries.find((c) => c.id === "IND")!;

export default function IndiaEconomicOverview() {
    const title = "India Economic Overview";
    const description =
        "India economic overview including capital city, region, and income classification.";

    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name="description" content={description} />
                <meta property="og:title" content={title} />
                <meta property="og:description" content={description} />
                <meta property="og:type" content="website" />
            </Head>

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

            <main style={{ padding: "40px", fontFamily: "sans-serif" }}>
                <Link href="/" style={{ fontSize: "14px" }}>
                    ← Back to home
                </Link>

                <h1 style={{ marginTop: "16px" }}>India Economic Overview</h1>

                <ul style={{ marginTop: "16px" }}>
                    <li><strong>Region:</strong> {country.region}</li>
                    <li><strong>Capital:</strong> {country.capital}</li>
                    <li><strong>Income Level:</strong> {country.incomeLevel}</li>
                </ul>
            </main>
        </>
    );
}
