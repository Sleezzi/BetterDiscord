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

const config = {
    name: "Sleezzi's lib",
    description: "Ce plugin permet au autre plugin fait par Sleezzi de fonctionner correctement",
    version: "1.0.0",
    settings: {},
    changelog: []
};
const { Data, UI, Webpack, DOM } = new BdApi(config.name);
const react = BdApi.React;
const styles = {
    sheets: {},
    add(origin, id, sheet) {
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
    remove(origin, id) {
        if (!this.sheets[origin])
            return;
        const sheet = this.sheets[origin].find((style) => style.id === id);
        if (!sheet)
            return;
        this.sheets[origin].splice(this.sheets[origin].indexOf(sheet));
        DOM.removeStyle(`${origin}@${id}`);
    },
    reset(origin) {
        if (!this.sheets[origin])
            return;
        for (const sheet of this.sheets[origin]) {
            DOM.removeStyle(`${origin}@${sheet.id}`);
        }
        delete this.sheets[origin];
    }
};
const updatePlugin = async (name, version) => {
    return;
};
const notify = (title, description) => {
};
window.sleezzi = {
    styles: styles,
    state: "installed"
};
/** */
const plugin = () => ({
    start: async () => {
        if (!await Data.load("first")) {
            const title = react.createElement("div", {
                className: "title-container"
            }, react.createElement("h1", {
                className: "title"
            }, config.name.toUpperCase()));
            const items = react.createElement("h1", {
                className: "text",
            }, "En continuant vous acceptez que les mises à jour se fasse directement avec GitHub ce qui contourne la vérification de sécurité de Better Discord");
            UI.alert(title, items);
            Data.save("first", false);
        }
        window.sleezzi = {
            styles: styles,
            notify: notify,
            state: "active"
        };
    },
    stop: () => {
        window.sleezzi = {
            styles: styles,
            state: "installed"
        };
    },
    getSettingsPanel: () => {
        const container = document.createElement("div");
        return container;
    }
});
module.exports = plugin;
