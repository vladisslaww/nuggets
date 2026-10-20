import { listSongs } from '$lib/server/songs';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = ({ params }) => {
  const song = decodeURIComponent(params.song);
  const songs = listSongs();
  const index = songs.indexOf(song);

  return {
    song,
    prev: index > 0 ? songs[index - 1] : null,
    next: index >= 0 && index < songs.length - 1 ? songs[index + 1] : null
  };
};
