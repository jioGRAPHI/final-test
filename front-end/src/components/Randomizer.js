import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';
import "circular-std";
import ReactImageFallback from "react-image-fallback";
import StarRatings from 'react-star-ratings';



// import related from '../images/related.jpg';
// import related2 from '../images/related2.jpg';
// import related3 from '../images/related3.jpg';
// import related4 from '../images/related4.jpg';
// import related5 from '../images/related5.jpg';
// import filter from '../images/filter.png';
// import shuffle from '../images/shuffleButton.png';


//import cuisines from './cuisines';
//import types from './types';

//import Checkbox from './Checkbox';

import NavBar from './Navbar';
import Footer from './Footer';
import '../css/Randomizer.css';
import notfound from '../images/notfound.png';
import '../css/Home.css';

class Randomizer extends Component {

	constructor(){
		super();
		this.state = {
			cuisine_list: [],
		    type_list: [],

			restaurant: [],
			related1: [],
			related2: [],

	  		cuisines : ["American","Chinese","Filipino","Italian","Japanese","Korean","Others","Tex-Mex"],
	  		types : ["Canteen","Eatery","Fastfood","Others","Restaurant"],
	  		//related: [],

      		price: '*' || this.props.price,
      		selectedPrice: 3,

      		//alltype: 0,
      		//allcuisine: 0,
      		redirect: ''
		}

		this.randomize = this.randomize.bind(this);
		this.randomize_f = this.randomize_f.bind(this);

		this.handlePriceChange = this.handlePriceChange.bind(this);
		this.toggleCuisine = this.toggleCuisine.bind(this);
		this.toggleType = this.toggleType.bind(this);

    	//this.handleChangeCuisines = this.handleChangeCuisines.bind(this);
    	//this.handleChangeTypes = this.handleChangeTypes.bind(this);

    	this.toggleAllCuisines = this.toggleAllCuisines.bind(this);
    	this.toggleAllTypes = this.toggleAllTypes.bind(this);

    	fetch('/get-cuisines-and-types')
	    .then((response) => {return response.json() })
	    .then((body) => {
          	this.setState({ 
          		cuisine_list: body.cuisines,
          		type_list: body.types,
	        })
	        console.log(this.cuisine_list);
        	console.log(body)
    	})
	}

	/* ===============================
	Randomize(e) {
    //console.log("asdrfs");
    fetch('http://localhost:3001/randomizer',{
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			"cuisine": this.state.cuisine,
			"type": this.state.type,
			"price": this.state.price
		})
	})
      .then((response) => {return response.json()})
      .then((data=>{
        this.setState({restaurant:data.restaurant})
        this.setState({count:data.count})
        //console.log(restaurant);
      }))
  	}
  	RandomizeSimple(e) {
    //console.log("asdrfs");
    fetch('http://localhost:3001/randomizer-simple')
      .then((response) => {return response.json()})
      .then((data=>{
        this.setState({restaurant:data.restaurant})
        this.setState({count:data.count})
        //console.log(restaurant);
      }))
  	}*/ //==================================


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

  	
	handlePriceChange(e){
  		this.setState({
    		selectedPrice: e.target.value,
    		price: e.target.value
  		});
		console.log("Price set to : " + this.state.selectedPrice);
	}

	toggleCuisine(e){
		const options = this.state.cuisines
   	 	let index

    	// check if the check box is checked or unchecked
    	if (e.target.checked) {
      	// add the numerical value of the checkbox to options array
      		console.log("Added cuisine " + e.target.value);
      		options.push(e.target.value)
    	} else {
      	// or remove the value from the unchecked checkbox from the array
      		index = options.indexOf(e.target.value)
      		console.log("Removed cuisine " + e.target.value);
      		options.splice(index, 1)
    	}
    // update the state with the new array of options
    	this.setState({ cuisines: options })
    	console.log(this.state.cuisines);
	}

	toggleType(e){
		const options = this.state.types
   	 	let index

    	// check if the check box is checked or unchecked
    	if (e.target.checked) {
      	// add the numerical value of the checkbox to options array
      		console.log("added type " + e.target.value);
      		options.push(e.target.value)
    	} else {
      	// or remove the value from the unchecked checkbox from the array
      		index = options.indexOf(e.target.value)
      		console.log("Removed type " + e.target.value);
      		options.splice(index, 1)
    	}
    // update the state with the new array of options
    	this.setState({ types: options })
    	   console.log(this.state.types);
	}



  	handleChangeCuisines(e){
    	this.state.cuisines.push(e.target.value);

  	}

  	handleChangeTypes(e){
    	this.state.types.push(e.target.value);
  	}

  	resetOptions(e){
  		this.setState({types: []});
  		this.setState({cuisines: []});
  		document.getElementsByName("type").checked = false;
  		document.getElementsByName("cuisine").checked = false;
  	}

  	toggleAllCuisines(e){
  		this.setState({allcuisine: !this.state.allcuisine});
  	}

  	toggleAllTypes(e){
  		this.setState({alltype: !this.state.alltype});
  	}

 

 
	/*showModal(e){
		var modal = document.getElementById("myModal");
		var bg = document.getElementById("background");

		if(this.state.show){
			bg.style.opacity="1.0";
			modal.style.display = "none";
		}else{
			modal.style.display = "block";
			bg.style.opacity="0.3";
		}
		this.state.show = !this.state.show;
	}*/

	randomize(e){
		//Utilize Simple randomize


		fetch('http://localhost:3001/randomizer-simple')
      		.then((response) => {return response.json()})
      		.then((data=>{
        	this.setState({restaurant:data.restaurant})
        	this.setState({count:data.count})
        	//console.log(restaurant);
      	}))//-=============================
	}

	randomize_f(e){
		document.getElementById("rand-results-id").style.display="flex";
		document.getElementById("randRelated-id").style.display="flex";

		// Adv Randomize ==================
		fetch('http://localhost:3001/randomizer',{
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			"cuisine": this.state.cuisines,
			"type": this.state.types,
			"price": this.state.price
			})
		})
      		.then((response) => {return response.json()})
      		.then((data=>{
        this.setState({
        	restaurant:data.restaurant,
        	related1:data.related1,
        	related2:data.related2
        })
        this.setState({count:data.count})
        //console.log(restaurant);
     	 }))
      	// Adv randomize

	}

	/*showRelatedModal(e){
		var related = document.getElementById("relatedID");
		var modal = document.getElementById("myModal");
		var bg = document.getElementById("background");

		if(this.state.alltype==1){
			
		}
		if(this.state.allcuisine==1){

		}
		// Adv Randomize ==================
		fetch('http://localhost:3001/randomizer',{
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			"cuisine": this.state.cuisines,
			"type": this.state.types,
			"price": this.state.price
			})
		})
      		.then((response) => {return response.json()})
      		.then((data=>{
        this.setState({restaurant:data.restaurant})
        this.setState({count:data.count})
        //console.log(restaurant);
     	 }))
      	// Adv randomize

		if(modal.style.display="block"){
			bg.style.opacity="1.0";
			modal.style.display = "none";
			related.style.display = "flex";
		}else{
			modal.style.display = "block";
			bg.style.opacity="0.3";
			related.style.display = "flex";
		}
	}*/

	render() {
		var pricePh = this.state.restaurant.restaurant_price;
		if(pricePh === 1){
			pricePh	= '₱';
		}
		
		if(pricePh === 2){
			pricePh	= '₱₱';
		}

		if(pricePh === 3){
			pricePh	= '₱₱₱';
		}

		return(
  				<div>
		  		<div>
		        <NavBar />
		      </div>
		      	

        <div className="rand_body">

        <div className="filter">

			<h5><em> Filter by Budget </em></h5>

			<ul className = "price-list" style={{ listStyleType: "none" }}>
				<li><input type="radio" name="price" value="1" onChange={this.handlePriceChange} checked={this.state.selectedPrice === '1'} /> ₱ </li>
				<li><input type="radio" name="price" value="2" onChange={this.handlePriceChange} checked={this.state.selectedPrice === '2'} /> ₱₱ </li> 
				<li><input type="radio" name="price" value="3" onChange={this.handlePriceChange} checked={this.state.selectedPrice === '3'} /> ₱₱₱ </li>
			</ul>

		<h5><em> Filter by Cuisine </em></h5>

			<ul className = "cuisine-list"> 
	    	{this.state.cuisine_list.map((shop, index) => {
	        	return <li key={index}>
	        		<input type="checkbox" value={shop.restaurant_cuisine} onClick={this.toggleCuisine } defaultChecked />
	        			{shop.restaurant_cuisine}
	 			</li>
	      	})} 
			</ul>

		<h5><em> Filter by Type </em></h5>
		
			<ul className = "type-list"> 
	    	{this.state.type_list.map((shop, index) => {
	        	return <li key={index}>
	        		<input type="checkbox" value={shop.restaurant_type} onClick={this.toggleType} defaultChecked />
	        			{shop.restaurant_type}
	 			</li>
	      	})} 
			</ul>



    	</div>

        <div className="mainRand">
          		<button className="rand_button" type="submit"  onClick={this.randomize_f}>RANDOMIZE</button>



		        <div className="rand-results" id="rand-results-id">
		          <div className="result-row">
		                <div className="result-row1">
		                  <div className="result-photo">"PHOTO"</div> 
		                  <div className="result-type">{this.state.restaurant.restaurant_type}</div>
		              <div className="result-rates">                    
		                    <div className="result-rating">{this.state.restaurant.rating}</div>
		                    <div className="result-likes">{this.state.restaurant.restaurant_likes} thumbs</div>
		                  </div>
		                      <div className="result-name">
		                       {this.state.restaurant.restaurant_name}   
		                      </div>
		                      <div className="result-address">result-address{this.state.restaurant.restaurant_adress}}</div>
		                    </div>

		                    <div className= "result-row2">
		                  <div className="result-cuisine">{this.state.restaurant.restaurant_cuisine}</div>
		                  <div className="result-cuisine">{this.state.restaurant.restaurant_price}</div> 
		                  <div className="result-data">{this.state.restaurant.restaurant_openingtime} - {this.state.restaurant.restaurant_closingtime}</div>
		                  <div className="result-data">{this.state.restaurant.restaurant_days}</div>
		                </div>
		              </div>
		          </div>
		        <div className="randRelated" id="randRelated-id">
		        	<p className="homep">RELATED</p>
		        	<div className="randRelatedItems">

		        		<div className="home-container">
	                      <ReactImageFallback className="homefeedimages" src='../images/test.jpg' fallbackImage={notfound} alt="Report to administrator for missing images" />
	                      	<div className="feed-title">
                              <h4 className="restaurant-title">{this.state.related1.restaurant_name}</h4>
                            </div>
	                        <div className="home-overlay"><div className="home-restodetails"><h3 className="restaurant-title">{this.state.related1.restaurant_name}</h3>
	                        <p>{this.state.related1.restaurant_cuisine}</p><p className="return-strings">
	                        </p><p className="return-strings"> ❤ {this.state.restaurant.restaurant_likes}</p></div></div>     

	                    </div>

	                    <div className="home-container">
	                      <ReactImageFallback className="homefeedimages" src='../images/test.jpg' fallbackImage={notfound} alt="Report to administrator for missing images" />
	                      	<div className="feed-title">
                              <h4 className="restaurant-title">{this.state.related2.restaurant_name}</h4>
                            </div>
	                        <div className="home-overlay"><div className="home-restodetails"><h3 className="restaurant-title">{this.state.related2.restaurant_name}</h3>
	                        <p>{this.state.related2.restaurant_cuisine}</p><p className="return-strings">
	                        </p><p className="return-strings"> ❤ {this.state.restaurant.restaurant_likes}</p></div></div>     

	                    </div>


		        	</div>
				</div>
		        </div>

		    


		  </div>
      <div>
        <Footer />
  		</div>

      </div>
		)
	}
}

export default Randomizer;