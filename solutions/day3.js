let input = ''

module.exports = {
    loadInput: (debug) => {
        input = require('fs').readFileSync(debug ? 'input/day3-sample.txt' : 'input/day3.txt').toString()
            .split('\n')
            .map(x=>x.trim())
        const parts = []
        for (const [y, l] of input.entries()) {
            for (const m of l.matchAll(/\d+/g))
                parts.push({ x: m.index, y, char: m[0], value: parseInt(m[0]) })

            for (const m of l.matchAll(/[^0-9\.]/g))
                parts.push({ x: m.index, y, char: m[0] })
        }
        input = parts
    },
    isAdjacent: (part, symbol) => {
        const x1 = part.x - 1
        const x2 = part.x + part.char.length
        const y1 = part.y - 1
        const y2 = part.y + 1
        return (
            symbol.x >= x1 && symbol.x <= x2 && symbol.y >= y1 && symbol.y <= y2
        )
    },
        
    part1: function () {
        const parts = input
        const numbers = parts.filter(e => e.char.match(/\d/))
        const symbols = parts.filter(e => e.char.match(/[^0-9\.]/))

        console.log('PART 1: ' + 
            numbers
                .filter(n => symbols.some(s => this.isAdjacent(n, s)))
                .map(n => n.value)
                .reduce((a, b) => a + b, 0)
        )
    },
    part2: function () {
        const parts = input
        const numbers = parts.filter(e => e.char.match(/\d/))
        const symbols = parts.filter(e => e.char.match(/[^0-9\.]/))

        console.log('PART 2: ' +
            symbols
                .filter(s => s.char === '*')
                .map(s => {
                    const isAdjacentNumbers = numbers.filter(n => this.isAdjacent(n, s)).map(n => n.value)
                    return isAdjacentNumbers.length === 2 ? isAdjacentNumbers[0] * isAdjacentNumbers[1] : 0
                })
                .reduce((a, b) => a + b, 0)
        )
    }
}