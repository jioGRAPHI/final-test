import React from 'react';
import AddShop from './AddShop';
import EditDeleteShop from './EditDeleteShop';
import RestaurantSummary from './RestaurantSummary';
import Tabs from './Tabs'
require('./tab_styles.css');

class ManageRestaurants extends React.Component {
  constructor() {
    super()
    this.state = {
      user_id: 100,
      user_type: 1
    }
  }

  render() {
  return (
    <div>
      <Tabs>
        <div label="Add">
          <AddShop user_id={this.state.user_id} />
        </div>
        <div label="Edit/Delete">
          <EditDeleteShop user_id={this.state.user_id} />
        </div>
        <div label="Summary">
          <RestaurantSummary user_id={this.state.user_id} user_type={this.state.user_type}/>
        </div>
      </Tabs>
    </div>
  
    );
  }
}

export default ManageRestaurants;