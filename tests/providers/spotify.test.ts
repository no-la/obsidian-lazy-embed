import { describe, it, expect } from "vitest";
import { SpotifyProvider } from "../../src/providers/spotify";

const provider = new SpotifyProvider();

describe("SpotifyProvider", () => {
	describe("canEmbed", () => {
		it("returns true for a track URL", () => {
			expect(provider.canEmbed("https://open.spotify.com/track/4iV5W9uYEdYUVa79Axb7Rh")).toBe(true);
		});

		it("returns true for an album URL", () => {
			expect(provider.canEmbed("https://open.spotify.com/album/1DFixLWuPkv3KT3TnV35m3")).toBe(true);
		});

		it("returns true for a playlist URL", () => {
			expect(provider.canEmbed("https://open.spotify.com/playlist/37i9dQZF1DXcBWIGoYBM5M")).toBe(true);
		});

		it("returns false for a non-Spotify URL", () => {
			expect(provider.canEmbed("https://www.youtube.com/watch?v=dQw4w9WgXcQ")).toBe(false);
		});

		it("returns false for an empty string", () => {
			expect(provider.canEmbed("")).toBe(false);
		});
	});

	describe("toEmbedUrl", () => {
		it("converts a track URL to embed URL", () => {
			expect(provider.toEmbedUrl("https://open.spotify.com/track/4iV5W9uYEdYUVa79Axb7Rh"))
				.toBe("https://open.spotify.com/embed/track/4iV5W9uYEdYUVa79Axb7Rh");
		});

		it("converts an album URL to embed URL", () => {
			expect(provider.toEmbedUrl("https://open.spotify.com/album/1DFixLWuPkv3KT3TnV35m3"))
				.toBe("https://open.spotify.com/embed/album/1DFixLWuPkv3KT3TnV35m3");
		});

		it("converts a playlist URL to embed URL", () => {
			expect(provider.toEmbedUrl("https://open.spotify.com/playlist/37i9dQZF1DXcBWIGoYBM5M"))
				.toBe("https://open.spotify.com/embed/playlist/37i9dQZF1DXcBWIGoYBM5M");
		});
	});
});
