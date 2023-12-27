const fs = require('fs')


const logger = (filename)=>{
    return (req, res, next)=>{
        const log = `${Date.now().toLocaleString()} : ${req.url} : ${req.ip} : ${req.headers} request made by user \n \n`
        fs.appendFile(filename, log, (err, data)=>{
            next()
        })
    }
}

// const loggerUser = (req, res, next)=>{
//     const log = `${Date.now().toLocaleString()} : ${req.url} : ${req.ip} : ${req.headers} request made by user \n \n`
//     fs.appendFile('./logUser.txt', log, (err, data)=>{
//         next()
//     })
// }
module.exports = logger

// Info about user
// const logger = (req, res)=>{
//     console.dir(`Host => ${req.hostname}`)
//     console.dir(`Ip-address => ${req.ip}`)
// }