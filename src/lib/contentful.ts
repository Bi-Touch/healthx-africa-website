import { createClient, Entry, EntrySkeletonType, Asset } from 'contentful';
import type { Document } from '@contentful/rich-text-types';

export interface HomePageFields {
  title?: string;
  subtitle?: string;
  heroImage?: {
    fields: {
      file: { url: string };
      title?: string;
    };
  };
  introText?: Document;
  ctaText?: string;
  ctaUrl?: string;
  features?: string[];
  footerText?: string;
}

type HomePageSkeleton = EntrySkeletonType<HomePageFields, 'homePage'>;

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
});

export async function fetchHomePage(): Promise<Entry<HomePageSkeleton> | undefined> {
  try {
    const entries = await client.getEntries<HomePageSkeleton>({
      content_type: 'homePage',
      limit: 1,
      include: 2, // fetch linked assets like heroImage
    });

    if (!entries.items.length) return undefined;

    const page = entries.items[0];

    // Ensure heroImage is resolved
    if (
      page.fields.heroImage &&
      !(page.fields.heroImage as any)?.fields?.file?.url
    ) {
      const assetId = (page.fields.heroImage as any)?.sys?.id;
      if (assetId && entries.includes?.Asset) {
        const resolved = entries.includes.Asset.find(
          (asset: Asset) => asset.sys.id === assetId
        );
        if (resolved) {
          page.fields.heroImage = resolved as any;
        }
      }
    }

    return page;
  } catch (error) {
    console.error('Error fetching home page:', error);
    return undefined;
  }
}