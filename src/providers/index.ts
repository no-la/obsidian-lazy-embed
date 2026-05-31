import type { EmbedProvider } from "./EmbedProvider";
import { SpotifyProvider } from "./spotify";

export const providers: EmbedProvider[] = [
	new SpotifyProvider(),
];
