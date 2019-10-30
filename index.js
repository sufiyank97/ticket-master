const express = require('express')
const mongoose = require('./config/database')
const router=require('./config/routes')
const port=3004
const cors = require('cors')
const app=express()

app.use(express.json())
app.use(cors())
app.use('/',router)

app.listen(port,()=>{
    console.log('listening on port',port)
})