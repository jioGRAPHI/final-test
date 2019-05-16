import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import logo from '../images/title with logo.png';
import hammenu from '../images/hamburger-menu.png';
import '../css/Navbar.css';

class NavBar extends Component {

  constructor(props){
    super(props)
    this.state = {
      user_id: this.props.user_id,
      username: '',
      firstname: '',
      lastname: '',
      user_type: 0,
      redirect: false,
      redirectTo: '',
      isLoggedIn: false
    }
    this.handleLogOut = this.handleLogOut.bind(this)
  }

  componentWillMount(){
    fetch("/check-session")
    .then(function(response){
      return response.json()})
    .then((body) => {
      if(body.statusCode === 200){
        this.setState({
          user_id: body.userData.user_id, 
          username: body.userData.username,
          user_type: body.userData.user_type,
          isLoggedIn: true
        })
        console.log(body.userData)
      }else{
        this.setState({
          redirect: 'unauthorized' 
        })
      }
    }) 
  }

  // renderRedirect = () => {
  //   if (this.state.redirect === 'unauthorized'){
  //     return <Redirect to={{
  //       pathname: '/unauthorized'}}
  //     />
  //   }
  // }

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
    }
  }

  render() {
    return (
      <div>
        {this.renderRedirect()} 
       <section className="nav-header">
          <div className="nav">
            <section className = "nav-header-logo">
              <a className="nav-link" href='../home'>
                <img className="nav-logo"src={logo} alt="logo"/>
              </a>
            </section>
            <section className="nav-header-menus">
              <a className="nav-link-outside" href="/search">SEARCH</a>
              <a className="nav-link-outside" href="/randomizer">RANDOMIZE</a>
              <div className="nav-dropdown">
                <div className="nav-dropdown-button"><img className="nav-menu" src={hammenu} alt="menu"/></div>
                <div className="nav-dropdown-content">
                  <Link style={{ textDecoration: 'none' }} to={{pathname: `/profile/${this.state.user_id}`, 
                          state: { 
                            user_id: this.state.user_id, 
                            username: this.state.username,
                            user_type: this.state.user_type,
                            token: this.state.token,
                          } }}><button className="nav-link-menu">PROFILE</button></Link>
                  <button className="nav-link-menu" onClick={this.handleLogOut}>LOG-OUT</button>
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