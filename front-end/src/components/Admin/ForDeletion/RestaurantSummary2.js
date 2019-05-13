import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import EditShop from './EditShop';
import './css/AdminStyle.css'
import '../../../node_modules/font-awesome/css/font-awesome.min.css'; 

class RestaurantSummary extends Component {
  constructor(props){
    super(props)
    this.state = {
      user_id: this.props.user_id,
      user_type: this.props.user_type,
      new: [],
      most_liked: [],
      top_rated:[],
      deleted: [],
      new_shops_visibility: false,
      top_rated_shops_visibility: false,
      most_liked_shops_visibility: true,
      deleted_shops_visibility: false,
      editShopPageVisibility: false,
      shopToEdit: 0, 
      rerender: false
    }
    this.handleDeletedShopsVisibilityChange = this.handleDeletedShopsVisibilityChange.bind(this)
    this.handleNewShopsVisibilityChange = this.handleNewShopsVisibilityChange.bind(this)
    this.handleTopRatedShopsVisibilityChange = this.handleTopRatedShopsVisibilityChange.bind(this)
    this.handleMostLikedShopsVisibilityChange = this.handleMostLikedShopsVisibilityChange.bind(this)
    this.handlePostEdit = this.handlePostEdit.bind(this)
    this.viewEditShop = this.viewEditShop.bind(this)
    this.deleteShop = this.deleteShop.bind(this)

    fetch('/get-featured-shops')
      .then((response) => {return response.json() })
      .then((body) => {
          this.setState({ 
            new: body.new,
            top_rated: body.top_rated,
            most_liked: body.most_liked,  
            deleted: body.deleted      
          })
          console.log(body)
      })
  }

  handleDeletedShopsVisibilityChange(){
    console.log("visible?")
    console.log(this.state.deleted_shops_visibility)
    this.setState({
      deleted_shops_visibility: true,
      new_shops_visibility: false,
      top_rated_shops_visibility: false,
      most_liked_shops_visibility: false
    })

  }

  handleNewShopsVisibilityChange(){
    this.setState({
      new_shops_visibility: true,
      deleted_shops_visibility: false,
      top_rated_shops_visibility: false,
      most_liked_shops_visibility: false
    })
  }

  handleTopRatedShopsVisibilityChange(){
    this.setState({
      new_shops_visibility: false,
      deleted_shops_visibility: false,
      top_rated_shops_visibility: true,
      most_liked_shops_visibility: false
    })
  }

  handleMostLikedShopsVisibilityChange(){
    this.setState({
      new_shops_visibility: false,
      deleted_shops_visibility: false,
      top_rated_shops_visibility: false,
      most_liked_shops_visibility: true
    })
  }

  handlePostEdit(){
    this.setState({
      editShopPageVisibility: false,
      status: 'Edit successful.',
      editDone: true, 
      rerender: true
    })
  }

  viewEditShop(e){
    this.setState({
      editShopPageVisibility: true,
      shopToEdit: e.target.value
    })
  }

  deleteShop(e) {
      fetch('/delete-restaurant', {
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
          deleteDone: true,
          rerender: true
        })
      }) 
  }

  render() {
    if(this.state.rerender === true){
      fetch('/user-dashboard')
      .then((response) => {return response.json() })
      .then((body) => {
          this.setState({ 
            new: body.new,
            top_rated: body.top_rated,
            most_liked: body.most_liked, 
            deleted: body.deleted,
            status: '',
            rerender: false       
          })
          console.log(body)
      })
  }
    
    return (
      <div>
        {this.state.editShopPageVisibility ? null : 
        <div>
          <div>
            <div className="summaryButton">
              <button onClick={this.handleMostLikedShopsVisibilityChange}>Most Liked</button>
              <button onClick={this.handleNewShopsVisibilityChange}>New</button>
              <button onClick={this.handleTopRatedShopsVisibilityChange}>Top Rated</button>
              <button onClick={this.handleDeletedShopsVisibilityChange}>Deleted</button> 
            </div>
          </div>
          <div>
            {this.state.new_shops_visibility  ?
              <ul> 
                {this.state.new.map((shop) => {
                  return <li key={shop.restaurant_id}>
                    <Link to={{pathname:  `/restaurant/${shop.restaurant_id}`, 
                    state: { 
                      user_id: this.state.user_id, 
                      username: this.state.username,
                      user_type: this.state.user_type,
                      restaurant_id: shop.restaurant_id
                    } }}>{shop.restaurant_name}</Link>
                    <button value={shop.restaurant_id} onClick={this.viewEditShop}>Edit</button>
                    <button value={shop.restaurant_id} onClick={this.deleteShop}>Delete</button>
                    </li>
                  })} 
              </ul> : null
            }
          </div>
          <div>
            {this.state.top_rated_shops_visibility  ?
              <ul> 
                {this.state.top_rated.map((shop) => {
                  return <li key={shop.restaurant_id}>
                  
                      <Link to={{pathname:  `/restaurant/${shop.restaurant_id}`, 
                        state: { 
                          user_id: this.state.user_id, 
                          username: this.state.username,
                          user_type: this.state.user_type,
                          restaurant_id: shop.restaurant_id
                        } }}>{shop.restaurant_name}</Link>

                        <button value={shop.restaurant_id} onClick={this.viewEditShop}>Edit</button>
                        <button value={shop.restaurant_id} onClick={this.deleteShop}>Delete</button>

                  </li>
                  })} 
              </ul> : null
            }
          </div>
          <div>
            {this.state.most_liked_shops_visibility  ?
              <ul> 
                {this.state.most_liked.map((shop) => {
                  return <li key={shop.restaurant_id}>
                    <Link to={{pathname:  `/restaurant/${shop.restaurant_id}`, 
                      state: { 
                        user_id: this.state.user_id, 
                        username: this.state.username,
                        user_type: this.state.user_type,
                        restaurant_id: shop.restaurant_id
                      } }}>{shop.restaurant_name}</Link>
                    <button value={shop.restaurant_id} onClick={this.viewEditShop}>Edit</button>
                    <button value={shop.restaurant_id} onClick={this.deleteShop}>Delete</button>
                  </li>
                  })} 
              </ul> : null
            }
          </div>
          <div>
            {this.state.deleted_shops_visibility  ?
              <ul> 
                {this.state.deleted.map((shop) => {
                  return <li key={shop.restaurant_id}>
                    <Link to={{pathname:  `/restaurant/${shop.restaurant_id}`, 
                    state: { 
                      user_id: this.state.user_id, 
                      username: this.state.username,
                      user_type: this.state.user_type,
                      restaurant_id: shop.restaurant_id
                    } }}>{shop.restaurant_name}</Link>
                    </li>
                  })} 
              </ul> : null
            }
          </div>
        </div>

      }
        {this.state.editShopPageVisibility ? 
          <EditShop 
            user_id={this.state.user_id} 
            restaurant_id={this.state.shopToEdit}
            handlePostEdit={this.handlePostEdit} /> 
          : null }
        {this.state.status}
      </div>
    );
  }
}

export default RestaurantSummary;