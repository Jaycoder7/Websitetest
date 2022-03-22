class Database {
    static first_time = (db) => {
        const users = db.createObjectStore("users", {
            autoIncrement: true,
        });
        users.createIndex("username", "username", {
            unique: true,
        });
        const teams = db.createObjectStore("teams", {
            autoIncrement: true,
        });
        teams.createIndex("number", "number", {
            unique: true,
        });
        const matches = db.createObjectStore("matches", {
            autoIncrement: true,
        });
        matches.createIndex("team", "team");
        matches.createIndex("user", "user");
        db.createObjectStore("answers", {
            autoIncrement: true,
        });
        db.createObjectStore("categories", {
            autoIncrement: true,
        });
        const properties = db.createObjectStore("properties", {
            autoIncrement: true,
        });
        properties.createIndex("category", "category");

        const waitingMatches = db.createObjectStore("waiting_matches", {
            autoIncrement: true,
        });
        waitingMatches.createIndex("match", "match");
    };
    static WaitingMatches = class WaitingMatches {
        static insert = async({ db, match_id }) => {
            const txn = db.transaction("waiting_matches", "readwrite");
            const waitingMatches = txn.objectStore("waiting_matches");
            return await waitingMatches.add({ match: match_id });
        };
        static delete = async({ db, id }) => {
            const txn = db.transaction("waiting_matches", "readwrite");
            const waitingMatches = txn.objectStore("waiting_matches");
            await waitingMatches.delete(id);
        };
        static deleteByMatch = async({ db, match_id }) => {
            const txn = db.transaction("waiting_matches", "readwrite");
            const waitingMatches = txn.objectStore("waiting_matches");
            const index = waitingMatches.index("match");
            await waitingMatches.delete(await index.getKey(match_id));
        };
        static all = async({ db }) => {
            const txn = db.transaction("waiting_matches", "readonly");
            const objectStore = txn.objectStore("waiting_matches");
            const keys = await objectStore.getAllKeys();
            return (await objectStore.getAll()).map((item, index) => {
                return { id: keys[index], ...item };
            });
        };
    };
    static Matches = class Matches {
        static all = async({ db }) => {
            const txn = db.transaction("matches", "readonly");
            const objectStore = txn.objectStore("matches");
            const keys = await objectStore.getAllKeys();
            return (await objectStore.getAll()).map((item, index) => {
                return { id: keys[index], ...item };
            });
        };
        static getByTeam = async({ db, team_id }) => {
            const txn = db.transaction("matches", "readonly");
            const objectStore = txn.objectStore("matches");
            const index = objectStore.index("team");
            const keys = await index.getAllKeys(team_id);
            return (await index.getAll(team_id)).map((item, index) => {
                return { id: keys[index], ...item };
            });
        };
        static getById = async({ db, id }) => {
            const txn = db.transaction("matches", "readonly");
            const objectStore = txn.objectStore("matches");
            try {
                return await objectStore.get(id);
            } catch (error) {}
        };
        static delete = async({ db, id }) => {
            const txn = db.transaction("matches", "readwrite");
            const objectStore = txn.objectStore("matches");
            await objectStore.delete(id);
        };
    };
    static Categories = class Categories {
        static all = async({ db }) => {
            const txn = db.transaction("categories", "readonly");
            const objectStore = txn.objectStore("categories");
            const keys = await objectStore.getAllKeys();
            return (await objectStore.getAll()).map((item, index) => {
                return { id: keys[index], ...item };
            });
        };
        static delete = async({ db, id }) => {
            const txn = db.transaction("categories", "readwrite");
            const objectStore = txn.objectStore("categories");
            await objectStore.delete(id);
        };
        static clear = async({ db }) => {
            const txn = db.transaction("categories", "readwrite");
            const categories = txn.objectStore("categories");
            await categories.clear();
        };
        static getById = async({ db, id }) => {
            const txn = db.transaction("categories", "readonly");
            const categories = txn.objectStore("categories");
            try {
                return await categories.get(id);
            } catch (error) {}
        };
    };
    static Users = class Users {
        static clear = async({ db }) => {
            const txn = db.transaction("users", "readwrite");
            const users = txn.objectStore("users");
            await users.clear();
        };
        static getById = async({ db, id }) => {
            const txn = db.transaction("users", "readonly");
            const users = txn.objectStore("users");
            try {
                const query = await users.get(id);
                return query;
            } catch (err) {
                return undefined;
            }
        };
        static getByUsername = async({ db, username }) => {
            const txn = db.transaction("users", "readonly");
            const users = txn.objectStore("users");
            const index = users.index("username");
            try {
                const id = await index.getKey(username);
                const query = await index.get(username);
                return { id, ...query };
            } catch (err) {
                return undefined;
            }
        };
        static all = async({ db }) => {
            const txn = db.transaction("users", "readonly");
            const objectStore = txn.objectStore("users");
            const keys = await objectStore.getAllKeys();
            return (await objectStore.getAll()).map((item, index) => {
                return { id: keys[index], ...item };
            });
        };
        static delete = async({ db, id }) => {
            const txn = db.transaction("users", "readwrite");
            const objectStore = txn.objectStore("users");
            await objectStore.delete(id);
        };
    };
    static Teams = class Teams {
        static clear = async({ db }) => {
            const txn = db.transaction("teams", "readwrite");
            const teams = txn.objectStore("teams");
            await teams.clear();
        };
        static getById = async({ db, id }) => {
            const txn = db.transaction("teams", "readonly");
            const teams = txn.objectStore("teams");
            try {
                const query = await teams.get(id);
                return query;
            } catch (err) {
                return undefined;
            }
        };
        static getByNumber = async({ db, number }) => {
            const txn = db.transaction("teams", "readonly");
            const teams = txn.objectStore("teams");
            const index = teams.index("number");
            try {
                const query = await index.get(number);
                return query;
            } catch (err) {
                return undefined;
            }
        };
        static all = async({ db }) => {
            const txn = db.transaction("teams", "readonly");
            const objectStore = txn.objectStore("teams");
            const keys = await objectStore.getAllKeys();
            return (await objectStore.getAll()).map((item, index) => {
                return { id: keys[index], ...item };
            });
        };
        static delete = async({ db, id }) => {
            const txn = db.transaction("teams", "readwrite");
            const objectStore = txn.objectStore("teams");
            await objectStore.delete(id);
        };
    };
    static Properties = class Properties {
        static getByCategory = async({ db, category_id }) => {
            const txn = db.transaction("properties", "readonly");
            const objectStore = txn.objectStore("properties");
            const index = objectStore.index("category");
            const keys = await index.getAllKeys(category_id);
            return (await index.getAll(category_id)).map((item, index) => {
                return { id: keys[index], ...item };
            });
        };
        static delete = async({ db, id }) => {
            const txn = db.transaction("properties", "readwrite");
            const objectStore = txn.objectStore("properties");
            await objectStore.delete(id);
        };
        static all = async({ db }) => {
            const txn = db.transaction("properties", "readonly");
            const objectStore = txn.objectStore("properties");
            const keys = await objectStore.getAllKeys();
            return (await objectStore.getAll()).map((item, index) => {
                return { id: keys[index], ...item };
            });
        };
        static clear = async({ db }) => {
            const txn = db.transaction("properties", "readwrite");
            const properties = txn.objectStore("properties");
            await properties.clear();
        };
    };
    static insertProperty = async({ db, title, type, category_id }) => {
        const txn = db.transaction("properties", "readwrite");
        const properties = txn.objectStore("properties");
        await properties.add({
            title: title,
            type: type,
            category: category_id,
        });
    };
    static insertAnswer = async({ db, content, property_id, match_id }) => {
        const txn = db.transaction("answers", "readwrite");
        const answers = txn.objectStore("answers");
        await answers.add({
            content: content,
            property: property_id,
            match: match_id,
        });
    };
    static insertCategory = async({ db, title }) => {
        const txn = db.transaction("categories", "readwrite");
        const categories = txn.objectStore("categories");
        await categories.add({
            title,
        });
    };
    static insertUser = async({ db, username, name }) => {
        const txn = db.transaction("users", "readwrite");
        const users = txn.objectStore("users");
        return await users.add({
            username,
            name,
        });
    };
    static insertTeam = async({ db, number, name }) => {
        const txn = db.transaction("teams", "readwrite");
        const teams = txn.objectStore("teams");
        await teams.add({
            number,
            name,
        });
    };
    static insertMatch = async({ db, team_id, user_id }) => {
        const txn = db.transaction("matches", "readwrite");
        const matches = txn.objectStore("matches");
        return await matches.add({
            team: team_id,
            user: user_id,
        });
    };
}
export default Database;