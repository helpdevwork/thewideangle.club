import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { verticalList } from '../config/verticals';

export async function GET(context) {
  const allEntries = (
    await Promise.all(
      verticalList.map(async (v) => {
        const entries = await getCollection(v.id, ({ data }) => data.published);
        return entries.map((e) => ({ ...e, verticalId: v.id }));
      })
    )
  ).flat();

  const items = allEntries
    .sort((a, b) => b.data.publishDate.valueOf() - a.data.publishDate.valueOf())
    .map((entry) => ({
      title: entry.data.title,
      description: entry.data.description,
      pubDate: entry.data.publishDate,
      link: `/${entry.verticalId}/${entry.id}/`,
      categories: [entry.verticalId, ...(entry.data.tags ?? [])]
    }));

  return rss({
    title: 'thewideangle.club',
    description: 'Technology, travel, sport, credit cards, geopolitics, and culture — told with original photography and a personal point of view.',
    site: context.site,
    items,
    customData: '<language>en-in</language>'
  });
}
