/**
 * This file contains a small, static subset of country-level
 * economic data.
 *
 * The information is derived from the World Bank Open Data API.
 * Only three countries are included to keep the project focused
 * on demonstrating SEO concepts rather than data scale.
 *
 * The full API-based reference implementation can be found in
 * `world_bank.ts`.
 */

export type CountryData = {
    name: string;
    region: string;
    capital: string;
    incomeLevel: string;
};

export const countries: Record<string, CountryData> = {
    india: {
        name: "India",
        region: "South Asia",
        capital: "New Delhi",
        incomeLevel: "Lower middle income",
    },

    usa: {
        name: "United States",
        region: "North America",
        capital: "Washington, D.C.",
        incomeLevel: "High income",
    },

    argentina: {
        name: "Argentina",
        region: "Latin America & Caribbean",
        capital: "Buenos Aires",
        incomeLevel: "Upper middle income",
    },
};
