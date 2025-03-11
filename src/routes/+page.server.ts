import { readdirSync } from 'node:fs';
import { join } from 'node:path';

export function load() {
  // Read files from static/audio directory
  const audioDir = join(process.cwd(), 'static', 'audio');
  const files = readdirSync(audioDir)
    .filter((file: string) => file.endsWith('.flac'))
    .sort((a: string, b: string) => b.localeCompare(a)); // Sort in reverse alphabetical order

  return {
    songs: files
  };
} 