// Single source of truth for how readers reach thewideangle.club.
// These are all public, on-page contact details — not secrets.
export const contact = {
  whatsappNumber: '916361380629', // country code + number, no + or spaces (wa.me format)
  whatsappDisplay: '+91 63613 80629',
  instagramHandle: '@thewideangle.club',
  instagramUrl: 'https://www.instagram.com/thewideangle.club',
  email: 'helpdevwork@gmail.com'
};

// What the message is about — separate from *how* they reach us (WhatsApp/
// Instagram/Email are direct channels above this; this dropdown is only
// inside the full form, for messages the team replies to rather than an
// instant chat). Keep this list broad — "we can help with anything" is the
// whole point — but specific enough that a reply can start on-topic.
export const contactCategories = [
  'General question',
  'Credit card doubt',
  'Collaboration / partnership',
  'Feature my brand or story',
  'Guest post / write for us',
  'Something else — we’ll figure it out'
];
