import { fetchHomePage } from '@/lib/contentful';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import type { HomePageEntry } from '@/lib/contentful'; // adjust import path if different

// Optionally import types for rich text nodes if customizing
import type { INLINES, BLOCKS, Document, Node } from '@contentful/rich-text-types';

export default async function HomePage() {
  const home: HomePageEntry | undefined = await fetchHomePage();

  if (!home) {
    return <p>Loading...</p>;
  }

  const {
    title,
    subtitle,
    heroImage,
    introText,
    ctaText,
    ctaUrl,
    features,
    footerText,
  } = home.fields;

  // Optional customization of Rich Text rendering nodes (example: hyperlinks)
  const richTextOptions = {
    renderNode: {
      [INLINES.HYPERLINK]: (node: Node) => (
        <a
          href={node.data.uri}
          className="text-blue-600 underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          {node.content[0].value}
        </a>
      ),
      // Add other node renderers if needed
    },
  };

  return (
    <main className="max-w-5xl mx-auto p-6">
      <section className="text-center">
        {title && <h1 className="text-5xl font-bold">{title}</h1>}
        {subtitle && <p className="mt-4 text-xl text-gray-600">{subtitle}</p>}

        {heroImage?.fields?.file?.url && (
          <img
            src={heroImage.fields.file.url}
            alt={heroImage.fields.title ?? 'Hero Image'}
            className="mx-auto mt-6 rounded-lg max-w-full h-auto"
          />
        )}

        <div className="mt-6 prose text-left max-w-none">
          {introText ? documentToReactComponents(introText, richTextOptions) : null}
        </div>

        {ctaText && ctaUrl && (
          <a
            href={ctaUrl}
            className="inline-block mt-8 px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            {ctaText}
          </a>
        )}
      </section>

      {features && Array.isArray(features) && features.length > 0 && (
        <section className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, idx) => (
            <div key={idx} className="p-4 border rounded shadow">
              {feature}
            </div>
          ))}
        </section>
      )}

      {footerText && (
        <footer className="mt-12 text-center text-sm text-gray-500">{footerText}</footer>
      )}
    </main>
  );
}