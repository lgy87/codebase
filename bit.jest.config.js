/*
 * Guangyao Li
 * 2018/11/21
 * lgy87@foxmail.com
 */
module.exports = {
  bail: true,
  verbose: true,
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  transform: {
    "^.+\\.(j|t)sx?$": "ts-jest",
  },
  testRegex: "(test|spec)\\.(j|t)sx?$",
  setupFiles: ["<rootDir>/tests/shim.ts", "<rootDir>/tests/setupTests.ts"],
  moduleNameMapper: {
    "~/(.*)$": "<rootDir>/src/$1",
  },
}
