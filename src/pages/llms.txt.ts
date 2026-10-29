import type { APIRoute } from 'astro';
import { formatShowStart, upcomingShows } from '../data/shows';

/*
 * An llms.txt (https://llmstxt.org) for language models: who the band is,
 * the pages, where to listen, and the upcoming shows from the same data
 * the site renders, so it never goes stale.
 */
export const GET: APIRoute = ({ url }) => {
  const shows = upcomingShows.map((show) =>
    `- ${formatShowStart(show.start)} at ${show.venue}${show.detail ? ` (${show.detail})` : ''}`
  );

  const body = [
    '# Money Back Guarantee*',
    '',
    '> A band of dads from Marin County and the East Bay, playing originals and covers after bedtime.',
    '',
    'Money Back Guarantee* (MBG*) plays shows around the San Francisco Bay Area. Show times are local Pacific time.',
    '',
    '## Pages',
    '',
    `- [Home](${url.origin}/): Featured videos and the next shows`,
    `- [Shows](${url.origin}/shows): Upcoming and past shows`,
    `- [Music](${url.origin}/music): Videos of the band's songs`,
    `- [About](${url.origin}/about): About the band`,
    '',
    '## Upcoming shows',
    '',
    ...(shows.length > 0 ? shows : ['- None announced yet']),
    '',
    '## Listen and follow',
    '',
    '- [Bandcamp](https://mbgstar.bandcamp.com): Recorded music',
    '- [YouTube](https://youtube.com/@moneybackguaranteeasterisk): Videos',
    '- [Instagram](https://instagram.com/moneybackguaranteeasterisk): Photos and show announcements',
    ''
  ].join('\n');

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' }
  });
};
