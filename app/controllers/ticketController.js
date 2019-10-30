const Ticket=require('../models/ticket')

module.exports.list=(req,res)=>{
    Ticket.find({userId:req.user._id}).populate('employeesIds').populate('customerId').populate('departmentId')
     .then((tickets)=>{
         res.json(tickets)
     })
     .catch((err)=>{
         res.json(err)
     })
}

module.exports.create=(req,res)=>{
    const body=req.body
    const ticket=new Ticket(body)
    ticket.userId=req.user._id
     ticket.save()
       .then((ticket)=>{
           res.json(ticket)
       })
       .catch((err)=>{
           res.json(err)
       })
}

module.exports.show=(req,res)=>{
    const id=req.params.id
    Ticket.findOne({userId:req.user._id,_id:id}).populate('employeesIds').populate('customerId',['name']).populate('departmentId')
      .then((ticket)=>{
          res.json(ticket)
      })
      .catch((err)=>{
          res.json(err)
      })
}

module.exports.update=(req,res)=>{
    const id=req.params.id
    const body=req.body
    Ticket.findByIdAndUpdate({userId:req.user._id,_id:id},body,{new:true,runValidators:true})
     .then((ticket)=>{
         res.json(ticket)
     })
     .catch((err)=>{
         res.json(err)
     })
}

module.exports.destroy=(req,res)=>{
    const id=req.params.id
    Ticket.findByIdAndDelete({userId:req.user._id,_id:id})
      .then((ticket)=>{
          res.json(ticket)
      })
      .catch(err=>{
          res.send(err)
      })
}

module.exports.softDelete=(req,res)=>{
    const id=req.params.id
    const body=req.body
    Ticket.findByIdAndUpdate({userId:req.user._id,_id:id},body,{new:true,runValidators:true})
      .then((ticket)=>{
          res.json(ticket)
      })
      .catch(err=>{
          res.json(err)
      })
}