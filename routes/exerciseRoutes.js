const express = require('express')
const { getDuration, getPublicName } = require('../logic/commonFunctions')
const { parseExerciseBody, parseUpdateBody } = require('../logic/exerciseFunctions')
const readExercise = require('../store/readExercise')
const writeExercise = require('../store/writeExercise')
const router = express.Router()

// Get a previous exercise session
router.get('/:session_id', async (req,res)=>{
    const dataString = await readExercise()
    const dataJson = JSON.parse(dataString)
    console.log(req.params.session_id, dataJson.exercises[0].id)
    const sessionById = dataJson.exercises.filter(session => 
        parseInt(req.params.session_id) === session.id)[0]
    // Here we use the start and stop time to create the session length.
    const duration = getDuration(sessionById.start,sessionById.stop)
    const publicName = getPublicName(sessionById.first_name,sessionById.last_name)
    sessionById.duration = duration
    sessionById.publicName = publicName
    const startTimeFormatted = new Date(sessionById.start*1000)
    sessionById.start = startTimeFormatted.toLocaleString()
    delete sessionById.stop
    res.send(sessionById)
})

// Post a new exercise session
// A session refers to a user-defined activity
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

router.patch('/progress/:session_id', async (req, res) =>{
    const updatedSession = await parseUpdateBody(req.body, req.params.session_id)
    console.log('updatedSession ',updatedSession)
    if(updatedSession !== 'error'){
        res.send(updatedSession)}
})

module.exports = router