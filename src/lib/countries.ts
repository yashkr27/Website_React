// src/lib/countries.ts
import { Country } from "./types";

/**
 * Local Data Source
 * This acts as a fallback and a reference for clean data modeling.
 */
export const countries: Country[] = [
    {
        id: "IND",
        name: "India",
        region: "Middle East & South Asia",
        capital: "New Delhi",
        incomeLevel: "Lower middle income"
    },
    {
        id: "USA",
        name: "United States",
        region: "North America",
        capital: "Washington D.C.",
        incomeLevel: "High income"
    },
    {
        id: "BRA",
        name: "Brazil",
        region: "Latin America & Caribbean",
        capital: "Brasilia",
        incomeLevel: "Upper middle income"
    },
    {
        id: "GBR",
        name: "United Kingdom",
        region: "Europe & Central Asia",
        capital: "London",
        incomeLevel: "High income"
    },
    {
        id: "ARG",
        name: "Argentina",
        region: "Latin America & Caribbean",
        capital: "Buenos Aires",
        incomeLevel: "Upper middle income"
    },
    {
        id: "ZAF",
        name: "South Africa",
        region: "Sub-Saharan Africa",
        capital: "Pretoria",
        incomeLevel: "Upper middle income"
    },
    {
        id: "CHN",
        name: "China",
        region: "East Asia & Pacific",
        capital: "Beijing",
        incomeLevel: "Upper middle income"
    },
    {
        id: "JPN",
        name: "Japan",
        region: "East Asia & Pacific",
        capital: "Tokyo",
        incomeLevel: "High income"
    },
    {
        id: "AUS",
        name: "Australia",
        region: "East Asia & Pacific",
        capital: "Canberra",
        incomeLevel: "High income"
    },
    {
        id: "DEU",
        name: "Germany",
        region: "Europe & Central Asia",
        capital: "Berlin",
        incomeLevel: "High income"
    }
];
