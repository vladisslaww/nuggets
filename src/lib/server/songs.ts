import { readdirSync } from 'node:fs';
import { join } from 'node:path';

// Songs in the order the home page lists them (reverse alphabetical)
export function listSongs(): string[] {
  const audioDir = join(process.cwd(), 'static', 'audio');
  return readdirSync(audioDir)
    .filter((file: string) => file.endsWith('.flac'))
    .sort((a: string, b: string) => b.localeCompare(a));
}
