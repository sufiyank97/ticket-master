import React from 'react'
import axios from '../../config/axios'
import {startSetUser} from '../../actions/user'
import {connect} from 'react-redux'
class Login extends React.Component{
    constructor(){
        super()
        this.state={
            email:'',
            password:''
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
        const formData={
            email:this.state.email,
            password:this.state.password
        }
        this.props.dispatch(startSetUser(formData))
        // axios.post('/users/login',formData)
        // .then(response=>{
        //     if(response.data.errors){
        //         window.alert(response.data.message)
        //         console.log("validation error",response.data.errors)
        //     }
        //     else{
        //         console.log("Success",response.data.tokens.length-1)
        //         // const token1
        //         // localStorage.setItem('token',response.data)
        //         // console.log(token)
        //         // localStorage.setItem(response)
        //         // this.props.history.push('/')
        //     }
        // })
        // .catch(err=>{
        //     console.log(err)
        // })
    }
    render(){
        return (
            <div>
                <h1>Login</h1>
                <form onSubmit={this.handleSubmit}>
                    
                    <label>emial
                    <input type="text" name="email" onChange={this.handleChange} value={this.state.email}/>
                    </label>
                    <br/>
                    <label>Password
                    <input type="password" name="password" onChange={this.handleChange} value={this.state.password}/>
                    </label>
                    <br/>
                    <input type="submit"/>
                </form>
            </div>
        )
    }
}
export default connect()(Login)