import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { Link } from 'react-router-dom';
import '../css/Search.css'
import NavBar from './Navbar';
import Footer from './Footer';

class Search extends Component {
	constructor(props){
	    super(props)
	    this.state = {
	    	user_id: 0,
		    username: '',
		    firstname: '',
		    lastname: '',
		    user_type: 0,
		    isLoggedIn: false,
		    cuisine_list: [],
		    type_list: [],
	    	search_key: '',
	    	search_category: '',
	      	search_results: [],
	      	search_results_2: [],
	      	results_visibility: false,
	      	current_filter: '',
	      	filter_key: '',
	      	sort_by: '',
	      	redirect: false
	    }
	    this.searchByCuisine = this.searchByCuisine.bind(this)
	    this.searchByType = this.searchByType.bind(this)
	    this.setFilterKey = this.setFilterKey.bind(this)
	    this.sortResults = this.sortResults.bind(this)
	    this.searchByName = this.searchByName.bind(this)
	    this.handleSearchKeyChange = this.handleSearchKeyChange.bind(this)
	    this.handleOrderReversal = this.handleOrderReversal.bind(this)

	    fetch('/get-cuisines-and-types')
	    .then((response) => {return response.json() })
	    .then((body) => {
          	this.setState({ 
          		cuisine_list: body.cuisines,
          		type_list: body.types
	        })
        	console.log(body)
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

  	searchByCuisine(e) {
  		this.setState({
  			search_key: e.target.value, 
  			search_category: 'cuisine'
  		})
	    fetch('/view-by-cuisine/' + e.target.value)
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
	    fetch('/view-by-type/' + e.target.value)
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

  	searchByName() {
  		console.log(this.state.search_key)
	    fetch('/search-restaurant/' + this.state.search_key)
	    .then((response) => {return response.json() })
	    .then((body) => {
	        this.setState({ 
	          	search_results: body.restaurants,
	          	results_visibility: true, 
	          	search_category: 'name',
	          	filter_key : ''
	        })
	        console.log(body)
	    })
	}

  	setFilterKey(e){
  		this.setState({
  			filter_key: e.target.value
  		})
  	}

  	handleSearchKeyChange(e){
  		this.setState({
  			search_key: e.target.value
  		})
  	}

  	sortResults(e){
  		this.setState({
  			sort_by: e.target.value
  		})
  		const {search_results} = this.state
    	let newSearchResults = search_results
    	if (e.target.value === 'top-rated'){
			this.setState({
				search_results: newSearchResults.sort(function(a, b) {return (b.restaurant_rating) - (a.restaurant_rating)})
			})
    	}
    	else if (e.target.value === 'likes'){
    		this.setState({
    			search_results: newSearchResults.sort(function(a, b) {return parseInt(b.restaurant_likes) - parseInt(a.restaurant_likes)})
    		})
    	}
    	else if (e.target.value === 'name'){
    		this.setState({
    			search_results: newSearchResults.sort(function(a, b) {return (a.restaurant_name).localeCompare(b.restaurant_name)})
    		})
    	}
    	console.log(e.target.value)
  	}

  	handleOrderReversal(){
  		const {search_results} = this.state
    	let newSearchResults = search_results
    	this.setState({
    		search_results: newSearchResults.reverse()
    	})
  	}

  	renderRedirect = () => {
	    if (this.state.redirect === 'unauthorized'){
	      return <Redirect to={{ pathname: '/unauthorized'}} />
	    }
  	}
  
  	render() {

	    if (this.state.search_category === 'name' && this.state.filter_key.length !== 0){
	    	var current_filter = ''
	    	var dummy_list = this.state.cuisine_list
	    	var cuisine_list = []
	    	for(var i = 0; i < dummy_list.length; i++){
	    		cuisine_list.push(dummy_list[i].restaurant_cuisine)
	    	}
	    	console.log(cuisine_list)
	    	console.log(this.state.filter_key)
	    	console.log(this.state.cuisine_list)
	    	if (cuisine_list.includes(this.state.filter_key)){
	    		current_filter = 'cuisine'
	    	}else{
	    		current_filter = 'type'
	    	}
	    	console.log("filter type =" + current_filter)
	    	
	    }
	    
	    return (

	    	<div>
	    	{this.renderRedirect()}
	    	
			<NavBar />

		      	<div className="page">
		        	<div className='sidebarStyle'>
		        	  <div className="search_hdr">Cuisine</div>
		        		<ul className = "cuisine-list"> 
				        	{this.state.cuisine_list.map((shop, index) => {
				            	return <li key={index}>
				            		<button className="search-button" value={shop.restaurant_cuisine} onClick={this.searchByCuisine}>
				            			{shop.restaurant_cuisine}
				            		</button>
				     			</li>
				          	})} 
	        			</ul>
	        			<div className="search_hdr">Type</div>
	        			<ul className = "type-list"> 
				        	{this.state.type_list.map((shop, index) => {
				            	return <li key={index}>
				            		<button className="search-button" value={shop.restaurant_type} onClick={this.searchByType}>
				            			{shop.restaurant_type}
				            		</button>
				     			</li>
				          	})} 
	        			</ul>
		        	</div>
		        	<div className='mainComponentStyle'>
		        		<span>
				          <input className="search-input" type="text" size="30" placeholder="Enter restaurant name" name="keyword" onChange={this.handleSearchKeyChange} />
				          <button className="search-button" id="input" type="submit" onClick={this.searchByName}>Search</button>
				        </span>
				        <br />
		        		{this.state.results_visibility  ? (this.state.search_results.length > 0 ? <div className="statement">Search results for '{this.state.search_key}': </div> : <div className="statement">No result found</div>) : null}
		        		<br />
		        		{
	        			this.state.results_visibility && this.state.search_results.length > 0 ? 
		        		<div className = "search-filter">
		        			Filter by:  
		        			<span className='cuisine-drp'>
					      		<select className="dropdown-btn" onChange={this.setFilterKey} disabled={this.state.search_category === 'cuisine' ? true : null}>
					      		<option key={this.state.cuisine_list.length} value='' selected>Cuisine (View All)</option>
					      		{this.state.cuisine_list.map((shop, index) => {
					            	return (
					            		<option key={index} value={shop.restaurant_cuisine}>
					            			{shop.restaurant_cuisine}
					            		</option>
					            	)})} 
				          		</select>
		        			</span> 
		        			<span className='type-drp'>
					      		<select className="dropdown-btn" onChange={this.setFilterKey} disabled={this.state.search_category === 'type' ? true : null}>
					      		<option key={this.state.type_list.length} value='' selected>Type (View All)</option>
					      		{this.state.type_list.map((shop, index) => {
					            	return (
					            		<option key={index} value={shop.restaurant_type}>
					            			{shop.restaurant_type}
					            		</option>
					            	)})} 
				          		</select>
		        			</span> 
		        			Sort by: 
		        			<span className='sort-drp'>
		        				<select className="dropdown-btn" onChange={this.sortResults}>
		        					<option className="sort-label" value=''>Pick Order</option>
		        					<option className="sort-label" value='top-rated'>Top Rated (Desc)</option>
		        					<option className="sort-label" value='likes'>Number of Likes (Desc)</option>
		        					<option className="sort-label" value='name'>Name (Asc)</option>
		        				</select>
		        			</span>
		        			<span className='order-btn'>
		        			    <label for="somebox"> Reverse Order: </label>
	                   			<input type="checkbox"  id="somebox" onChange={this.handleOrderReversal} />
		        			</span>
		        		</div>
		        		: null
		        		}
	        		
	        			{this.state.filter_key.length !== 0  ? 
	        				<div className="search-results">
	        					{this.state.search_results.map((shop) => {
					        		var filter_cat =''
					        		if(this.state.search_category === 'type'){
					        			filter_cat = shop.restaurant_cuisine
					        		}
					        		else if(this.state.search_category === 'cuisine'){
					        			filter_cat = shop.restaurant_type
					        		}else{
					        			if(current_filter === 'cuisine'){
					        				filter_cat = shop.restaurant_cuisine
					        			}
					        			else{
					        				filter_cat = shop.restaurant_type
					        			}
					        		}

					        		if (this.state.filter_key === filter_cat){
					        			return <div className="result-row" key={shop.restaurant_id}>
					        				<div className="result-row1">
								        		<div className="result-photo">"PHOTO"</div> 
								        		<div className="result-type">{shop.restaurant_type}</div>
			        		        			<div className="result-name">
			        		        				<Link className = 'search-link' to={{pathname: `/restaurant/${shop.restaurant_id}`, state: {restaurant_id: shop.restaurant_id}}}>
			        			        				{shop.restaurant_name}
			        			        			</Link>
			        			        		</div>
			        			        		<div className="result-address">{shop.restaurant_address } restaurant_address</div>
		        			        		</div>

		        			        		<div className= "result-row2">
								        		<div className="result-cuisine">{shop.restaurant_cuisine}</div> 
								        		<div className="result-data">{shop.restaurant_likes}</div>
								        		<div className="result-data">{shop.restaurant_rating}</div>
								        	</div>
						        		</div>
					        		} else return null
					        	})}
	        				</div>
	        				:
	        				<div className="search-results">
								{this.state.search_results.map((shop) => {
				        			return <div className="result-row" key={shop.restaurant_id}>
				        				<div className="result-row1">
							        		<div className="result-photo">"PHOTO"</div> 
							        		<div className="result-type">{shop.restaurant_type}</div>
											<div className="result-rates">				        		
								        		<div className="result-rating">{shop.restaurant_rating}</div>
								        		<div className="result-likes">{shop.restaurant_likes} thumbs</div>
								        	</div>
		        		        			<div className="result-name">
		        		        				<Link className = 'search-link' to={{pathname: `/restaurant/${shop.restaurant_id}`, state: {restaurant_id: shop.restaurant_id}}}>
		        			        				{shop.restaurant_name}
		        			        			</Link>
		        			        		</div>
		        			        		<div className="result-address">result-address{shop.restaurant_address}</div>
	        			        		</div>

	        			        		<div className= "result-row2">
							        		<div className="result-cuisine">{shop.restaurant_cuisine}</div>
							        		<div className="result-cuisine">{shop.restaurant_price}</div> 
							        		<div className="result-data">{shop.restaurant_openingtime} - {shop.restaurant_openingtime}</div>
							        		<div className="result-data">{shop.restaurant_days}</div>
							        	</div>
					        		</div>
					        	})}
	        				</div>
	        			}
		        	</div>
		        </div>

	        	<Footer />
	      	</div>
	    );
	 }
}

export default Search;