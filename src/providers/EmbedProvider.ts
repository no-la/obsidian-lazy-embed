export interface EmbedProvider {
	id: string;
	name: string;
	canEmbed(url: string): boolean;
	toEmbedUrl(url: string): string;
}
