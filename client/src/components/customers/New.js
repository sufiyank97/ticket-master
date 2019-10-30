import React from 'react'
import CustomerForm from './Form'
// import axios from 'axios'
import axios from '../../config/axios'
class CustomersNew extends React.Component{
    constructor(){
        super()
        this.handleCustomerSubmit=this.handleCustomerSubmit.bind(this)
    }
    handleCustomerSubmit(customer){
        axios.post("/customers",customer,{
            headers:{
                'x-auth':localStorage.getItem('authToken')
            }
        })
        .then(response=>{
            if(response.data.errors){
                window.alert(response.data.message)
                console.log("validation error",response.data.errors)
            }
            else{
                console.log("Success",response.data)
                this.props.history.push('/')
            }
        })
    }
    render(){
        return (
            <div>
                <h2>Add Customer</h2>
                <CustomerForm handleCustomerSubmit={this.handleCustomerSubmit}/>
            </div>
        )
    }
}
export default CustomersNew