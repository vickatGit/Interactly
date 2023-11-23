import express from "express"
import {config} from 'dotenv'
import routes from './routes/contactRoutes'


const app:express.Application = express()
config()
app.use(express.json())
app.use('/contact/',routes)
app.listen(process.env.PORT,() => {
    console.log(`server started running on port ${process.env.PORT} 🚀🚀`)
})