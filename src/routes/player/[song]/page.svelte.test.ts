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
        data: { song: mockSong }
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
}); 