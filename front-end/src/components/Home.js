import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import NavBar from './Navbar';
import Footer from './Footer';
import RegularUserHome from './Regular/Home';
import AdminUserHome from './Admin/Home';

class Home extends Component {
  constructor(props){
    super(props)
    this.state = {
      user_id: 0,
      username: '',
      firstname: '',
      lastname: '',
      user_type: 0,
      redirect: '', 
      isLoggedIn: false
    }
    this.renderRedirect = this.renderRedirect.bind(this)
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
          firstname: body.userData.firstname,
          lastname: body.userData.lastname,
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

  renderRedirect = () => {
    if (this.state.redirect === 'unauthorized'){
      return <Redirect to={{
        pathname: '/unauthorized'}}
      />
    }
  }

  render() {
    return (
      <div>
        {this.renderRedirect()}
        {this.state.isLoggedIn === false ? null : 
          <div>

          <NavBar />
          <div>
          {this.state.user_type === 0 ? <RegularUserHome />  : <AdminUserHome /> }
          </div>
          <Footer />

          </div>
        }  
      </div>
    );
  }
}

export default Home;
