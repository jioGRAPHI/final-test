import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import logo from './images/white circle.png';
import hammenu from './images/hamburger-menu.png';





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
    return (
      <div>
       <section className="nav-header">
          <div className="nav">
            <section className = "nav-header-logo">
              <a className="nav-link" href='home'><img className="nav-logo"src={logo} alt="logo"/></a>
            </section>
            <section className="nav-header-menus">
              <div className="nav-dropdown">
                <div className="nav-dropdown-button"><img className="nav-menu" src={hammenu} alt="menu"/></div>
                <div className="nav-dropdown-content">
                  <button className="nav-link-menu">SEARCH</button>
                  <button className="nav-link-menu">RANDOMIZE</button>
                  <button onClick={this.handleLogOut} className="nav-link-menu">LOG-OUT</button>
                </div>
              </div>
            </section>
          </div>
        </section>
      </div>
    );
  }
}

export default NavBar;
