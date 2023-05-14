const req = require("express/lib/request");
const res = require("express/lib/response");
const mongoose = require("mongoose");
const router = require("express").Router();
const tt = require("../model/ttModal");


router.post("/add", async(req, res)=>{
    try{
        const table = await new tt({
            session_one:req.body.session_one,
            session_two:req.body.session_two,
            session_three:req.body.session_three,
            session_four:req.body.session_four,
            session_five:req.body.session_five,
        })

        const timeTable = await table.save().then(res.status(200).json(table));
        console.log(timeTable);
    }catch(error){
        console.log(error);
    }

})

router.get("/all", async(req, res)=>{
    try{
        const timeTable = await tt.find({})
        res.status(200).json(timeTable)
    }catch(error){
        console.log(error);
    }
})

router.post("/update/:id", async(req, res)=>{
    const table = await tt.findById(req.params.id)
    if(!table){
        res.status(400).send({message: "Data not found"})
    }else{
        table.session_one = req.body.session_one
        table.session_two =req.body.session_two
        table.session_three = req.body.session_three
        table.session_four = req.body.session_four
        table.session_five = req.body.session_five
    }

    table.save().then(table => {
        res.status(200).send({
            message: "updated Successfully",
            data: table
        })
    }).catch(error =>{
        console.log(error);
    })
})

router.get("/:id", async(req, res)=>{
    try{
        const current = await tt.findById(req.params.id);
        res.status(200).json(current);
    }catch(error){
        console.log(error);
    }
});

router.delete("/delete/:id", async(req, res)=>{
    await tt.findByIdAndDelete({_id: req.params.id}).then(res.status(200).send({
        message: "successfully deleted",
    })).catch(error=>{
        console.log(error)
    })
})

module.exports = router;