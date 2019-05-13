import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import SignUp from './SignUp';
import LogIn from './LogIn';
import '../css/LogIn.css';

import Carousel from 'react-bootstrap/Carousel'

import logo from '../images/white-circle.png';

class Landing extends Component {

  constructor() {
    super()
    this.state = {
      SignUpVisibility: false,
      SignUpButtonVisibility: true,
      logInVisibility: true,
      logInButtonVisibility: false,
      user_id: null, 
      username: null,
      firstname: null,
      lastname: null,
      user_type: null,
      isLoggedIn: false,
      index: 0,
      direction: null,

    }

    this.handleSelect = this.handleSelect.bind(this);
    this.handleSignUpVisbililityChange = this.handleSignUpVisbililityChange.bind(this)
    this.handleLogInVisbililityChange = this.handleLogInVisbililityChange.bind(this)
  }

  // componentWillMount(){
  //   fetch("/check-session")
  //   .then(function(response){
  //     return response.json()})
  //   .then((body) => {
  //     if(body.statusCode === 200){
  //       this.setState({
  //         user_id: body.userData.user_id, 
  //         username: body.userData.username,
  //         firstname: body.userData.firstname,
  //         lastname: body.userData.lastname,
  //         user_type: body.userData.user_type,
  //         isLoggedIn: true
  //       })
  //       console.log(body.userData)
  //     }else{
  //       this.setState({
  //         redirect: 'unauthorized' 
  //       })
  //     }
  //   }) 
  // }

  handleSelect(selectedIndex, e) {
    this.setState({
      index: selectedIndex,
      direction: e.direction,
    });
  }
  
  handleSignUpVisbililityChange(e) {
    this.setState({
      SignUpVisibility: true, 
      logInVisibility: false,
      logInButtonVisibility: true,
    })
  }

  handleLogInVisbililityChange(e) {
    this.setState({
      logInVisibility: true, 
      SignUpVisibility: false,
      SignUpButtonVisibility: true,
    })
  }

  renderRedirect = () => {
    if (this.state.isLoggedIn){
      return <Redirect to={{
        pathname: '/home'}}
      />
    }
  }

  render() {
    const { index, direction } = this.state;
    return (
      <div className="landing-body">
        {this.renderRedirect()}

        <div className="login-logo-div">
          <img className="login-logo" src={logo} alt="logo"/>
          <h3 className="login-title">Find Dining</h3>
        </div>

        <div className="landing-forms-div">
          <Carousel 
            id="Login-Options"
            interval = {null}
            controls = {false}
            indicators = {true}
            wrap = {false}
            fade = {false}
            activeIndex = {index}
            direction = {direction}
            onSelect = {this.handleSelect}
          >
            <Carousel.Item>
              <div className="landing-search-div">
                <div className="landing-search-container">
                  <input className="login-search-input" type="text" size="30" placeholder="Restaurant, Cuisine, or Location" name="keyword" onChange={this.handleSearchKeyChange} />
                  <button className="login-search-button" id="input" type="submit">Search</button>
                </div>
              </div>
            </Carousel.Item>
            <Carousel.Item>
              <LogIn />
            </Carousel.Item>
            <Carousel.Item>
              <SignUp />
            </Carousel.Item>
          </Carousel>
        </div>
      </div>
    );
  }
}

export default Landing;
