// require('./db/connection')
const express=require("express")
const app=express()
const tasks=require('./routes/tasks')
const connectDB = require('./db/connection')
const notFound=require('./middleware/not-found')
const errorHandleMiddleware=require('./middleware/error-handler')

require('dotenv').config()

app.use(express.static('./public'))
app.use(express.json())
//middleware
app.use(express.json())
app.use('/api/v1/tasks',tasks)
app.use(notFound)
app.use(errorHandleMiddleware)

const port=process.env.PORT||3000
const start=async()=>{
    try{
        await connectDB(process.env.MONGO_URI)
        app.listen(port,()=>{
            console.log(`server listening on port ${port}...`)
        })
    }
    catch(error){
       console.log(error) 
    }
}
start()


