<script lang="ts">
  import type { PageData } from './$types';
  import { base } from '$app/paths';
  
  export let data: PageData;
</script>

<div class="song-list">
  <h1>Nuggets</h1>
  <p class="description">Nuggets is my experiment in consistency. How long can I last putting out a short beat every day?</p>
  <div class="songs">
    {#each data.songs as song}
      <a href="{base}/player/{encodeURIComponent(song)}" class="song-link">
        <div class="song-item">
          {song.replace('.flac', '')}
        </div>
      </a>
    {/each}
  </div>
</div>

<svelte:head>
  <title>Nuggets</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap" rel="stylesheet">
</svelte:head>

<style>
  :global(body) {
    margin: 0;
    padding: 0;
    background: rgb(10, 10, 10);
    color: rgb(200, 200, 200);
    min-height: 100vh;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  }

  .song-list {
    max-width: 800px;
    margin: 2rem auto;
    padding: 2rem;
  }

  h1 {
    text-align: center;
    margin-bottom: 1rem;
    font-size: 2.5rem;
    font-weight: 600;
  }

  .description {
    text-align: center;
    margin-bottom: 3rem;
    color: rgb(160, 160, 160);
    font-size: 1.1rem;
    line-height: 1.5;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
  }

  .songs {
    display: grid;
    gap: 1rem;
  }

  .song-link {
    display: block;
    padding: 1rem;
    background: rgb(20, 20, 20);
    border-radius: 8px;
    color: rgb(200, 200, 200);
    text-decoration: none;
    transition: all 0.2s ease;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    font-weight: 600;
  }

  .song-link:hover {
    background: rgb(30, 30, 30);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  }

  @media (max-width: 600px) {
    .song-list {
      margin: 1rem auto;
      padding: 1rem;
    }

    h1 {
      font-size: 2rem;
    }

    .description {
      font-size: 1rem;
      margin-bottom: 2rem;
      padding: 0 1rem;
    }
  }
</style>
