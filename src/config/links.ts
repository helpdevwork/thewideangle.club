// Single source of truth for the link-in-bio page (/links/).
// Edit this file — not links.astro — to add or change referral links.

// UTM tags added to every internal link on /links/ so GA4/Umami can attribute
// visits to Instagram. Change `source` if you reuse the page for another channel.
export const tracking = {
  source: 'instagram',
  medium: 'link-in-bio'
};

export interface CardOffer {
  id: string; // short slug, used as utm_campaign (e.g. 'hdfc-regalia')
  name: string; // card name shown on the button
  issuer: string; // bank / issuer
  blurb: string; // one line: who it is for
  url: string; // your referral / affiliate link — leave '' until you have it
}

// Credit-card referral links. Empty for now on purpose: nothing is shown as an
// "Apply" button until a real URL is filled in. Add entries like this:
//
//   {
//     id: 'example-card',
//     name: 'Example Bank Platinum Card',
//     issuer: 'Example Bank',
//     blurb: 'Best for first-time cardholders',
//     url: 'https://your-referral-link.example'
//   },
//
// Every entry with a url renders as a Sponsored button with
// rel="sponsored nofollow noopener", matching /disclosure/.
export const creditCardOffers: CardOffer[] = [];
