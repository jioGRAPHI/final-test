import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class User extends Component {
  constructor(props){
    super(props)
    this.state = {
      admin_id: '',
      user_id: this.props.location.state.user_id,
      username: '',
      email: '',
      contactno: '',
      firstname: '',
      lastname: '',
      favorites: [],
      isLoggedIn: false, 
      redirect: false
    }

    fetch('http://localhost:3001/view-user/' + this.state.user_id)
      .then((response) => {return response.json() })
      .then((body) => {
        this.setState({
          user_id: body.userInfo[0].user_id,
          username: body.userInfo[0].restaurant_rating,
          email: body.userInfo[0].email,
          contactno: body.userInfo[0].contactno,
          firstname: body.userInfo[0].firstname,
          lastname: body.userInfo[0].lastname,
          favorites: body.favorites,
          comments: body.comments        
        })
        console.log(body)
      })  
  }

  componentWillMount(){
    fetch("http://localhost:3001/check-session")
    .then(function(response){
        return response.json()})
    .then((body) => {
      if(body.statusCode === 200){
        this.setState({
          admin_id: body.userData.user_id,
          isLoggedIn: true
        })
        console.log(body.userData)
      }
    }) 
  }

  renderRedirect = () => {
    if (this.state.redirect ){
      return <Redirect to={{ pathname: '/unauthorized' }} />
    }
  }


  render() {
    return(
      <div>  
        {this.renderRedirect()}  
        <h2>User Info </h2>
        <strong>Id:</strong> {this.state.user_id}<br />
        <strong>Username:</strong> {this.state.username}<br />
        <strong>Email:</strong> {this.state.email}<br />
        <strong>Contact No:</strong> {this.state.contactno}<br />
        <strong>First Name:</strong> {this.state.firstname}<br />
        <strong>Last name:</strong> {this.state.lastname}       
      </div>
    )
  }
}

export default User;
