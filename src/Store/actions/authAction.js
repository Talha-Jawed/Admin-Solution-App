import actionTypes from '../Constant/Constant'
import firebase from '../../Config/firebase'
import Swal from 'sweetalert2'

// LOGIN
export function Action(Email, Password) {
    return dispatch => {
        firebase.auth().signInWithEmailAndPassword(Email, Password)
            .then((success) => {
                // alert('Success')
                Swal.fire('LogIn Success')
                console.log(success);

                dispatch(
                    { type: actionTypes.UID, payload: success.user.uid }
                )
                // dispatch(
                //     { type: actionTypes, payload: success.user.uid }
                // )
            })
            .catch((error) => {
                // alert('Invalid Email & Password')
                Swal.fire('Invalid Email & Password')
                console.log('something went wrong', error)
            })
    }
}

// current User
export function current_User(currentUser) {
    return dispatch => {
        const UID = currentUser.uid
        var arr = [];
        dispatch(
            { type: actionTypes.UID, payload: UID }
        )
        firebase.database().ref('/UserData/').on('child_added', snapShot => {
            const UserData = snapShot.val();
            if (snapShot.key === currentUser.uid) {
                dispatch(
                    { type: actionTypes.USER, payload: snapShot.val() }
                )
            }
            else {
                arr.push(snapShot.val())
                dispatch(
                    { type: actionTypes.ALLUSER, payload: arr }
                )
            }
        })
       
    }
}
