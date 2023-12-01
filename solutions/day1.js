let input = ''

module.exports = {
    loadInput: (debug) => {
        input = require('fs').readFileSync(debug ? 'input/day1-sample.txt' : 'input/day1.txt').toString().split('\n')
    },
    part1: function () {
        let calibration = 0
        for (const line of input) {
            const numbers = line.trim().replace(/[a-z]/g, '').split('')
            console.log(numbers)
            
            let n = parseInt(numbers[0] + numbers[numbers.length - 1])
            console.log('-> ' + n)
            
            calibration += n
        }
        console.log('PART 1: Sum of all the calibration values: ' + calibration)
    },
    part2: function () {
        const replaceWordsWithNumbers = (text) => {
            let _prevText = `${text}`
            const subs = [
                {
                    word: 'one',
                    num: '1'
                },
                {
                    word: 'two',
                    num: '2'
                },
                {
                    word: 'three',
                    num: '3'
                },
                {
                    word: 'four',
                    num: '4'
                },
                {
                    word: 'five',
                    num: '5'
                },
                {
                    word: 'six',
                    num: '6'
                },
                {
                    word: 'seven',
                    num: '7'
                },
                {
                    word: 'eight',
                    num: '8'
                },
                {
                    word: 'nine',
                    num: '9'
                },
            ]
            
            for (const word of subs) {
                if (text.startsWith(word.word)) {
                    text = text.replace(
                        new RegExp(`^${word.word}`),
                        word.num
                    )
                } 
                if (text.endsWith(word.word)) {
                    text = text.replace(
                        new RegExp(`${word.word}$`),
                        word.num
                    )
                }
            }
            
            if (text != '') {
                const startsWith = /^\d/.test(text)
                const endsWith = /\d$/.test(text)
                
                if (endsWith && startsWith) 
                    return text
                

                text = replaceWordsWithNumbers(text.slice(
                    startsWith ? 0 : 1, 
                    endsWith ? undefined : -1, 
                    ))
            }
            return text
        }

        let calibration = 0
        for (const line of input) {
            const numbers = replaceWordsWithNumbers(line.trim()).replace(/[a-z]/g, '').split('')
            console.log(numbers)
            
            let n = parseInt(numbers[0] + numbers[numbers.length - 1])
            console.log('-> ' + n)
            
            calibration += n
        }
        console.log('PART 2: Sum of all the calibration values: ' + calibration)
    }
}