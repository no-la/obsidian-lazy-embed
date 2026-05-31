import type { EmbedProvider } from "./providers/EmbedProvider";
import type { LazyEmbedSettings } from "./settings";
import { processElements } from "./embedder";

export function watchEditorForEmbeds(
	root: HTMLElement,
	providers: EmbedProvider[],
	getSettings: () => LazyEmbedSettings
): MutationObserver {
	const process = (node: Node) => {
		if (node instanceof HTMLElement) {
			processElements(node, providers, getSettings().enabledProviders);
		}
	};

	const observer = new MutationObserver((mutations) => {
		for (const { addedNodes } of mutations) {
			addedNodes.forEach(process);
		}
	});

	observer.observe(root, { childList: true, subtree: true });
	// 既にレンダリング済みの要素も処理する
	processElements(root, providers, getSettings().enabledProviders);

	return observer;
}
