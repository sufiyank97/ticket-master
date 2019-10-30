import React from 'react'
import axios from '../../config/axios'
export default class Register extends React.Component{
    constructor(){
        super()
        this.state={
            username:'',
            email:'',
            password:'',
            number:''
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
        const formData = {
            username: this.state.username, 
            email: this.state.email,
            password: this.state.password,
            number:this.state.number 
            // id: this.props.customer._id 
        }
        axios.post('/users/register',formData)
            .then(response=>{
                if((response.data.errors) || (response.data.errmsg)){
                    window.alert(response.data.message)
                    console.log("validation error",response.data.errors,response.data.errmsg)
                
                }
                else{
                    console.log("Success",response.data)
                    this.props.history.push('/login')
                }
            })
            .catch(err=>{
                console.log(err)
            })
    }
    render(){
        return (
            <div>
                <h1>Register</h1>
                <form onSubmit={this.handleSubmit}>
                    <label>UserName
                    <input type="text" name="username" onChange={this.handleChange} value={this.state.username} required/>
                    </label>
                    <br/>
                    <label>emial
                    <input type="text" name="email" onChange={this.handleChange} value={this.state.email} required/>
                    </label>
                    <br/>
                    <label>Password
                    <input type="password" name="password" onChange={this.handleChange} value={this.state.password} required/>
                    </label>
                    <br/>
                    <label>Number
                    <input type="text" name="number" onChange={this.handleChange} value={this.state.number} required/>
                    </label>
                    <br/>
                    <input type="submit"/>
                </form>
            </div>
        )
    }
}