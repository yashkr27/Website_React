import Head from 'next/head';
import React from 'react';

interface SEOProps {
    title: string;
    description: string;
    image?: string;
    url?: string;
    type?: string;
    keywords?: string;
    schemaData?: object;
    noIndex?: boolean;
}

/**
 * SEO Component to handle metadata, OpenGraph, and JSON-LD schema.
 * This ensures all pages have consistent and optimized search engine visibility.
 */
const SEO: React.FC<SEOProps> = ({
    title,
    description,
    image = '/og-image.jpg', // Default OG image
    url = 'https://country-profiles.com', // Base URL
    type = 'website',
    keywords = 'countries, economy, economic profiles, statistics',
    schemaData,
    noIndex = false,
}) => {
    const fullTitle = `${title} | Global Economic Insights`;

    return (
        <Head>
            {/* Basic Metadata */}
            <title>{fullTitle}</title>
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
            <meta name="viewport" content="width=device-width, initial-scale=1" />

            {/* Dynamic Robots Tag */}
            <meta name="robots" content={noIndex ? "noindex, nofollow" : "index, follow"} />

            {/* OpenGraph Metadata for Social Media */}
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:type" content={type} />
            <meta property="og:url" content={url} />
            <meta property="og:image" content={image} />
            <meta property="og:site_name" content="Global Economic Insights" />

            {/* Twitter Metadata */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />

            {/* Canonical URL */}
            <link rel="canonical" href={url} />

            {/* JSON-LD Schema */}
            {schemaData && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
                />
            )}
        </Head>
    );
};

export default SEO;
