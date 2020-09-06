export interface Episode {
  podcast: string;
  author: string;
  title: string;
  img: string;
  description: string;
  playInfo: string;
  isDownloaded: boolean;
}

export interface Podcast {
    title: string;
    author: string;
    description: string;
    tags: string[];
    accentColor: string;
    episodes: Episode[];
}
