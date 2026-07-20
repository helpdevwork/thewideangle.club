import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Base fields shared by every post across all verticals (LLD §3.1).
const base = {
  title: z.string(),
  description: z.string(),
  subcategory: z.string().optional(),
  tags: z.array(z.string()).default([]),
  heroImage: z.string(),
  heroAlt: z.string(),
  publishDate: z.coerce.date(),
  updatedDate: z.coerce.date().optional(),
  author: z.string().default('Suraj Ghorpade'),
  // Simple on/off publish switch: false = hidden (write it tonight, keep it
  // off), true = live (flip it in the morning). Defaults to false so a new
  // post never goes live until you explicitly turn it on.
  published: z.boolean().default(false),
  monetization: z
    .object({
      adDensity: z.enum(['none', 'light', 'standard', 'high']).default('standard'),
      affiliateRefs: z.array(z.string()).default([])
    })
    .optional()
};

const loaderFor = (dir: string) => glob({ pattern: '**/*.{md,mdx}', base: `./src/content/${dir}` });

const technology = defineCollection({
  loader: loaderFor('technology'),
  schema: z.object({
    ...base,
    topicCluster: z.string(),
    sourceLinks: z.array(z.string()).default([]),
    relatedTools: z.array(z.string()).optional()
  })
});

const travel = defineCollection({
  loader: loaderFor('travel'),
  schema: z.object({
    ...base,
    destination: z.string(),
    geo: z.object({ lat: z.number(), lng: z.number() }).optional(),
    bestSeason: z.string(),
    budgetBand: z.enum(['budget', 'mid-range', 'luxury']),
    gallery: z.array(z.string()).default([]),
    mapEmbed: z.string().optional()
  })
});

const sports = defineCollection({
  loader: loaderFor('sports'),
  schema: z.object({
    ...base,
    sport: z.string(),
    event: z.string(),
    matchDate: z.coerce.date().optional(),
    teams: z.array(z.string()).default([]),
    liveUpdate: z.boolean().default(false)
  })
});

// Card-specific fields are optional so this collection can also carry
// educational "basics" posts (What is a debit card? etc.) that aren't
// about any single product — CardCompare only renders when cardName is set.
const creditCards = defineCollection({
  loader: loaderFor('credit-cards'),
  schema: z.object({
    ...base,
    cardName: z.string().optional(),
    issuer: z.string().optional(),
    annualFee: z.string().optional(),
    rewardRate: z.string().optional(),
    bestFor: z.string().optional(),
    applyLink: z.string().optional(),
    disclosureLevel: z.enum(['standard', 'sponsored']).default('standard')
  })
});

const geoPolitics = defineCollection({
  loader: loaderFor('geo-politics'),
  schema: z.object({
    ...base,
    region: z.string(),
    topicCluster: z.string(),
    sourceLinks: z.array(z.string()).default([]),
    relatedTopics: z.array(z.string()).optional()
  })
});

const experiences = defineCollection({
  loader: loaderFor('experiences'),
  schema: z.object({
    ...base,
    experienceType: z.string(),
    location: z.string(),
    sponsored: z.boolean().default(false),
    partner: z.string().optional()
  })
});

export const collections = {
  technology,
  travel,
  sports,
  'credit-cards': creditCards,
  'geo-politics': geoPolitics,
  experiences
};
