import { JSX } from "react";


type ElementsTree = {
	[K in keyof HTMLElementTagNameMap]: HTMLElementTagNameMap[K] & {
		children?: ElementsTree[];
	};
};
declare global {
	type BDPlugin = () => ({
		start: () => void,
		stop: () => void,
		getSettingsPanel?: () => JSX.Element | HTMLElement
	});
	type Config = {
		name: string,
		description: string,
		version: `${number}.${number}.${number}`,
		settings: ElementsTree | {},
		changelog: {
			title: string,
			type: "added" | "changed" | "improved" | "fixed" | "comming-soon",
			items: string[]
		}[],
		changelogDate?: `${number}/${number}/${number}`
	};
	interface Window {
		sleezzi?: {
			styles: {
				sheets: string[],
				load: () => void,
				unload: () => void
			},
			update: (name: string, url: string) => Promise<void>
		}
	}
}