const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ticketSchema=new Schema({
    customerId:{
        type:Schema.Types.ObjectId,
        ref:'Customer',
        required:true
    },
    departmentId:{
        type:Schema.Types.ObjectId,
        ref:'Department',
        required:true
    },
    employeesIds:[
        {
            type:Schema.Types.ObjectId,
            ref:'Employee',
            required:true
        }
    ],
    title:{
        type:String,
        required:true
    },
    message:{
        type:String,
        required:true
    },
    isResolved:{
        type:Boolean,
        default:false
    },
    priority:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    code:{
        type:String
    },
    isDeleted:{
        type:Boolean,
        default:false
    },
    userId:{
        type:Schema.Types.ObjectId,
        ref:'User'
    }
})

const Ticket=mongoose.model('Ticket',ticketSchema)

module.exports=Ticket