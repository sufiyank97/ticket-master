const Department=require('../models/department')

module.exports.list=(req,res)=>{
    Department.find()
      .then((depts)=>{
          res.json(depts)
      })
      .catch((err)=>{
          res.json(err)
      }) 
}

module.exports.show=(req,res)=>{
    const id=req.params.id
    Department.findById(id)
     .then((dept)=>{
         res.json(dept)
     })
     .catch((err)=>{
         res.json(err)
     })
}

module.exports.create=(req,res)=>{
    const body=req.body
    const dept = new Department(body)
    dept.save()
      .then((depts)=>{
          res.json(depts)
      })
      .catch((err)=>{
          res.json(err)
      })
}

module.exports.update=(req,res)=>{
    const id=req.params.id
    const body=req.body
    Department.findByIdAndUpdate(id,body,{new:true,runValidators:true})
     .then((dept)=>{
         res.json(dept)
     })
     .catch((err)=>{
         res.json(err)
     })
}

module.exports.destroy=(req,res)=>{
    const id=req.params.id
    Department.findByIdAndDelete(id)
     .then((dept)=>{
         res.json(dept)
     })
     .catch((err)=>{
         res.json(err)
     })
}