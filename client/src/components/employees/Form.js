import React from 'react'
import axios from '../../config/axios'
export default class EmployeeForm extends React.Component{
    constructor(props){
        super(props)
        this.state={
            name:props.employee?props.employee.name:"",
            email:props.employee?props.employee.email:"",
            mobile:props.employee?props.employee.mobile:"",
            deptId:props.employee?props.employee.deptId._id:"",
            departments:[]
        }
        this.handleSubmit=this.handleSubmit.bind(this)
        this.handleChange=this.handleChange.bind(this)
    }
    handleChange(e){
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    handleSubmit(e){
        e.preventDefault()
        const formdata={
            name:this.state.name,
            email:this.state.email,
            mobile:this.state.mobile,
            deptId:this.state.deptId
        }
        this.props.employee && (formdata.id = this.props.employee._id) 
        console.log(formdata)
        this.props.handleEmployeeSubmit(formdata)
    }
    componentDidMount(){
        axios.get('/departments',{
            headers:{
                'x-auth':localStorage.getItem('authToken')
            }
        })
        .then((response)=>{
            const departments=response.data
            this.setState({departments})
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    render(){
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Name
                        <input type="text" value={this.state.name} onChange={this.handleChange} name="name" />
                    </label><br/>
                    <label>
                        email
                        <input type="text" value={this.state.email} onChange={this.handleChange} name="email" />
                    </label><br/>
                    <label>
                        mobile
                        <input type="text" value={this.state.mobile} onChange={this.handleChange} name="mobile" />
                    </label><br/>
                    <label >
                        Department
                    </label>
                    <select value={this.state.deptId} onChange={this.handleChange} name="deptId">
                        <option value="">Select</option>
                        {this.state.departments.map(department=>{
                            // <option>{index+1}</option>
                            return <option key={department._id} value={department._id}>{department.name}</option>
                        })}
                    </select>
                    <input type="submit"/>
                </form>
            </div>
        )
    }
}
