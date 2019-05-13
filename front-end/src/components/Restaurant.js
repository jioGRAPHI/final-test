import React, { Component } from 'react';
import NavBar from './Navbar';
import Footer from './Footer';
// import RestaurantAdminView from './Admin/Restaurant';
// import RestaurantUserView from './Regular/Restaurant';
import RestaurantProfile from "./Regular/RestaurantProfile.js";
import RestaurantAdmin from "./Admin/RestaurantAdmin.js";
import { Redirect } from 'react-router-dom';

class Restaurant extends Component {
  constructor(props){
    super(props)
    this.state = {
      user_id: 0,
      user_type: 0,
      // restaurant_id: this.props.location.state.restaurant_id,
      restaurant_id: this.props.match.params.shop_id || this.props.location.state.restaurant_id,
      isLoggedIn: false,
      redirect: ''
    }
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

  renderRedirect = () => {
    if (this.state.redirect === 'unauthorized'){
      return <Redirect to={{
        pathname: '/unauthorized'}}
      />
    }
  }


  render() {
    console.log("ID")
    console.log(this.state.restaurant_id)
    return (
      <div>
        {this.renderRedirect()}

          <NavBar />

        {this.state.user_type === 0 ? <RestaurantProfile restaurant_id={this.state.restaurant_id} user_id={this.state.user_id} user_type={this.state.user_type} />
          : <RestaurantAdmin restaurant_id={this.state.restaurant_id} user_id={this.state.user_id} user_type={this.state.user_type} />}
      
          <Footer />
      </div>
    );
  }
}

export default Restaurant;
