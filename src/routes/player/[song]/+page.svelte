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
  <nav class="top-bar">
    <a href="{base}/" class="back-button">← Back to Songs</a>
    <div class="song-nav">
      {#if data.prev}
        <a href="{base}/player/{encodeURIComponent(data.prev)}" class="nav-button prev-button">← Prev</a>
      {:else}
        <span class="nav-button disabled" aria-disabled="true">← Prev</span>
      {/if}
      {#if data.next}
        <a href="{base}/player/{encodeURIComponent(data.next)}" class="nav-button next-button">Next →</a>
      {:else}
        <span class="nav-button disabled" aria-disabled="true">Next →</span>
      {/if}
    </div>
  </nav>
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

  .top-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 2rem;
  }

  .song-nav {
    display: flex;
    gap: 0.5rem;
  }

  .back-button,
  .nav-button {
    display: inline-block;
    padding: 0.5rem 1rem;
    color: rgb(200, 200, 200);
    text-decoration: none;
    background: rgb(20, 20, 20);
    border-radius: 4px;
    transition: all 0.2s ease;
    font-weight: 600;
    white-space: nowrap;
  }

  .back-button:hover,
  .nav-button:not(.disabled):hover {
    background: rgb(30, 30, 30);
  }

  .back-button:hover,
  .prev-button:hover {
    transform: translateX(-2px);
  }

  .next-button:hover {
    transform: translateX(2px);
  }

  .nav-button.disabled {
    color: rgb(80, 80, 80);
    cursor: default;
  }
</style> 