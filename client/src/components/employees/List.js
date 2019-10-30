import React from 'react'
import axios from '../../config/axios'
import {Link} from 'react-router-dom'
export default class EmployeesList extends React.Component{
    constructor(){
        super()
        this.state={
            employees:[]
        }
    }
    componentDidMount(){
        axios.get("/employees",{
            headers:{
                'x-auth':localStorage.getItem('authToken')
            }
        })
            .then(response=>{
                const employees=response.data
                console.log(employees)
                this.setState({employees})
            })
            .catch(err=>{
                console.log(err)
            })
    }
    handleRemove=(id)=>{
        axios.delete(`/employees/${id}`,{
            headers:{
                'x-auth':localStorage.getItem('authToken')
            }
        })
        .then((response)=>{
            this.setState(prevState=>({
                employees:prevState.employees.filter(employee=>employee._id!==response.data._id)
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
                <h2>Listing Employees {this.state.employees.length}</h2>
                <table>
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>name</th>
                            <th>email</th>
                            <th>mobile</th>
                            <th>Department</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* console.log({this.state.employees}) */}
                        {this.state.employees.map((employee,index)=>{
                            return (
                                <tr key={employee._id}>
                                    <td>{index+1}</td>
                                    <td><Link to={`/employees/${employee._id}`}>{employee.name}</Link></td>
                                    <td>{employee.email}</td>
                                    <td>{employee.mobile}</td>
                                    <td>{employee.deptId.name}</td>
                                    <td><button onClick={()=>{
                                        let confirm=window.confirm("Are you Sure")
                                        if (confirm){
                                            this.handleRemove(employee._id)
                                        }
                                        else{
                                            window.alert('you presssed cancel')
                                        }
                                    }}>Remove</button></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>    
                <Link to="/employees/new">Add Employee</Link>
            </div>
        )
    }
}