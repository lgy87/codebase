/*
 * Guangyao Li
 * 2017/11/22
 * lgy87@foxmail.com
 */
import { JSDOM } from "jsdom"
;(global as any).window = new JSDOM("", { url: "http://localhost" }).window
