// src/lib/data.ts

export type Country = {
    id: string;
    name: string;
    region: string;
    capital: string;
    incomeLevel: string;
};

/**
 * Static country dataset.
 * Used to generate deterministic, SEO-friendly pages.
 * Data is derived from the World Bank country classifications.
 */
export const countries: Country[] = [
    {
        id: "IND",
        name: "India",
        region: "South Asia",
        capital: "New Delhi",
        incomeLevel: "Lower Middle Income",
    },
    {
        id: "USA",
        name: "United States",
        region: "North America",
        capital: "Washington, D.C.",
        incomeLevel: "High Income",
    },
    {
        id: "ARG",
        name: "Argentina",
        region: "Latin America & Caribbean",
        capital: "Buenos Aires",
        incomeLevel: "Upper Middle Income",
    },
];
