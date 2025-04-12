/**
 * @version 1.0.0
 * @name Sleezzi's lib
 * @description Ce plugin permet au autre plugin fait par Sleezzi de fonctionner correctement
 * @author Sleezzi
 * @authorId 542703093981380628
 * @website https://crypton.sleezzi.fr
 * @source https://github.com/Sleezzi/BetterDiscord
*/
/** */

/// <reference path="../node_modules/@types/betterdiscord/bdapi.d.ts" />
/// <reference path="./types/BetterDiscord.d.ts" />

const config: Config = {
	name: "Sleezzi's lib",
	description: "Ce plugin permet au autre plugin fait par Sleezzi de fonctionner correctement",
	version: "1.0.0",
	settings: {},
	changelog: []
}

const {
	Data,
	UI,
	Webpack,
	DOM
} = new BdApi(config.name);
const react = BdApi.React;
const Styles = {
	sheets: [],
	load() {
		DOM.addStyle(this.sheets.join("\n"))
	},
	unload() {
		DOM.removeStyle();
	}
}

const updatePlugin = async (name: string, version: string): Promise<void> => {

	return;
}

/** */
const plugin: BDPlugin = () => ({
	start: async () => {
		if (!await Data.load("first")) {
			const title = react.createElement(
				"div",
				{
					className: "title-container"
				},
				react.createElement("h1", {
					className: "title"
				}, config.name.toUpperCase())
			);
			const items = react.createElement(
				"h1",
				{
					className: "text",
				},
				"En continuant vous acceptez que les mises à jour se fasse directement avec GitHub ce qui contourne la vérification de sécurité de Better Discord"
			)
			UI.alert(title as any, items);
			// Data.save("first", false);
		}
		window.sleezzi = {
			styles: Styles,
			update: updatePlugin
		}
	},
	stop: () => {
		delete window.sleezzi;
	},
	getSettingsPanel: () => {
		const container = document.createElement("div");
		
		return container;
	}
});
module.exports = plugin;