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

    fetch('/view-restaurant/' + this.state.restaurant_id)
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
          shop: 'unauthorized' 
        })
      }
    }) 
  }

  
  render() {
    const { restaurant_id, restaurant_name, restaurant_cuisine, restaurant_rating, restaurant_likes, restaurant_type, restaurant_openingtime, restaurant_closingtime, restaurant_address, latitude, longitude } = this.state
    return(
      <div>
      {
        this.state.shopDeleteSuccessVisibility ?  'Restaurant has been archived.' : 
        <div>
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
            </div> 
        </div>
      }
      </div>
    )
  }
}

export default Restaurant;
