// src/lib/data.ts

export type Country = {
    id: string;
    name: string;
    region: string;
    capital: string;
    incomeLevel: string;
};

/**
 * Maps World Bank API response to our internal Country type.
 * Includes normalization for regional names to ensure cleaner SEO presentation.
 */
function mapCountry(item: any): Country {
    let region = item.region?.value || "N/A";

    // Strip " (excluding high income)" and similar suffixes commonly found in WB data
    region = region.split(' (')[0];

    // Data Normalization for Regions
    // More robust cleaning to prevent search pollution from country names in regions
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
 */
export async function getAllCountries(): Promise<Country[]> {
    try {
        const res = await fetch("https://api.worldbank.org/v2/country?format=json&per_page=300");
        const data = await res.json();

        // Data structure: [metadata, countryArray]
        if (Array.isArray(data) && data[1]) {
            return data[1]
                .filter((item: any) => item.region.id !== "NA") // Filter out aggregates/regions
                .map(mapCountry);
        }
        return [];
    } catch (error) {
        console.error("Error fetching countries:", error);
        return [];
    }
}

/**
 * Fetches details for a specific country by its 3-letter ID (e.g., "IND").
 */
export async function getCountryById(id: string): Promise<Country | null> {
    try {
        const res = await fetch(`https://api.worldbank.org/v2/country/${id}?format=json`);
        const data = await res.json();

        if (Array.isArray(data) && data[1] && data[1][0]) {
            return mapCountry(data[1][0]);
        }
        return null;
    } catch (error) {
        console.error(`Error fetching country ${id}:`, error);
        return null;
    }
}

// Keep the static exported array for initial backward compatibility if needed, 
// but we'll transition components to use the async functions.
export const countries: Country[] = []; 
