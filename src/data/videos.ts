export interface FeaturedVideo {
  title: string;
  /** YouTube video ID, the v= part of the watch URL. */
  youtubeId: string;
  /** Where to start (and loop back to), in seconds. Defaults to 0. */
  startSeconds?: number;
}

/** Plays on a loop, muted, behind the top of the home page. */
export const heroVideo: FeaturedVideo = { title: 'Wake-Up Call', youtubeId: 'PkiwIzlOOww', startSeconds: 57 };
