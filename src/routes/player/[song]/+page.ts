import type { PageLoad } from './$types';

export type PageData = {
  song: string;
};

export const load: PageLoad = ({ params }) => {
  return {
    song: decodeURIComponent(params.song)
  };
}; 