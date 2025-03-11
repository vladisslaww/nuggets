<script lang="ts">
  import { onMount } from 'svelte';
  import * as d3 from 'd3';
  
  export let songPath: string;
  
  let audioElement: HTMLAudioElement;
  let audioContext: AudioContext;
  let analyser: AnalyserNode;
  let svg: SVGSVGElement;
  let dataArray: Uint8Array;
  let animationId: number;
  let containerWidth: number;
  let container: HTMLDivElement;
  
  const margin = { top: 20, right: 20, bottom: 20, left: 20 };
  const height = 250 - margin.top - margin.bottom;
  
  $: width = containerWidth ? containerWidth - margin.left - margin.right : 800 - margin.left - margin.right;
  
  function calculateMelFrequencyRanges(sampleRate: number, binCount: number) {
    const nyquist = sampleRate / 2;
    
    // Convert frequency to mel scale
    const freqToMel = (f: number) => 2595 * Math.log10(1 + f / 700);
    // Convert mel back to frequency
    const melToFreq = (m: number) => 700 * (Math.pow(10, m / 2595) - 1);
    
    const minMel = freqToMel(10);  // Start from 10Hz
    const maxMel = freqToMel(nyquist);
    const stepMel = (maxMel - minMel) / binCount;
    
    return Array.from({ length: binCount }, (_, i) => {
      const melStart = minMel + i * stepMel;
      const melEnd = minMel + (i + 1) * stepMel;
      return {
        start: Math.round(melToFreq(melStart)),
        end: Math.round(melToFreq(melEnd))
      };
    });
  }
  
  function setupVisualization() {
    const svgElement = d3.select(svg);
    svgElement.selectAll("*").remove();
    
    const g = svgElement
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);
    
    const x = d3.scaleBand()
      .range([0, width])
      .padding(0.1)
      .domain(d3.range(32).map(String));
    
    return { g, x };
  }
  
  function processFrequencyData(ranges: { start: number, end: number }[], data: Uint8Array, sampleRate: number) {
    const bins = new Array(ranges.length).fill(0);
    
    for (let i = 0; i < data.length; i++) {
      const frequency = (i * sampleRate) / (2 * data.length);
      const binIndex = ranges.findIndex((range, idx) => {
        if (idx === 0) return frequency < range.end;
        return frequency >= range.start && frequency < range.end;
      });
      
      if (binIndex !== -1) {
        const currentValue = bins[binIndex];
        const count = currentValue === 0 ? 0 : 1;
        bins[binIndex] = (currentValue * count + data[i]) / (count + 1);
      }
    }
    
    // Apply smoothing
    return bins.map((value, i, arr) => {
      if (i === 0 || i === arr.length - 1) return value;
      return (arr[i - 1] + value + arr[i + 1]) / 3;
    });
  }
  
  function draw() {
    animationId = requestAnimationFrame(draw);
    
    analyser.getByteFrequencyData(dataArray);
    
    const melBins = processFrequencyData(
      calculateMelFrequencyRanges(audioContext.sampleRate, 32),
      dataArray,
      audioContext.sampleRate
    );
    
    updateBars(melBins);
  }
  
  function updateBars(bins: number[]) {
    const { g, x } = setupVisualization();
    const centerY = height / 2;
    
    const bars = g.selectAll<SVGRectElement, number>("rect")
      .data(bins);
    
    bars.enter()
      .append("rect")
      .merge(bars)
      .attr("x", (_: number, i: number) => x(i.toString()) || 0)
      .attr("y", (d: number) => centerY - Math.abs(d) / 2)
      .attr("width", x.bandwidth())
      .attr("height", (d: number) => Math.max(1, Math.abs(d)))
      .attr("fill", (d: number) => `rgb(${d}, ${d}, ${d})`)
      .attr("rx", 3)
      .attr("ry", 3);
    
    bars.exit().remove();
  }
  
  function handleResize() {
    if (container) {
      containerWidth = container.clientWidth;
      if (audioContext && analyser) {
        analyser.getByteFrequencyData(dataArray);
        const melBins = processFrequencyData(
          calculateMelFrequencyRanges(audioContext.sampleRate, 32),
          dataArray,
          audioContext.sampleRate
        );
        updateBars(melBins);
      }
    }
  }
  
  onMount(() => {
    audioContext = new AudioContext();
    analyser = audioContext.createAnalyser();
    const source = audioContext.createMediaElementSource(audioElement);
    source.connect(analyser);
    analyser.connect(audioContext.destination);
    
    analyser.fftSize = 2048;
    dataArray = new Uint8Array(analyser.frequencyBinCount);
    
    // Initial container width
    containerWidth = container.clientWidth;
    setupVisualization();
    
    // Add resize listener
    window.addEventListener('resize', handleResize);
    
    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
      if (audioContext) {
        audioContext.close();
      }
      window.removeEventListener('resize', handleResize);
    };
  });
  
  function handlePlay() {
    if (audioContext.state === 'suspended') {
      audioContext.resume();
    }
    draw();
  }
</script>

<div class="audio-player" bind:this={container}>
  <audio
    bind:this={audioElement}
    src={songPath}
    controls
    on:play={handlePlay}
    class="custom-audio"
  ></audio>
  <svg
    bind:this={svg}
    width={width + margin.left + margin.right}
    height={height + margin.top + margin.bottom}
    class="visualizer"
  ></svg>
</div>

<style>
  :global(body) {
    margin: 0;
    padding: 0;
    background: rgb(10, 10, 10);
    color: rgb(200, 200, 200);
    min-height: 100vh;
  }

  .audio-player {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
    padding: 2rem;
    width: 100%;
    max-width: 800px;
    margin: 0 auto;
    box-sizing: border-box;
  }
  
  .visualizer {
    width: 100%;
    background: rgb(20, 20, 20);
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  }
  
  .custom-audio {
    width: 100%;
    filter: invert(0.85);
  }

  :global(audio::-webkit-media-controls-panel) {
    background: rgb(30, 30, 30);
  }

  :global(audio::-webkit-media-controls-current-time-display),
  :global(audio::-webkit-media-controls-time-remaining-display) {
    color: rgb(200, 200, 200);
  }

  @media (max-width: 600px) {
    .audio-player {
      padding: 1rem;
      gap: 1rem;
    }
  }
</style> 