import React from 'react'
import axios from '../../config/axios'
import TicketsForm from '../tickets/Form'
export default class TicketEdit extends React.Component{
    constructor(){
        super()
        this.state={
            ticket:{

            }
        }
    }
    componentDidMount(){
        const id=this.props.match.params.id
        axios.get(`/tickets/${id}`,{
            headers:{
                'x-auth':localStorage.getItem('authToken')
            }
        })
        .then(response=>{
            const ticket=response.data
            this.setState({ticket})
        })
        .catch(err=>{
            console.log(err)
        })
    }
    render(){
        return(
            <div>
                <h1>Edit Ticket</h1>
                {this.state.ticket._id&&<TicketsForm ticket={this.state.ticket}/>}
            </div>
        )
    }
}