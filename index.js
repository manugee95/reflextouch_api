const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const dotenv = require("dotenv")
dotenv.config()

const app = express()

mongoose
    .connect(process.env.MONGODB_URL)
    .then(()=> console.log("Connected to Database..."))
    .catch((err)=> console.log(err))

const feedback = require("./routes/Feedback")
const user = require("./routes/User")
const login = require("./routes/Login")

app.use(cors({
    origin: "https://reflexapp.vercel.app",
    allowedHeaders: ["Content-Type", "Authorization", "x-auth-token"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"]
}))
app.use(express.json())
app.use("/uploads", express.static('uploads'))
app.use("/api/feedback", feedback)
app.use("/api/register", user)
app.use("/api/login", login)

const port = process.env.PORT || 3000
app.listen(port, ()=> console.log(`Listening on port ${port}`))