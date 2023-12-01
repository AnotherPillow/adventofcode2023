const day = process.argv[2]
const debug = process.argv.length > 3 ? process.argv[3] == 'debug' : false

const code = require(`./solutions/day${day}`)

code.loadInput(debug)
code.part1()
code.part2()