const mongoose = require('mongoose')
const express = require('express')
const app = express()
const body_Parser = require("body-parser")
const cors = require("cors")
require("dotenv").config()
const User = require("./models/User")

app.use(body_Parser.json())
app.use(cors())

app.get("/", async (req, res) => {
    const user = await User.find({});
    try {
        res.send(user);
    } catch (error) {
        res.status(500).send(error);
    }
        console.log("Get Request") 

})
app.post("/", async (req, res) => {
    
    const existingUser = await User.findOne({boatId:req.body.boatId})
    if(existingUser === null){
        const user = new User(req.body)
        try {
            await user.save()
            res.send(user)
        } catch (error) {
            res.status(500).send(error)
        } finally {
            console.log("Data Posted")
        }
    }
    else{

        const updatedUser = await User.updateOne({boatId: req.body.boatId},req.body)
        try{
            await updatedUser.save()
            res.send(updatedUser)
        }catch (error){
            res.status(500).send(error)
        }finally{
            console.log("Updated")
        }
        
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

