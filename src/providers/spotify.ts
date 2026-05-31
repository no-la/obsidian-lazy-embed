import type { EmbedProvider } from "./EmbedProvider";

export class SpotifyProvider implements EmbedProvider {
	id = "spotify";
	name = "Spotify";

	canEmbed(url: string): boolean {
		return /^https:\/\/open\.spotify\.com\/(intl-[a-z]+\/)?(track|album|playlist|episode|show)\//.test(url);
	}

	toEmbedUrl(url: string): string {
		const match = url.match(/open\.spotify\.com\/(?:intl-[a-z]+\/)?(track|album|playlist|episode|show)\/([A-Za-z0-9]+)/);
		if (!match) return url;
		const [, type, id] = match;
		return `https://open.spotify.com/embed/${type}/${id}`;
	}
}
