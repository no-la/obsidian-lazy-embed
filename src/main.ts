import { Plugin, PluginSettingTab, App, Setting } from "obsidian";
import { providers } from "./providers/index";
import { processElements } from "./embedder";
import { LazyEmbedSettings, DEFAULT_SETTINGS } from "./settings";
import { watchEditorForEmbeds } from "./livePreview";

export default class LazyEmbedPlugin extends Plugin {
	settings!: LazyEmbedSettings;
	private livePreviewObserver: MutationObserver | null = null;

	async onload() {
		await this.loadSettings();

		this.registerMarkdownPostProcessor((element) => {
			processElements(element, providers, this.settings.enabledProviders);
		});

		this.app.workspace.onLayoutReady(() => {
			this.livePreviewObserver = watchEditorForEmbeds(
				this.app.workspace.containerEl,
				providers,
				() => this.settings
			);
		});

		this.addSettingTab(new LazyEmbedSettingTab(this.app, this));
	}

	async onunload() {
		this.livePreviewObserver?.disconnect();
	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}

class LazyEmbedSettingTab extends PluginSettingTab {
	plugin: LazyEmbedPlugin;

	constructor(app: App, plugin: LazyEmbedPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const { containerEl } = this;
		containerEl.empty();

		for (const provider of providers) {
			new Setting(containerEl)
				.setName(provider.name)
				.addToggle((toggle) =>
					toggle
						.setValue(this.plugin.settings.enabledProviders[provider.id] ?? true)
						.onChange(async (value) => {
							this.plugin.settings.enabledProviders[provider.id] = value;
							await this.plugin.saveSettings();
						})
				);
		}
	}
}
