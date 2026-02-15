/**
 * Reference implementation for fetching country data
 * from the World Bank Open Data API.
 *
 * This file is not used at runtime.
 * A small subset of this data is stored locally in data.ts
 * to keep the project simple and focused on SEO.
 */

export type Country = {
    id: string;
    name: string;
    capitalCity: string;
    region: { value: string };
    incomeLevel: { value: string };
};

const BASE_URL = "https://api.worldbank.org/v2/country";

export async function fetchCountries(): Promise<Country[]> {
    const res = await fetch(`${BASE_URL}?format=json&per_page=300`);
    const data = await res.json();
    return data[1];
}

export async function fetchCountryByCode(
    code: string
): Promise<Country | null> {
    const res = await fetch(`${BASE_URL}/${code}?format=json`);
    const data = await res.json();
    return data[1]?.[0] ?? null;
}
