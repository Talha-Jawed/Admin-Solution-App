import React, { Component } from 'react';
import firebase from 'firebase'
import swal from 'sweetalert2'
import history from '../History'
import { Header } from 'semantic-ui-react'
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { connect } from 'react-redux'
import MenuAppBar from '../Component/Header'

class Dashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    componentDidMount() {
        this.AllGraphData()
    }

    AllGraphData = () => {
        var users = 0
        var category = 0;
        var reqAccept = 0;
        var reqPanding = 0;
        var reqDelete = 0;
        firebase.database().ref('/UserData/').on('child_added', snapShot => {
            // console.log('==>>', snapShot.val().category);
            const data = snapShot.val()
            if (data) {
                users++
            }
            if (data.category) {
                // console.log('==>>', snapShot.val());
                category++
            }
        })
        firebase.database().ref('/Request/').on('child_added', snapShot => {
            for (var key in snapShot.val())
                var value = snapShot.val()[key]
            // console.log('==>>', value.status);
            if (value.status === 'Accept') {
                reqAccept++
            }
            else if (value.status === 'Panding') {
                reqPanding++
            }
            else if (value.status === 'Delete') {
                reqDelete++
            }
        })

        setTimeout(() => {
            const obj = { users, category, reqAccept, reqPanding, reqDelete }
            this.setState({ AllData: obj }, console.log(obj)
            )
        }, 6000)

    }


    login() {
        this.props.history.push('/AllPost')
    }
    Category() {
        this.props.history.push('/Category')
    }

    render() {
        const { AllData } = this.state
        return (
            <div>
                <div>
                    <MenuAppBar />
                </div>
                {AllData &&
                    <LineChart width={1000} height={400} style={{marginTop:'40px' , marginLeft: '60px' , fontWeight: 'bold' }} data={[
                        { name: 'ALL-USERS', uv: AllData.users, pv: 2400, amt: 2400 },
                        { name: 'SELLER', uv: AllData.category, pv: 2400, amt: 2400 },
                        { name: 'OFFER-ACCEPT', uv: AllData.reqAccept, pv: 2400, amt: 2400 },
                        { name: 'OFFER-PENDING', uv: AllData.reqPanding, pv: 2400, amt: 2400 },
                        { name: 'OFFER-REJECT', uv: AllData.reqDelete, pv: 2400, amt: 2400 },
                    ]}>
                        <Line type="monotone" dataKey="uv" stroke="#5c99e8" activeDot={{ r: 5 }} />
                        <CartesianGrid stroke="#c5c8cc" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                    </LineChart>
                }
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

    })
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);