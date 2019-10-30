import React from 'react'
// import axios from 'axios'
import {Link} from 'react-router-dom'
import axios from '../../config/axios'
import { Table } from 'reactstrap';
class CustomersList extends React.Component{
    constructor(){
        super()
        this.state={    
            customers:[]
        }
    }
    componentDidMount(){
        axios.get("/customers",{
            headers:{
                'x-auth':localStorage.getItem('authToken')
            }
        })
            .then(response=>{
                const customers=response.data
                this.setState({customers})
            })
            .catch(err=>{
                console.log(err)
            })
    }
    handleRemove=(id)=>{
        axios.delete(`/customers/${id}`,{
            headers:{
                'x-auth':localStorage.getItem('authToken')
            }
        })
        .then((response)=>{
            this.setState(prevState=>({
                customers:prevState.customers.filter(customer=>customer._id!==response.data._id)
            }))            
            // console.log(response.data)
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    render(){
        return (
            <div>
                <h2>Listing Customers {this.state.customers.length}</h2>
                <Table striped dark bordered hover>
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>name</th>
                            <th>email</th>
                            <th>mobile</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.customers.map((customer,index)=>{
                            return (
                                <tr key={customer._id}>
                                    <td>{index+1}</td>
                                    <td><Link to={`/customers/${customer._id}`}>{customer.name}</Link></td>
                                    <td>{customer.email}</td>
                                    <td>{customer.mobile}</td>
                                    <td><button onClick={()=>{
                                        let confirm=window.confirm("Are you Sure")
                                        if (confirm){
                                            this.handleRemove(customer._id)
                                        }
                                        else{
                                            window.alert('you presssed cancel')
                                        }
                                    }}>Remove</button></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
                <Link to="/customers/new">Add Customer</Link>
            </div>
        )
    }
}
export default CustomersList