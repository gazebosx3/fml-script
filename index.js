const users = ['sam', 'josh', 'evan', 'gillian', 'natalie', 'jake', 'adam', 'tom', 'emily']

let weekNumber = 8

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

const songs = generateSongs()

console.log('songs is: ', songs)

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
  }

function generatePicks() {
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

const picks = generatePicks()

console.log('picks is: ', picks)


function getUsersVotesForOtherUsers(user) {

    const userPicks = picks[user]

    const otherUserVoteFreq = {}

    // for the user picks object 
    for (const week in userPicks) {
        // get the first, second, and third place picks
        const pick1 = userPicks[week][0]
        const pick2 = userPicks[week][1]
        const pick3 = userPicks[week][2]

        for (const user in songs) {
            if (otherUserVoteFreq[user] === undefined) {
                otherUserVoteFreq[user] = 0
            }
            const allSongsOfUser = songs[user]
            const isSongOfUser1 = allSongsOfUser.includes(pick1)
            const isSongOfUser2 = allSongsOfUser.includes(pick2)
            const isSongOfUser3 = allSongsOfUser.includes(pick3)

            if (isSongOfUser1) otherUserVoteFreq[user] += 3
            if (isSongOfUser2) otherUserVoteFreq[user] += 2
            if (isSongOfUser3) otherUserVoteFreq[user] += 1

        }
    }

    return otherUserVoteFreq

}

function getUserVotesForOtherUser(user, otherUser) {
    const userPicks = getUsersVotesForOtherUsers(user)
    return userPicks[otherUser]

}

function getTopNOtherUsersForSingleUser(user, n) {
    const userPicks = getUsersVotesForOtherUsers(user)
    const asEntries = Object.entries(userPicks)

    const orderedArray = asEntries.sort((a, b) => a[1] - b[2])

    const len = n ? n : orderedArray.length

    let finalString = ''
    for (let i = 0; i < len; i++) {
        const otherUser = orderedArray[i][0]
        const numVotes = getUserVotesForOtherUser(user, otherUser)
        finalString += `Your #${i + 1} favorite other FML user is ${otherUser}, who you voted for ${numVotes} times \n`
    }

    return finalString

}

function whoLovesYaBaby(primaryUser) {

    const votes4uMap = {}

    for (let user of users) {
        const voteTotal = getUserVotesForOtherUser(user, primaryUser)
        votes4uMap[user] = voteTotal
    }


    const entries = Object.entries(votes4uMap)
    .filter(el => !!el[1])
    .sort((a, b) => b[1] - a[1])

    let finalString = ''

    for (let i = 0; i < entries.length; i++) {
        const otherUser = entries[i][0]

        const isTie = entries[i + 1] ? entries[i + 1][1] === entries[i][1] : false

        finalString += `Your #${i + 1} fan is ${otherUser} \n`
        if (isTie) {
            finalString += `This person was actually tied with ${entries[i + 1][0]} \n`
        }


    }

    return finalString

}

console.log(whoLovesYaBaby('gillian'))
console.log(getTopNOtherUsersForSingleUser('gillian'))