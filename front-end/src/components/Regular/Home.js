import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import ReactImageFallback from "react-image-fallback";
import StarRatings from 'react-star-ratings';

import Carousel from 'react-bootstrap/Carousel'

import notfound from '../../images/notfound.png'

import '../../css/Home.css'

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
      new: [],
      most_liked: [],
      top_rated: [],
      slideIndex:0
    }
    this.renderRedirect = this.renderRedirect.bind(this)
    this.showPrice = this.showPrice.bind(this)
    this.showRating = this.showRating.bind(this)

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

  renderRedirect = () => {
    if (this.state.redirect === 'logout') {
      return <Redirect to={{
        pathname: '/'}}
      />
    }
    else if (this.state.redirect === 'unauthorized'){
      return <Redirect to={{
        pathname: '/unauthorized'}}
      />
    }
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

  render() {
    return (
      <div className="page">

      {/*{this.renderRedirect()}*/}

        <div className="home-featured">
          <Carousel fade={true}>
            {this.state.new.map((resto) => {
              return <Carousel.Item className="home-carousel"> 
                      <div className="home-animate-fade" id={resto.restaurant_id}>
                        <Link to={{pathname: `/restaurant/${resto.restaurant_id}`, 
                          state: { 
                            user_id: this.state.user_id, 
                            username: this.state.username,
                            user_type: this.state.user_type,
                            token: this.state.token,
                            restaurant_id: resto.restaurant_id
                          } }}>
                          <ReactImageFallback className="home-featuredimage" src={resto.photo_path} fallbackImage={notfound} alt="Report to administrator for missing images" />
                          <div className="home-featuredoverlay">
                            <div className="home-featureddetails">
                              &nbsp;
                              <h3 className="restaurant-title">{resto.restaurant_name}</h3><p>{resto.restaurant_cuisine}</p>
                              <p className="return-strings"><b>{this.showPrice(resto.restaurant_price)}</b></p>
                              &nbsp;
                              <StarRatings starDimension="2.5vmin" starSpacing="3px" rating={resto.restaurant_rating} starRatedColor="yellow" starEmptyColor="gray" numberOfStars={5} name='rating'/>
                              <p className="return-strings2"> {resto.restaurant_rating}/5 </p>
                              &nbsp;
                            </div>
                          </div>
                        </Link>
                      </div>
                    </Carousel.Item>
            })}
            
          </Carousel>
        </div>
        
        <section className="feed">
          <div className="homefeed">
            <p className="homep">TOP RATED</p>

            <section className="homefeed-item">
              {this.state.top_rated.slice(0, 4).map((resto) => {
                return <div className="home-container">
                          <ReactImageFallback className="homefeedimages" src={'../images/test.jpg'} fallbackImage={notfound} alt="Report to administrator for missing images" />
                          <div>
                            <div className="feed-title">
                              <h4 className="feed-title-h4">{resto.restaurant_name}</h4>
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
                            <div className="home-overlay"><div className="home-restodetails"><h3 className="restaurant-title">{resto.restaurant_name}</h3><p>{resto.restaurant_cuisine}</p><p className="return-strings"><b>{this.showPrice(resto.restaurant_price)}</b></p>&nbsp;<StarRatings starDimension="2.5vmin" starSpacing="3px" rating={resto.restaurant_rating} starRatedColor="yellow" numberOfStars={5} name='rating'/><p className="return-strings2"> {resto.restaurant_rating}/5 </p></div></div>
                          </Link>
                        </div>
              })}
            </section>
            <a className="home-seemore" href ="/ratedmore">See more</a>
          </div>
        </section>

        <section className="feed">
          <div className="homefeed">
            <p className="homep">MOST LIKED</p>

            <section className="homefeed-item">
              {this.state.most_liked.slice(0, 4).map((resto) => {
                return <div className="home-container">
                          <ReactImageFallback className="homefeedimages" src='../images/test.jpg' fallbackImage={notfound} alt="Report to administrator for missing images" />
                          <div>
                            <div className="feed-title">
                              <h4 className="feed-title-h4">{resto.restaurant_name}</h4>
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
                            <div className="home-overlay"><div className="home-restodetails"><h3 className="restaurant-title">{resto.restaurant_name}</h3><p>{resto.restaurant_cuisine}</p><p className="return-strings"><b>{this.showPrice(resto.restaurant_price)}</b></p>&nbsp;<p className="return-strings"> ❤ {resto.restaurant_likes}</p></div></div>
                          </Link>
                        </div>
              })}
            </section>
            <a className="home-seemore" href ="/likedmore">See more</a>
          </div>
        </section>

       {/* <footer className="nav-footer">
                 <br/>
                 <p><a className="footerlink" href="../home">Contact Us</a>     |     <a className="footerlink" href="../home">Find Dining © 2019</a>     |     <a className="footerlink" href="../home">About Us</a></p>
               </footer> */}
      </div>
    );
  }
}

export default Home;
