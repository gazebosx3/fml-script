const users = ['sam', 'josh', 'evan', 'gillian']

const songs = {
    sam: ['sam song 1', 'sam song 2'],
    josh: ['josh song 1', 'josh song 2'],
    evan: ['evan song 1', 'evan song 2'],
    gillian: ['gillian song 1', 'gillian song 2'],
}

const picks = {
    sam: {
        weekOne: 'josh song 1',
        weekTwo: 'evan song 2'
    },
    josh: {
        weekOne: 'sam song 1',
        weekTwo: 'sam song 2'
    },
    evan: {
        weekOne: 'sam song 1',
        weekTwo: 'gillian song 2'
    },
    gillian: {
        weekOne: 'josh song 1',
        weekTwo: 'evan song 2'
    }
}

function getUsersVotesForOtherUsers(user) {

    const userPicks = picks[user]

    // user: numvotes
    const otherUserVoteFreq = {}

    for (const week in userPicks) {
        const pick = userPicks[week]
        for (const user in songs) {
            const allSongsOfUser = songs[user]
            const isSongOfUser = allSongsOfUser.includes(pick)
            if (isSongOfUser) {
                otherUserVoteFreq[user] ? otherUserVoteFreq[user]++ : otherUserVoteFreq[user] = 1
            }
        }
    }

    return otherUserVoteFreq

}

function getHowManyTimesUserVotedForOtherUser(user, otherUser) {
    const userPicks = getUsersVotesForOtherUsers(user)
    return userPicks[otherUser]

}

function getTopNOtherUsersForSingleUser(user, n) {
    const userPicks = getUsersVotesForOtherUsers(user)
    const asEntries = Object.entries(userPicks)

    const orderedArray = asEntries.sort((a,b) => a[1] - b[2])

    const len = n ? n : orderedArray.length

    let finalString = ''
    for (let i = 0; i < len; i++) {
        const otherUser = orderedArray[i][0]
        const numVotes = getHowManyTimesUserVotedForOtherUser(user, otherUser)
        finalString += `Your #${i+1} favorite other FML user is ${otherUser}, who you voted for ${numVotes} times \n`
    }

    return finalString

}

function whoLovesYaBaby(primaryUser) {
    // for each user, call howManyTimesUserVotedForOtherUser

    const votes4uMap = {}

    for (let user of users) {
        const voteTotal = getHowManyTimesUserVotedForOtherUser(user, primaryUser)
        votes4uMap[user] = voteTotal
    }


    const entries = Object.entries(votes4uMap).filter(el => !!el[1]).sort((a,b) => b[1] - a[1])

    // console.log('entries is: ', entries)

    // const orderedArray = entries.sort((a,b) => a[1] - b[1])

    // console.log('orderarray is ', orderedArray)

    let finalString = ''

    for (let i = 0; i < entries.length; i++) {
        const otherUser = entries[i][0]

        const isTie =  entries[i+1] ?  entries[i+1][1] === entries[i][1] : false

        finalString += `Your #${i+1} fan is ${otherUser} \n` 
        if (isTie) {
            finalString += `This person was actually tied with ${entries[i+1][0]} \n`
        }


    }

    return finalString

}

console.log(whoLovesYaBaby('sam'))