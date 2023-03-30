const bcrypt = require('bcrypt');
const writeSignup = require('../store/writeSignup');
const jwt = require('jsonwebtoken')

exports.hashPW = async (pw) => {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(pw, salt);
    return {salt, hash}
}

exports.hashPWwithSalt = async (pw,salt) => {
    const hash = await bcrypt.hash(pw, salt).catch(err => {
        console.log(err)
        return ''
    })
    return hash
}

exports.parseSignupBody = async (body, pw) => {
    const {hash,salt} = await this.hashPW(pw)
    console.log('hashed and salt', hash, salt)
    const updatedBody = {...body, hash, salt}
    writeSignup(updatedBody)
}

exports.getSession = (username, hash) => {
    const secret = process.env.SECRET
    const token = jwt.sign({'user': username, 'hash': hash},secret, {expiresIn: 300})
    return token
}

exports.verifySession = (token) => {
    try{
        return jwt.verify(token,process.env.SECRET)
    } catch(err){
        return ''
    }
}