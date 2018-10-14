import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

// import NotFound from './pages/NotFound'
// import Login from './pages/login'
// import ForgotPW from './pages/forgotPW'
// import RegisterUser from './pages/registration/newUser'
// import Dashboard from './pages/dashboard'
import Employee from './pages/Employee.jsx'

export default () => (
    <Router>
        <Switch>
            <Route exact path="/employee" component={Employee}/> 
        </Switch>
    </Router>
)