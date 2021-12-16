// eslint-disable-next-line @typescript-eslint/no-var-requires
const { Database } = require("sqlite3");
// eslint-disable-next-line @typescript-eslint/no-var-requires

module.exports = [
	{
		"name": "tests",
		"type": "sqlite",
		"database":  "database.sqlite",
		"entities": ["./src/entitys/*.ts"],
		"migrations": [ "./src/database/migrations/*.ts" ],
		"cli":{
			"migrationsDir": "./src/database/migrations/",
			"entitiesDir": "./src/entitys"
		}

	},
	{
		"type": "postgres",
		"url": `${process.env.DATABASE_URL}`,
		"entities": [ "src/entitys/*.ts" ],
		"migrations": [ "src/database/migrations/*.ts" ],
		"cli":{
			"migrationsDir": "src/database/migrations/",
			"entitiesDir": "src/entitys"
		}
	}
];
