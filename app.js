const express = require('express')
const dotenv = require('dotenv')
const writeEventLog = require('./writeEventLog')
const { parseExerciseBody } = require('./logic/exerciseFunctions')
const exerciseRoutes = require('./routes/exerciseRoutes.js')

dotenv.config()

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())




app.use('/activity', exerciseRoutes)

app.get('/*', (req,res) => {
    res.sendFile('C:/Users/User/personalTrainerApi/doesNotExist.html')
})
app.listen(port, () => console.log('Listening on port: ' + port))