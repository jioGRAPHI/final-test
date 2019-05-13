import React, { Component } from "react";
import mapboxgl from 'mapbox-gl'
import ReactImageFallback from "react-image-fallback";
import StarRatings from 'react-star-ratings';

import RestaurantReport from "./RestaurantReport.js";
import "../../css/Profile.css";

import notfound from '../../images/notfound.png'

// import restaurant from "../../images/recent2.jpg";

mapboxgl.accessToken = "pk.eyJ1IjoibW9zaGVuYWN1IiwiYSI6ImNqdWkzN3R0YTBzMjA0NHNhbmNxcHJiODQifQ.rSo4PHKUcvkA2mBPARW7gA";

// const navStyle = {
//   position: 'absolute',
//   top: 0,
//   left: 0,
//   padding: '10px'
// };

class RestaurantProfile extends Component {
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
      latitude: "",
      longitude: "",
      is_deleted: false,
      isVisible: true,
      isEditable: false,
      isDeletable: false,
      shopDeleteSuccessVisibility: false,
      reportVisibility: false,
      isLiked: false,
      isRated: false,
      isLikedArray: [],
      isRatedArray: [],
      lng: 121.243436,
      lat: 14.167565,
      zoom: 16,
      height: '200px',
      width: '200px',
      popupInfo: null,
      comments: [],
      search_keyword: '',
      search_results: [],
      resto_photos: []
    }

    this.setReportVisiblityToTrue = this.setReportVisiblityToTrue.bind(this)
    this.setReportVisibilityToFalse = this.setReportVisibilityToFalse.bind(this)
    this.checkingIfLiked = this.checkingIfLiked.bind(this)
    this.like = this.like.bind(this)
    this.unlike = this.unlike.bind(this)
    this.checkingIfRated = this.checkingIfRated.bind(this)
    this.rate = this.rate.bind(this)
    this.showPrice = this.showPrice.bind(this)
    this.showRating = this.showRating.bind(this)
    this.handleStyleLoad = this.handleStyleLoad.bind(this)
    this.showModal = this.showModal.bind(this)
    this.exitModal = this.exitModal.bind(this)

    fetch('/view-restaurant/' + this.state.restaurant_id)
    .then((response) => {return response.json() })
    .then((body) => {
        console.log(body);
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
              latitude: body.restaurantInfo[0].latitude,
              longitude: body.restaurantInfo[0].longitude,
              is_deleted: body.restaurantInfo[0].is_deleted,
              resto_photos: body.photos             
        })
        console.log(this.state.resto_photos);
    })

    this.getComments = this.getComments.bind(this);
    this.addComment  = this.addComment.bind(this);
    this.delComment  = this.delComment.bind(this);
    this.editComment = this.editComment.bind(this);

    this.getComments();
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
    .setLngLat([121.243692, 14.167954])
    .setDraggable(false)
    // .setOffset(1)
    .addTo(map);

  marker.className='marker';
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
        this.checkingIfLiked()
        this.checkingIfRated()
      }else{
        this.setState({
          shop: 'unauthorized' 
        })
      }
    }) 
  }

  showPrice(price){
    var peso = "₱"
    return peso.repeat(price)
  }

  showRating(rating){
    rating  = rating/5
    return rating
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

  checkingIfLiked(){
    fetch('/check-if-liked/' + this.state.restaurant_id + '/' + this.state.user_id)
      .then((response) => { return response.json() })
      .then((body) => {
        this.setState({
          isLikedArray: body.isLikedInfo
        })
        if(this.state.isLikedArray.length >= 1){
          this.setState({
            isLiked: true
          })
        }
      })
  }

  checkingIfRated(){
    fetch('/check-if-rated/' + this.state.restaurant_id + '/' + this.state.user_id)
      .then((response) => { return response.json() })
      .then((body) => {
        this.setState({
          isRatedArray: body.isRatedInfo
        })
        if(this.state.isRatedArray.length >= 1){
          this.setState({
            isRated: true
          })
        }
      })
  }

  like(e){
    fetch('/add-like', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "restaurant_id": this.state.restaurant_id,
        "user_id": this.state.user_id
      })
    })
    .then((response)=>{
      return response.json()
    }).then((body)=>{
      console.log(body)
      this.setState({
        restaurant_likes: body.currLikes[0].restaurant_likes
      })
    });
    this.setState({
      isLiked: true
    })
  }

  unlike(e){
    fetch('/unlike', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "restaurant_id": this.state.restaurant_id,
        "user_id": this.state.user_id
      })
    })
    .then((response)=>{
      return response.json()
    }).then((body)=>{
      console.log(body)
      this.setState({
        restaurant_likes: body.currLikes[0].restaurant_likes
      })
    });
    this.setState({
      isLiked: false
    })
  }

  rate(e){
    var ratingInput = 0   //should have validator, cannot rate a 0
    if(document.getElementById("1").checked){
      ratingInput = 1
    }
    else if(document.getElementById("2").checked){
      ratingInput = 2
    }
    else if(document.getElementById("3").checked){
      ratingInput = 3
    }
    else if(document.getElementById("4").checked){
      ratingInput = 4
    }
    else if(document.getElementById("5").checked){
      ratingInput = 5
    }
    fetch('/rate', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "ratingToPass": ratingInput,
        "restaurant_id": this.state.restaurant_id,
        "user_id": this.state.user_id
      })
    })
    .then((response)=>{
      return response.json()
    }).then((body)=>{
      console.log(body)
      this.setState({
        restaurant_rating: body.currRates[0].restaurant_rating
      })
    });
    this.setState({
      isRated: true
    })
  }

  handleStyleLoad = map => (map.resize())

  getComments(){
    console.log('getting comments')
    fetch('/comments/'+this.state.restaurant_id)
    .then((response) => {return response.json() })
    .then((body) => {
      console.log(body)
      this.setState({
        search_results: body
      })
    })
  }

  addComment(e){
    e.preventDefault();
    const formData = new FormData(e.target);
    fetch('/comments/new',
    {
      method:'POST',
      body: formData
    }).then((res)=>{
      document.getElementById('comment-content').value='';
      this.getComments();
    }).catch((err)=>{
      console.log(err);
    })
    e.target.reset();
  }

  delComment(comment_id){
    fetch('/comments/delete/'+comment_id,
    {
      method:'DELETE',
    })
    .then((res)=>{
      this.getComments();
    })
  }

  editComment(e,elementId){
    e.preventDefault();
    const formData = new FormData(e.target);

    fetch('/comments/edit',
    {
      method:'POST',
      body: formData
    }).then((res)=>{
      // document.getElementById("edit-comment-form-").style.display = "none";
      // document.getElementById(elementId).value='';
      this.getComments();
    })
    e.target.reset();
    e.target.style.display = "none";
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
    // this.state.show = !this.state.show;
     this.setState({
      show: !this.state.show
    })
  }

  render(){
    const { 
      // restaurant_id, 
      restaurant_name, 
      restaurant_cuisine, 
      restaurant_rating, 
      restaurant_likes, 
      // restaurant_type, 
      restaurant_price,
      restaurant_openingtime, 
      restaurant_closingtime, 
      restaurant_address, 
      // latitude, 
      // longitude 
    } = this.state

    return (
      <div>
        <div className="page">
          <div id="profile-background" className="profile-body">

            <div className="profile-body">
              <div className="profile-upperhalf">

                <ReactImageFallback className="profile-restaurantimage" src={notfound} fallbackImage={notfound} alt="Report to administrator for missing images" />

                  {/*{this.state.resto_photos.slice(0,1).map((photo) => {
                                        return (
                                         <ReactImageFallback className="profile-restaurantimage" src={photo.photo_path} fallbackImage={notfound} alt="Report to administrator for missing images" />
                                          )
                                      })}*/}
                 
                  <div className="profile-restaurantoverview">

                    <div className="profile-restaurantoverview-content">
                      <h3 className="profile-restaurantoverview-title">{ restaurant_name }</h3>
                      <p>{ restaurant_cuisine }</p>
                      <p className="return-strings"><b>{this.showPrice(restaurant_price)}</b></p>
                      &nbsp;
                      <StarRatings starDimension="2.5vmin" starSpacing="3px" rating={restaurant_rating} starRatedColor="yellow" numberOfStars={5} name='rating'/>
                      <p className="return-strings2"> {restaurant_rating}/5 </p>
                    </div>

                    <div className="profile-buttons-div">
                      {
                        this.state.isLiked === false && <button className="profile-button" onClick={this.like}>Like</button>
                      }
                      {
                        this.state.isLiked === true && <button className="profile-button" onClick={this.unlike}>Unlike</button>          
                      }
                    
                      { this.state.isRated === false &&
                        <div className="profile-radiobuttons-div">
                          <input type="radio" name="rating" id="1"/><label className="radio-label">1</label>
                          &nbsp;
                          <input type="radio" name="rating" id="2"/><label className="radio-label">2</label>
                          &nbsp;
                          <input type="radio" name="rating" id="3"/><label className="radio-label">3</label>
                          &nbsp;
                          <input type="radio" name="rating" id="4"/><label className="radio-label">4</label>
                          &nbsp;
                          <input type="radio" name="rating" id="5"/><label className="radio-label">5</label>
                          <button className="profile-radiobutton" id="rateButton" onClick={ this.rate }>Rate!</button>
                        </div>
                        }
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
                    <div className="profile-buttons-div">
                      <button className="profile-report-button" onClick={this.showModal}>Report</button>
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

                    {this.state.resto_photos.map((photo) => {
                      return (
                      <img src = {photo.photo_path} alt ="alt"/>

                        )
                    })}
                  </div>

                  <div className="profile-restaurantreviews">

                    <h4> What People Are Saying </h4>

                    <div className="profile-userreview">
                      <form
                          name="add-comment"
                          encType="multipart/form-data"
                          onSubmit={this.addComment}
                          className="review-textarea">
                          <textarea
                            name="content"
                            id="comment-content"
                            className="textarea"
                            placeholder="Add review here"
                            maxLength="360"
                          />
                          <input type="file" id='img' name="img"/><br/>
                          <input type="submit" value="Submit" className="profile-submitreview"/>
                          <input type="hidden" name="user_id" value={this.state.user_id}/>
                          <input type="hidden" name="restaurant_id" value={this.state.restaurant_id}/>
                      </form>

                      {this.state.search_results.map((comment) => {
                          return <div className="profile-existingreview">
                                      <b><i>{comment.username}</i></b>
                                      &nbsp;
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

                                      { (comment.user_id===this.state.user_id)
                                        ? <p>
                                          <button className="profile-deletecomment" onClick={(e)=>{console.log();this.delComment(comment.comment_id)}}>delete</button> 
                                          <button className="profile-editcomment" onClick={(e)=>{
                                            const element = document.getElementById("edit-comment-form-"+comment.comment_id)
                                              if (element.style.display === "none") {
                                                element.style.display = "block";
                                              } else {
                                                element.style.display = "none";
                                              }
                                            }
                                          }>edit</button>
                                          </p>
                                        : null }

                                      { (comment.user_id===this.state.user_id) ?
                                        <form 
                                          id={"edit-comment-form-"+comment.comment_id}
                                          style={{display: 'none'}}
                                          onSubmit={(e)=>this.editComment(e,"edit-comment-"+comment.comment_id)}>
                                          <textarea
                                            className="report-textarea"
                                            name="content"
                                            id={"edit-comment-"+comment.comment_id}
                                            placeholder={comment.content}
                                            maxLength="360"
                                            ></textarea><br/>
                                          <input type="hidden" name="comment_id" value={comment.comment_id}/>
                                          <input className="profile-editcomment" type="submit" value="edit"/>
                                          <input className="profile-deletecomment" type="submit" value="cancel"/>
                                        </form>
                                        : null
                                      }
                                    </div>
                      })}
                      
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>

        {/*<footer className="nav-footer">
          <br/>
          <p><a className="footerlink" href="../home">Contact Us</a>     |     <a className="footerlink" href="../home">Find Dining © 2019</a>     |     <a className="footerlink" href="../home">About Us</a></p>
        </footer>*/}

        <div id="profile-myModal" className="profile-modal">
          <div className="profile-modal-content">
            <RestaurantReport setReportVisibilityToFalse={this.setReportVisibilityToFalse} user_id={this.state.user_id} restaurant_id={this.state.restaurant_id}/>
            <button className="profile-button" onClick={this.exitModal}>Cancel</button>
          </div>
        </div>
      </div>
    );
  }
}

export default RestaurantProfile;