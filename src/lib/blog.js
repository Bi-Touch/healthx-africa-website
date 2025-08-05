import { client } from './contentfulClient';

export async function fetchBlogPosts() {
  const entries = await client.getEntries({ content_type: 'blogPost' });
  return entries.items;
}

export async function fetchBlogPostBySlug(slug) {
  const entries = await client.getEntries({
    content_type: 'blogPost',
    'fields.slug': slug,
    limit: 1,
  });
  return entries.items[0];
}