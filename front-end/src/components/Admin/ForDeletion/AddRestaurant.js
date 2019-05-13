import React, { Component } from 'react';

class AddRestaurant extends Component {
  constructor(props){
    super(props)
    this.state = {
      restaurant_name: '',
      restaurant_cuisine: '',
      restaurant_type: '',
      restaurant_openingtime: '',
      restaurant_closingtime: '',
      restaurant_address: '',
      latitude: 0,
      longitude: 0,
      status:''
    }
    this.handleAddShop = this.handleAddShop.bind(this)
    this.handleRestaurantID = this.handleRestaurantID.bind(this)
    this.handleRestaurantName = this.handleRestaurantName.bind(this)
    this.handleRestaurantCuisine = this.handleRestaurantCuisine.bind(this)
    this.handleRestaurantType = this.handleRestaurantType.bind(this)
    this.handleRestaurantOpeningTime = this.handleRestaurantOpeningTime.bind(this)
    this.handleRestaurantClosingTime = this.handleRestaurantClosingTime.bind(this)
    this.handleRestaurantAddress = this.handleRestaurantAddress.bind(this)
    this.handleRestaurantLatitude = this.handleRestaurantLatitude.bind(this)
    this.handleRestaurantLongitude = this.handleRestaurantLongitude.bind(this)

  }

  handleAddShop(e) {
    fetch('http://localhost:3001/add-restaurant', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({
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
      return response.json()})
    .then((body) => {
      this.setState({
        status: body.message,
    })
    console.log(body)
    }) 
  }


  handleRestaurantID(e) {
    this.setState({
      restaurant_id: e.target.value, 
    })
  }

  handleRestaurantName(e) {
    this.setState({
      restaurant_name: e.target.value, 
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
 
  render() {
    //this.fetchData()
    return (
      <div>
        <div className="form-wrapper">
            <h3>Add Restaurant</h3>
            <div>***Restaurant Name***: <input type="text" name="restaurant_name" onChange={this.handleRestaurantName}/></div> 
            <div>**Restaurant Cuisine**: <input type="text" name="restaurant_cuisine" onChange={this.handleRestaurantCuisine}/></div> 
            <div>***Restaurant Type***: <input type="text" name="restaurant_type" onChange={this.handleRestaurantType}/></div> 
            <div>***Opening Time***: <input type="text" name="restaurant_openingtime" onChange={this.handleRestaurantOpeningTime}/></div> 
            <div>***Closing Time***: <input type="text" name="restaurant_closingtime" onChange={this.handleRestaurantClosingTime}/></div> 
            <div>******Latitude*******: <input type="text" name="latitude" onChange={this.handleRestaurantLatitude}/></div> 
            <div>******Longitude*****: <input type="text" name="longitude" onChange={this.handleRestaurantLongitude}/></div> 
        </div>
        {this.state.status}
        <div>
            <button type="submit" onClick={this.handleAddShop}>Add Shop </button>
        </div>
      </div>
    );
  }
}

export default AddRestaurant;
