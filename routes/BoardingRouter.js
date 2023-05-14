const mongoose = require("mongoose");
const router = require("express").Router();
const Boarding = require("../model/BoardingModal");

router.post("/add", async(req, res)=>{
    try{
        const boarding = await new Boarding({
            instructions: req.body.instructions
        })

        const Data = await boarding.save().then(res.status(200).json(boarding));
        console.log(Data);
    }catch(error){
        console.log(error);
    }
})


router.get("/all", async(req, res)=>{
    try{
        const data = await Boarding.find({})
        res.status(200).json(data)
    }catch(error){
        console.log(error);
    }
})

router.post("/update/:id", async(req, res)=>{
    const data = await Boarding.findById(req.params.id)
    if(!data){
        res.status(400).send({message: "Data not found"})
    }else{
       data.instructions = req.body.instructions
    }

    data.save().then(k => {
        res.status(200).send({
            message: "updated Successfully",
            data: k
        })
    }).catch(error =>{
        console.log(error);
    })
})

module.exports = router;
