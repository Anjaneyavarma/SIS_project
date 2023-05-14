const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    photo:{
        type: String
    },
    name:{
        type: String,
        min:8,
        max:255
    },
    email:{
        type: String,
        require: true,
        max:255,
        unique: true,
    },
    password:{
        type:String,
        require:true,
        min:8
    },
    age:{
        type: String,
        min:0,
        max:3
    },
    loginType:{
        type:String,
        default:"student"
    },
    border:{
        type:String,
    },
    subjects:{
        type:Array,
        default:[]
    },
    academics:{
        type:String,
        default:""
    },
    foodHabits:{
        type:String,
        default:""
    },
    hygiene:{
        type:String,
        default:""
    },
    sports:{
        type:String,
        default:""
    },
    sportsResult:{
        type:String,
        default:""
    },
    healthIssue:{
        type:String,
        default:""
    },
    attendance:{
        type:String,
        default:""
    },
    comments:{
        type:String,
        default:""
    },
},
{ timestamps: true}

);

module.exports = mongoose.model("Student", UserSchema);