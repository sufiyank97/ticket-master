const express=require('express')
const router=express.Router()

const customerController=require('../app/controllers/customerController')
const deptController=require('../app/controllers/deptController')
const empController=require('../app/controllers/empController')
const ticketController=require('../app/controllers/ticketController')
const UsersController=require('../app/controllers/UsersController')
const {authenticateUser}=require('../app/middlewares/authentication')

router.get('/customers',authenticateUser,customerController.list)
router.get('/customers/:id',authenticateUser,customerController.show)
router.post('/customers',authenticateUser,customerController.create)
router.put('/customers/:id',authenticateUser,customerController.update)
router.delete('/customers/:id',authenticateUser,customerController.destroy)

router.get('/departments',authenticateUser,deptController.list)
router.get('/departments/:id',authenticateUser,deptController.show)
router.post('/departments',authenticateUser,deptController.create)
router.put('/departments/:id',authenticateUser,deptController.update)
router.delete('/departments/:id',authenticateUser,deptController.destroy)

router.get('/employees',authenticateUser,empController.list)
router.get('/employees/:id',authenticateUser,empController.show)
router.post('/employees',authenticateUser,empController.create)
router.put('/employees/:id',authenticateUser,empController.update)
router.delete('/employees/:id',authenticateUser,empController.destroy)

router.get('/tickets',authenticateUser,ticketController.list)
router.get('/tickets/:id',authenticateUser,ticketController.show)
router.post('/tickets',authenticateUser,ticketController.create)
router.put('/tickets/:id',authenticateUser,ticketController.update)
// router.delete('/tickets/softdelete/:id',(req, res, next) => {
//     console.log(req.headers['x-auth'])
//     next()
// }, authenticateUser,ticketController.softDelete)
router.put('/tickets/softdelete/:id',authenticateUser,ticketController.softDelete)
router.delete('/tickets/:id',authenticateUser,ticketController.destroy)

router.post('/users/register',UsersController.register)
router.post('/users/login',UsersController.login)
router.delete('/users/logout',authenticateUser,UsersController.logout)
router.get('/users/account',authenticateUser,UsersController.account)
module.exports=router


// {
// 	"customerId":"5da835901518e9405cfebbee",
// 	"departmentId":"5da835cd1518e9405cfebbef",
// 	"employeesIds":[{"_id":"5da836c6e3d7bd4b3404dc05"}],
// 	"title":"new ticket title",
// 	"message":"new ticket message",
// 	"isResolved":"true",
// 	"priority":"high",
// 	"code":"Dct-101"
// }