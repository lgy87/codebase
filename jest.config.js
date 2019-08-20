/*
 * Guangyao Li
 * 2018/11/21
 * lgy87@foxmail.com
 */
module.exports = {
  bail: true,
  verbose: true,
  roots: ["<rootDir>/src"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  moduleDirectories: ["<rootDir>/src", "node_modules"],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
    "^.+\\.jsx?$": "babel-jest",
  },
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(j|t)sx?$",
  setupFiles: ["<rootDir>/tests/shim.ts", "<rootDir>/tests/setupTests.ts"],
  moduleNameMapper: {
    "~(.*)$": "<rootDir>/src/$1",
  },
}
