const express = require('express')
const { verifySession } = require('../logic/authFunctions')
const { getDuration, getPublicName } = require('../logic/commonFunctions')
const { parseExerciseBody, parseUpdateBody } = require('../logic/exerciseFunctions')
const readExercise = require('../store/readExercise')
const readUser = require('../store/readUser')
const writeExercise = require('../store/writeExercise')
const router = express.Router()

// Get a previous exercise activity
router.get('/:activity_id', async (req,res)=>{
    const verified = verifySession(req.headers.authorization.split(' ')[1])
    if(!verified){
        return res.send('JWT Expired')
    }
    console.log('verified', verified)
    const exerciseString = await readExercise()
    const exerciseJson = JSON.parse(exerciseString)
    const userString = await readUser()
    const userJson = JSON.parse(userString)
    const user = userJson.users.filter(user=> user.username === verified.user)[0]
    const id = user.id
    let activityById = exerciseJson.exercises.filter(activity => 
        (parseInt(req.params.activity_id) === activity.id) &&
        (id === activity.user_id))
    if(activityById.length){
        activityById = activityById[0]
    }
    // Here we use the start and stop time to create the activity length.
    const duration = getDuration(activityById.start,activityById.stop)
    const publicName = getPublicName(user.given,user.surname)
    activityById.duration = duration
    activityById.publicName = publicName
    const startTimeFormatted = new Date(activityById.start*1000)
    activityById.start = startTimeFormatted.toLocaleString()
    delete activityById.stop
    res.send(activityById)
})

// Post a new exercise activity
// A activity refers to a user-defined activity
router.post('/new', async (req, res) =>{
    const body = req.body
    const currentString = await readExercise()
    const currentJson = JSON.parse(currentString)
    const id = currentJson.exercises.length
    body.id = id
    const exercises = await parseExerciseBody(body)
    console.log('route exercises:',exercises)
    res.send(exercises)
})

router.patch('/progress/:activity_id', async (req, res) =>{
    const updatedActivity = await parseUpdateBody(req.body, req.params.activity_id)
    console.log('updatedActivity ',updatedActivity)
    if(updatedActivity !== 'error'){
        res.send(updatedActivity)}
})

module.exports = router