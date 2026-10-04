import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const guides = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/guides' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    answer: z.string(),
    kind: z.enum(['wheel', 'explainer']),
    order: z.number(),
    updated: z.coerce.date(),
    faqs: z.array(z.object({ q: z.string(), a: z.string() })),
  }),
});

export const collections = { guides };
