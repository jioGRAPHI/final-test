import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import EditRestaurant from './EditRestaurant';
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
      rerender: false,
      editDone: false
    }
    this.handleDeletedShopsVisibilityChange = this.handleDeletedShopsVisibilityChange.bind(this)
    this.handleNewShopsVisibilityChange = this.handleNewShopsVisibilityChange.bind(this)
    this.handleTopRatedShopsVisibilityChange = this.handleTopRatedShopsVisibilityChange.bind(this)
    this.handleMostLikedShopsVisibilityChange = this.handleMostLikedShopsVisibilityChange.bind(this)
    this.handlePostEdit = this.handlePostEdit.bind(this)
    this.viewEditShop = this.viewEditShop.bind(this)
    this.hideEditShop = this.hideEditShop.bind(this)
    this.deleteShop = this.deleteShop.bind(this)

    fetch('http://localhost:3001/get-featured-shops')
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

    document.getElementById('liked').style.backgroundColor='#fff';
    document.getElementById('liked').style.fontWeight='normal';
    document.getElementById('new').style.backgroundColor='#fff';
    document.getElementById('new').style.fontWeight='normal';
    document.getElementById('rated').style.backgroundColor='#fff';
    document.getElementById('rated').style.fontWeight='normal';
    document.getElementById('deleted').style.backgroundColor='#f79361';
    document.getElementById('deleted').style.fontWeight='bold';
  }

  handleNewShopsVisibilityChange(){
    this.setState({
      new_shops_visibility: true,
      deleted_shops_visibility: false,
      top_rated_shops_visibility: false,
      most_liked_shops_visibility: false
    })

    document.getElementById('liked').style.backgroundColor='#fff';
    document.getElementById('liked').style.fontWeight='normal';
    document.getElementById('new').style.backgroundColor='#f79361';
    document.getElementById('new').style.fontWeight='bold';
    document.getElementById('rated').style.backgroundColor='#fff';
    document.getElementById('rated').style.fontWeight='normal';
    document.getElementById('deleted').style.backgroundColor='#fff';
    document.getElementById('deleted').style.fontWeight='normal';
  }

  handleTopRatedShopsVisibilityChange(){
    this.setState({
      new_shops_visibility: false,
      deleted_shops_visibility: false,
      top_rated_shops_visibility: true,
      most_liked_shops_visibility: false
    })

    document.getElementById('liked').style.backgroundColor='#fff';
    document.getElementById('liked').style.fontWeight='normal';
    document.getElementById('new').style.backgroundColor='#fff';
    document.getElementById('new').style.fontWeight='normal';
    document.getElementById('rated').style.backgroundColor='#f79361';
    document.getElementById('rated').style.fontWeight='bold';
    document.getElementById('deleted').style.backgroundColor='#fff';
    document.getElementById('deleted').style.fontWeight='normal';
  }

  handleMostLikedShopsVisibilityChange(){
    this.setState({
      new_shops_visibility: false,
      deleted_shops_visibility: false,
      top_rated_shops_visibility: false,
      most_liked_shops_visibility: true
    })

    document.getElementById('liked').style.backgroundColor='#f79361';
    document.getElementById('liked').style.fontWeight='bold';
    document.getElementById('new').style.backgroundColor='#fff';
    document.getElementById('new').style.fontWeight='normal';
    document.getElementById('rated').style.backgroundColor='#fff';
    document.getElementById('rated').style.fontWeight='normal';
    document.getElementById('deleted').style.backgroundColor='#fff';
    document.getElementById('deleted').style.fontWeight='normal';
  }

  handlePostEdit(){
    this.setState({
      editShopPageVisibility: false,
      status: 'Edit successful.',
      editDone: true, 
      rerender: true
    })

    fetch('http://localhost:3001/get-featured-shops')
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
      shopToEdit: e.target.value,
      editDone: false
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
          deleteDone: true,
          rerender: true
        })
      fetch('http://localhost:3001/get-featured-shops')
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
      }) 
  }

  render() {
    if(this.state.rerender === true){
      fetch('http://localhost:3001/get-featured-shops')
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
      <div>
        {this.state.editShopPageVisibility ? null :          
        <div>

          <div>
            <div className="summaryButton">
              <button id="liked" onClick={this.handleMostLikedShopsVisibilityChange}>Most Liked</button>
              <button id="new" onClick={this.handleNewShopsVisibilityChange}>New</button>
              <button id="rated" onClick={this.handleTopRatedShopsVisibilityChange}>Top Rated</button>
              <button id="deleted" onClick={this.handleDeletedShopsVisibilityChange}>Deleted</button> 
            </div>
          </div>

          <div>
            {this.state.top_rated_shops_visibility  ?
              <div className="tableDiv">
             <table className="summaryTable">
              <th>Restaurant Name</th>
              <th>Likes</th>
              <th>Ratings</th>
              <th ><em class="fa fa-cog"></em></th>

              {this.state.top_rated.map((shop) =>{
                return <tr key={shop.restaurant_id}>

                  <td>
                     <Link to={{pathname:  `/restaurant/${shop.restaurant_id}`, 
                    state: { 
                      user_id: this.state.user_id, 
                      username: this.state.username,
                      user_type: this.state.user_type,
                      restaurant_id: shop.restaurant_id
                    } }}>
                    {shop.restaurant_name}
                    </Link>      
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
              </div> : null
            }
          </div>

          <div>
            {this.state.new_shops_visibility  ?
              <div className="tableDiv">
             
             <table className="summaryTable">
              <th>Restaurant Name</th>
              <th>Likes</th>
              <th>Ratings</th>
              <th ><em class="fa fa-cog"></em></th>

              {this.state.new.map((shop) =>{
                return <tr key={shop.restaurant_id}>

                  <td>
                     <Link to={{pathname:  `/restaurant/${shop.restaurant_id}`, 
                    state: { 
                      user_id: this.state.user_id, 
                      username: this.state.username,
                      user_type: this.state.user_type,
                      restaurant_id: shop.restaurant_id
                    } }}>
                    {shop.restaurant_name}
                    </Link>      
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
              </div> : null
            }
          </div>

          <div>
            {this.state.most_liked_shops_visibility  ?
              <div className="tableDiv">
          
             <table className="summaryTable">
              <th>Restaurant Name</th>
              <th>Likes</th>
              <th>Ratings</th>
              <th ><em class="fa fa-cog"></em></th>

              {this.state.most_liked.map((shop) =>{
                return <tr key={shop.restaurant_id}>

                  <td>
                     <Link to={{pathname:  `/restaurant/${shop.restaurant_id}`, 
                    state: { 
                      user_id: this.state.user_id, 
                      username: this.state.username,
                      user_type: this.state.user_type,
                      restaurant_id: shop.restaurant_id
                    } }}>
                    {shop.restaurant_name}
                    </Link>      
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
              </div> : null
            }
          </div>

          <div>
    
            {this.state.deleted_shops_visibility  ?
              <div className="tableDiv">
             <table className="summaryTable">
              <th>Restaurant Name</th>
              <th>Likes</th>
              <th>Ratings</th>
              {this.state.deleted.map((shop) =>{
                return <tr key={shop.restaurant_id}>

                  <td>
                    {shop.restaurant_name}    
                  </td>
                  <td>
                    {shop.restaurant_likes}
                  </td>
                  <td>
                    {shop.restaurant_rating}
                  </td>
                </tr>
              })} 

              </table> 
              </div>: null

            }
          </div>
  
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

export default RestaurantSummary;