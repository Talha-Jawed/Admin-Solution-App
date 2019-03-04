import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Paper, withStyles, Grid, TextField, Button, FormControlLabel, Checkbox } from '@material-ui/core';
import firebase from 'firebase'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import menuButton from '../../Component/Header'
import MenuAppBar from '../../Component/Header'
import history from '../../History/index'


const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
});

let id = 0;
function createData(name, calories, fat, carbs, protein) {
  id += 1;
  return { id, name, calories, fat, carbs, protein };
}

const rows = [
  createData('', 159),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

class catagories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      value: ''
    }
  }
  componentDidMount() {
    var arr = []
    var num = 1
    firebase.database().ref('/Categories/').on('child_added', snapShot => {
      const UserData = snapShot.val();
      if (UserData) {
        // console.log(snapShot.val(), 'l')
        var obj = {
          work: UserData.service,
          number: num++
        }
        arr.push(obj)
      }
      this.setState({
        services: arr
      })

    })

  }

  login() {
    this.props.history.push('/AllPost')
  }
  Category() {
    this.props.history.push('/Dashboard')
  }


  submit() {
    const { value } = this.state
    if (value) {
      var obj = { service: value }
      firebase.database().ref('/Categories/').push(obj)
    }
    this.setState({ value: '' });
  }

  _handleErrorInputChange = (e) => {

    var service = e.target.value;
    // console.log(service)
    this.setState({
      value: service,
    });
  }




  render() {
    const { userName, value, services } = this.state
    const { classes } = this.props;
    return (
      <div >
        <MenuAppBar />
        <div style={{
          flexWrap: 'wrap',
          // flexDirection:'row',
          justifyContent: 'center',
          display: 'flex',
          padding: '10px'
        }}>
          <TextField onChange={this._handleErrorInputChange} id="username" label="Add a service" type="text" fullWidth autoFocus required default />
          <button onClick={() => this.submit()} className="button">ADD</button>
        </div>{
          services &&

          <div style={{
            flexWrap: 'wrap',
            justifyContent: 'center',
            display: 'flex',
            padding: '10px'
          }}>
            <Paper  >
              <Table style={{ backgroundColor: '#bdd3ef' }} >
                <TableHead >
                  <TableRow >
                    <CustomTableCell style={{ backgroundColor: '#5c99e8' , fontWeight:'bold' , fontSize:18 }}>S.No#</CustomTableCell>
                    <CustomTableCell style={{ backgroundColor: '#5c99e8',fontWeight:'bold', fontSize:18 }} align="right">Categories</CustomTableCell>

                  </TableRow>
                </TableHead>
                <TableBody>
                  {services.map(item => (
                    <TableRow key={item.id}>
                      <CustomTableCell align="right">{item.number + '-'}</CustomTableCell>
                      <CustomTableCell component="th" scope="row" >
                        {item.work}
                      </CustomTableCell>

                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Paper>
          </div>
        }
      </div>

    )
  }
}

const styless = {
  root: {
    flexGrow: 1,
  },
  form: {
    alignItems: 'center',
    borderWidth: 2
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};
function mapStateToProp(state) {
  return ({
    // UID: state.rootReducer.UID,
    // allUser: state.rootReducer.ALLUSER
  })
}
function mapDispatchToProp(dispatch) {
  return ({

  
  })
}

export default connect(mapStateToProp, mapDispatchToProp)(catagories);