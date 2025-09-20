const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const crypto=require('crypto');
const bodyParser = require('body-parser');
const app = express();
 const cors = require("cors");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/Login", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MongoDB connected");
    })
    .catch((err) => {
        console.error("MongoDB connection error:", err);
    });
// schema and model
    const userschema=new mongoose.Schema({firstname:String,lastname:String,email:String,phonenumber:Number,password:Number})
    const User=new mongoose.model("User",userschema)

    // Create a new user with password hashing with bcrypt
    
    app.post("/users",async(request,response)=>{
        try{
            const {firstname,lastname,email,phonenumber,password}=request.body
            const newuser=new User({firstname,lastname,email,phonenumber,password})
            await newuser.save()
            response.status(201).json(newuser)
        }catch(err){
            response.status(500).json({error:err.message})
        }
    })

    // read all users without password
    app.get("/users",async(request,response)=>{
        User.find().then((users)=>{
            const usersWithoutPassword = users.map(({ password, ...rest }) => rest);
            response.status(200).json(usersWithoutPassword);
        })
        .catch((err)=>{
            response.status(500).json({error:err.message})
        })
    })

    // update a user by id
    app.put("/users/:id",async(request,response)=>{
        const {id}=request.params
        User.findByIdAndUpdate(id,request.body,{new:true}).then((user)=>{
            response.status(200).json(user)
        })
        .catch((err)=>{
            response.status(500).json({error:err.message})
        })

    })

    // delete a user by id
    app.delete("/users/:id",async(request,response)=>{
        const {id}=request.params
        User.findByIdAndDelete(id).then(()=>{
            response.status(200).json({message:"User deleted successfully"})
        })
        .catch((err)=>{
            response.status(500).json({error:err.message})
        })
    })
    
    const PORT=5000
    app.listen(PORT,()=>{
        console.log(`Server is running on port ${PORT}`);
    })
 