export interface FeaturedVideo {
  title: string;
  /** YouTube video ID, the v= part of the watch URL. */
  youtubeId: string;
}

/** The home page plays these in order, looping back to the first. */
export const featuredVideos: FeaturedVideo[] = [
  { title: 'Sunny Day', youtubeId: 'TODO_SUNNY_DAY' },
  { title: 'Wake-Up Call', youtubeId: 'TODO_WAKE_UP_CALL' }
];
