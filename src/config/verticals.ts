// Single source of truth for per-vertical identity: LLD §5-6, Strategy §4.
// Each vertical gets an accent, a hero feel, a signature content block, and a money angle.
// Templates read a post's `vertical` field against this map to render the right layout + module.

export type VerticalId = 'technology' | 'travel' | 'sports' | 'credit-cards' | 'geo-politics' | 'experiences';

export interface VerticalTheme {
  id: VerticalId;
  name: string;
  shortName: string;
  tagline: string;
  accent: string; // primary accent hex, light mode
  accentDark: string; // accent hex, dark mode (kept legible on black)
  heroStyle: 'editorial' | 'photo-map' | 'live-banner' | 'compare' | 'magazine';
  signatureBlock: string;
  moneyModule: string;
  feel: string;
}

export const verticals: Record<VerticalId, VerticalTheme> = {
  technology: {
    id: 'technology',
    name: 'Technology',
    shortName: 'Tech',
    tagline: 'How it works, and why it matters',
    accent: '#3730A3',
    accentDark: '#818CF8',
    heroStyle: 'editorial',
    signatureBlock: 'Explainer callouts + source list',
    moneyModule: 'In-content ads + SaaS affiliate',
    feel: 'Clean editorial, wide text column, calm and authoritative'
  },
  travel: {
    id: 'travel',
    name: 'Travel',
    shortName: 'Travel',
    tagline: 'Where to go, and how to get there',
    accent: '#0F766E',
    accentDark: '#5EEAD4',
    heroStyle: 'photo-map',
    signatureBlock: 'Itinerary cards + gallery + budget band',
    moneyModule: 'Travel affiliate + gallery presets',
    feel: 'Full-bleed photography, airy, inspirational'
  },
  sports: {
    id: 'sports',
    name: 'Sports',
    shortName: 'Sports',
    tagline: 'Live moments, told fast',
    accent: '#B45309',
    accentDark: '#FBBF24',
    heroStyle: 'live-banner',
    signatureBlock: 'Live/score strip + match timeline',
    moneyModule: 'High-velocity display ads',
    feel: 'Bold, dynamic, timely — built for spikes'
  },
  'credit-cards': {
    id: 'credit-cards',
    name: 'Credit Cards',
    shortName: 'Cards',
    tagline: 'Know your card, then find your best one',
    accent: '#047857',
    accentDark: '#6EE7B7',
    heroStyle: 'compare',
    signatureBlock: 'Card compare table + Apply CTA',
    moneyModule: 'BFSI affiliate (Cuelinks/bank)',
    feel: 'Starts with the basics, builds to comparison — built for first-time cardholders in India'
  },
  'geo-politics': {
    id: 'geo-politics',
    name: 'Geo Politics',
    shortName: 'Geo Politics',
    tagline: 'The world, explained without the noise',
    accent: '#1E3A8A',
    accentDark: '#93C5FD',
    heroStyle: 'editorial',
    signatureBlock: 'Region brief + explainer + source list',
    moneyModule: 'In-content ads',
    feel: 'Clean editorial, source-backed, globally minded'
  },
  experiences: {
    id: 'experiences',
    name: 'Experiences',
    shortName: 'Experiences',
    tagline: 'Stories worth having',
    accent: '#9F1239',
    accentDark: '#FDA4AF',
    heroStyle: 'magazine',
    signatureBlock: 'Narrative + pull-quotes + gallery',
    moneyModule: 'Sponsorship slot + ads',
    feel: 'Story-led, magazine feel, intimate'
  }
};

export const verticalList = Object.values(verticals);
