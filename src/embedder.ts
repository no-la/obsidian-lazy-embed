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
		iframe.classList.add("lazy-embed");
		iframe.style.width = "100%";
		iframe.style.height = "152px";
		iframe.style.border = "none";
		iframe.style.borderRadius = "12px";
		iframe.style.display = "block";
		img.replaceWith(iframe);

		// Obsidian の image-embed/image-wrapper コンテナを full-width に展開する
		for (const cls of ["image-wrapper", "image-embed"]) {
			const el = iframe.closest<HTMLElement>(`.${cls}`);
			if (el) el.style.width = "100%";
		}
	}
}
