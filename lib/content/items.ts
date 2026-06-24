export type ItemLen = 'short' | 'med' | 'long';

export type ContentItem = {
  text: string;
  len: ItemLen;
};

export const CONTENT_ITEMS: ContentItem[] = [
  { text: 'Custom websites. Built in 3 days.', len: 'short' },
  { text: 'AI speed. Human craft.', len: 'short' },
  { text: 'Three days. One founder. Zero templates.', len: 'short' },
  { text: 'From €1,490. Two slots open this month.', len: 'short' },
  { text: 'Most agencies quote 8 weeks. I ship in 3 days.', len: 'med' },
  { text: 'Websites in 3 days, not 3 months. For founders who needed it yesterday.', len: 'med' },
  { text: 'I sell you a live site in 72 hours. The process happens — but inside the build, not before it.', len: 'med' },
  { text: 'I build custom websites in 3 days — Next.js + Vercel, sub-second loads, conversion-focused.', len: 'long' },
  { text: 'Same custom design. Same hand-written code. No templates, no Webflow, no “we’ll get the dev team on it Monday.”', len: 'long' },
  { text: 'Discovery calls. Strategy decks. Wireframe rounds. Brand workshops. Six weeks in, you have a Figma file and an invoice.', len: 'long' },
];
