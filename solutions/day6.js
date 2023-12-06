let input = ''
const day = __filename.split('\\').at(-1).replace(/\.[a-zA-Z]+$/, '')

module.exports = {
    loadInput: (debug) => {
        input = require('fs').readFileSync(debug ? `input/${day}-sample.txt` : `input/${day}.txt`)
            .toString()
            .split('\n')
            .map(z => {
                return z
                    .split(' ')
                    .filter(x => x !== '')
                    .map(x => x.trim())
                    .map(x => x.match(/\d+/) ? parseInt(x) : x)
            })  
            

        let _races = [
            {
                time: input[0][1],
                distance: input[1][1],
            },
            {
                time: input[0][2],
                distance: input[1][2],
            },
            {
                time: input[0][3],
                distance: input[1][3],
            },
            {
                time: input[0][4],
                distance: input[1][4],
            },
        ]
        input = _races
    },
    part1: function () {
        let total = 1

        let ways = []

        for (const { time, distance } of input) {
            let w = 0;

            for (let ms = 0; ms < time; ms++) {
                if (ms * (time - ms) > distance) {
                    w++
                }
            }
            ways.push(w)
        }

        console.log(ways)

        total = ways.reduce( (a, b) => a * b, 1 );
          

        console.log('PART 1: ' +
            total
        )
    },
    part2: function () {
        let total = 1

        let ways = []

        let str = {
            time: '',
            distance: ''
        }
        
        for (const { time, distance} of input) {
            str.time += time.toString()
            str.distance += distance.toString()
        }

        const { time, distance } = str
        let w = 0;

        for (let ms = 0; ms < time; ms++) {
            if (ms * (time - ms) > distance) {
                w++
            }
        }
        ways.push(w)

        total = ways.reduce( (a, b) => a * b, 1 );
            
        console.log('PART 2: ' +
            total
        )
    }
}