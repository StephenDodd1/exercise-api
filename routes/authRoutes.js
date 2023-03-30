const express = require('express')
const { parseSignupBody, getSession, hashPW, hashPWwithSalt } = require('../logic/authFunctions')
const readUser = require('../store/readUser')
const router = express.Router()


router.post('/signup', (req, res) => {
    // given, surname, dob, email, phone: **optional, username, password
    const keys = Object.keys(req.body).filter(key => key !== 'password')
    const body = {}
    for(let key of keys){
        body[key] = req.body[key]
    }
    return parseSignupBody(body, req.body.password)
})

router.post('/signin', async (req,res) => {
    let userString = await readUser()
    let users = JSON.parse(userString)
    let user = users.users.filter(user => user.username === req.body.username)[0]
    let salt = user.salt
    let token
    console.log(salt)
    let hash = await hashPWwithSalt(req.body.password,salt)
    console.log('hash error is empty string',hash)
    if(hash){
        token = getSession(req.body.username,hash)
        console.log('token', token)
    }
    res.set('X-API-KEY', token)
    res.send()
})

module.exports = router