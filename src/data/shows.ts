export interface UpcomingShow {
  venue: string;
  /** Local start time at the venue, no offset. */
  start: string;
  /** Optional extra line, e.g. a cover charge. */
  detail?: string;
}

/** Shows run two hours. */
const SHOW_DURATION_HOURS = 2;

/** Every venue so far is in the Bay Area. */
const SHOW_TIMEZONE = 'America/Los_Angeles';

export const upcomingShows: UpcomingShow[] = [
  {
    venue: 'HopMonk Tavern Novato',
    start: '2027-01-20T19:00:00'
  },
  {
    venue: 'Paper Mill Creek Saloon',
    start: '2027-02-05T19:00:00',
    detail: '$10 cover'
  }
];

/**
 * Formats a show's local start time as "Jan 20, 2027 · 7 PM".
 * The start string is parsed as UTC and formatted in UTC so the wall-clock
 * time comes back out unchanged, whatever timezone the renderer runs in.
 */
export function formatShowStart(start: string): string {
  const date = new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC'
  }).format(new Date(`${start}Z`));

  const [hours, minutes] = start.slice(11).split(':').map(Number);
  const hour12 = hours % 12 === 0 ? 12 : hours % 12;
  const suffix = hours < 12 ? 'AM' : 'PM';
  const time =
    minutes === 0
      ? `${hour12} ${suffix}`
      : `${hour12}:${String(minutes).padStart(2, '0')} ${suffix}`;

  return `${date} · ${time}`;
}

/** '2027-02-05T19:00:00' -> '20270205T190000' */
function toCalendarStamp(local: string): string {
  return local.replace(/[-:]/g, '');
}

/** The show's local end time, SHOW_DURATION_HOURS after it starts. */
function showEndLocal(start: string): string {
  const end = new Date(`${start}Z`);
  end.setUTCHours(end.getUTCHours() + SHOW_DURATION_HOURS);
  return end.toISOString().slice(0, 19);
}

/**
 * Prefilled Google Calendar event. Times are sent as local wall clock with
 * ctz, so Google applies the venue's timezone rather than the viewer's.
 */
export function googleCalendarUrl(show: UpcomingShow, origin: string): string {
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: `Money Back Guarantee* at ${show.venue}`,
    dates: `${toCalendarStamp(show.start)}/${toCalendarStamp(showEndLocal(show.start))}`,
    ctz: SHOW_TIMEZONE,
    location: show.venue,
    details: [show.detail, `${origin}/shows`].filter(Boolean).join('\n')
  });

  return `https://calendar.google.com/calendar/render?${params}`;
}
