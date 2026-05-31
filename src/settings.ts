export interface LazyEmbedSettings {
	enabledProviders: Record<string, boolean>;
}

export const DEFAULT_SETTINGS: LazyEmbedSettings = {
	enabledProviders: {
		spotify: true,
	},
};
