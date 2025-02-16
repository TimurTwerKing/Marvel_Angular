export interface Hero {
  id: number;
  name: string;
  thumbnail?: {
    path: string;
    extension: 'jpg';
  };
  comics: Comics;
  extra?: string;
}
export interface Comics {
  available: number;
}
// export interface Thumbnail {
//   path: string;
//   extension: Extension;
// }
// export enum Extension {
//   GIF = 'gif',
//   Jpg = 'jpg',
// }

export interface HeroResponse {
  data: {
    results: Hero[];
    total?: number;
  }
}
