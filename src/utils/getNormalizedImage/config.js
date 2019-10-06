export const normalizedImageCategory = /(?<=\.(?<extension>png|jpg|jpeg))(?<size>32|64|120|200)\.\1$/
export const supportedFormat = /\.(?:png|jpg|jpeg)$/
export const supportedSize = [32, 64, 120, 200]
export const ignoredFormat = /\.(?:big|small|teamlogo)\./
