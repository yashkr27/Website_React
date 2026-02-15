import Link from "next/link";
import { countries, Country } from "@/lib/data";

type HomeProps = {
  countries: Country[];
};

export default function Home() {
  return (
    <main style={{ padding: "40px", fontFamily: "sans-serif" }}>
      <h1>Country Economic Profiles</h1>

      <h2 style={{ marginTop: "24px" }}>Featured SEO Pages</h2>
      <ul>
        <li>
          <Link href="/country/IND">India Economic Overview</Link>
        </li>
        <li>
          <Link href="/country/USA">United States Economic Overview</Link>
        </li>
        <li>
          <Link href="/country/ARG">Argentina Economic Overview</Link>
        </li>
      </ul>

      <ul style={{ marginTop: "20px" }}>
        {countries.map((country) => (
          <li key={country.id} style={{ marginBottom: "8px" }}>
            <Link href={`/country/${country.id}`}>
              {country.name} ({country.region})
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
