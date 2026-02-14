import { GetServerSideProps } from "next";
import Link from "next/link";
import { fetchCountries, Country } from "@/lib/worldBank";

type HomeProps = {
  countries: Country[];
};

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  const countries = await fetchCountries();

  return {
    props: {
      countries,
    },
  };
};

export default function Home({ countries }: HomeProps) {
  return (
    <div className="min-h-screen bg-neutral-900 text-neutral-100">
      <main className="mx-auto max-w-5xl px-6 py-10">
        <h1 className="text-3xl font-bold mb-8">
          Country Economic Profiles
        </h1>

        {/* Featured SEO Pages */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4">
            Featured SEO Pages
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { code: "IND", name: "India" },
              { code: "USA", name: "United States" },
              { code: "ARG", name: "Argentina" },
            ].map((c) => (
              <Link
                key={c.code}
                href={`/country/${c.code}`}
                className="block rounded-lg border border-neutral-700 bg-neutral-800 p-4 hover:border-blue-500 transition"
              >
                <h3 className="text-lg font-semibold">
                  {c.name}
                </h3>
                <p className="text-sm text-neutral-400 mt-1">
                  Economic Overview
                </p>
              </Link>
            ))}
          </div>
        </section>

        {/* All Countries */}
        <section>
          <h2 className="text-xl font-semibold mb-4">
            All Countries
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {countries.map((country) => (
              <Link
                key={country.id}
                href={`/country/${country.id}`}
                className="rounded-md border border-neutral-800 bg-neutral-850 px-4 py-3 hover:bg-neutral-800 hover:border-neutral-600 transition"
              >
                <p className="font-medium">
                  {country.name}
                </p>
                <p className="text-sm text-neutral-400">
                  {country.region.value}
                </p>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
