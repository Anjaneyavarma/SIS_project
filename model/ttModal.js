const mongoose = require("mongoose");

const timeTableSchema = mongoose.Schema({
    session_one:{
        type: String,
    },
    session_two:{
        type:String,
    },
    session_three:{
        type:String,
    },
    session_four:{
        type:String,
    },
    session_five:{
        type:String,
    }
})

module.exports = mongoose.model("timeTable", timeTableSchema);