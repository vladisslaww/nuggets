import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/svelte';
import Page from './+page.svelte';

// Mock Web Audio API
class AudioContextMock {
  close = vi.fn()
  createAnalyser() {
    return {
      connect: vi.fn(),
      disconnect: vi.fn(),
      frequencyBinCount: 32,
      getByteFrequencyData: vi.fn(),
    };
  }
  createMediaElementSource() {
    return {
      connect: vi.fn()
    };
  }
}
vi.stubGlobal('AudioContext', AudioContextMock);

describe('Player Page', () => {
  it('renders player with correct song', () => {
    const mockSong = '03.03.2025.flac';
    const { container } = render(Page, {
      props: {
        data: { song: mockSong, prev: null, next: null }
      }
    });

    const heading = container.querySelector('h1');
    expect(heading).toBeInTheDocument();
    expect(heading?.textContent).toBe('03.03.2025');

    const backButton = container.querySelector('.back-button');
    expect(backButton).toBeInTheDocument();
    expect(backButton?.getAttribute('href')).toBe('/');
    expect(backButton?.textContent).toBe('← Back to Songs');

    const audioPlayer = container.querySelector('audio');
    expect(audioPlayer).toBeInTheDocument();
    expect(audioPlayer?.getAttribute('src')).toBe(`/audio/${mockSong}`);
  });

  it('links to the previous and next songs', () => {
    const { container } = render(Page, {
      props: {
        data: { song: '2025.03.08.flac', prev: '2025.03.09.flac', next: '2025.03.07.flac' }
      }
    });

    expect(container.querySelector('.prev-button')?.getAttribute('href')).toBe('/player/2025.03.09.flac');
    expect(container.querySelector('.next-button')?.getAttribute('href')).toBe('/player/2025.03.07.flac');
  });

  it('disables prev/next at the ends of the list', () => {
    const { container } = render(Page, {
      props: {
        data: { song: '2025.03.08.flac', prev: null, next: null }
      }
    });

    expect(container.querySelector('.prev-button')).toBeNull();
    expect(container.querySelector('.next-button')).toBeNull();
    expect(container.querySelectorAll('.nav-button.disabled')).toHaveLength(2);
  });
}); 