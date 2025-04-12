import { JSX } from "react";


type ElementsTree = {
	[K in keyof HTMLElementTagNameMap]: HTMLElementTagNameMap[K] & {
		children?: ElementsTree[];
	};
};
declare global {
	type Config = {
		name: string;
		description: string;
		version: `${number}.${number}.${number}`;
		settings: ElementsTree | {};
		changelog: {
			title: string;
			type: "added" | "changed" | "improved" | "fixed" | "comming-soon";
			items: string[]
		}[],
		update: string;
		changelogDate?: `${number}/${number}/${number}`;
	};
	interface Window {
		sleezzi: {
			styles: Styles;
			start: (name: string, update: string, version: string) => Promise<"Up to date" | "Updated" | {
				error: string;
			}>
			notify: (title: string, description: string) => void;
			alert: Alert;
			state: "active";
		} | {
			styles: Styles;
			notify: (title: string, description: string) => void;
			alert: Alert;
			state: "installed";
		} | {
			state: "installed" | "installing" | "null";
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
	type Alert = (props: {
		title: string,
		subtitle?: string,
		sections: {
			title: string,
			items: string[],
			color?: string
		}[]
	}) => void;
}