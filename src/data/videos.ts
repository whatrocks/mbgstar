export interface FeaturedVideo {
  title: string;
  /** YouTube video ID, the v= part of the watch URL. */
  youtubeId: string;
}

/** The home page plays these in order, looping back to the first. */
export const featuredVideos: FeaturedVideo[] = [
  { title: 'Sunny Day', youtubeId: 'jKuIO9XvSKI' },
  { title: 'Wake-Up Call', youtubeId: 'PkiwIzlOOww' }
];
