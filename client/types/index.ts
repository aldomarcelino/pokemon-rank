import { Breakpoint } from '../config/breakpoints';

export type Maybe<T> = T | null;

export type Dimension = {
  height: number;
  width: number;
};

export type DimensionDetail = {
  dimension: Dimension;
  breakpoint: Breakpoint;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
};

export type Genre = {
  id: number;
  name: string;
};

export type Move = {
  id: number;
  move: { name: string };
};

export enum MediaType {
  MOVIE = 'movie',
  TV = 'tv'
}

export type Media = {
  id: number;
  name: string;
  moves: [];
  stats: [];
  poster: string;
  banner: string;
  abilities: [];
  vote: number;
  height: number;
  weight: number;
  title: string;
  rating: number;
  genre: Genre[];
  moviecast: [];
  overview: string;
  url: string;
  reFetchFav?: any;
  isFromRan?: boolean;
};

export type ImageType = 'poster' | 'original';

export type Section = {
  heading: string;
  endpoint: string;
  defaultCard?: boolean;
  topList?: boolean;
  original?: boolean;
};
