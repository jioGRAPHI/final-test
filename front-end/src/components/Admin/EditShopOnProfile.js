import React, { Component } from 'react';
// import './css/tab_styles.css';

class EditShopOnProfile extends Component {
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
      cuisine_list: [],
      type_list: []
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
    this.searchByCuisine = this.searchByCuisine.bind(this)
    this.searchByType = this.searchByType.bind(this)

    fetch('http://localhost:3001/get-cuisines-and-types')
      .then((response) => {return response.json() })
      .then((body) => {
          this.setState({ 
            cuisine_list: body.cuisines,
            type_list: body.types
        })
        console.log(body)
    })

    fetch('http://localhost:3001/restaurant/'+ this.state.restaurant_id)
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

  searchByCuisine(e) {
    this.setState({
      search_key: e.target.value, 
      search_category: 'cuisine'
    })
    fetch('http://localhost:3001/view-by-cuisine/' + e.target.value)
      .then((response) => {return response.json() })
      .then((body) => {
        this.setState({ 
          search_results: body.restaurants,
          results_visibility: true, 
          filter_key: '' 
        })
        console.log(body)
      })
  }

  searchByType(e) {
    this.setState({
      search_key: e.target.value, 
      search_category: 'type'
    })
    fetch('http://localhost:3001/view-by-type/' + e.target.value)
      .then((response) => {return response.json() })
      .then((body) => {
        this.setState({ 
          search_results: body.restaurants,
          results_visibility: true,
          filter_key: ''   
        })
        console.log(body)
      })
  }

  editInfo(e) {
    fetch('http://localhost:3001/edit-restaurant', {
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
          edit_status: 'Edit successful!'
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
      // restaurant_cuisine, 
      restaurant_rating, 
      // restaurant_likes, 
      // restaurant_type, 
      restaurant_openingtime, 
      restaurant_closingtime, 
      restaurant_address, 
      latitude, 
      longitude 
    } = this.state
    return (
      <div>     
          <div>
            <h1 className="edit-title">Restaurant Info</h1>
            <div className="edit-input-div">
              <label className="label"> <strong>ID: </strong> { restaurant_id } </label>
            </div>

            <div className="edit-input-div">        
                <label className="label" htmlFor="name">Restaurant Name *</label>
                <input type="text" className="edit-input" value={restaurant_name} name="name" onChange={this.handleNameChange} noValidate />
               
            </div>

            <div className="edit-input-div"> 
              <label className="label"><strong>Rating: </strong> { restaurant_rating }/5</label>
            </div>

            <div className="edit-input-div">
                  <label className="label" htmlFor="cuisine">Restaurant Cuisine: </label>
                  <select className="edit-dropdown" onChange={this.handleCuisineChange}>
                    <option key={this.state.cuisine_list.length} value='' selected>Cuisine (View All)</option>
                    {this.state.cuisine_list.map((shop, index) => {
                        return (
                          <option key={index} value={shop.restaurant_cuisine}>
                            {shop.restaurant_cuisine}
                          </option>
                        )})} 
                      </select>
            </div>

            <div className="edit-input-div"> 
                  <label className="label" htmlFor="type">Type: </label>
                  <select className="edit-dropdown" onChange={this.handleTypeChange}>
                    <option key={this.state.type_list.length} value='' selected>Type (View All)</option>
                    {this.state.type_list.map((shop, index) => {
                        return (
                          <option key={index} value={shop.restaurant_type}>
                            {shop.restaurant_type}
                          </option>
                        )})} 
                    </select>
            </div>
            
            <div className="edit-input-div">
                <label className="label" htmlFor="latitude">Opening Time: </label>
                <input type="text" className="edit-input" value={restaurant_openingtime} name="openingtime" onChange={this.handleOpeningTimeChange} noValidate />
            </div>

            <div className="edit-input-div">
                <label className="label" htmlFor="longitude">Closing Time: </label>
                <input type="text" className="edit-input" value={restaurant_closingtime} name="closingtime" onChange={this.handleClosingTimeChange} noValidate />
            </div>

             <div className="edit-input-div">
                <label className="label" htmlFor="longitude">Address: </label>
                <input type="text" className="edit-input" value={restaurant_address} name="address" onChange={this.handleAddressChange} noValidate />
            </div>

            <div className="edit-input-div">
                <label className="label" htmlFor="latitude">Latitude: </label>
                <input type="text" className="edit-input" value={latitude} name="latitude" onChange={this.handleLatitudeChange} noValidate />
            </div>

            <div className="edit-input-div">
                <label className="label" htmlFor="longitude">Longitude: </label>
                <input type="text" className="edit-input" value={longitude} name="longitude" onChange={this.handleLongitudeChange} noValidate />
            </div>

            <button className="edit-submit" onClick={this.editInfo}>Submit</button>
          </div>
        
      </div>
    );
  }
}

export default EditShopOnProfile;