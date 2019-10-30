import React from 'react'
// import axios from 'axios'    
// import {Link} from 'react-router-dom'
import axios from '../../config/axios'
class DepartmentList extends React.Component{
    constructor(){
        super()
        this.state={
            departments:[],
            name:''
        }
        this.handleDepartmentChange=this.handleDepartmentChange.bind(this)
        this.handleDepartmentSubmit=this.handleDepartmentSubmit.bind(this)
    }
    handleDepartmentChange(e){
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    handleDepartmentSubmit(e){
        e.preventDefault()
        const department={
            name:this.state.name,
        }
        console.log(department)
        this.setState({department})
        axios.post("/departments",department,{
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
                // this.setState(prevState=>{
                //     return {departments:[].prevState.departments.concat(department)}
                // })
                this.props.history.push('/')
            }
        })
        // this.props.handleCustomerSubmit(formdata)
    }
    handleRemove=(id)=>{
        axios.delete(`/departments/${id}`)
            .then(response=>{
                this.setState(prevState=>({
                    departments:prevState.departments.filter(department=>department._id!==response.data._id)
                }))
                
            })
            .catch(err=>{
                console.log(err)
            })
    }
    componentDidMount(){
        axios.get("/departments",{
            headers:{
                'x-auth':localStorage.getItem('authToken')
            }
        })
        .then(response=>{
            const departments=response.data
            this.setState({departments})
        })
        .catch(err=>{
            console.log(err)
        })
    }
    render(){
        return (
            <div>
                <h2>Listing departments {this.state.departments.length}</h2>
                <form onSubmit={this.handleDepartmentSubmit}>
                    <label>
                        <input type="text" placeholder="add department" onChange={this.handleDepartmentChange} value={this.state.name} name="name"/>
                    </label>
                    <input type="submit"/>
                </form>
                <ul>
                    {this.state.departments.map(department=>{
                        return (
                            <li key={department.name}>{department.name}<button onClick={()=>{
                                const confirm=window.confirm('are you sure')
                                if(confirm)this.handleRemove(department._id)
                                else window.alert('you pressed cancel')
                            }}>remove</button></li>
                        )
                    })}
                </ul>
            </div>
        )
    }
}
export default DepartmentList