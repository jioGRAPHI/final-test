import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';

import Navbar from '../Navbar.js'
import Footer from '../Footer.js'
import '../../css/Home.css';
import ReactImageFallback from "react-image-fallback";

import notfound from '../../images/notfound.png'

class Likedmore extends Component {
  constructor(props){
    super(props)
    this.state = {
      user_id: this.props.user_id,
      username: this.props.username,
      token: this.props.token,
      user_type: this.props.user_type,
      featured_restos: [],
      new: [],
      most_liked: [],
      top_rated: [],
      redirect: ""
    }

    this.showPrice = this.showPrice.bind()
    this.showRating = this.showRating.bind()

    fetch('/get-featured-shops')
      .then((response) => {return response.json() })
      .then((body) => {
          this.setState({ 
            new: body.new,
            top_rated: body.top_rated,
            most_liked: body.most_liked,
            suffix: body.error            
          })
          console.log(body)
      })
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

  showPrice(price){
    var peso = "₱"
    return peso.repeat(price)
  }

  showRating(rating){
    var star = "🌟"
    var empstar = "⭐"
    var left = 5-rating
    return star.repeat(rating) + empstar.repeat(left)
  }



  render() {
    return (
      <div>
        {this.renderRedirect()}

        <Navbar/>

        <div className="page">        
          <div className="more">
            <p className="morep">MOST LIKED</p>
              {this.state.most_liked.map((resto) => {
                  return   <div className="morefeed-item">
                            <div className="more-container">
                              <ReactImageFallback className="morefeedimages" src={'/images/test.jpg'} fallbackImage={notfound} alt="Report to administrator for missing images"/>
                              <div>
                                <div className="feed-title">
                                  <h4 className="restaurant-title">{resto.restaurant_name}</h4>
                                </div>
                              </div>
                              <Link to={{pathname: `/restaurant/${resto.restaurant_id}`, 
                                state: { 
                                  user_id: this.state.user_id, 
                                  username: this.state.username,
                                  user_type: this.state.user_type,
                                  token: this.state.token,
                                  restaurant_id: resto.restaurant_id
                                } }}>
                                <div className="more-overlay"><div className="more-restodetails"><h3 className="restaurant-title">{resto.restaurant_name}</h3><p>{resto.restaurant_cuisine}</p><p className="return-strings"><b>{this.showPrice(resto.restaurant_price)}</b></p>&nbsp;<p className="return-strings"> ❤ {resto.restaurant_likes}</p></div></div>
                              </Link>
                            </div>
                          </div>
                })}
          </div>

          <br/>
          <br/>
        </div>

        <Footer/>

		{/* <footer className="nav-footer">
          <br/>
          <p><a className="footerlink" href="../home">Contact Us</a>     |     <a className="footerlink" href="../home">Find Dining © 2019</a>     |     <a className="footerlink" href="../home">About Us</a></p>
        </footer> */}
      </div>
    );
  }
}

export default Likedmore;