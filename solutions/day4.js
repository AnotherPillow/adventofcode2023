let input = ''
const day = __filename.split('\\').at(-1).replace(/\.[a-zA-Z]+$/, '')

module.exports = {
    loadInput: (debug) => {
        input = require('fs').readFileSync(debug ? `input/${day}-sample.txt` : `input/${day}.txt`).toString()
            .split('\n')
            .map(x=>x.trim())
        
        const _cards = input
            .map(x => x.replace(/Card\s+\d+\: /, ''))
            .map(x => x.split('|'))
            .map(f => f.map(d => d.trim()))

        let cards = {}

        for (const i in _cards) {
            let [ winners, numbers ] = _cards[i]
            winners = Array.from(winners.matchAll(/\d+/g)).map(m => {
                return parseInt(m[0])
            })
            
            numbers = Array.from(numbers.matchAll(/\d+/g)).map(m => {
                return parseInt(m[0])
            })
            

            cards[i] = { winners, numbers, index: parseInt(i) }
        }

        input = cards
    },
    part1: function () {
        let total = 0;
        for (const cardIndex of Object.keys(input)) {
            const card = input[cardIndex]
            const winningNumbers = card.numbers.filter(n => card.winners.includes(n))

            if (winningNumbers.length == 0) continue
            let subtotal = 0

            for (n in winningNumbers) {
                n++
                if (n == 1) subtotal++
                else subtotal *= 2
            }
            
            total += subtotal
        }

        console.log('PART 1: ' +
            total
        )
    },
    part2: function () {
        let totals = new Array(Object.keys(input).length).fill(1);
        for (const cardIndex of Object.keys(input)) {
            const card = input[cardIndex]
            const { index } = card
            const winningNumbers = card.numbers.filter(n => card.winners.includes(n))

            if (winningNumbers.length > 0) {
                winningNumbers.forEach((_, i) => {
                    totals[index + i + 1] += totals[index]
                })
            }
        }
        
        console.log('PART 2: ' +
            totals.reduce((x, y) => x + y)
        )
    }
}