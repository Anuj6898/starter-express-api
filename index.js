const mongoose = require('mongoose')
const express = require('express')
const app = express()
const body_Parser = require("body-parser")
const cors = require("cors")
require("dotenv").config()
const User = require("./models/User")

app.use(body_Parser.json())
app.use(cors())

app.get("/", (req, res) => {
    console.log("Get Request")
    res.send("Hello, Server is Online!")
})
app.post("/", async (req, res) => {
    const user = new User(req.body)
    try {
        await user.save();
        res.send(user);
    } catch (error) {
        res.status(500).send(error)
    } finally {
        console.log("Data Posted")
    }
})

const mongoURI = "mongodb+srv://Anuj:Centenario@cluster0.55qy4.mongodb.net/ships?retryWrites=true&w=majority"
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(mongoURI,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true
            }
        );
        console.log(`MongoDB Connected: ${conn.connection.host}`)
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}
//Connect to the database before listening
connectDB().then(() => {
    app.listen(process.env.PORT, () => {
        console.log("listening for requests")
    })
})

