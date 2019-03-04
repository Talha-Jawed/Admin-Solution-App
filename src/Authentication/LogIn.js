import React, { Component } from 'react';
import firebase from 'firebase'
import Swal from 'sweetalert2'
import history from '../History'
import { connect } from 'react-redux'
import { Action, current_User } from '../Store/actions/authAction'
import './style.css'

class LogIn extends Component {
    constructor(props) {
        super(props)
        this.state = {
            Email: '',
            Password: '',
        }
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user != null) {
                const currentUser = user
                this.props.user(currentUser)
            }
        })
    }

    componentWillReceiveProps(props) {
        const { CurrentUser, UID, AllUser } = props
        if (UID) {
            setTimeout(() => {
                console.log(AllUser, 'user>>');
            }, 200)
        }
        if (UID) {
            this.props.history.push('/Dashboard')
        }

    }

    login() {
        const { Email, Password } = this.state
        if (Email && Password) {
            this.props.AuthUser(Email, Password)
            // this.props.history.push('/Dashboard')
        } else {
            Swal.fire('Plese Enter Email or Password')
        }
    }

    render() {
        const { Email, Password } = this.state

        return (
            <div className="main-container">
                <div className="flex-box">
                    <h2 className="input-fields">LogIn Here</h2>
                    <label className="input-fields"> Email :
                         <input
                            type="text" name="name"
                            // value={email}
                            placeholder={"Enter Email"}
                            onChange={(e) => { this.setState({ Email: e.target.value }) }}
                        />
                    </label>
                    <label className="input-fields">Password:
                        <input
                            type="password"
                            name="password"
                            // value={password}
                            onChange={(e) => { this.setState({ Password: e.target.value }) }}
                        />
                    </label>
                    <div id="button">
                        <button onClick={() => this.login()} className="button">Login</button>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(states) {
    return ({
        CurrentUser: states.authReducers.USER,
        UID: states.authReducers.UID,
        AllUser: states.authReducers.ALLUSER
    })
}

function mapDispatchToProps(dispatch) {
    return ({
        AuthUser: (Email, Password) => {
            dispatch(Action(Email, Password));

        },

        user: (currentUser) => {
            dispatch(current_User(currentUser))
        },
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(LogIn);