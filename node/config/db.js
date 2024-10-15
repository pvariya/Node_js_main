const mongoose = require('mongoose');

const dbConnetc=async()=>{
    await mongoose.connect("mongodb://localhost:27017/Node_js_Main")
    console.log("Connected to Mongo")   
}

module.exports=dbConnetc