export interface FeaturedVideo {
  title: string;
  /** YouTube video ID, the v= part of the watch URL. */
  youtubeId: string;
}

/** The home page plays these in order, looping back to the first. */
export const featuredVideos: FeaturedVideo[] = [
  { title: 'Sunny Day', youtubeId: 'PkiwIzlOOww' },
  { title: 'Wake-Up Call', youtubeId: 'jKuIO9XvSKI' }
];
