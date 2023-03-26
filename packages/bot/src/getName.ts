import { getName } from "utils"

// Simple utility to get / generate the device's name

const name = await getName()
console.log(name)
process.exit(0)