import React, { Component } from 'react';
import { Router, Route, Link } from "react-router-dom";
import LogIn from '../Authentication/LogIn'
import Dashboard from '../Screen/Dashboard'
import AllPost from '../Screen/AllPosts/Post'
import ViewPost from '../Screen/View Post/View'
import history from '../History/index'
import Category from '../Screen/AddCategory/Category'

class Routers extends Component {

    render() {
        return (
            <Router history={history}>
                <div>
                    <Route exact path="/" component={LogIn} />
                    <Route path='/Dashboard' component={Dashboard} />
                    <Route path='/AllPost' component={AllPost} />
                    <Route path='/ViewPost' component={ViewPost} />
                    <Route path='/Category' component={Category} />
                </div>
            </Router>
        )
    }

}
export default Routers;