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
const styles: Styles = {
	sheets: {},
	add(origin: string, id: string, sheet: string) {
		if (!this.sheets[origin]) {
			this.sheets[origin] = [];
		}
		if (this.sheets[origin].find((style) => style.id === id)) {
			this.remove(origin, id);
		}
		this.sheets[origin].push({
			id,
			sheet
		});
		DOM.addStyle(`${origin}@${id}`, sheet);
	},
	remove(origin: string, id: string) {
		if (!this.sheets[origin]) return;
		const sheet = this.sheets[origin].find((style) => style.id === id);
		if (!sheet) return;
		this.sheets[origin].splice(this.sheets[origin].indexOf(sheet));
		DOM.removeStyle(`${origin}@${id}`);
	},
	reset(origin: string) {
		if (!this.sheets[origin]) return;
		for (const sheet of this.sheets[origin]) {
			DOM.removeStyle(`${origin}@${sheet.id}`);
		}
		delete this.sheets[origin];
	}
}

const updatePlugin = async (name: string, version: string): Promise<void> => {
	return;
}
const notify = (title: string, description: string) => {

}
window.sleezzi = {
	styles: styles,
	state: "installed"
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
			Data.save("first", false);
		}
		window.sleezzi = {
			styles: styles,
			notify: notify,
			state: "active"
		}
	},
	stop: () => {
		window.sleezzi = {
			styles: styles,
			state: "installed"
		}
	},
	getSettingsPanel: () => {
		const container = document.createElement("div");
		
		return container;
	}
});
module.exports = plugin;