import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';
import "circular-std";

import sample from '../images/sample.jpg';
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
import '../css/Randomizer.css'

class Randomizer extends Component {

	constructor(){
		super();
		this.state = {

			restaurant: [],
	  		//checked_cuisines: new Map(), //Array from checkbox list
	  		//checked_types: new Map(), //
	  		cuisines : [],
	  		types : [],
	  		related: [],

      		price: '*' || this.props.price,
      		//cuisine: '*' || this.props.cuisine,
      		//type: '*' || this.props.type,

      		alltype: 0,
      		allcuisine: 0,
      		redirect: ''
		}

		this.randomize = this.randomize.bind(this);

		this.resetOptions = this.resetOptions.bind(this);
		this.handleChangePrice = this.handleChangePrice.bind(this);
    	this.handleChangeCuisines = this.handleChangeCuisines.bind(this);
    	this.handleChangeTypes = this.handleChangeTypes.bind(this);

    	this.toggleAllCuisines = this.toggleAllCuisines.bind(this);
    	this.toggleAllTypes = this.toggleAllTypes.bind(this);
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

  	handleChangePrice(e){
    	this.setState({price: e.target.value});
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

  	/*
  	disableTypes(e){
  		this.setState(prevState => ({
  			disabledTypes: !prevState.disabledTypes
		}));  
		if(this.state.disabledTypes==true){
			this.setState({cuisines : "*"})
		}
  	}
  	disableCuisines(e){
		this.setState(prevState => ({
  			disabledCuisines: !prevState.disabledCuisines
		}));  	
		if(this.state.disabledTypes==true){
    		this.setState({types : "*"})
    	}
	}
	*/

 
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
		document.getElementById('rand_details').style.display='block';
		document.getElementById('rand_default').style.display='none';

		fetch('http://localhost:3001/randomizer-simple')
      		.then((response) => {return response.json()})
      		.then((data=>{
        	this.setState({restaurant:data.restaurant})
        	this.setState({count:data.count})
        	//console.log(restaurant);
      	}))//-=============================

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
  		  {this.renderRedirect()}
  			<NavBar />

  			<div className="rand_bg">

  				<div className="filter">
  						<p className="alert">Filter not yet working. =( </p>
  						<h5><em> Filter by Popularity </em></h5>
    						<form action="" onChange={this.toggleAllTypes} value={this.state.value}>
    							<input type="checkbox" name="alltype" value="alltype"  /> All </form>
    						<form action="" onChange={this.handleChangeTypes} value={this.state.value}>
    							<li><input type="checkbox" name="type" value="Buffet" /> New </li> 
    							<li><input type="checkbox" name="type" value="Stall"  /> Most Liked </li>
    							<li><input type="checkbox" name="type" value="Canteen" /> Top Rated </li>
    						</form>

  						<h5><em> Filter by Price </em></h5>
  						<form action="" onChange={this.toggleAllTypes} value={this.state.value}>
    							<input type="checkbox" name="alltype" value="alltype"  /> All </form>
  						<form action="" onChange={this.handleChangePrice}>
    							<li><input type="checkbox" name="price" value="1" /> ₱ </li>
    							<li><input type="checkbox" name="price" value="2" /> ₱₱ </li> 
    							<li><input type="checkbox" name="price" value="3" /> ₱₱₱ </li>
    						</form>

    						<h5><em> Filter by Cuisine </em></h5>
    						<form action="" onChange={this.toggleAllCuisines} value={this.state.value}>
    							<input type="checkbox" name="allcuisine" value="allcuisine"  /> All </form>
    						<form action="" onChange={this.handleChangeCuisines} value={this.state.value}>
    							<li><input type="checkbox" name="cuisine" value="Alien"  /> Alien </li> 
    							<li><input type="checkbox" name="cuisine" value="Mediterranean" /> Mediterranean </li>
    							<li><input type="checkbox" name="cuisine" value="Chinese" /> Chinese </li>
    							<li><input type="checkbox" name="cuisine" value="Japanese"  /> Japanese </li> 
    							<li><input type="checkbox" name="cuisine" value="Filipino" /> Filipino </li>
    						</form> 	

    						<h5><em> Filter by Type </em></h5>
    						<form action="" onChange={this.toggleAllTypes} value={this.state.value}>
    							<input type="checkbox" name="alltype" value="alltype"  /> All </form>
    						<form action="" onChange={this.handleChangeTypes} value={this.state.value}>
    							<li><input type="checkbox" name="type" value="Buffet" /> Buffet </li> 
    							<li><input type="checkbox" name="type" value="Stall"  /> Stall </li>
    							<li><input type="checkbox" name="type" value="Canteen" /> Canteen </li>
    							<li><input type="checkbox" name="type" value="Restaurant" /> Restaurant </li> 
    							<li><input type="checkbox" name="type" value="Eatery"  /> Eatery </li>
    						</form>

    				</div>

    				<div className="body">
    					<img className="restaurant_image" src={sample} alt="sample"/>
    					<button className="rand_button" type="submit"  onClick={this.randomize}> RANDOMIZE </button>
    				</div>

    				<div className="info">
    					<Link style={{ textDecoration: 'none', color: 'black' }}to={{pathname: `/restaurant/${this.state.restaurant.restaurant_id}`, 
                            state: { 
                              user_id: this.state.user_id, 
                              username: this.state.username,
                              user_type: this.state.user_type,
                              token: this.state.token,
                              restaurant_id: this.state.restaurant.restaurant_id
                            } }}>
    					<div id="rand_details">
  						<h5> <em>{this.state.restaurant.restaurant_name}</em> </h5>
  						<p> Cuisine: {this.state.restaurant.restaurant_cuisine} </p>
  						<p> Type: {this.state.restaurant.restaurant_type} </p>							
  						<p> Price: {pricePh} </p>
  					</div>	
  					</Link>

  					<div id="rand_default">
  						<h3>R A N D O M I Z E</h3>
  					</div>				
  				</div>
  			</div>

        <Footer />
  		</div>
		)
	}
}

export default Randomizer;