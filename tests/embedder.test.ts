import { describe, it, expect } from "vitest";
import { processElements } from "../src/embedder";
import type { EmbedProvider } from "../src/providers/EmbedProvider";

const mockProvider: EmbedProvider = {
	id: "mock",
	name: "Mock",
	canEmbed: (url: string) => url.startsWith("https://mock.example.com/"),
	toEmbedUrl: (url: string) => url.replace("mock.example.com/", "mock.example.com/embed/"),
};

function makeContainer(html: string): HTMLElement {
	const el = document.createElement("div");
	el.innerHTML = html;
	return el;
}

describe("processElements", () => {
	it("replaces a matching img with an iframe", () => {
		const container = makeContainer(`<img src="https://mock.example.com/item/123">`);
		processElements(container, [mockProvider], { mock: true });

		expect(container.querySelector("img")).toBeNull();
		const iframe = container.querySelector("iframe");
		expect(iframe).not.toBeNull();
		expect(iframe?.src).toBe("https://mock.example.com/embed/item/123");
	});

	it("does not replace img when provider is disabled", () => {
		const container = makeContainer(`<img src="https://mock.example.com/item/123">`);
		processElements(container, [mockProvider], { mock: false });

		expect(container.querySelector("img")).not.toBeNull();
		expect(container.querySelector("iframe")).toBeNull();
	});

	it("does not replace img for unmatched URL", () => {
		const container = makeContainer(`<img src="https://other.example.com/image.png">`);
		processElements(container, [mockProvider], { mock: true });

		expect(container.querySelector("img")).not.toBeNull();
		expect(container.querySelector("iframe")).toBeNull();
	});

	it("replaces multiple matching imgs", () => {
		const container = makeContainer(`
			<img src="https://mock.example.com/item/aaa">
			<img src="https://mock.example.com/item/bbb">
		`);
		processElements(container, [mockProvider], { mock: true });

		expect(container.querySelectorAll("img")).toHaveLength(0);
		expect(container.querySelectorAll("iframe")).toHaveLength(2);
	});

	it("skips imgs with no src", () => {
		const container = makeContainer(`<img>`);
		processElements(container, [mockProvider], { mock: true });

		expect(container.querySelector("img")).not.toBeNull();
		expect(container.querySelector("iframe")).toBeNull();
	});
});
