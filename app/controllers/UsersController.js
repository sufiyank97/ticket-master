const _ =require('lodash')
// const bcrypt=require('bcryptjs')
const {User}=require('../models/User')
// const {authenticateUser}=require('../middlewares/authentication')
// localhost:3000/users/register
module.exports.register=function(req,res){
    const body=req.body
    const user=new User(body)
    user.save()
        .then(function(user){
            // res.send(user)
            // serialization response [data]
            // res.send({
            //     _id:user._id,
            //     username:user.username,
            //     email=user.email
            // })
            // concise property
            const {_id,username,email,password}=user
            res.send({
                _id,username,email,password
            })
        })
        .catch(function(err){
            res.send(err)
        })
}

// localhost:3000/users/login
module.exports.login=function(req,res){
    const body=req.body
    let user
    User.findByCredentials(body.email, body.password)
        .then(function(userFound){
            user=userFound  
            return user.generateToken()
            // or nested promises i.e. .then() without return
        })
        .then(function(token){
            // res.setHeader('x-auth',token)
            user=_.pick(user,['id','username','email'])
            res.json({
                token,
                user
            })
            // res.send({token})
        })
        .catch(function(err){
            res.send(err)
        })
    // User.findOne({email:body.email})
    //     .then(function(user){
    //         // console.log(user)
    //         if(!user){
    //             res.status('404').send('invalid email / password')
    //         }
    //         bcryptjs.compare(body.password,user.password)
    //             .then(function(result){
    //                 if(result){
    //                     res.send(user)
    //                 }
    //                 else{
    //                     res.status('404').send('invalid email / password')
    //                 }
    //             })
    //     })
    //     .catch(function(err){
    //         res.send(err)
    //     })
}
// localhost:3000/users/account func in js are objects  objects are pass by reference
module.exports.account=function(req,res){
    const {user}=req
    res.send(user)
  
}

module.exports.logout=function(req,res){
    const {user,token} =req
    User.findByIdAndUpdate(user._id,{$pull:{tokens:{token:token}}})
        .then(function(){
            res.send({notice:'successfully log out'})
        })
        .catch(err=>{
            res.send(err)
        })
}
// router.get('/account',authenticateUser,)
// $pull is mongodb method and findbyidand update is mongoose method
// localhost:3000/users/logout
// function(req,res){
//     const {user,token}=
// }
// router.delete('/logout')
// module.exports={
//     usersRouter:router
// }