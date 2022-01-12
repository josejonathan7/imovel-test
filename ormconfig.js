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
		"host": "database",
		//"url": process.env.URL ? process.env.URL : "",
		"port": +process.env.DB_PORT,
		"username": process.env.DB_USERNAME,
		"password": process.env.DB_PASSWORD,
		"database": process.env.DB_NAME,
		"entities": [ "src/entitys/*.ts" ],
		"migrations": [ "src/database/migrations/*.ts" ],
		"cli":{
			"migrationsDir": "src/database/migrations/",
			"entitiesDir": "src/entitys"
		},
		"synchronize": process.env.DB_SYNC === "true"
	}
];
