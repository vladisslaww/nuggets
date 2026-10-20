import { listSongs } from '$lib/server/songs';

export function load() {
  return {
    songs: listSongs()
  };
}
