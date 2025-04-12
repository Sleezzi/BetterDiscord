import { JSX } from "react";

declare global {
	type BDPlugin = () => ({
		start: () => void;
		stop: () => void;
		getSettingsPanel?: () => JSX.Element | HTMLElement;
	});
}