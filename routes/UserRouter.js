const { json } = require("express/lib/response");
const mongoose = require("mongoose");
const router = require("express").Router();
const Student = require("../model/UserModel");
const multer = require("multer");


const imgconfig = multer.diskStorage({
    destination:(req,file,callback)=>{
        callback(null,"./uploads")
    },
    filename:(req,file,callback)=>{
        callback(null,`image-${Date.now()}.${file.originalname}`)
    }
})

const isImage = (req,file,callback)=>{
    if(file.mimetype.startsWith("image")){
        callback(null,true)
    }else{
        callback(new Error("only images is allowd"))
    }
}

const upload = multer({
    storage: imgconfig,
    fileFilter:isImage
})

router.post("/add", upload.single("photo"), async(req, res) =>{

    console.log("api call started")

    const {filename} = req.file;

    const student = await new Student({
        photo: filename,
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        age: req.body.age,
        border: req.body.border,
        loginType: req.body.loginType,
        subjects: req.body.subjects,
        academics: req.body.academics,
        foodHabits: req.body.foodHabits,
        hygiene: req.body.hygiene,
        sports: req.body.sports,
        sportsResult: req.body.sportsResult,
        healthIssue: req.body.healthIssue,
        attendance: req.body.attendance,
        comments: req.body.comments
    })

    try{
        const saveStudent = await student.save().then(res.status(200).json(student));
        console.log(saveStudent);
    }catch(error){
        res.status(400).send(error)
    }

})

router.get("/all", async(req, res)=>{
    try{
        const students = await Student.find({})
        res.status(200).json(students)
    }catch(error){
        console.log(error);
    }
})

router.get("/:id", async(req, res)=>{
    try{
        const currentUser = await Student.findById(req.params.id);
        res.status(200).json(currentUser);
    }catch(error){
        console.log(error);
    }
});

router.post("/update/:id",upload.single("photo"), async(req, res)=>{
    
    const student = await Student.findById(req.params.id)
    const {filename} = req.file;
    if(!student){
        res.status(400).send({message: "Data not found"})
    }else{
        student.photo = filename;
        student.name = req.body.name;
        student.email = req.body.email;
        student.password = req.body.password;
        student.age = req.body.age;
        student.border = req.body.border;
        student.loginType = req.body.loginType;
        student.subjects = req.body.subjects;
        student.academics = req.body.academics;
        student.foodHabits = req.body.foodHabits;
        student.hygiene = req.body.hygiene;
        student.sports = req.body.sports;
        student.healthIssue = req.body.healthIssue;
        student.attendance = req.body.attendance;
        student.comments = req.body.comments


        student.save()
        .then((student)=>{
            res.status(200).send({
                message:"updated successfully",
                data: student
            })
        })
        .catch(error=>{
            res.send(error);
        })
    }
})

router.delete("/delete/:id", async(req, res)=>{
    const articleId = mongoose.Types.ObjectId(req.params.id);
    await Student.findByIdAndRemove(articleId).then(res.status(200).send({
        message:"successfully deleted"
    })).catch(error=>{
        console.log(error);
    })
})

module.exports = router;
