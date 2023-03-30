const express = require('express')
const { getExerciseList, getUserSpecificExerciseList } = require('../logic/exerciseListFunctions')
const router = express.Router()

router.get('/exercise_labels', async(req,res) => {
    await getExerciseList()
})
router.get('/exercise_labels/:user_id', async(req,res) =>{
    const exerciseList = await getUserSpecificExerciseList(req.params.user_id)
    res.send(exerciseList)
})

module.exports = router