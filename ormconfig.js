module.exports = [
	{
		"name": "tests",
		"type": "sqlite",
		"database":  "database.sqlite",
		"maxQueryExecutionTime": 20000,
		"entities": ["./src/entitys/*.ts"],
		"migrations": [ "./src/database/migrationsSqlite/*.ts" ],
		"cli":{
			"migrationsDir": "./src/database/migrationsSqlite/",
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
