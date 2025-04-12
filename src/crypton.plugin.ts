/**
 * @version 1.0.0
 * @name Crypton
 * @description Chiffré vos conversations privrées pour qu'elles le soient réellement
 * @author Sleezzi
 * @authorId 542703093981380628
 * @website https://crypton.sleezzi.fr
 * @source https://github.com/Sleezzi/BetterDiscord/
*/

/// <reference path="./types/BetterDiscord.d.ts" />
/// <reference path="../node_modules/@types/betterdiscord/bdapi.d.ts" />
const fs = require("fs") as typeof import("fs");
const { join } = require("path") as typeof import("path");


/** */
const config: Config = {
	name: "Crypton",
	description: "Chiffré vos conversations privrées pour qu'elles le soient réellement",
	version: "1.0.0",
	settings: {},
	changelog: [
		{
			title: "Ajouté",
			type: "added",
			items: [
				"Ajouté"
			]
		},
		{
			title: "Modifié",
			type: "changed",
			items: [
				"Modifié"
			]
		},
		{
			title: "Amélioré",
			type: "improved",
			items: [
				"Amélioré"
			]
		},
		{
			title: "Corrigé",
			type: "fixed",
			items: [
				"Corrigé"
			]
		},
		{
			title: "Comming soon",
			type: "comming-soon",
			items: [
				"Comming soon"
			]
		},
	],
	update: "https://raw.githubusercontent.com/Sleezzi/BetterDiscord/refs/heads/crypton/crypton.plugin.js"
}

const react = BdApi.React;
const sheets: string[] = [];

const {
	Data,
	UI,
	Webpack,
	DOM
} = new BdApi(config.name);

const showChangeLog = async () => {
	if (!window.sleezzi || window.sleezzi.state !== "active") return;
	if (await Data.load("version") === config.version) return;
	if (config.changelog.length === 0) return;
	const i18n: { getLocale: () => Intl.LocalesArgument } = Webpack.getByKeys("getLocale");

	const formatter = new Intl.DateTimeFormat(i18n.getLocale(), {
		month: "long",
		day: "numeric",
		year: "numeric"
	});
	window.sleezzi.alert({
		title: `Changelog - ${config.name}`,
		subtitle: `${formatter.format(config.changelogDate as any)} - v${config.version}`,
		sections: config.changelog.map((section: any) => {
			const mapedSection = {...section};
			if (mapedSection.type === "added") {
				mapedSection.color = "green";
			}
			if (mapedSection.type === "changed") {
				mapedSection.color = "orange";
			}
			if (mapedSection.type === "improved") {
				mapedSection.color = "blue";
			}
			if (mapedSection.type === "fixed") {
				mapedSection.color = "red";
			}
			delete mapedSection.type;
			return mapedSection;
		})
	});
	Data.save("version", config.version);
}

const installPlugin = async (name: string, url: string) => {
	return new Promise<"Success" | "Aborted" | { error: any }>((resolve) => {
		UI.showConfirmationModal("Installation de plugin", `Vous êtes sur le point de télécharger le plugin [${name}](${url}).\nVoulez-vous continuer ?`, {
			confirmText: "Download Now",
			cancelText: "Cancel",
			onCancel: () => {
				resolve("Aborted");
			},
			onConfirm: async () => {
				const response = await fetch(url);
				if (response.status !== 200) {
					resolve({ error: `Error, code: ${response.status}` });
					return;
				}
				const txt = await response.text();
				if (fs.existsSync(join(__dirname, `${name}.plugin.js`))) {
					fs.writeFileSync(join(__dirname, `${name}.plugin.js`), ""); // reset the file
				}
				fs.writeFileSync(join(__dirname, `${name}.plugin.js`), txt);
				resolve("Success");
			}
		});
	});
}

const plugin: BDPlugin = () => ({
	start: async () => {
		if (!window.sleezzi || window.sleezzi.state === "null") {
			window.sleezzi = { state: "installing" };
			const response = await installPlugin("sleezzi's lib", "https://raw.githubusercontent.com/Sleezzi/BetterDiscord/refs/heads/lib/sleezzi's%20lib.plugin.js");
			if (response !== "Success") {
				window.sleezzi.state = "null";
			}
			return;
		}
		if (window.sleezzi.state === "installing") return;
		await showChangeLog();
		if (window.sleezzi.state === "active") {
			const update = await window.sleezzi.start(__filename.replace(__dirname, ""), config.update, config.version);
			console.log(update);
			
			if (update !== "Up to date") return;
		}
	},
	stop: () => {
		if (!window.sleezzi || window.sleezzi.state !== "active") return;
		window.sleezzi.styles.reset(config.name);
	}
});
module.exports = plugin;