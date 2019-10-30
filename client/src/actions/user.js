import axios from '../config/axios'
export const setUser=(user)=>{
    return {
        type:'SET_USER',
        payload:user
    }
}
export const resetUser=()=>{
    return{
        type:'RESET_USER'
    }
}
export const startSetUser=(formData)=>{
    return (dispatch)=>{
        axios.post('/users/login',formData)
            .then(response=>{
                if(response.data.errors){
                    alert(response.data.errors)
                }else{
                    // console.log(response.data.token.tokens.token)
                    localStorage.setItem('authToken',response.data.token)
                    console.log(response.data,"sdfsf")
                    dispatch(setUser(response.data.user))
                }
            })
        
    }
}

