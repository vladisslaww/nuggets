import type { PageLoad } from './$types';

export type PageData = {
  songs: string[];
};

export const load: PageLoad = async ({ data }) => {
  return {
    songs: data.songs
  };
}; 