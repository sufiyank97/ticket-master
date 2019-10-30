const Employee = require('../models/employee')

module.exports.list=(req,res)=>{
    Employee.find({userId:req.user._id}).populate('deptId')
      .then((emps)=>{
          res.json(emps)
      })
      .catch((emps)=>{
          res.json(err)
      })
}

module.exports.create=(req,res)=>{
    const body=req.body
    const employee=new Employee(body)
    employee.userId=req.user._id
    employee.save()
     .then((emp)=>{
         res.json(emp)
     })
     .catch((err)=>{
         res.json(err)
     })
}

module.exports.show=(req,res)=>{
    const id=req.params.id
    Employee.findOne({userId:req.user._id,_id:id}).populate('deptId')
        // finding all the user id and this id
        // find returns array of obj
        // findone returns only obj
     .then((emp)=>{
         res.json(emp)
     })
     .catch((err)=>{
         res.json(err)
     })
}

module.exports.update=(req,res)=>{
    const id=req.params.id
    const body=req.body
    Employee.findByIdAndUpdate({userId:req.user._id,_id:id},body,{new:true,runValidators:true})
     .then((emp)=>{
         res.json(emp)
     })
     .catch((err)=>{
         res.json(err)
     })
}

module.exports.destroy=(req,res)=>{
    const id=req.params.id
    Employee.findByIdAndDelete({userId:req.user._id,_id:id})
     .then((emp)=>{
         res.json(emp)
     })
     .catch((err)=>{
         res.json(err)
     })
}