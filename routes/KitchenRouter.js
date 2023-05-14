const router = require("express").Router();
const kitchen = require("../model/KitchenModal")

router.post("/add", async(req, res)=>{
    try{
        const k = await new kitchen({
            breakfast:req.body.breakfast,
            lunchNonVeg:req.body.lunchNonVeg,
            lunchVeg:req.body.lunchVeg,
            dinnerNonVeg:req.body.dinnerNonVeg,
            dinnerVeg:req.body.dinnerVeg,
        })

        const kitchenData = await k.save().then(res.status(200).json(k));
        console.log(kitchenData);
    }catch(error){
        console.log(error);
    }

})

router.get("/all", async(req, res)=>{
    try{
        const kitchenData = await kitchen.find({})
        res.status(200).json(kitchenData)
    }catch(error){
        console.log(error);
    }
})

router.get("/:id", async(req, res)=>{
    try{
        const current = await kitchen.findById(req.params.id);
        res.status(200).json(current);
    }catch(error){
        console.log(error);
    }
})

router.post("/update/:id", async(req, res)=>{
    const data = await kitchen.findById(req.params.id)
    if(!data){
        res.status(400).send({message: "Data not found"})
    }else{
        data.breakfast = req.body.breakfast
        data.lunchNonVeg =req.body.lunchNonVeg
        data.lunchVeg = req.body.lunchVeg
        data.dinnerNonVeg = req.body.dinnerNonVeg
        data.dinnerVeg = req.body.dinnerVeg
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

