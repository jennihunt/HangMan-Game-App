const mongoose = require("mongoose");


let loginSchema= new mongoose.Schema({
    username:{type:String},
    password:{type:String}
   

})

module.exports=mongoose.model("User",loginSchema)