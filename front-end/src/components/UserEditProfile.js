import React, {Component} from 'react';
// import Navbar from './Navbar.js';
// import './Admin/css/AdminStyle.css';
// import '../css/Home.css';

class UserEdit extends Component{
	constructor(props){
		super(props);
		this.state = {
			user_id: this.props.user_id,
			username: this.props.username,
			passwordOriginal: this.props.passwordOriginal,
			passwordOld: null,
			passwordNew: null,
			passwordNew2: null,
			email: this.props.email,
			firstname: this.props.firstname,
			lastname: this.props.lastname,
			contactno: this.props.contactno,
			info_display_visibility: true,
            edit_info_visibility: false,
            edit_button_visibility: true,
            edited: false,
            isLoggedIn: false
		}

		this.handleUsername= this.handleUsername.bind(this)
		this.handlePasswordOld= this.handlePasswordOld.bind(this)
		this.handlePasswordNew= this.handlePasswordNew.bind(this)
		this.handlePasswordNew2= this.handlePasswordNew2.bind(this)
		this.handleEmail= this.handleEmail.bind(this)
		this.handleFirstname= this.handleFirstname.bind(this)
		this.handleLastname= this.handleLastname.bind(this)
		this.handleContactno= this.handleContactno.bind(this)
		this.editInfo =  this.editInfo.bind(this)
	}

 	componentWillMount(){
 		fetch("http://localhost:3001/check-session")
 		.then(function(response){
 			return response.json()})
 		.then((body)=>{
 			if(body.statusCode === 200){
 				this.setState({
 					user_id: body.userData.user_id,
 					passwordOriginal :body.userData.password,
		            firstname: body.userData.firstname,
		            lastname: body.userData.lastname,
		            contactno: body.userData.contactno,
				 	username: body.userData.username,
		            user_type: body.userData.user_type,
		            email:body.userData.email,
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

 	/*renderRedirect = () =>{
 		if(this.state.redirect === 'unauthorized'){
 			return <Redirect to = {{pathname: '/unauthorized'}}>
 		}
 	}*/

 	editInfo(e){
 		fetch('http://localhost:3001/edit-profile',{
 			method: 'POST',
 			headers: {
 				'Accept': 'application/json',
 				'Content-Type': 'application/json'
 			},
 			body: JSON.stringify({
 				"user_id": this.state.user_id,
 				"username": this.state.username,
 				"password": this.state.passwordNew,
 				"password2": this.state.passwordNew2,
 				"passwordOriginal": this.state.passwordOriginal,
 				"passwordOld": this.state.passwordOld,
 				"email": this.state.email,
 				"firstname":this.state.firstname,
 				"lastname": this.state.lastname,
 				"contactno": this.state.contactno
 			})
 		})
 		.then(function(res){
 			return res.json()})
 		.then((body)=>{
 			this.setState({
 				info_display_visibility: true,
		        edit_info_visibility: false,
		        edit_button_visibility: true,
		        edit_status: 'Edit successful!',
		        edited: true
 			})
 			// this.props.handlePostsEdit()
 		})
 		
 	}

	handleUsername(e){
		this.setState({
			username: e.target.value,
		})
	}

	handlePasswordOld(e){
		this.setState({
			passwordOld: e.target.value,
		})
	}
	handlePasswordNew(e){
		this.setState({
			passwordNew: e.target.value,
		})
	}
	handlePasswordNew2(e){
		this.setState({
			passwordNew2: e.target.value,
		})
	}
	handleEmail(e){
		this.setState({
			email: e.target.value,
		})
	}
	handleFirstname(e){
		this.setState({
			firstname: e.target.value,
		})
	}
	handleLastname(e){
		this.setState({
			lastname: e.target.value,
		})
	}
	handleContactno(e){
		this.setState({
			contactno: e.target.value,
		})
	}

render() {
    const {user_id, username, 
    	passwordOld, 
    	// passwordNew, 
    	// passwordNew2, 
    	email, 
    	firstname, 
    	lastname, 
    	contactno, 
    	// info_display_visibility, 
    	// edit_info_visibility, 
    	// edit_button_visibility, 
    	// edited, 
    	// isLoggedIn
    } = this.state
    return (
		<div className="edit-body">
		<div className ="edit-forms-div">
		<form>
			<div>
			  <h5 className="editHead">User ID: {user_id}</h5>
			  <h5 className="editHead">Username: {username} </h5>
			</div>
	          <input className="editinput" type="text"value={username} placeholder={this.username} name="username" onChange={this.handleUsername} noValidate /><br />
	          <input className="editinput" type="password" value={passwordOld} placeholder={"Old Password"} name="passwordOld" onChange={this.handlePasswordOld} noValidate /><br />
	          <input className="editinput" type="password" placeholder={"New Password"} name="passwordNew" onChange={this.handlePasswordNew} /><br />
	          <input className="editinput" type="password" placeholder={"Repeat Password"} name="passwordNew2" onChange={this.handlePasswordNew2} /><br />
	          <input className="editinput" type="email" value={email} placeholder={this.email} name="email" onChange={this.handleEmail} noValidate /><br />
	          <input className="editinput" type="text" value={firstname} name="firstname" placeholder={this.firstname} onChange={this.handleFirstname} noValidate /><br />
	          <input className="editinput" type="text" value={lastname} name="lastname" placeholder={this.lastname} onChange={this.handleLastname} noValidate /><br />
	          <input className="editinput" type="text" value={contactno} name="contactno" placeholder={this.contactno} onChange={this.handleContactno} noValidate /><br />  
		</form>
		<div className="toEditButton">
	    	<button className= "login-submitbutton" onClick={this.editInfo}>Submit</button>
	    </div><br/>
		</div>
		</div>
    );
  }
}
export default UserEdit;