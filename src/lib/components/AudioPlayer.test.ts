import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, fireEvent } from '@testing-library/svelte';
import AudioPlayer from './AudioPlayer.svelte';

// Mock Web Audio API
class AudioContextMock {
  createAnalyser() {
    return {
      connect: vi.fn(),
      disconnect: vi.fn(),
      frequencyBinCount: 32,
      getByteFrequencyData: vi.fn(),
      close: vi.fn(),
    };
  }
  createMediaElementSource() {
    return {
      connect: vi.fn()
    };
  }
}


describe('AudioPlayer', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.stubGlobal('AudioContext', AudioContextMock);
  });

  it('renders audio element with correct source', () => {
    const { container } = render(AudioPlayer, { props: { songPath: '/audio/test.flac' } });
    const audio = container.querySelector('audio');
    expect(audio).toBeInTheDocument();
    expect(audio?.src).toContain('/audio/test.flac');
  });

  it('renders SVG visualizer with correct dimensions', () => {
    const { container } = render(AudioPlayer, { props: { songPath: '/audio/test.flac' } });
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
    expect(svg?.getAttribute('width')).toBe('800');
    expect(svg?.getAttribute('height')).toBe('250');
  });

  it('initializes audio context and analyzer on mount', () => {
    render(AudioPlayer, { props: { songPath: '/audio/test.flac' } });
    expect(global.AudioContext).toHaveBeenCalled();
  });

  it('starts visualization on play', async () => {
    const { container } = render(AudioPlayer, { props: { songPath: '/audio/test.flac' } });
    const audio = container.querySelector('audio');
    expect(audio).toBeInTheDocument();

    if (audio) {
      await fireEvent.play(audio);
      expect(global.requestAnimationFrame).toHaveBeenCalled();
    }
  });

  it('cleans up resources on unmount', () => {
    const { unmount } = render(AudioPlayer, { props: { songPath: '/audio/test.flac' } });
    unmount();
    expect(global.cancelAnimationFrame).toHaveBeenCalled();
  });
}); 