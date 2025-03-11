import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/svelte';
import Page from './+page.svelte';

describe('Page', () => {
	const mockSongs = [
		'03.03.2025.flac',
		'04.03.2025.flac',
		'05.03.2025.flac'
	];

	it('renders song list correctly', () => {
		const { container, getAllByRole } = render(Page, {
			props: {
				data: { songs: mockSongs }
			}
		});

		const heading = container.querySelector('h1');
		expect(heading).toBeInTheDocument();
		expect(heading?.textContent).toBe('Nuggets');

		const description = container.querySelector('.description');
		expect(description).toBeInTheDocument();
		expect(description?.textContent).toBe('Nuggets is my experiment in consistency. How long can I last putting out a short beat every day?');

		const links = getAllByRole('link');
		expect(links).toHaveLength(mockSongs.length);
		
		links.forEach((link, index) => {
			expect(link).toHaveAttribute('href', `/player/${encodeURIComponent(mockSongs[index])}`);
			expect(link.textContent).toBe(mockSongs[index].replace('.flac', ''));
		});
	});

	it('renders empty list when no songs', () => {
		const { container, queryAllByRole } = render(Page, {
			props: {
				data: { songs: [] }
			}
		});

		const heading = container.querySelector('h1');
		expect(heading).toBeInTheDocument();
		expect(heading?.textContent).toBe('Nuggets');

		const description = container.querySelector('.description');
		expect(description).toBeInTheDocument();
		expect(description?.textContent).toBe('Nuggets is my experiment in consistency. How long can I last putting out a short beat every day?');
		
		const links = queryAllByRole('link');
		expect(links).toHaveLength(0);
	});
});
