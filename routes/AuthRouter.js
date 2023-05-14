const req = require("express/lib/request");
const res = require("express/lib/response");
const mongoose = require("mongoose");
const router = require("express").Router();
const Student = require("../model/UserModel");

router.post("/login", async(req, res)=>{
    try{
        const user = await Student.findOne({email: req.body.email})
        if(!user){
            return res.status(404).send({message: "email not found"})
        }
        const validPassword = user.password;
        if(req.body.password !== validPassword){
            return res.status(400).send({message: "Invalid password, please try again"}) 
        }else{
            if(user.loginType === "student"){
                res.status(200).send({
                    message:"student",
                    data: user
                })
            }else if(user.loginType === "admin"){
                res.status(200).send({
                    message:"admin",
                    data: user
                })
            }else if(user.loginType === "kitchen"){
                res.status(200).send({
                    message:"kitchen",
                    data: user
                })
            }
        }

    }catch(error){
        res.status(400).send({message:error});
    }
});

module.exports = router;