export interface Hero {
  id: number;
  name: string;
  thumbnail?: Thumbnail;
  comics: Comics;
  extra?: string;
}

export interface Thumbnail {
  path: string;
  extension: string;
}

export interface Comics {
  available: number;
}

export interface HeroResponse {
  data: {
    results: Hero[];
    total: number;
  };
}
