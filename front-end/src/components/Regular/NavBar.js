import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class NavBar extends Component {
  constructor(props){
    super(props)
    this.state = {
      backgroundcolor: 'orange',
      user_id: 0,
      username: '',
      firstname: '',
      lastname: '',
      user_type: 0,
      redirect: false,
      redirectTo: '',
      isLoggedIn: false
    }
    this.handleLogOut = this.handleLogOut.bind(this)
    this.changeRoute = this.changeRoute.bind(this)
  }

  componentWillMount(){
    fetch("/check-session")
    .then(function(response){
      return response.json()})
    .then((body) => {
      this.setState({
        user_id: body.userData.user_id, 
        username: body.userData.username,
        firstname: body.userData.firstname,
        lastname: body.userData.lastname,
        user_type: body.userData.user_type,
        isLoggedIn: true
    })
    console.log(body.userData)
    }) 
  }

  changeRoute(){
    this.setState({
      redirectTo: 'search'
    })
  }
  handleLogOut(){
    fetch("/logout")
    .then(function(response){
      return response.json()})
    .then((body) => {
      if(body.status === 'success')
        this.setState({
          redirect: true, 
        })
    }) 
  }

  renderRedirect = () => {
    if (this.state.redirect === true) {
      return <Redirect to={{
        pathname: '/'}}
      />
    }else if (this.state.redirectTo === 'search'){
      return <Redirect to={{
        pathname: '/search'}}
      />
    }
  }

  render() {
    var btnStyle ={
      position: 'absolute',
      top: '50px',
      right: '10px',
    }
    return (
      <div style={{backgroundColor: this.state.backgroundcolor}}>
      {this.renderRedirect()} 
        <span>
          <h2>Username: {this.state.username}</h2> 
          <h2>User Type: {this.state.user_type === 0 ? 'General User' : 'Admin'}</h2>
        </span>
        <span style={btnStyle}>
          <button type="submit" onClick={this.handleLogOut} >Log Out</button>
          <button type="submit" onClick={this.changeRoute} >Search</button>
        </span>
      </div>
    );
  }
}

export default NavBar;
