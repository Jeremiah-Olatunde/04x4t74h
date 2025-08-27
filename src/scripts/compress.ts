import path from "node:path"
import url from "node:url"

import sharp from "sharp"

// const relativePathInput = "../../public/images/thumbs-up.png"
// const relativePathOutput = "../../public/images/thumbs-up-compressed.webp"

// const relativePathInput = "../../public/images/bg-guest.png"
// const relativePathOutput = "../../public/images/bg-guest-compressed.webp"

// const relativePathInput = "../../public/images/kimbo.png"
// const relativePathOutput = "../../public/images/kimbo-compressed.webp"

const relativePathInput = "../../public/images/bg-ask-kimbo.png"
const relativePathOutput = "../../public/images/bg-ask-kimbo-compressed.webp"

const directory = path.dirname(url.fileURLToPath(import.meta.url))
const filePathInput = path.resolve(directory, relativePathInput)
const filePathOutput = path.resolve(directory, relativePathOutput)

await sharp(filePathInput).webp({ quality: 60 }).toFile(filePathOutput)
