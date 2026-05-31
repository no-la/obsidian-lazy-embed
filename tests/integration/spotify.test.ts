import { describe, it, expect } from "vitest";
import { processElements } from "../../src/embedder";
import { SpotifyProvider } from "../../src/providers/spotify";

const providers = [new SpotifyProvider()];

function makeContainer(html: string): HTMLElement {
	const el = document.createElement("div");
	el.innerHTML = html;
	return el;
}

describe("Spotify integration", () => {
	it("embeds a track URL", () => {
		const container = makeContainer(
			`<img src="https://open.spotify.com/track/4iV5W9uYEdYUVa79Axb7Rh">`
		);
		processElements(container, providers, { spotify: true });

		expect(container.querySelector("img")).toBeNull();
		expect(container.querySelector("iframe")?.src).toBe(
			"https://open.spotify.com/embed/track/4iV5W9uYEdYUVa79Axb7Rh"
		);
	});

	it("embeds an album URL", () => {
		const container = makeContainer(
			`<img src="https://open.spotify.com/album/1DFixLWuPkv3KT3TnV35m3">`
		);
		processElements(container, providers, { spotify: true });

		expect(container.querySelector("iframe")?.src).toBe(
			"https://open.spotify.com/embed/album/1DFixLWuPkv3KT3TnV35m3"
		);
	});

	it("does not embed when Spotify is disabled", () => {
		const container = makeContainer(
			`<img src="https://open.spotify.com/track/4iV5W9uYEdYUVa79Axb7Rh">`
		);
		processElements(container, providers, { spotify: false });

		expect(container.querySelector("img")).not.toBeNull();
		expect(container.querySelector("iframe")).toBeNull();
	});
});
