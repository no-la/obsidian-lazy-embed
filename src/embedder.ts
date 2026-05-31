import type { EmbedProvider } from "./providers/EmbedProvider";

export function processElements(
	container: HTMLElement,
	providers: EmbedProvider[],
	enabledProviders: Record<string, boolean>
): void {
	const imgs = Array.from(container.querySelectorAll("img"));
	for (const img of imgs) {
		const src = img.getAttribute("src") ?? "";
		const provider = providers.find(
			(p) => enabledProviders[p.id] && p.canEmbed(src)
		);
		if (!provider) continue;

		const iframe = document.createElement("iframe");
		iframe.src = provider.toEmbedUrl(src);
		iframe.allow = "autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture";
		iframe.loading = "lazy";
		img.replaceWith(iframe);
	}
}
