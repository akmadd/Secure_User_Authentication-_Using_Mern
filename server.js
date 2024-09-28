const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('./models/userSchema')

const SECRET_KEY = 'secretkey'
//connect to express app

const app = express();


//connect to mongodb

const dbURI = 'mongodb+srv://akmadd456:wxQHTSegVUljMf7w@cluster30.eabt7.mongodb.net/UsersDb?retryWrites=true&w=majority&appName=Cluster30'
mongoose
.connect(dbURI)
.then(() => {
    app.listen(9001, () => {
        console.log("hello");
    });
});

try {
    
} catch (error)  {
    console.log("Unable to connect the server and/or mongoDb");
    
}

//middleware
app.use(bodyParser.json())
app.use(cors())

//schema

 
//router
//userRegistration
//postRegistration

app.post('/register', async (req, res) => {
    try {
        const { email, username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ email, username, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.error("Error:", error); // Log the actual error to console
        res.status(500).json({ error: 'Error signing up' });
    }
});


//get register user
app.get('/register', async(req, res) => {
    try {
        const users = await User.find();
        res.status(201).json(users);
    } catch (error) {
        res.status(500).json({error:"Unable to get users"})
    }
})

// get login
app.post('/login', async(req, res) => {
    try {
        const { username, password} = req.body
        const user = await User.findOne({username})
        if(!user){
            return res.status(400).json({error: "Invalid Credential"})
        }
        const isPasswordValid = await bcrypt.compare(password, user.password)
        if(!isPasswordValid){
            return res.status(401).json({error: "Invalid Credentials"})
        }
        const token = jwt.sign({userID: user._id}, SECRET_KEY, { expiresIn: '1hr' })
        res.json({message: "Login Successfully"})
    } catch (error) {
        res.status(500).json({error:"Erorr login in"})
    }
})

//Create -> Post method
//Read -> Get mehtod
//Update -> Put or Patch method
//Delete -> Delete method