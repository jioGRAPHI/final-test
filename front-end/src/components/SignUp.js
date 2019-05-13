import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import '../css/LogIn.css';

class SignUp extends Component {

  constructor() {
    super()
    this.state = {
      user_id: null, 
      user_type: null,
      isLoggedIn: false,
      username: '',
      email: '',
      firstname: '',
      lastname: '',
      password1: '',
      password2: '',
      status: '',
      errors: [], 
      redirect: false
    }

    this.handleAddUser = this.handleAddUser.bind(this)
    this.handleUsernameChange = this.handleUsernameChange.bind(this)
    this.handleEmailChange = this.handleEmailChange.bind(this)
    this.handleFirstNameChange = this.handleFirstNameChange.bind(this)
    this.handleCLastNameChange = this.handleLastNameChange.bind(this)
    this.handlePassword1Change = this.handlePassword1Change.bind(this)
    this.handlePassword2Change = this.handlePassword2Change.bind(this)
    this.renderRedirect = this.renderRedirect.bind(this)
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
  //         redirect: false,
  //         isLoggedIn: true
  //       })
  //       console.log(body.userData)
  //     }else{
  //       // this.setState({
  //       //   redirect: 'unauthorized' 
  //       // })
  //       console.log('Error')
  //     }
  //   }) 
  // }

  handleAddUser(e) {
    fetch('/signup', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "username": this.state.username,
          "email": this.state.email,
          "firstname": this.state.firstname,
          "lastname" : this.state.lastname,
          "password1": this.state.password1,
          "password2": this.state.password2
        })
    })
    .then(function(response){
      return response.json()})
    .then((body) => {
      if (body.statusCode === 200){
        this.setState({
          status: body.message,
          redirect: true
        })
      }
      else{
        this.setState({
          status: body.message,
          errors: body.errors
        })
      }

    console.log(body)
    }) 
  }

  handleUsernameChange(e) {
    this.setState({
      username: e.target.value, 
    })
  }

  handleEmailChange(e) {
    this.setState({
      email: e.target.value, 
    })
  }

  handleFirstNameChange(e) {
    this.setState({
      contactno: e.target.value, 
    })
  }

  handleLastNameChange(e) {
    this.setState({
      contactno: e.target.value, 
    })
  }

  handlePassword1Change(e) {
    this.setState({
      password1: e.target.value, 
    })
  }

  handlePassword2Change(e) {
    this.setState({
      password2: e.target.value, 
    })
  }

  renderRedirect = () => {
    if (this.state.redirect || this.state.isLoggedIn) {
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
            <input className="logininput" type="text" name="username" placeholder="Enter Username" onChange={this.handleUsernameChange} required/>           
            <input className="logininput" type="email" name="email" placeholder="Enter Email" onChange={this.handleEmailChange} required/>
            <input className="logininput" type="text" placeholder="Contact No" name="middleName" onChange={this.handleContactNoChange}/>
            <input className="logininput" type="password" name="password1" placeholder="Enter Password" onChange={this.handlePassword1Change} required/>
            <input className="logininput" type="password" name="password2" placeholder="Retype Password" onChange={this.handlePassword2Change} required/>
          </form>
          <section className="error">
            <h3>{this.state.status}</h3>
              { this.state.len === 0 ? null :
                <ul> 
                  {this.state.errors.map((err) => {
                    return <li key={err.msg}>{err.msg}</li>
                  })} 
                </ul> 
              }
          </section>
        </div>
        <button className="login-submitbutton" type="submit" onClick={this.handleAddUser}>Submit</button>

      </div>
      
    );
  }
}

export default SignUp;
