import React, { Component } from 'react';
import firebase from 'firebase'
import swal from 'sweetalert2'
import history from '../../History'
import { Header } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { Action, current_User } from '../../Store/actions/authAction'
import MenuAppBar from '../../Component/Header'

class AllPost extends Component {
    constructor(props) {
        super(props)
        this.state = {
            _post: false
        }
    }

    componentDidMount() {
        const { UID, AllUser } = this.props
        firebase.auth().onAuthStateChanged((user) => {
            if (user != null) {
                const currentUser = user
                this.props.user(currentUser)
            }
        })
        // console.log('uid===DID', UID);
        // console.log('users===DID', AllUser);
        var post = []
        if (AllUser) {
            setTimeout(() => {

                AllUser.map(item => {
                    if (item.category) {
                        post.push(item)
                    }
                    this.setState({ post, _post: true })
                })
            }, 100)
        }
    }
    componentWillReceiveProps(props) {
        const { UID, AllUser } = props
        console.log('uid===WIll', UID);
        var post = []
        if (AllUser) {
            setTimeout(() => {
                AllUser.map(item => {
                    if (item.category) {
                        post.push(item)
                    }
                    this.setState({ post, _post: true })
                })
            }, 100)
        }
    }

    login() {
        this.props.history.push('/Dashboard')
    }
    Category() {
        this.props.history.push('/Category')
    }
    view(item) {
        // console.log(item, 'vier<<<');
        this.props.history.push('/ViewPost', item)

    }

    render() {
        const { _post, post } = this.state
        return (
            <div>
                {/* <Header size='huge' color='blue'>Huge Header</Header>
                <button onClick={() => this.login()}>post</button> */}
                <MenuAppBar />
                {/* <button onClick={() => this.Category()} className="button">Add Category</button>
                <button onClick={() => this.login()} className="button">Show Graph</button> */}
                <div style={styles.div} >
                    {_post &&
                        post.map((item, index) => {
                            // console.log(item);

                            return (
                                <div>
                                    <div key={index} style={styles.post} className="POST">
                                        <div style={{ flexBasis: '100%' }}>
                                            <text style={{ flexBasis: '100%', fontWeight: 'bold', fontSize: '22px', margin: '10px', color: '#404244' }}>{item.category}</text>
                                        </div>
                                        <div style={{ flexBasis: '100%' }}>
                                            <img src={item.Photo} alt="Logo" style={{ flexBasis: '100%', width: '170px', height: '170px', border: '1px solid #5c99e8', borderRadius: '100%' }} />
                                        </div>
                                        <div style={{ flexBasis: '100%' }}>
                                            <text style={{ fontWeight: 'bold', fontSize: '18px', margin: '10px' }}>{item.Name}</text>
                                        </div>
                                        <div style={{ flexBasis: '100%' }}>
                                            <button onClick={() => this.view(item)} className="button">View Now</button>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}


const styles = {
    div: {
        backgroundColor: '#edf0f4',
        flexWrap: 'wrap',
        // flexDirection:'row',
        justifyContent: 'center',
        display: 'flex',
        padding: '10px'
    },
    post: {
        // marginTop: '3px',
        backgroundColor: '#bdd3ef',
        // flexWrap: 'wrap',
        border: '2px solid #5c99e8',
        borderRadius: '10px',
        overFlow: 'hidden',
        // alignItems: 'center',
        margin: '8px',
        padding: '6px',
        // alignSelf:'center',
        display: 'flex',
        flexDirection: 'column'

    },

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

        user: (currentUser) => {
            dispatch(current_User(currentUser))
        },

    })
}

export default connect(mapStateToProps, mapDispatchToProps)(AllPost);