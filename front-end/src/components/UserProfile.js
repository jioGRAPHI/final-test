import React, { Component } from 'react';
import NavBar from './Navbar';
import Footer from './Footer';
import UserEditProfile from './UserEditProfile.js';

class User extends Component {
  
  render() {
    return (
      <div>
      	<NavBar />

      	<div>
      		<UserEditProfile />
      	</div>
       
        <Footer />
      </div>
    );
  }
}

export default User;
