import React from 'react'
import {Link} from 'react-router-dom'
import axios from '../../config/axios'
export default class EmployeeShow extends React.Component{
    constructor(){
        super()
        this.state={
            employee:{}
        }
    }
    componentDidMount(){
        const id=this.props.match.params.id
        axios.get(`/employees/${id}`,{
            headers:{
                'x-auth':localStorage.getItem('authToken')
            }
        })
        .then(response=>{
            const employee=response.data
            console.log(employee.deptId.name,"sfsd")
            this.setState({employee},()=>{
                console.log(this.state.employee)
            })
        })
        .catch(err=>{
            console.log(err)
        })
    }
    render(){
        return (
            <div>
                {
                    Object.keys(this.state.employee).length==0?(
                        <React.Fragment>
                            <h1>Loading ...</h1>
                        </React.Fragment>
                    ):(
                        <React.Fragment>
                            Employee Name:-
                            <h3>{this.state.employee.name}</h3><br/>
                            Department Name:-
                            <h3>{this.state.employee.deptId.name}</h3>
                            <Link to={`/employees/edit/${this.state.employee._id}`}>Edit</Link>
                        </React.Fragment>        
                    )
                }
                
            </div>
        )
    }
}