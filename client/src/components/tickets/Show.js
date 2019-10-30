import React from 'react'
import {Link} from 'react-router-dom'
import axios from '../../config/axios'
export default class TicketShow extends React.Component{
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
            console.log(ticket)
            this.setState({ticket})
        })
        .catch(err=>{
            console.log(err)
        })
    }
    render(){
        return(
            <div>
                {
                    Object.keys(this.state.ticket).length==0?(
                        <React.Fragment>
                            <h1>Loading ...</h1>
                        </React.Fragment>
                    ):(
                        <React.Fragment>
                            Ticket Name:-
                            <h3>{this.state.ticket.code}</h3><br/>
                            Department Name:-
                            <h3>{this.state.ticket.employeesIds.map(e1=>{return e1.name})}</h3>
                            <Link to={`/tickets/edit/${this.state.ticket._id}`}>Edit</Link>
                        </React.Fragment>        
                    )
                }
            </div>
        )
    }
}