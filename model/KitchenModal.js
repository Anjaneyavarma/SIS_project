const mongoose = require("mongoose");

const kitchenTable = mongoose.Schema({
    breakfast:{
        type:String,
        default:""
    },
    lunchNonVeg:{
        type:String,
        default:""
    },
    lunchVeg:{
        type:String,
        default:""
    },
    dinnerNonVeg:{
        type:String,
        default:""
    },
    dinnerVeg:{
        type:String,
        default:""
    },
})

module.exports = mongoose.model("kitchenModal", kitchenTable);