import React, { Component } from 'react';
import EditRestaurant from './EditRestaurant';
import './css/AdminStyle.css'

class EditDeleteShop extends Component {
	 constructor(props){
    super(props)
	    this.state = {
	      user_id: this.props.user_id,
	      search_key: '',
	      search_results: [],
	      editShopPageVisibility: false,
	      shopToEdit: 0,
	      status: '',
	      editDone: false,
	      deleteDone: false
	    }

	    this.handleSearchKeywordChange = this.handleSearchKeywordChange.bind(this)
	    this.searchShop = this.searchShop.bind(this)
	    this.viewEditShop = this.viewEditShop.bind(this)
	    this.hideEditShop = this.hideEditShop.bind(this)
	    this.deleteShop = this.deleteShop.bind(this)
	    this.handlePostEdit = this.handlePostEdit.bind(this)
  }

	handleSearchKeywordChange(e){
		this.setState({
	 		search_key: e.target.value
	 	})
	}

   viewEditShop(e){
    this.setState({
      editShopPageVisibility: true,
      shopToEdit: e.target.value
    })

    var myModal = document.getElementById('myModal');

    myModal.style.display='block'
  }

  hideEditShop(e){
  	this.setState({
      editShopPageVisibility: false,
    })
    
    var myModal = document.getElementById('myModal');
    myModal.style.display='none'

  }

	deleteShop(e) {
	    fetch('http://localhost:3001/delete-restaurant', {
	      	method: 'POST',
	      	headers: {
	         	'Accept': 'application/json',
	          	'Content-Type': 'application/json'
	      	},
	      	body: JSON.stringify({
	         	"restaurant_id": e.target.value
	      	})
	    })
	    .then(function(response){
	      return response.json()})
	    .then((body) => {
	      this.setState({
	        status: 'Deletion successful',
	        deleteDone: true
	    	})
	    }) 
	}

  	searchShop(){
  		fetch('http://localhost:3001/search-restaurant/' + this.state.search_key)
      		.then((response) => {return response.json() })
      		.then((body) => {
		        this.setState({ 
		         	search_results: body.restaurants,
		         	editDone: false,
		         	deleteDone: false,
		         	status: ''     
		        })
        	console.log(body)
      	})
  	}

  	handlePostEdit(){
  		this.setState({
  			editShopPageVisibility: false,
  			status: 'Edit successful.',
  			editDone: true
  		})
  	}
  
	render() {
	    return (
	    	<div>
	      	<div className="editDeleteShop">
	      		{this.state.editShopPageVisibility  ? null :
	      		<div>
		      		<div>
		      			<input className="editDeleteShopInput" type='text' placeholder='Search shop to edit/delete' onChange={this.handleSearchKeywordChange}/>
		      			<button className="searchButton" type='submit' onClick={this.searchShop}>Search</button>
		      		</div> 
		      		{this.state.search_results.length === 0  || this.state.editDone || this.state.deleteDone ? '' : 
		      			<div>
					      	<table className="editDeleteTable">
					      		<th>Status</th>
				              <th>Restaurant Name</th>
				              <th>Likes</th>
				              <th>Ratings</th>
				              <th ><em class="fa fa-cog"></em></th>

				              {this.state.search_results.map((shop) =>{
				                return <tr key={shop.restaurant_id}>

				                   <td>
				                    {shop.is_deleted === 1 ? <span className="isDeleted">Deleted</span>:<span className="isActive">Active</span>}
				                  </td>
				                   <td>
				                    {shop.restaurant_name}
				                  </td>
				                  <td>
				                    {shop.restaurant_likes}
				                  </td>
				                  <td>
				                    {shop.restaurant_rating}
				                  </td>
				                  <td>
				                    <button value={shop.restaurant_id} className="fa fa-edit" onClick={this.viewEditShop}></button>
				                    <button value={shop.restaurant_id} className="fa fa-trash" onClick={this.deleteShop}></button>
				                  </td>
				                </tr>
				              })} 
				            
				              </table>
			      		</div>
		    		}

	      		</div>
	      		}

	      	</div>
	      		<div id="myModal" className="editModal">
        <div className="editModalContent">
          {this.state.editShopPageVisibility ? 
            <EditRestaurant
              user_id={this.state.user_id} 
              restaurant_id={this.state.shopToEdit}
              handlePostEdit={this.handlePostEdit} /> 
              : null }
            {this.state.editDone && <div>"Edit successful!"</div>}
            <button onClick={this.hideEditShop}>Close</button>
          </div>
        </div> 
	      	</div>
	    );
	}
}

export default EditDeleteShop;
