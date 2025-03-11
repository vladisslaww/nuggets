<script lang="ts">
  import { base } from '$app/paths';
  import type { PageData } from './$types';
  import AudioPlayer from '$lib/components/AudioPlayer.svelte';
  
  export let data: PageData;
</script>

<svelte:head>
  <title>{data.song.replace('.flac', '')} - Nuggets</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap" rel="stylesheet">
</svelte:head>

<div class="player-page">
  <a href="{base}/" class="back-button">← Back to Songs</a>
  <h1>{data.song.replace('.flac', '')}</h1>
  <AudioPlayer songPath={`${base}/audio/${data.song}`} />
</div>

<style>
  :global(body) {
    margin: 0;
    padding: 0;
    background: rgb(10, 10, 10);
    color: rgb(200, 200, 200);
    min-height: 100vh;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  }

  .player-page {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
  }

  h1 {
    text-align: center;
    margin-bottom: 2rem;
    color: rgb(200, 200, 200);
    font-weight: 600;
    font-size: 2.5rem;
  }

  .back-button {
    display: inline-block;
    padding: 0.5rem 1rem;
    color: rgb(200, 200, 200);
    text-decoration: none;
    background: rgb(20, 20, 20);
    border-radius: 4px;
    margin-bottom: 2rem;
    transition: all 0.2s ease;
    font-weight: 600;
  }

  .back-button:hover {
    background: rgb(30, 30, 30);
    transform: translateX(-2px);
  }
</style> 