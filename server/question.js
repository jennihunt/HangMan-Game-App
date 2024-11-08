const mongoose = require("mongoose");

const questionSchema=  new mongoose.Schema({
    questionNum: Number,
    question: String,
    answer1: [String, Boolean],
    answer2: [String, Boolean],
    answer3: [String, Boolean],
    answer4: [String, Boolean],

})
module.exports = mongoose.model("Question", questionSchema)