const users = ['Sam Glass', 'Josh Holtzberg', 'Adam Holtzberg', 'Gillian Maxwell', 'Tom Rankin', 'Emily Scott', 'Bex Sussman']

let weekNumber = 8

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
  }

function generatePicks(songs) {
    const res = {}

    for (let user in songs) {
        res[user] = {}
        for (let i = 0; i < weekNumber; i++) {
            const randUser1 = users[getRandomIntInclusive(0, users.length-1)]
            let randUser2 = users[getRandomIntInclusive(0, users.length-1)]
            if (randUser1 === randUser2) {
                randUser2 = users[getRandomIntInclusive(0, users.length-1)]
            }
            let randUser3 = users[getRandomIntInclusive(0, users.length-1)]
            if (randUser3 === randUser2 || randUser3 === randUser1) {
                randUser3 = users[getRandomIntInclusive(0, users.length-1)]
            }

            const m = `week${i+1}`
            res[user][m] = []
            res[user][m].push(songs[randUser1][i])
            res[user][m].push(songs[randUser2][i])
            res[user][m].push(songs[randUser3][i])



        }
    }

    return res
}


function generateSongs() {
    const res = {}

    users.forEach(user => {
        res[user] = []
        for (let i = 0; i < weekNumber; i++) {
            res[user].push(`${user} song ${i+1}`)
        }
    })

    return res
}

module.exports = {
    generatePicks,
    generateSongs,
    users
}