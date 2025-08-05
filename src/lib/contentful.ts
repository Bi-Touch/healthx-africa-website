import { createClient } from 'contentful';
import type { Entry } from 'contentful';

// Define TypeScript interface matching your Contentful HomePage content model fields
import type { Document } from '@contentful/rich-text-types';

export interface HomePageFields {
  title?: string;
  subtitle?: string;
  heroImage?: {
    fields: {
      file: {
        url: string;
      };
      title?: string;
    };
  };
  introText?: Document; // Contentful Rich Text Document
  ctaText?: string;
  ctaUrl?: string;
  features?: string[];
  footerText?: string;
}

// This is the Contentful Entry wrapping your HomePage fields
export type HomePageEntry = Entry<HomePageFields>;

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
});

export async function fetchHomePage(): Promise<HomePageEntry | undefined> {
  const entries = await client.getEntries<HomePageEntry>({
    content_type: 'homePage', // Use exact Content Type API ID (case sensitive)
    limit: 1,
  });
  return entries.items[0];
}