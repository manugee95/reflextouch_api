const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")

const app = express()

mongoose
    .connect("mongodb://127.0.0.1:27017/reflextouch")
    .then(()=> console.log("Connected to Database..."))
    .catch((err)=> console.log(err))

const feedback = require("./routes/Feedback")
const user = require("./routes/User")
const login = require("./routes/Login")

app.use(cors({
    origin: "http://localhost:5173",
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