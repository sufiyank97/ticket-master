import React from 'react' 

class CustomerForm extends React.Component { 
    constructor(props) {
        super(props) 
        console.log("form customer")
        this.state = {
            name: props.customer?props.customer.name:'',
            email: props.customer?props.customer.email:'', 
            mobile: props.customer?props.customer.mobile:''
        }
        this.handleSubmit = this.handleSubmit.bind(this) 
        this.handleChange = this.handleChange.bind(this)
    }
    
    handleChange(e) {
        this.setState({ 
            [e.target.name] : e.target.value 
        })
    }

    handleSubmit(e) {
        e.preventDefault() 
        const formData = {
            name: this.state.name, 
            email: this.state.email,
            mobile: this.state.mobile, 
            // id: this.props.customer._id 
        }

        // we want to create an id property only while editing and not creating a user, this is determined based on if the component has recieved a customer prop
        this.props.customer && (formData.id = this.props.customer._id) 

        console.log(formData)
        this.props.handleCustomerSubmit(formData)
    }
    // componentDidMount(){
    //     console.log(nextProps.customer,"edit")
    // }
    // componentWillReceiveProps(nextProps){
    //     console.log('form customer will receive props', nextProps)
    //     const { name, email, mobile } = nextProps.customer
    //     this.setState({ name, email, mobile  })
    // }

    render() {
        console.log('form customer render')
        return (
            <div> 
                <form onSubmit={this.handleSubmit}> 
                    <label>
                        Name 
                        <input type="text" value={this.state.name} onChange={this.handleChange} name="name" /> 
                    </label> <br/>
                    
                    <label>
                        Email
                        <input type="text" value={this.state.email} onChange={this.handleChange} name="email" />
                    </label> <br />

                    <label>
                        Mobile
                        <input type="text" value={this.state.mobile} onChange={this.handleChange} name="mobile" />
                    </label> <br />

                    <input type="submit" value="submit" /> 
                </form> 
            </div>
        )
    }
}

export default CustomerForm 