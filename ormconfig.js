//const { Database } = require("sqlite3");

module.exports = [
	{
		"type": "postgres",
		"url": `${process.env.DATABASE_URL}`,
		"entities": [ "src/entities/*.ts" ],
		"migrations": [ "src/database/migrations/*.ts" ],
		"cli":{
			"migrationsDir": "src/database/migrations/",
			"entitiesDir": "src/entities"
		}
	},
	{
		"type": "sqlite",
		"database":  "./__tests__/.database.sqlite",
		"name": "tests",
		"entities": [ "__tests__/database/entities/*.ts" ],
		"migrations": [ "__tests__/database/migrations/*.ts" ],
		"cli":{
			"migrationsDir": "__tests__/database/migrations/",
			"entitiesDir": "__tests__/database/entities"
		}
	}
];
