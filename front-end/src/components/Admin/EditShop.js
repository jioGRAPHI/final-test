import React, { Component } from 'react';
import './css/AdminStyle.css'

class EditShop extends Component {
  constructor(props){
    super(props)
    this.state = {
      user_id: this.props.user_id,
      username: this.props.username,
      user_type: 1,
      restaurant_id: this.props.restaurant_id,
      restaurant_name: '',
      restaurant_rating: 0,
      restaurant_likes: 0,
      restaurant_cuisine: '',
      restaurant_type: '',
      restaurant_openingtime: '',
      restaurant_closingtime: '',
      restaurant_address: '',
      latitude: 0,
      longitude: 0,
      no_rating_yet: true,
      is_deleted: false,
      info_display_visibility: true,
      edit_info_visibility: false,
      is_archived: false,
      edit_button_visibility: true,
      is_archived_message: '',
      rerender: false,
      edited: false
    }

    this.handleNameChange = this.handleNameChange.bind(this)
    this.handleCuisineChange = this.handleCuisineChange.bind(this)
    this.handleTypeChange = this.handleTypeChange.bind(this)
    this.handleOpeningTimeChange = this.handleOpeningTimeChange.bind(this)
    this.handleClosingTimeChange = this.handleClosingTimeChange.bind(this)
    this.handleAddressChange = this.handleAddressChange.bind(this)
    this.handleLatitudeChange = this.handleLatitudeChange.bind(this)
    this.handleLongitudeChange = this.handleLongitudeChange.bind(this)
    this.editInfo = this.editInfo.bind(this)

    fetch('/restaurant/'+ this.state.restaurant_id)
      .then((response) => {return response.json() })
      .then((body) => {
        if(body.restaurant_info.length === 0){
          this.setState({ 
            is_archived:true,
            info_display_visibility: false,
            is_archived_message: 'Restaurant has been archived/deleted'
        })
      }else{
        this.setState({ 
          restaurant_name: body.restaurant_info[0].restaurant_name,
          restaurant_rating: body.restaurant_info[0].restaurant_rating,
          restaurant_likes: body.restaurant_info[0].restaurant_likes,
          restaurant_cuisine: body.restaurant_info[0].restaurant_cuisine,
          restaurant_type: body.restaurant_info[0].restaurant_type,
          restaurant_openingtime: body.restaurant_info[0].restaurant_openingtime,
          restaurant_closingtime: body.restaurant_info[0].restaurant_closingtime,
          restaurant_address: body.restaurant_info[0].restaurant_address,
          latitude: body.restaurant_info[0].latitude,
          longitude: body.restaurant_info[0].longitude,
          is_deleted: body.restaurant_info[0].is_deleted,
          edit_status: ''
        })
      }

          console.log(body)
      })
  }

  editInfo(e) {
    fetch('/edit-restaurant', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        "restaurant_id": this.state.restaurant_id,
        "restaurant_name": this.state.restaurant_name,
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
          info_display_visibility: true,
          edit_info_visibility: false,
          edit_button_visibility: true,
          edit_status: 'Edit successful!',
          edited: true
        })
        this.props.handlePostEdit()
    })
  }

  handleNameChange(e) {
    this.setState({
      restaurant_name: e.target.value, 
    })
  }

  handleCuisineChange(e) {
    this.setState({
      restaurant_cuisine: e.target.value, 
    })
  }

  handleTypeChange(e) {
    this.setState({
      restaurant_type: e.target.value, 
    })
  }

  handleOpeningTimeChange(e) {
    this.setState({
      restaurant_openingtime: e.target.value, 
    })
  }

  handleClosingTimeChange(e) {
    this.setState({
      restaurant_closingtime: e.target.value, 
    })
  }

  handleAddressChange(e) {
    this.setState({
      restaurant_address: e.target.value, 
    })
  }

  handleLatitudeChange(e) {
    this.setState({
      latitude: e.target.value, 
    })
  }

  handleLongitudeChange(e) {
    this.setState({
      longitude: e.target.value, 
    })
  }



  render() {
    const { restaurant_id, 
      restaurant_name, 
      restaurant_cuisine, 
      restaurant_rating, 
      restaurant_likes, 
      restaurant_type, 
      restaurant_openingtime, 
      restaurant_closingtime, 
      restaurant_address, 
      latitude, 
      longitude 
      // edit_status 
    } = this.state
    return (
      <div className="editShop">

        <div className="staticTxt">
          <h4>ID: {restaurant_id}</h4>
          <h4>Rating: {restaurant_rating}</h4>
          <h4>Likes: {restaurant_likes}</h4>
        </div>

        <div className="toEdit">

          <label htmlFor="name">Restaurant Name</label><br />
          <input type="text"value={restaurant_name} placeholder={restaurant_name} name="name" onChange={this.handleNameChange} noValidate /><br />

          <label for="cuisine">Restaurant Cuisine</label><br />
          <input type="text" value={restaurant_cuisine} name="cuisine" onChange={this.handleCuisineChange} noValidate /><br />

          <label for="type">Restaurant Type</label><br />
          <input type="text" value={restaurant_type} name="type" onChange={this.handleTypeChange} noValidate /><br />

          <label for="address">Address: </label><br />
          <input type="text" value={restaurant_address} name="address" onChange={this.handleAddressChange} noValidate /><br />

          <label for="openingtime">Opening Time: </label><br />
          <input type="text" value={restaurant_openingtime} name="openingtime" onChange={this.handleOpeningTimeChange} noValidate /><br />

          <label for="closingtime">Closing Time: </label><br />
          <input type="text" value={restaurant_closingtime} name="closingtime" onChange={this.handleClosingTimeChange} noValidate /><br />

          <label for="latitude">Latitude: </label><br />
          <input type="text" value={latitude} name="latitude" onChange={this.handleLatitudeChange} noValidate /><br />

          <label for="longitude">Longitude: </label><br />
          <input type="text" value={longitude} name="longitude" onChange={this.handleLongitudeChange} noValidate /><br />

          <div className="toEditButton">
            <button onClick={this.editInfo}>Submit</button>
        </div>

        </div>

      </div>
    );
  }
}

export default EditShop;
