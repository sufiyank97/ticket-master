const mongoose = require('mongoose')
const Schema=mongoose.Schema

const empSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    mobile:{
        type:String,
        required:true
    },
    deptId:{
        type:Schema.Types.ObjectId,
        ref:"Department",
        required:true
    },
    userId:{
        type:Schema.Types.ObjectId,
        ref:'User'
    }
})

const Employee=mongoose.model('Employee',empSchema)

module.exports=Employee