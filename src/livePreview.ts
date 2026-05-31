import { ViewPlugin, DecorationSet, Decoration, WidgetType, ViewUpdate, EditorView } from "@codemirror/view";
import { RangeSetBuilder } from "@codemirror/state";
import type { EmbedProvider } from "./providers/EmbedProvider";
import type { LazyEmbedSettings } from "./settings";

const IMAGE_SYNTAX_RE = /!\[([^\]]*)\]\(([^)]+)\)/g;

class IframeWidget extends WidgetType {
	constructor(private embedUrl: string) {
		super();
	}

	eq(other: IframeWidget): boolean {
		return this.embedUrl === other.embedUrl;
	}

	toDOM(): HTMLElement {
		const iframe = document.createElement("iframe");
		iframe.src = this.embedUrl;
		iframe.allow = "autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture";
		iframe.loading = "lazy";
		return iframe;
	}
}

function buildDecorations(
	view: EditorView,
	providers: EmbedProvider[],
	settings: LazyEmbedSettings
): DecorationSet {
	const builder = new RangeSetBuilder<Decoration>();

	for (const { from, to } of view.visibleRanges) {
		const text = view.state.doc.sliceString(from, to);
		IMAGE_SYNTAX_RE.lastIndex = 0;
		let match;

		while ((match = IMAGE_SYNTAX_RE.exec(text)) !== null) {
			const start = from + match.index;
			const end = start + match[0].length;
			const url = match[2] ?? "";

			const hasCursor = view.state.selection.ranges.some(
				(r) => r.from <= end && r.to >= start
			);
			if (hasCursor) continue;

			const provider = providers.find(
				(p) => settings.enabledProviders[p.id] && p.canEmbed(url)
			);
			if (!provider) continue;

			builder.add(start, end, Decoration.replace({
				widget: new IframeWidget(provider.toEmbedUrl(url ?? "")),
			}));
		}
	}

	return builder.finish();
}

export function createLivePreviewExtension(
	providers: EmbedProvider[],
	getSettings: () => LazyEmbedSettings
) {
	return ViewPlugin.fromClass(
		class {
			decorations: DecorationSet;

			constructor(view: EditorView) {
				this.decorations = buildDecorations(view, providers, getSettings());
			}

			update(update: ViewUpdate) {
				if (update.docChanged || update.selectionSet || update.viewportChanged) {
					this.decorations = buildDecorations(update.view, providers, getSettings());
				}
			}
		},
		{ decorations: (v) => v.decorations }
	);
}
