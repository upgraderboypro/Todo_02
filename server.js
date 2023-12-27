// Server package
const express = require('express')
const cors = require('cors')
const app = express()

// Importing Router
const router = require('./routers/router')

// Middleware
// app.get("/", (req, res)=>{
//   res.send("Hii")
// })
const corsOptions = {
  origin: ["http://localhost:3000/", "https://aged-rain-15269.pktriot.net/", "aged-rain-15269.pktriot.net"],
  method: "GET, POST, PUT, PATCH",
  credentials: true
}
const cookieParser = require("cookie-parser");
// express.json() middleware is used when we submit data from any client like thunder client or postman
app.use(cookieParser());
app.use(express.json())
app.use(cors())
// express.urlencoded() middleware is used when we submit data from any browser like chrome
app.use(express.urlencoded({ extended: true }))
app.use(router)
// When we deploy our app, then it will take default value from the os which is defined by hosting app like heroku or firebase
const PORT = process.env.PORT || 4000

// Security package
const dotenv = require('dotenv');
dotenv.config({path: "./config.env"})
const { database } = require('./connection');
const errHandler = require('./middleware/errHandler')
const db = process.env.DATABASE
database(db)



app.use(errHandler)

// Listening by the server
console.log('='.repeat(100))
app.listen(PORT, () => {
  console.log('\x1b[37m',`Your server has been started on port: ${PORT}!`,'\x1b[0m')
})
