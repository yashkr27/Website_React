// src/lib/data.ts
import { Country } from "./types";
import { WORLD_BANK_API_BASE, COUNTRIES_PER_PAGE_API } from "./constants";
import { countries as fallbackCountries } from "./countries";

export type { Country };
export const countries = fallbackCountries;

/**
 * Maps World Bank API response to our internal Country type.
 * Includes normalization for regional names to ensure cleaner SEO presentation.
 */
function mapCountry(item: any): Country {
    let region = item.region?.value || "N/A";

    // Strip " (excluding high income)" and similar suffixes commonly found in WB data
    region = region.split(' (')[0];

    // Data Normalization for Regions
    const lowerRegion = region.toLowerCase();

    if (lowerRegion.includes("afghanistan") || lowerRegion.includes("pakistan") || lowerRegion.includes("south asia")) {
        region = "Middle East & South Asia";
    } else if (lowerRegion.includes("latin america")) {
        region = "Latin America & Caribbean";
    } else if (lowerRegion.includes("middle east") || lowerRegion.includes("north africa")) {
        region = "Middle East & North Africa";
    } else if (lowerRegion.includes("sub-saharan africa")) {
        region = "Sub-Saharan Africa";
    } else if (lowerRegion.includes("east asia") || lowerRegion.includes("pacific")) {
        region = "East Asia & Pacific";
    } else if (lowerRegion.includes("europe") || lowerRegion.includes("central asia")) {
        region = "Europe & Central Asia";
    }

    return {
        id: item.id,
        name: item.name,
        region: region,
        capital: item.capitalCity || "N/A",
        incomeLevel: item.incomeLevel?.value || "N/A",
    };
}

/**
 * Fetches a list of countries from the World Bank API.
 * Uses local fallback if API fails.
 */
export async function getAllCountries(): Promise<Country[]> {
    try {
        const res = await fetch(`${WORLD_BANK_API_BASE}?format=json&per_page=${COUNTRIES_PER_PAGE_API}`);
        const data = await res.json();

        // Data structure: [metadata, countryArray]
        if (Array.isArray(data) && data[1]) {
            return data[1]
                .filter((item: any) => item.region.id !== "NA") // Filter out aggregates/regions
                .map(mapCountry);
        }
        return fallbackCountries;
    } catch (error) {
        console.error("Error fetching countries, using fallback:", error);
        return fallbackCountries;
    }
}

/**
 * Fetches details for a specific country by its ID.
 */
export async function getCountryById(id: string): Promise<Country | null> {
    try {
        const res = await fetch(`${WORLD_BANK_API_BASE}/${id}?format=json`);
        const data = await res.json();

        if (Array.isArray(data) && data[1] && data[1][0]) {
            return mapCountry(data[1][0]);
        }

        // Final fallback: check local data if API fails to find it
        return fallbackCountries.find(c => c.id === id) || null;
    } catch (error) {
        console.error(`Error fetching country ${id}, searching local fallback:`, error);
        return fallbackCountries.find(c => c.id === id) || null;
    }
}
