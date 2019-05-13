import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import '../css/LogIn.css';

class LogIn extends Component {

  constructor() {
    super()
    this.state = {
      username: "",
      password: "",
      status: "",
      redirect: false
    }

    this.handleLogIn = this.handleLogIn.bind(this)
    this.handleUsernameChange = this.handleUsernameChange.bind(this)
    this.handlePasswordChange = this.handlePasswordChange.bind(this)
    this.renderRedirect = this.renderRedirect.bind(this)
  }

  handleLogIn(e) {
    e.preventDefault();
    fetch('/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "username": this.state.username,
          "password": this.state.password,
        })
    })
    .then(function(response){
      return response.json()})
    .then((body) => {
      if (body.statusCode === 200){
        this.setState({
            redirect: true
        })
      }else{
        this.setState({
            status: body.message
        })
      }
    }) 
  }

  handleUsernameChange(e) {
    this.setState({
      username: e.target.value
    })
  }

  handlePasswordChange(e) {
    this.setState({
      password: e.target.value
    })
  }


  renderRedirect = () => {
    if (this.state.redirect === true) {
      return <Redirect to={{
        pathname: '/home'}}
      />
    }
  }

  render() {
    return (
      <div className="login-body">
        {this.renderRedirect()}
        <div className="login-forms-div">
          <form>
            <input className="logininput" type="text" name="name" placeholder="Username" onChange={this.handleUsernameChange} required/>
            <input className="logininput" type="password" name="name" placeholder="Password" onChange={this.handlePasswordChange} required/>
          </form>
          <div className="error">
            <h3>{this.state.status}</h3>
          </div>
        </div>
        <button className="login-submitbutton" type="submit" onClick={this.handleLogIn}>Enter</button>

      </div>
    );
  }
}

export default LogIn;
