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
		sleezzi: {
			styles: Styles;
			notify: (title: string, description: string) => void;
			state: "active";
		} | {
			styles: {
				sheets: {
					[origin: string]: {
						id: string;
						sheet: string;
					}[]
				};
				add: (origin: string, id: string, sheet: string) => void;
				remove: (origin: string, id: string) => void;
			};
			state: "installed";
		} | {
			state: "installing" | "null";
		}
	}
	type Styles = {
		sheets: {
			[origin: string]: {
				id: string;
				sheet: string;
			}[]
		};
		add: (origin: string, id: string, sheet: string) => void;
		remove: (origin: string, id: string) => void;
		reset: (origin: string) => void
	};
}