let input = ''

module.exports = {
    loadInput: (debug) => {
        input = require('fs').readFileSync(debug ? 'input/day2-sample.txt' : 'input/day2.txt').toString()
            .trim()
            .split('\n')
            .map(line => {
                const [game, _sets] = line.split(': ')
                const sets = _sets.split('; ').map(set => {
                    const reds = set.match(/(\d+) red/)
                    const greens = set.match(/(\d+) green/)
                    const blues = set.match(/(\d+) blue/)
            
                    return {
                        red: reds ? parseInt(reds[1]) : 0,
                        green: greens ? parseInt(greens[1]) : 0,
                        blue: blues ?  parseInt(blues[1]) : 0,
                    }
                })
            
                return {
                    id: parseInt(game.split(' ')[1]),
                    sets: sets,
                }
            })
    },
        
        
    part1: function () {
        const red = 12
        const green = 13
        const blue = 14
        let sum = 0;

        sum = input
            .filter(game => {
                return game.sets.every(set => {
                    return set.red <= red && set.green <= green && set.blue <= blue
                })
            })
            .reduce((acc, game) => acc + game.id, 0)

        console.log(`SUM OF IDS: ${sum}`)
        
    },
    part2: function () {
        let sum = 
            input.map(game => {
                return {
                    red: Math.max(...game.sets.map(set => set.red)),
                    green: Math.max(...game.sets.map(set => set.green)),
                    blue: Math.max(...game.sets.map(set => set.blue)),
                }
            })
            .map(set => set.red * set.green * set.blue)
            .reduce((acc, power) => acc + power, 0)

        console.log(`SUM OF POWERS: ${sum}`)
    }
}