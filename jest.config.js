/*
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

module.exports = {
	// All imported modules in your tests should be mocked automatically
	// automock: false,

	// Stop running tests after `n` failures
	bail: true,

	// The directory where Jest should store its cached dependency information
	// cacheDirectory: "C:\\Users\\aluno3\\AppData\\Local\\Temp\\2\\jest",

	// Automatically clear mock calls, instances and results before every test
	clearMocks: true,

	// Indicates whether the coverage information should be collected while executing the test
	collectCoverage: false,

	// An array of glob patterns indicating a set of files for which coverage information should be collected
	collectCoverageFrom: [
		"src/**",
		"!src/database/**",
		"!src/entitys/**",
		"!src/repositories/**",
		"!src/server.ts"
	],

	// The directory where Jest should output its coverage files
	coverageDirectory: "__tests__/coverage",

	// An array of regexp pattern strings used to skip coverage collection
	coveragePathIgnorePatterns: [
		"./node_modules"
	],

	// Indicates which provider should be used to instrument code for coverage
	coverageProvider: "v8",

	testMatch: [
		"**/__tests__/**/*.test.ts",
		"!**/__tests__/unit/user.test.ts",
		"!**/__tests__/integration/user.test.ts",
		"!**/__tests__/unit/product.test.ts",
		//"!**/__tests__/integration/product.test.ts"
	],
	preset: "ts-jest",
};
