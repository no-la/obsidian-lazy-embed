import type { EmbedProvider } from "./EmbedProvider";

export class SpotifyProvider implements EmbedProvider {
	id = "spotify";
	name = "Spotify";

	canEmbed(url: string): boolean {
		return /^https:\/\/open\.spotify\.com\/(track|album|playlist)\//.test(url);
	}

	toEmbedUrl(url: string): string {
		return url.replace("open.spotify.com/", "open.spotify.com/embed/");
	}
}
