import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import '../css/Navbar.css';

class Footer extends Component {

  // constructor(props){
  //   super(props)
  //   this.state = {
  //     user_id: 0,
  //     username: '',
  //     firstname: '',
  //     lastname: '',
  //     user_type: 0,
  //     redirect: false,
  //     redirectTo: '',
  //     isLoggedIn: false
  //   }
  //   this.handleLogOut = this.handleLogOut.bind(this)
  // }

  // componentWillMount(){
  //   fetch("/check-session")
  //   .then(function(response){
  //     return response.json()})
  //   .then((body) => {
  //     if(body.statusCode === 200){
  //       this.setState({
  //         user_id: body.userData.user_id, 
  //         username: body.userData.username,
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

  // renderRedirect = () => {
  //   if (this.state.redirect === 'unauthorized'){
  //     return <Redirect to={{
  //       pathname: '/unauthorized'}}
  //     />
  //   }
  // }

  // handleLogOut(){
  //   fetch("/logout")
  //   .then(function(response){
  //     return response.json()})
  //   .then((body) => {
  //     if(body.status === 'success')
  //       this.setState({
  //         redirect: true, 
  //       })
  //   }) 
  // }

  // renderRedirect = () => {
  //   if (this.state.redirect === true) {
  //     return <Redirect to={{
  //       pathname: '/'}}
  //     />
  //   }
  // }

  render() {
    return (
      <div>
        <footer className="nav-footer">
          <br/>
          <p><a className="footerlink" href="../home">Contact Us</a>     |     <a className="footerlink" href="../home">Find Dining © 2019</a>     |     <a className="footerlink" href="../home">About Us</a></p>
        </footer>

      </div>
    );
  }
}

export default Footer;