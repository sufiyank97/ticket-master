import React from 'react';
import {BrowserRouter,Route,Link,Switch} from 'react-router-dom'
import CustomersList from './components/customers/List'
import CustomersShow from './components/customers/Show'
import CustomersNew from './components/customers/New'
import CustomersEdit from './components/customers/Edit'

import DepartmentList from './components/departments/DepartList'

import EmployeesList from './components/employees/List'
import EmployeeNew from './components/employees/New'
import EmployeeEdit from './components/employees/Edit'
import EmployeeShow from './components/employees/Show'

import TicketList from './components/tickets/List'
import TicketsNew from './components/tickets/New'
import TicketEdit from './components/tickets/Edit'
import TicketShow from './components/tickets/Show'

import Register from './components/Register/Register'
import Login from './components/Login/Login'
import UserAccount from './components/Account/Account'
import Logout from './components/Logout/Logout'
import {connect} from 'react-redux'

function App(props) {
  return (
    <BrowserRouter>
      <div>
        <h2>Ticket Master</h2>
        <Link to="/">Home</Link>
        <Link to="/customers">customers</Link>
        <Link to="/departments">Departments</Link>
        <Link to="/employees">Employees</Link>
        <Link to="/tickets">Tickets</Link>
        <ul>
          {
            Object.keys(props.user).length==0?(
              <React.Fragment>
                <li><Link to='/register'>Register</Link></li>
                <li><Link to='/login'>Login</Link></li>
                </React.Fragment>
            ):(
              <React.Fragment>
                <li><Link to='/account'>account</Link></li>
                <li><Link to='/logout'>Logout</Link></li>
                </React.Fragment>
            )
          }
        </ul>
        <Switch>
          <Route path="/customers" component={CustomersList} exact={true}/>
          <Route path="/customers/new" component={CustomersNew} exact={true}/>
          {/* <Route path="/customers/show" component={CustomersShow}/> */}
          <Route path="/customers/edit/:id" component={CustomersEdit} />
          <Route path="/customers/:id" component={CustomersShow}/>

          <Route path="/departments" component={DepartmentList} />

          <Route path="/employees" component={EmployeesList} exact={true}/>
          <Route path="/employees/new" component={EmployeeNew} exact={true}/>
          <Route path="/employees/edit/:id" component={EmployeeEdit}/>
          <Route path="/employees/:id" component={EmployeeShow}/>

          <Route path="/tickets" component={TicketList} exact={true}/>
          <Route path="/tickets/new" component={TicketsNew} exact={true}/>
          <Route path="/tickets/edit/:id" component={TicketEdit}/>
          <Route path="/tickets/:id" component={TicketShow}/>
          
          <Route path="/register" component={Register}/>
          <Route path="/login" component={Login}/>
          <Route path="/account" component={UserAccount}/>
          <Route path="/logout" component={Logout}/>
        </Switch>
      </div>
    </BrowserRouter>
  );
}
const mapStatetoProps=(state)=>{
  return {
    user:state.user
  }
}
export default connect(mapStatetoProps)(App);