import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import ManageRestaurants from './ManageRestaurants';
import ManageReports from './ManageReports';
import ManageUsers from './ManageUsers';
import ManageComments from './ManageComments';
import './css/AdminStyle.css'
  
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
      isLoggedIn: false,
      featured_restos: [],
      recent_reports: [],
      most_liked: [],
      top_rated: []
    }

    this.showReports = this.showReports.bind(this)
    this.showRestaurants = this.showRestaurants.bind(this)
    this.showUsers = this.showUsers.bind(this)
    this.showComments = this.showComments.bind(this)
    this.renderRedirect = this.renderRedirect.bind(this)
    this.changeRedirectionRoute = this.changeRedirectionRoute.bind(this)

    // fetch('http://localhost:3001/admin-dashboard')
    //   .then((response) => {return response.json() })
    //   .then((body) => {
    //       this.setState({ 
    //         recent_reports: body.recent_reports,
    //         top_rated: body.top_rated,
    //         most_liked: body.most_liked,
    //         suffix: body.error            
    //       })
    //       console.log(body)
    //   })
  }

  renderRedirect = () => {
    if (this.state.redirect === 'manage-restaurants'){
      return <Redirect to={{
        pathname: '/manage-restaurants'}}
      />
    }
    else if (this.state.redirect === 'manage-reports'){
      return <Redirect to={{
        pathname: '/manage-reports'}}
      />
    }
  }
  changeRedirectionRoute(e){
    this.setState({
      redirect: e.target.value
    })
  }


  // componentWillMount(){
  //   fetch("http://localhost:3001/check-session")
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

  showRestaurants(e){
    document.getElementById('manageRestaurant').style.backgroundColor='#fff';
    document.getElementById('manageRestaurant').style.fontWeight='bold';
    document.getElementById('manageReport').style.backgroundColor='#f79361';
    document.getElementById('manageReport').style.fontWeight='normal';
    document.getElementById('manageUser').style.backgroundColor='#f79361';
    document.getElementById('manageUser').style.fontWeight='normal';
    document.getElementById('manageComment').style.backgroundColor='#f79361';
    document.getElementById('manageComment').style.fontWeight='normal';

    var report = document.getElementById('report');
    var restaurant = document.getElementById('restaurant');
    var user = document.getElementById('user');
    var comment = document.getElementById('comment');

    restaurant.style.display="block";
    report.style.display="none";
    user.style.display="none";
    comment.style.display="none";
  }

  showReports(e){
    document.getElementById('manageRestaurant').style.backgroundColor='#f79361';
    document.getElementById('manageRestaurant').style.fontWeight='normal';
    document.getElementById('manageReport').style.backgroundColor='#fff';
    document.getElementById('manageReport').style.fontWeight='bold';
    document.getElementById('manageUser').style.backgroundColor='#f79361';
    document.getElementById('manageUser').style.fontWeight='normal';
    document.getElementById('manageComment').style.backgroundColor='#f79361';
    document.getElementById('manageComment').style.fontWeight='#normal';

    var report = document.getElementById('report');
    var restaurant = document.getElementById('restaurant');
    var user = document.getElementById('user');
    var comment = document.getElementById('comment');

    restaurant.style.display="none";
    report.style.display="block";
    user.style.display="none";
    comment.style.display="none";
  }

  showUsers(e){
    document.getElementById('manageRestaurant').style.backgroundColor='#f79361';
    document.getElementById('manageRestaurant').style.fontWeight='normal';
    document.getElementById('manageReport').style.backgroundColor='#f79361';
    document.getElementById('manageReport').style.fontWeight='normal';
    document.getElementById('manageUser').style.backgroundColor='#fff';
    document.getElementById('manageUser').style.fontWeight='bold';
    document.getElementById('manageComment').style.backgroundColor='#f79361';
    document.getElementById('manageComment').style.fontWeight='normal';

    var report = document.getElementById('report');
    var restaurant = document.getElementById('restaurant');
    var user = document.getElementById('user');
    var comment = document.getElementById('comment');

    restaurant.style.display="none";
    report.style.display="none";
    user.style.display="block";
    comment.style.display="none";
  }

  showComments(e){
    document.getElementById('manageRestaurant').style.backgroundColor='#f79361';
    document.getElementById('manageRestaurant').style.fontWeight='normal';
    document.getElementById('manageReport').style.backgroundColor='#f79361';
    document.getElementById('manageReport').style.fontWeight='normal';
    document.getElementById('manageUser').style.backgroundColor='#f79361';
    document.getElementById('manageUser').style.fontWeight='normal';
    document.getElementById('manageComment').style.backgroundColor='#fff';
    document.getElementById('manageComment').style.fontWeight='bold';

    var report = document.getElementById('report');
    var restaurant = document.getElementById('restaurant');
    var user = document.getElementById('user');
    var comment = document.getElementById('comment');

    restaurant.style.display="none";
    report.style.display="none";
    user.style.display="none";
    comment.style.display="block";
  }

  render() {
    return (
      <div>
      <div className="background">
        {this.renderRedirect()}
        <div className="left"></div>

        <div className="adminDashboard">
          <button id="manageRestaurant" type="submit" value='manage-restaurants'  onClick={this.showRestaurants}>Manage Restaurants</button>
          <button id="manageReport" type="submit" value='manage-reports' onClick={this.showReports}>Manage Reports</button>
          <button id="manageUser" type="submit" value='manage-users' onClick={this.showUsers}>Manage Users</button>
          <button id="manageComment" type="submit" value='manage-comments' onClick={this.showComments}>Manage Comments</button>
       </div>

        <section className="content">
          <div id="restaurant"><ManageRestaurants /></div>
          <div id="report"><ManageReports /></div>
          <div id="user"><ManageUsers /></div>
          <div id="comment"><ManageComments /></div>
        </section>

        <div className="right"></div>

      </div>
      </div>
    );
  }
}

export default Home;
