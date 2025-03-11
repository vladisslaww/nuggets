/// <reference types="@sveltejs/kit" />
/// <reference types="svelte" />
/// <reference types="d3" />

// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
declare namespace svelteHTML {
	interface HTMLAttributes<T> {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		'on:play'?: (event: CustomEvent<any> & { target: EventTarget & T }) => void;
	}
}

export {};
