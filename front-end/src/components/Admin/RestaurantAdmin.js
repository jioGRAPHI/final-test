import React, { Component } from "react";
import mapboxgl from 'mapbox-gl'
import ReactImageFallback from "react-image-fallback";
import StarRatings from 'react-star-ratings';
import Carousel from 'react-bootstrap/Carousel'

import EditShopOnProfile from "./EditShopOnProfile.js"
import "../../css/Profile.css";

import temp_dp from '../../images/admin-photo.png'
import notfound from '../../images/notfound.png'

// import restaurant from "../../images/recent2.jpg";

mapboxgl.accessToken = "pk.eyJ1IjoibW9zaGVuYWN1IiwiYSI6ImNqdWkzN3R0YTBzMjA0NHNhbmNxcHJiODQifQ.rSo4PHKUcvkA2mBPARW7gA";

// const navStyle = {
//   position: 'absolute',
//   top: 0,
//   left: 0,
//   padding: '10px'
// };

class RestaurantAdmin extends Component {
  constructor(props){
    super(props)
    this.state = {
      user_id: this.props.user_id,
      username: '',
      firstname: '',
      lastname: '',
      user_type: this.props.user_type,
      redirect: '', 
      isLoggedIn: false,
      restaurant_id: this.props.restaurant_id,
      restaurant_name: "",
      restaurant_rating: 0,
      restaurant_likes: 0,
      restaurant_cuisine: "",
      restaurant_type: "",
      restaurant_price: 0,
      restaurant_openingtime: "",
      restaurant_closingtime: "",
      restaurant_address: "",
      is_deleted: false,
      isVisible: true,
      isEditable: false,
      isDeletable: false,
      shopDeleteSuccessVisibility: false,
      reportVisibility: false,
      isLikedArray: [],
      isRatedArray: [],
      editShopPageVisibility: false,
      shopToEdit: 0,
      status: '',
      editDone: false,
      deleteDone: false,
      lng: 0,
      lat: 0,
      zoom: 16,
      popupInfo: null,
      comments: [],
      search_keyword: '',
      search_results: [],
      resto_photos: [],
      index: 0,
      direction: null,
    }

    this.setReportVisiblityToTrue = this.setReportVisiblityToTrue.bind(this)
    this.setReportVisibilityToFalse = this.setReportVisibilityToFalse.bind(this)
    this.showPrice = this.showPrice.bind(this)
    this.showRating = this.showRating.bind(this)
    this.handlePostEdit = this.handlePostEdit.bind(this)
    this.handleStyleLoad = this.handleStyleLoad.bind(this)
    this.showModal = this.showModal.bind(this)
    this.exitModal = this.exitModal.bind(this)
    this.handleSelect = this.handleSelect.bind(this);

    fetch('http://localhost:3001/get-all-comments')
      .then((response) => {return response.json() })
      .then((body) => {
        if(body.statusCode === 200){
          this.setState({ 
            search_results: body.comments
          })  
        }
      })

    fetch('http://localhost:3001/view-restaurant/' + this.state.restaurant_id)
    .then((response) => {return response.json() })
    .then((body) => {
        this.setState({
              restaurant_name: body.restaurantInfo[0].restaurant_name,
              restaurant_rating: body.restaurantInfo[0].restaurant_rating,
              restaurant_likes: body.restaurantInfo[0].restaurant_likes,
              restaurant_cuisine: body.restaurantInfo[0].restaurant_cuisine,
              restaurant_type: body.restaurantInfo[0].restaurant_type,
              restaurant_price: body.restaurantInfo[0].restaurant_price,
              restaurant_openingtime: body.restaurantInfo[0].restaurant_openingtime,
              restaurant_closingtime: body.restaurantInfo[0].restaurant_closingtime,
              restaurant_address: body.restaurantInfo[0].restaurant_address,
              lat: body.restaurantInfo[0].latitude,
              lng: body.restaurantInfo[0].longitude,
              is_deleted: body.restaurantInfo[0].is_deleted,
              resto_photos: body.photos                
        })

        this.getComments = this.getComments.bind(this);
        this.delComment  = this.delComment.bind(this);

        this.getComments();
    })

  }

  handleSelect(selectedIndex, e) {
    this.setState({
      index: selectedIndex,
      direction: e.direction,
    });
  }

   componentDidMount() {
    const { lng, lat, zoom } = this.state;

    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom,
      height: '200px',
      width: '100%'
    });


    map.on('move', () => {
      const { lng, lat } = map.getCenter();

      this.setState({
        lng: lng.toFixed(4),
        lat: lat.toFixed(4),
        zoom: map.getZoom().toFixed(2)
      });
    });

  var marker = new mapboxgl.Marker()
    .setLngLat([this.state.lng, this.state.lat])
    .setDraggable(false)
    // .setOffset(1)
    .addTo(map);

  marker.className='marker';
  }

  getComments(){
    console.log('getting comments')
    fetch('http://localhost:3001/comments/'+this.state.restaurant_id)
    .then((response) => {return response.json() })
    .then((body) => {
      console.log(body)
      this.setState({
        search_results: body
      })
    })
  }

  delComment(comment_id){
    fetch('http://localhost:3001/comments/delete/'+comment_id,
    {
      method:'DELETE',
    })
    .then((res)=>{
      this.getComments();
    })
  }

  showModal(e){
    var modal = document.getElementById("profile-myModal");
    var bg = document.getElementById("profile-background");

    if(this.state.show){
      bg.style.opacity="1.0";
      modal.style.display = "none";
    }else{
      modal.style.display = "block";
      bg.style.opacity="0.3";
    }
    // this.state.show = !this.state.show;
    this.setState({
      show: !this.state.show
    })
  }

  exitModal(e){
    var modal = document.getElementById("profile-myModal");
    var bg = document.getElementById("profile-background");

    if(modal.style.display === "block"){
      bg.style.opacity="1.0";
      modal.style.display = "none";
    }else{
      modal.style.display = "block";
      bg.style.opacity="0.3";
    }
  }

  handlePostEdit(){
    this.setState({
      editShopPageVisibility: false,
      status: 'Edit successful.',
      editDone: true
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

  setReportVisiblityToTrue(e){
    this.setState({
      reportVisibility: true,
    })
  }

  setReportVisibilityToFalse(){
    this.setState({
      reportVisibility: false
    });
  }

  handleStyleLoad = map => (map.resize())

  render(){
    const { 
      restaurant_id, 
      restaurant_name, 
      restaurant_cuisine, 
      restaurant_rating, 
      restaurant_likes, 
      restaurant_price,
      restaurant_openingtime, 
      restaurant_closingtime, 
      restaurant_address, 
      index, 
      direction,
    } = this.state
    return (
      <div>
        <div className="page">
          <div id="profile-background" className="profile-body">

            <div className="profile-upperhalf">

                {/*{this.state.resto_photos.slice(0,1).map((photo) => {
                                    return (
                                     <ReactImageFallback className="profile-restaurantimage" src={photo.photo_path} fallbackImage={notfound} alt="Report to administrator for missing images" />
                                      )
                                  })}*/}
                <ReactImageFallback className="profile-restaurantimage" src={notfound} fallbackImage={notfound} alt="Report to administrator for missing images" />
                
                <div className="profile-restaurantoverview">
                  <div className="profile-restaurantoverview-content">
                    <h3 className="profile-restaurantoverview-title">{ restaurant_name }</h3>
                    <p>{ restaurant_cuisine }</p>
                    <p className="return-strings"><b>{this.showPrice(restaurant_price)}</b></p>
                    &nbsp;
                    <p className="return-strings"><StarRatings starDimension="20px" starSpacing="5px" rating={restaurant_rating} starRatedColor="yellow" numberOfStars={5} name='rating'/></p>
                  </div>
                  <div className="profile-buttons-div">
                    <button className="profile-button" onClick={this.showModal}>Edit</button>
                    <button className="profile-button" >Delete</button>
                  </div>
                </div>

            </div>

            <div className="profile-bottomhalf">

              <div className="profile-sidebar">
      
                <div className="profile-restaurantdetails">
                   <div className="profile-details">


                      <h4> Overview </h4>

                      <div> ❤ {restaurant_likes}</div>
                      &nbsp;
                      <div>{ restaurant_address }</div>
                      &nbsp;
                      <div><strong>Operating Hours:</strong></div>
                      <div>{ restaurant_openingtime } - { restaurant_closingtime }</div>
                      &nbsp;
                      <div>Contact Details</div>
                      &nbsp;
                    </div>
                </div>

               <div className="profile-maparea">
                    <div className="profile-innerDiv">
                      <div ref={el => this.mapContainer = el} className="profile-map1" style={{position: 'absolute'}}/>
                    </div>
              </div>

              </div>

              <div className="profile-commentarea">

                 <div className="profile-imgarea">

                    <h4> Photos </h4>

                    <Carousel 
                        interval = {5000}
                        controls = {true}
                        indicators = {true}
                        wrap = {true}
                        fade = {false}
                        activeIndex = {index}
                        direction = {direction}
                        onSelect = {this.handleSelect}
                        className="img-area-carousel"
                      >
                      {this.state.resto_photos.map((photo) => {
                        return (
                         <Carousel.Item className="profile-img-carousel"> 
                          <img src = {photo.photo_path} alt ="alt"/>
                         </Carousel.Item>
                          )
                      })}
                      </Carousel>
                  </div>

                  <div className="profile-restaurantreviews">
                    <div className="profile-userreview">

                      <h4> What People Are Saying </h4>

                      {this.state.search_results.map((comment) => {
                          return <div className="profile-existingreview">
                                      <div className="review-items">
                                    <div className="post-item-userdetails">
                                      <img className="post-user-dp" src={temp_dp}/>
                                      <b><i>{comment.username}</i></b>
                                      &nbsp;
                                    </div>
                                      {/* if comment is done by user, user can edit or delete */}
                                      <div className="profile-existingreview-content">
                                          <i>{comment.content}</i><br/>
                                          &nbsp;
                                          { (comment.photo_path)
                                            /* localhost:3001/images/filename can be accessed in the browser but cannot be used in page */
                                            /* possible solution:
                                              * move uploaded images to front-end/public/images 
                                              * it will be host in localhost:3000/images/filename and can be accessed by page
                                            */
                                            ? <img className="photo-comment" src={comment.photo_path} alt={'img'}/>
                                            : null 
                                          }
                                      </div>
                                    </div>
                                        &nbsp;
                                      <button className="profile-deletecomment" onClick={(e)=>{console.log();this.delComment(comment.comment_id)}}>DELETE</button> 
                                    </div>
                      })}
                    </div>
                  </div>
                </div>

            </div>
          </div>
        </div>

        <div id="profile-myModal" className="profile-modal">
          <div className="profile-modal-content">
              <button className="exitModalButton" onClick={this.exitModal}>X</button>
              <EditShopOnProfile user_id={this.state.user_id} restaurant_id={ restaurant_id } handlePostEdit={this.handlePostEdit}/>
            </div>
        </div>

      </div>
    );
  }
}

export default RestaurantAdmin;