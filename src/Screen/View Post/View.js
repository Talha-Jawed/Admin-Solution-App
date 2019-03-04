import React, { Component } from 'react';
import firebase from 'firebase'
import swal from 'sweetalert2'
import history from '../../History'
import { Header } from 'semantic-ui-react'
import MenuAppBar from '../../Component/Header'
import { connect } from 'react-redux'


class ViewPost extends Component {
    constructor(props) {
        super(props)
        this.state = {
            item: '',
            userUID: '',
            _block: false,
            openChat: false,
            text: '',
            adminUID: '',
            paramsUID: ''
        }
    }

    componentDidMount() {
        const { UID } = this.props
        console.log(UID, 'chat UIDsend')
        let params = this.props.history.location.state
        var reciveMsg = []
        var sendMsg = []
        // console.log(params, 'param----');
        if (params) {
            this.setState({ item: params, userUID: params.UID, adminUID: UID })
            var postUID = params.UID
        }
        firebase.database().ref('/UserData/' + postUID).on('value', snapShot => {
            // console.log(snapShot.val(), ';;;;;;;');
            if (snapShot.val().admin === 'Block') {
                this.setState({ _block: true })
            }

        })

        firebase.database().ref('/UserData/').on('child_changed', snapShot => {
            if (snapShot.key === postUID) {
                if (snapShot.val().admin === 'Block') {
                    this.setState({ _block: true })
                } else if (snapShot.val().admin === 'unBlock') {
                    this.setState({ _block: false })
                }
            }

        })
        var newUpdate = []
        var AllMessages = []
        firebase.database().ref('/Messages/').on('child_added', snapShot => {
            const Messages = snapShot.val();
            console.log(Messages, ';msg--->>');

            if (Messages.senderUid === UID || Messages.reciverUid === UID) {
                AllMessages.push(Messages)
                newUpdate.push(Messages)
            }
            var chat = []
            AllMessages.map((i) => {
                if (i.senderUid === UID && i.reciverUid === postUID) {
                    chat.push(i)
                    this.setState({
                        pp: true
                    })
                }
                else if (i.reciverUid === UID && i.senderUid === postUID) {
                    chat.push(i)
                    this.setState({
                        pp: true
                    })
                }
            })
            this.setState({ chatMesg: chat })
        })


    }


    block() {
        const { userUID } = this.state
        var obj = {
            admin: 'Block'
        }
        firebase.database().ref('/UserData/' + userUID).update(obj)

    }
    unBlock() {
        const { userUID } = this.state
        var obj = {
            admin: 'unBlock'
        }
        firebase.database().ref('/UserData/' + userUID).update(obj)
    }

    delete() {

    }

    send() {
        const { text, userUID, adminUID, item, pp } = this.state;
        var user = adminUID
        var recever = userUID
        var message = text
        if (pp === true) {

            this.setState({ text: '' })

            if (text) {
                const obj = {
                    message: message,
                    senderUid: user,
                    reciverUid: recever,
                    date: Date.now()
                }
                firebase.database().ref('/Messages/').push(obj).then(() => {
                })
            }

        } else {
            if (text) {
                console.log('chat 2send')
                this.setState({ text: '' })

                const obj = {
                    message: message,
                    senderUid: user,
                    reciverUid: recever,
                    date: Date.now(),
                    id: 1,
                    sender: {
                        Photo: "https://i.ibb.co/hBv4Tpb/solution.png",
                        Name: 'App Admin',
                        UID: adminUID
                    },
                    reciver: {
                        Photo: item.Photo,
                        Name: item.Name,
                        UID: userUID
                    },
                }
                firebase.database().ref('/Messages/').push(obj).then(() => {
                })
            }
        }
    }


    render() {
        const { item, reciveMsg, sendMsg, _block, openChat, text, chatMesg, adminUID, userUID } = this.state
        return (
            <div>
                <MenuAppBar />
                <div style={styles.div}>

                    {
                        item &&
                        <div style={styles.post}>

                            <div>
                                <text style={{ fontWeight: 'bold', fontSize: '28px', margin: '26px', textDecoration: 'underline' }}>Detail's!</text>
                            </div>
                            <div>
                                <text style={styles.item}>{'Designation: ' + item.category}</text>
                            </div>
                            <div>
                                <text style={styles.item}>{'Name: ' + item.Name}</text>
                            </div>
                            <div>
                                <text style={styles.item}>{'Phone: ' + item.number}</text>
                            </div>
                            <div>
                                <text style={styles.item}>{'Experience: ' + item.experience + ' Year'}</text>
                            </div>
                            <div >
                                <text style={styles.item}>Location: Karachi</text>
                            </div>
                            <div style={{ flexBasis: '100%', marginTop: '5%' }}>
                                {_block ?
                                    <button onClick={() => this.unBlock()} className="button">Un-Block</button>
                                    :
                                    <button onClick={() => this.block()} className="button">Block User</button>
                                }
                                <button onClick={() => this.setState({ openChat: true })} className="button">Chat with User</button>
                            </div>
                        </div>
                    }
                </div>

                {openChat &&
                    <div style={{ border: '2px solid #5c99e8', borderRadius: '10px', height: '394px', width: '315px', flex: 1, margin: '20px', overflow: 'hidden' }}>
                        <div style={{ height: '365px', flexWrap: 'wrap', backgroundColor: '#edf0f4' }} className="chatDiv" >
                            {

                                chatMesg &&
                                chatMesg.map((i, index) => {
                                    // console.log(i, "map")
                                    if (i.senderUid === adminUID) {
                                        return (
                                            <div style={{ alignItems: 'flex-end', justifyContent: 'flex-end', marginLeft: 90 }}>
                                                <div key={index} style={{ display: 'flex', backgroundColor: '#25D366', width: 200, borderRadius: 6, justifyContent: 'flex-end', alignItems: 'flex-end', border: '2px solid #edf0f4', overflow: 'hidden' }}>
                                                    <text style={{ fontSize: 15, padding: 4, fontWeight: '500', }}>{i.message}</text>
                                                </div>
                                            </div>
                                        )
                                    } else if (i.senderUid === userUID) {
                                        return (
                                            <div style={{ alignItems: 'flex-start', justifyContent: 'flex-start', }}>
                                                <div key={index} style={{ display: 'flex', backgroundColor: '#bdd3ef', width: 200, borderRadius: 6, justifyContent: 'flex-start', alignItems: 'flex-start', border: '2px solid #edf0f4', overflow: 'hidden' }}>
                                                    <text style={{ fontSize: 15, padding: 4, fontWeight: '500', }}>{i.message}</text>
                                                </div>
                                            </div>
                                        )
                                    }

                                })

                            }
                        </div>
                        <div style={{ width: '100%', }}>
                            <input
                                type='text'
                                value={text}
                                onChange={(e) => this.setState({ text: e.target.value })}
                                style={{ width: '75%', padding: '4px', textAlign: 'left', color: 'black', borderRadius: '9px', marginRight: '6px', border: '2px solid #5c99e8' }} />
                            <button onClick={() => this.send()} style={{ backgroundColor: '#5c99e8', fontWeight: 'bold', color: 'white', border: 'none', padding: 2, borderRadius: '2px', margin: '1px' }} >SEND</button>
                        </div>
                    </div>

                }
                {
                    reciveMsg &&
                    reciveMsg.map((item, index) => {
                        return (
                            <text>{item.message}</text>
                        )
                    })

                }
                {
                    sendMsg &&
                    sendMsg.map((item, index) => {
                        return (
                            <text>{item.message}</text>
                        )
                    })
                }

            </div>
        )
    }
}

const styles = {
    div: {
        backgroundColor: '#edf0f4',
        justifyContent: 'center',
        display: 'flex',
        padding: '10px'
    },
    post: {
        flexBasis: '100%',
        backgroundColor: '#bdd3ef',
        border: '2px solid #5c99e8',
        borderRadius: '10px',
        overFlow: 'hidden',
        margin: '10px',
        padding: '8px',
        display: 'flex',
        flexDirection: 'column'

    }, item: {
        flexBasis: '100%',
        fontWeight: 'bold',
        fontSize: '22px',
        margin: '12px',
        color: '#404244'
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

export default connect(mapStateToProps, mapDispatchToProps)(ViewPost);