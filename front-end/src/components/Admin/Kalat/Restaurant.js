import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class Restaurant extends Component {
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
      restaurant_rating: "",
      restaurant_likes: "",
      restaurant_cuisine: "",
      restaurant_type: "",
      restaurant_openingtime: "",
      restaurant_closingtime: "",
      restaurant_address: "",
      latitude: "",
      longitude: "",
      is_deleted: false,
      isVisible: true,
      isEditable: false,
      isDeletable: false,
      shopDeleteSuccessVisibility: false
    }
    
    this.handleRestaurantName = this.handleRestaurantName.bind(this)
    this.handleRestaurantRating = this.handleRestaurantRating.bind(this)
    this.handleRestaurantLikes = this.handleRestaurantLikes.bind(this)
    this.handleRestaurantCuisine = this.handleRestaurantCuisine.bind(this)
    this.handleRestaurantType = this.handleRestaurantType.bind(this)
    this.handleRestaurantOpeningTime = this.handleRestaurantOpeningTime.bind(this)
    this.handleRestaurantClosingTime = this.handleRestaurantClosingTime.bind(this)
    this.handleRestaurantAddress = this.handleRestaurantAddress.bind(this)
    this.handleRestaurantLatitude = this.handleRestaurantLatitude.bind(this)
    this.handleRestaurantLongitude = this.handleRestaurantLongitude.bind(this)
    this.handleisDeleted = this.handleisDeleted.bind(this)
    this.handleisEditable = this.handleisEditable.bind(this)
    this.handleEditInfo = this.handleEditInfo.bind(this)
    this.handleDeleteInfo = this.handleDeleteInfo.bind(this)


    fetch('http://localhost:3001/view-restaurant/' + this.state.restaurant_id)
    .then((response) => {return response.json() })
    .then((body) => {
        this.setState({
              restaurant_name: body.restaurantInfo[0].restaurant_name,
              restaurant_rating: body.restaurantInfo[0].restaurant_rating,
              restaurant_likes: body.restaurantInfo[0].restaurant_likes,
              restaurant_cuisine: body.restaurantInfo[0].restaurant_cuisine,
              restaurant_type: body.restaurantInfo[0].restaurant_type,
              restaurant_openingtime: body.restaurantInfo[0].restaurant_openingtime,
              restaurant_closingtime: body.restaurantInfo[0].restaurant_closingtime,
              restaurant_address: body.restaurantInfo[0].restaurant_address,
              latitude: body.restaurantInfo[0].latitude,
              longitude: body.restaurantInfo[0].longitude,
              is_deleted: body.restaurantInfo[0].is_deleted              
        })
    })

  }

  componentWillMount(){
    fetch("http://localhost:3001/check-session")
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
          shop: 'unauthorized' 
        })
      }
    }) 
  }

  handleisEditable(e) {
      this.setState({
      isVisible: false, 
      isEditable: true
      })
  }

  handleEditInfo(e) {

        this.setState({
          isVisible: true, 
          isEditable: false
        });
        fetch('http://localhost:3001/edit-restaurant', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "restaurant_id": this.state.restaurant_id,
            "restaurant_name": this.state.restaurant_name,
            "restaurant_rating": this.state.restaurant_rating,
            "restaurant_cuisine": this.state.restaurant_cuisine,
            "restaurant_type": this.state.restaurant_type,
            "restaurant_openingtime": this.state.restaurant_openingtime,
            "restaurant_closingtime": this.state.restaurant_closingtime,
            "restaurant_address": this.state.restaurant_address,
            "latitude": this.state.latitude,
            "longitude": this.state.longitude
            })
        })
        .then(function(response){
          return response.json()
        }).then((body) => {
            this.setState({ 
        

            })
        })
    }

   handleDeleteInfo(e) {

      fetch('http://localhost:3001/delete-restaurant', {
          method: 'POST',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              "restaurant_id": this.state.restaurant_id

          })
      })
      .then(function(response) {
          return response.json();})
      .then(function(body){

      console.log(body)
    })
        this.setState({
          shopDeleteSuccessVisibility: true
        })
  }



  

  handleRestaurantName(e) {
      this.setState({
        restaurant_name: e.target.value, 
      })
  }

  handleRestaurantRating(e) {
      this.setState({
        restaurant_rating: e.target.value, 
      })
  }

  handleRestaurantLikes(e) {
      this.setState({
        restaurant_likes: e.target.value, 
      })
  }


  handleRestaurantCuisine(e) {
      this.setState({
        restaurant_cuisine: e.target.value, 
      })
  }

  handleRestaurantType(e) {
      this.setState({
        restaurant_type: e.target.value, 
      })
  }

  handleRestaurantOpeningTime(e) {
      this.setState({
        restaurant_openingtime: e.target.value, 
      })
  }

  handleRestaurantClosingTime(e) {
      this.setState({
        restaurant_closingtime: e.target.value, 
      })
  }

  handleRestaurantAddress(e) {
      this.setState({
        restaurant_address: e.target.value, 
      })
  }

  handleRestaurantLatitude(e) {
      this.setState({
        latitude: e.target.value, 
      })
  }

  handleRestaurantLongitude(e) {
      this.setState({
        longitude: e.target.value, 
      })
  }

   handleisDeleted(e) {
      this.setState({
      isVisible: false, 
      isEditable: true
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
    const { restaurant_id, restaurant_name, restaurant_cuisine, restaurant_rating, restaurant_likes, restaurant_type, restaurant_openingtime, restaurant_closingtime, restaurant_address, latitude, longitude } = this.state
        return(
            <div>
            {this.renderRedirect()}
            {
              this.state.shopDeleteSuccessVisibility ?  'Restaurant does not exist anymore.' : 
              <div>
                <div>
                { this.state.isVisible &&
                    <div>
                        <h2>Basic Info</h2>
                        <strong>Restaurant Id:</strong> { restaurant_id }<br />
                        <strong>Restaurant Name:</strong> { restaurant_name }<br />
                        <strong>Restaurant Rating:</strong> {restaurant_rating}<br />
                        <strong>Restaurant Like:</strong> {restaurant_likes}<br />
                        <strong>Restaurant Cuisine:</strong> { restaurant_cuisine }<br />
                        <strong>Restaurant Type:</strong> { restaurant_type }<br />
                        <strong>Restaurant Opening Time:</strong> { restaurant_openingtime }<br />
                        <strong>Restaurant Closing Time:</strong> { restaurant_closingtime }<br />
                        <strong>Restaurant Address:</strong> { restaurant_address }<br />
                        <strong>Restaurant Latitude:</strong> { latitude }<br />
                        <strong>Restaurant Longitude:</strong> { longitude }<br />
                        <button onClick={this.handleisEditable}>Edit</button>
                        <br></br>
                        <button onClick={this.handleDeleteInfo}>Delete</button>
                    </div>
                }    
                </div>

                {this.state.isEditable && 
                  <div>
                        <h2>Restaurant Info</h2>
                        <strong>Restaurant ID:</strong> { restaurant_id }<br />
                        <div>        
                            <label htmlFor="name">Restaurant Name *</label>
                            <input type="text" className= "" value={this.state.restaurant_name} name="name" onChange={this.handleRestaurantName} noValidate />
                           
                        </div>
                        <strong>Restaurant Rating:</strong> { restaurant_rating }<br />
                        <div>
                            <span>
                                <label htmlFor="cuisine">Restaurant Cuisine: </label>
                                <input type="text" className= "" value={this.state.restaurant_cuisine} name="cuisine" onChange={this.handleRestaurantCuisine} noValidate />
                            </span>
                        </div>
                        <div>
                            <span>
                                <label htmlFor="type">Restaurant Type: </label>
                                <input type="text" className= "" value={this.state.restaurant_type} name="type" onChange={this.handleRestaurantType} noValidate />
                            </span>
                        </div>
                        <div>
                            <label htmlFor="latitude">Opening Time: </label>
                            <input type="text" className= "" value={this.state.restaurant_openingtime} name="openingtime" onChange={this.handleRestaurantOpeningTime} noValidate />
                        </div>
                        <div>
                            <label htmlFor="longitude">Closing Time: </label>
                            <input type="text" className= "" value={this.state.restaurant_closingtime} name="closingtime" onChange={this.handleRestaurantClosingTime} noValidate />
                        </div>
                         <div>
                            <label htmlFor="longitude">Address: </label>
                            <input type="text" className= "" value={this.state.restaurant_address} name="address" onChange={this.handleRestaurantAddress} noValidate />
                        </div>
                        <div>
                            <label htmlFor="latitude">Latitude: </label>
                            <input type="text" className= "" value={this.state.latitude} name="latitude" onChange={this.handleRestaurantLatitude} noValidate />
                        </div>
                        <div>
                            <label htmlFor="longitude">Longitude: </label>
                            <input type="text" className= "" value={this.state.longitude} name="longitude" onChange={this.handleRestaurantLongitude} noValidate />
                        </div>
                        <button onClick={this.handleEditInfo}>Submit</button>
                    </div>
                }
              </div>
            }
            </div>
            )
  }
}

export default Restaurant;
