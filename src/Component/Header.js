import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import NotificationsIcon from '@material-ui/icons/Notifications';
import firebase from 'firebase'
import swal from 'sweetalert2';
import History from '../History';

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

class MenuAppBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      auth: true,
      anchorEl: null,
    };

    this.logOut = this.logOut.bind(this)
  }

  componentDidMount() {
    const currentUID = localStorage.getItem('currentUserUid')
    firebase.database().ref('user/' + currentUID ).on("child_added", (snapshot) => {
      console.log(snapshot.val());
      const pic = snapshot.val().userPic
      console.log(pic , '********');
      
      this.setState({ pic: pic })
    })
  }

  handleChange = event => {
    this.setState({ auth: event.target.checked });
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };
  logOut = () => {
    firebase.auth().signOut()
    .then(function () {
    })
    History.push('/')
  }

  allUsers() {
    History.push('/AllPost')
  }

  Graph() {
    History.push('/Dashboard')
  }

  category(){
    History.push('/Category')
  }

  render() {
    const { classes } = this.props;
    const { auth, anchorEl, pic } = this.state;
    const open = Boolean(anchorEl);
    // console.log(pic , 'pic******');
    
    return (
      <div className={classes.root} style={{ color: 'black' }}>
        <FormGroup>
          {/* <FormControlLabel
            control={
              <Switch checked={auth} onChange={this.handleChange} aria-label="LoginSwitch" />
            }
            label={auth ? 'Logout' : 'Login'}
          /> */}
        </FormGroup>
        <AppBar position="static" style={{ backgroundColor: '#5c99e8' }}>
          <Toolbar>
            
            
                <IconButton
                  aria-owns={open ? 'menu-appbar' : undefined}
                  aria-haspopup="true"
                  onClick={this.handleMenu}
                  color="inherit"
                >
                  {/* <AccountCircle /> */}
                  <img src='https://i.ibb.co/hBv4Tpb/solution.png' width="40" height="40" style={{ borderRadius: '100%' }} />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={open}
                  onClose={this.handleClose}
                >
                  <MenuItem onClick={() => this.Graph()}>Graph</MenuItem>
                  <MenuItem onClick={() => this.allUsers()}>All Users</MenuItem>
                  <MenuItem onClick={() => this.category()}>Add Category</MenuItem>

                  <MenuItem onClick={this.logOut} style={{color:'red'}}>Log out</MenuItem>
                </Menu>
           
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

MenuAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MenuAppBar);