import { fetchHomePage } from '@/lib/contentful';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import type { HomePageEntry } from '@/lib/contentful';
import { INLINES } from '@contentful/rich-text-types';
import type { Inline, Text } from '@contentful/rich-text-types';

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

  // Handle hero image URL safely
  const heroImageUrl =
    heroImage?.fields?.file?.url
      ? `https:${heroImage.fields.file.url}`
      : typeof heroImage === 'string'
      ? heroImage
      : null;

  const heroImageAlt =
    heroImage?.fields?.title ||
    heroImage?.fields?.description ||
    'Hero Image';

  const richTextOptions = {
    renderNode: {
      [INLINES.HYPERLINK]: (node: Inline) => {
        const textNode = node.content[0] as Text;
        return (
          <a
            href={node.data.uri}
            className="text-blue-500 hover:text-blue-600 underline transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            {textNode.value}
          </a>
        );
      },
    },
  };

  return (
    <main className="bg-gray-50 text-gray-800">
      {/* Hero Section */}
      <section className="relative w-full h-[70vh] flex items-center justify-center text-center text-white">
        {heroImageUrl && (
          <img
            src={heroImageUrl}
            alt={heroImageAlt}
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}

        {/* Overlay 
        <div className="absolute inset-0 bg-black bg-opacity-0"></div>*/}

        {/* Content */}
        <div className="relative z-10 max-w-3xl px-6">
          {title && <h1 className="text-5xl font-bold drop-shadow-lg">{title}</h1>}
          {subtitle && <p className="mt-4 text-xl drop-shadow">{subtitle}</p>}
          {ctaText && ctaUrl && (
            <a
              href={ctaUrl}
              className="inline-block mt-8 px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition-all"
            >
              {ctaText}
            </a>
          )}
        </div>
      </section>

      {/* Intro Text */}
      <section className="max-w-5xl mx-auto p-8 bg-white shadow-md rounded-lg -mt-20 relative z-20">
        <div className="prose prose-lg max-w-none text-gray-700">
          {introText ? documentToReactComponents(introText, richTextOptions) : null}
        </div>
      </section>

      {/* Features */}
      {features && Array.isArray(features) && features.length > 0 && (
        <section className="max-w-6xl mx-auto mt-16 px-6">
          <h2 className="text-3xl font-bold text-center mb-8">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center"
              >
                <p className="text-lg font-medium">{feature}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Footer */}
      {footerText && (
        <footer className="mt-20 py-8 text-center text-sm text-gray-500 border-t">
          {footerText}
        </footer>
      )}
    </main>
  );
}