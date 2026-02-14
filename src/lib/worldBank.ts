export type Country = {
    id: string;
    name: string;
    region: { value: string };
    capitalCity: string;
    incomeLevel: { value: string };
};

export async function fetchCountries(): Promise<Country[]> {
    const res = await fetch(
        "https://api.worldbank.org/v2/country?format=json&per_page=50"
    );

    if (!res.ok) {
        throw new Error("Failed to fetch countries");
    }

    const data = await res.json();

    // Remove aggregate regions
    return data[1].filter((c: any) => c.region?.id !== "NA");
}


export async function fetchCountryByCode(code: string): Promise<Country | null> {
    const res = await fetch(
        `https://api.worldbank.org/v2/country/${code}?format=json`
    );

    if (!res.ok) return null;

    const data = await res.json();
    return data[1]?.[0] ?? null;
}
