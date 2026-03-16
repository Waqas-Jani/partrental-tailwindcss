import Script from "next/script";

/**
 * Reusable JSON-LD component for structured data
 * Renders JSON-LD scripts in the <head> using Next.js Script component with beforeInteractive strategy
 * 
 * @param {Object|Array|string|null} ldSchema - The JSON-LD schema(s) to render. Can be a single object, array of objects, or JSON string
 * @param {string} [prefix='ld-schema'] - Prefix for script IDs to ensure uniqueness (default: 'ld-schema')
 * @returns {JSX.Element|null} Script components or null if no schema provided
 * 
 * @example
 * // Single schema object
 * <JsonLd ldSchema={{ "@context": "https://schema.org", "@type": "Organization" }} />
 * 
 * @example
 * // Array of schemas
 * <JsonLd ldSchema={[schema1, schema2]} prefix="home-page" />
 * 
 * @example
 * // From SEO object
 * <JsonLd ldSchema={pageData?.seo?.ldSchema} prefix="about-page" />
 */
const JsonLd = ({ ldSchema, prefix = "ld-schema" }: { ldSchema: any, prefix?: string }) => {
    // Return null if no schema provided
    if (!ldSchema) return null;

    // Normalize to array - handle both single objects and arrays
    const schemas = Array.isArray(ldSchema)
        ? ldSchema
        : [ldSchema];

    // Filter out null/empty values and map to Script components
    return (
        <>
            {schemas
                .filter(Boolean)
                .map((schema, index) => {
                    // Handle string or object schemas
                    const raw = typeof schema === "string" ? schema : JSON.stringify(schema);
                    // Escape < characters to prevent XSS attacks
                    const safe = raw.replace(/</g, "\u003c");

                    return (
                        <Script
                            key={`${prefix}-${index}`}
                            id={`${prefix}-${index}`}
                            type="application/ld+json"
                            strategy="afterInteractive"
                            dangerouslySetInnerHTML={{ __html: safe }}
                        />
                    );
                })}
        </>
    );
};

export default JsonLd;
