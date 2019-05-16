import React, { Component } from 'react';
import TimeRangePicker from '@wojtekmaj/react-timerange-picker';
// import Upload from '../Upload.js';
import './css/AdminStyle.css'

class AddShop extends Component {
  constructor(props){
    super(props)
    this.state = {
      user_id: this.props.user_id,
      restaurant_name: '',
      restaurant_cuisine: 'American',
      restaurant_type: 'Eatery',
      restaurant_openingtime: '',
      restaurant_closingtime: '',
      restaurant_address: '',
      restaurant_price_range: '1',
      latitude: 0,
      longitude: 0,
      status:'',
      time: ['10:00', '22:00'],
      error: [], 
      add_done: false
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
    this.changeTime = this.changeTime.bind(this)
    this.handlePriceRangeChange = this.handlePriceRangeChange.bind(this)

  }

  changeTime = time => this.setState({ time })


   changeTime(time) {
    console.log('h');
    if(time === 0){
      time = ['8:00', '8:00']
    }
    this.setState({
      time: time 
    })
  }

  handleAddShop(e) {
    let errors = []
    if(isNaN(this.state.latitude) || isNaN (this.state.longitude))
      errors.push('Latitude and/or longitude input/a not a number!')
    if(this.state.restaurant_name.length === 0)
     errors.push('Name field cannot be empty!')
    if(this.state.restaurant_address.length === 0)
     errors.push('Address field cannot be empty!')    
    if(errors.length !== 0){
      this.setState({
        error: errors
      })
    }
    else{
      var time = this.state.time;
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
            "restaurant_price_range": this.state.restaurant_price_range,
            "restaurant_openingtime": time[0],
            "restaurant_closingtime": time[1],
            "restaurant_address": this.state.restaurant_address,
            "latitude": this.state.latitude,
            "longitude": this.state.longitude,
            "added_by": this.state.user_id
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

  }

  // componentWillMount(){
  //   fetch("http://localhost:3001/check-session")
  //   .then(function(response){
  //     return response.json()})
  //   .then((body) => {
  //     if(body.statusCode === 200){
  //       this.setState({
  //         user_id: body.userData.user_id, 
  //       })
  //       console.log(body.userData)
  //     }else{
  //       this.setState({
  //         redirect: 'unauthorized' 
  //       })
  //     }
  //   }) 
  // }


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

  handlePriceRangeChange(e){
    this.setState({
      restaurant_price_range: e.target.value, 
    })
  }
 
  render() {
    return (
      <section>

        <div className="addShop">
          <input id="addName" type="text" name="restaurant_name" placeholder="Name" onChange={this.handleRestaurantName}/> 

           <select id ="addPrice" onChange={this.handlePriceRangeChange}>
            <option value='1' disabled>Price Range (defualt ₱)</option>
            <option value='1' >₱</option>
            <option value='2'>₱₱</option>
            <option value='3'>₱₱₱</option>
          </select>

          <input id="addAddress" type="text" name="restaurant_address" placeholder="Address" onChange={this.handleRestaurantAddress}/> 
          <input id="addLat" type="text" name="latitude" placeholder="Latitude" onChange={this.handleRestaurantLatitude}/> 
          <input id="addLong" type="text" name="longitude" placeholder="Longitude" onChange={this.handleRestaurantLongitude}/> 

          <select id="addCuisine" onChange={this.handleRestaurantCuisine}>
            <option value='American' disabled>Cuisine (default 'American')</option>
            <option value='American' >American</option>
            <option value='Chinese'>Chinese</option>
            <option value='Filipino'>Filipino</option>
            <option value='Italian' >Italian</option>
            <option value='Japanese'>Japanese</option>
            <option value='Korean'>Korean</option>
            <option value='Mexican'>Mexican</option>
            <option value='Tex-Mex'>Tex-Mex</option>
            <option value='Others'>Others</option>
          </select>

          <select id="addType" onChange={this.handleRestaurantType}>
            <option value='Eatery' disabled>Price Range (default 'Eatery')</option>
            <option value='Eatery' >Eatery</option>
            <option value='Canteen'>Canteen</option>
            <option value='Fastfood'>Fastfood</option>
            <option value='Restaurant'>Restaurant</option>
            <option value='Others'>Others</option>
          </select>

          <TimeRangePicker className="addTime" onChange={this.changeTime} value={this.state.time} disableClock={true} required={true}/>

          <form id="addDayForm" action="">
            <input id="addDay" type="radio"  /> Mon
            <input id="addDay" type="radio"  /> Tue  
            <input id="addDay" type="radio" /> Wed  
            <input id="addDay" type="radio"  /> Thurs  
            <input id="addDay" type="radio"  /> Fri  
            <input id="addDay" type="radio" /> Sat  
            <input id="addDay" type="radio" /> Sun  
          </form>

          <button className="addShopButton" type="submit" onClick={this.handleAddShop}>Add Restaurant</button>

        </div>
        
         {this.state.error.map((err) => {
          return(
            <div className="notifyError">
              {err}
            </div>
          )
        })
        }
      </section>
    );
  }
}

export default AddShop;
