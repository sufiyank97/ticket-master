const mongoose=require('mongoose')
const Schema=mongoose.Schema

const deptSchema = new Schema({
    name:{
        type:String,
        required:true
    }
})

const Department=mongoose.model('Department',deptSchema)

module.exports=Department