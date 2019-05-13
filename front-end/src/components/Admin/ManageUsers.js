import React from 'react';
import ActiveUsers from './ActiveUsers';
import DeletedUsers from './DeletedUsers';
import Tabs from './Tabs'
require('./tab_styles.css');

class ManageUsers extends React.Component {
  	constructor() {
	    super()
	    this.state = {
	      	user_id: 100,
	      	username: '',
	      	user_type: 1,
	      	firstname: '',
	      	lastname: '',
	      	isLoggedIn: false,
	      	unresolvedReports: [],
	      	resolvedReports: [],
	      	redirect: ''
	    }
  	}

  	// componentWillMount(){
	  //   fetch("http://localhost:3001/check-session")
	  //   .then(function(response){
	  //     	return response.json()})
	  //   .then((body) => {
	  //     	if(body.statusCode === 200){
		 //        this.setState({
		 //          	user_id: body.userData.user_id, 
		 //          	username: body.userData.username,
		 //          	firstname: body.userData.firstname,
		 //          	lastname: body.userData.lastname,
		 //          	user_type: body.userData.user_type,
		 //          	isLoggedIn: true
		 //        })
		 //        if(this.state.user_type === 0){
		 //          	this.setState({
		 //            	redirect: 'insufficient-permissions' 
		 //          	})
		 //        }
	  //       console.log(body.userData)
	  //     	}else{
		 //        this.setState({
		 //          	redirect: 'unauthorized' 
		 //        })
	  //     	}
	  //   }) 
  	// }

	render() {
	return (
	    <div>
	    	<Tabs>
		        <div label="Active">
		          	<ActiveUsers 
			          	user_id={this.state.user_id} 
			          	username={this.state.username}
			          	user_type={this.state.user_type} />
		        </div>
		        <div label="Deleted">
		          	<DeletedUsers 
			          	user_id={this.state.user_id} 
			          	username={this.state.username}
			          	user_type={this.state.user_type} />
		        </div>
	     	</Tabs>
	     	
	    </div>
  
   	)}
}

export default ManageUsers;