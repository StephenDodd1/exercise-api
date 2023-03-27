const fs = require('fs')

const writeEventLog = async (pubName) => {
    let evtLog = await fs.promises.readFile('./eventlist.txt','utf-8',(err, data) =>{
        if(!err){
            console.log('data is: ', data)
            return data
        } else console.log(err)
    }) 
    console.log('eventLog: ',evtLog)
    evtLog += pubName
    await fs.writeFile('eventlist.txt', evtLog, (err) => console.log('error is: ', err))
}

module.exports = writeEventLog