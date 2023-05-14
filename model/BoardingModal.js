const mongoose = require("mongoose");

const BoardingSchema = mongoose.Schema({
    instructions:{
        type:String,
        default:""
    }
})

module.exports = mongoose.model("BoardingSchema", BoardingSchema);