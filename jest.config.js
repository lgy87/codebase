/*
 * Guangyao Li
 * 2018/11/21
 * lgy87@foxmail.com
 */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const config = require("./bit.jest.config")
module.exports = {
  ...config,
  roots: ["<rootDir>/src"],
}
