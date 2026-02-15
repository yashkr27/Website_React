import { GetServerSideProps } from "next";
import Head from "next/head";
import Link from "next/link";
import { countries, Country } from "@/lib/data";

type CountryPageProps = {
    country: Country;
};

export const getServerSideProps: GetServerSideProps<CountryPageProps> = async ({
    params,
}) => {
    const code = params?.code as string;
    const country = countries.find((c) => c.id === code);

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
    const description = `${country.name} economic overview including capital city, region, and income classification.`;

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

            <div className="min-h-screen bg-neutral-900 text-neutral-100">
                <main className="mx-auto max-w-2xl px-6 py-10">
                    <Link href="/" className="text-sm text-blue-400 hover:underline">
                        ← Back to country list
                    </Link>

                    <h1 className="text-3xl font-bold mt-4 mb-6">
                        {country.name}
                    </h1>

                    <div className="space-y-3 text-lg">
                        <p>
                            <span className="font-semibold">Region:</span> {country.region}
                        </p>
                        <p>
                            <span className="font-semibold">Capital:</span>{" "}
                            {country.capital || "N/A"}
                        </p>
                        <p>
                            <span className="font-semibold">Income Level:</span>{" "}
                            {country.incomeLevel}
                        </p>
                    </div>
                </main>
            </div>
        </>
    );
}
