import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
// import { Link } from 'react-router-dom';

class Report extends Component {
  constructor(props){
    super(props)
    this.state = {
      user_id: this.props.location.state.user_id,
      restaurant_id: this.props.location.state.restaurant_id,
      username: this.props.location.state.username,
      user_type: this.props.location.state.user_type,
      report_id: this.props.location.state.report_id,
      isLoggedIn: true, 
      report_category: '',
      report_details: '',
      created_at: '',
      is_resolved: 0,
      is_checked: 0,
      reported_by: '',
      rerender: false,
      is_updated: false,
      redirect:false
    }
    this.toggleCheckBoxValue = this.toggleCheckBoxValue.bind(this)
    this.setStatusToResolved = this.setStatusToResolved.bind(this)
    this.handleRedirect = this.handleRedirect.bind(this)
   this.renderRedirect = this.renderRedirect.bind(this)

    fetch('http://localhost:3001/report/'+ this.state.report_id)
      .then((response) => {return response.json() })
      .then((body) => {
        this.setState({ 
          report_category: body.report_info[0].report_category,
          report_details: body.report_info[0].report_details,
          created_at: body.report_info[0].created_at,
          reported_by: body.report_info[0].reported_by,
          resolved_by: body.report_info[0].resolved_by,
          is_resolved: body.report_info[0].is_resolved,
        })
      })
  }

  toggleCheckBoxValue(){
    if(this.state.is_checked === 0)
      this.setState({ is_checked: 1 })
    else
      this.setState({ is_checked: 0 })
  }

  handleRedirect(){
    this.setState({
      redirect:true
    })

  }

  renderRedirect(){
     if (this.state.redirect){
      return <Redirect to={{
        pathname: '/home'}}
      />
    }
  }

  componentWillMount(){
    fetch("http://localhost:3001/check-session")
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
          if(this.state.user_type === 0){
              this.setState({
                redirect: 'insufficient-permissions' 
              })
          }
        console.log(body.userData)
        }else{
          this.setState({
              redirect: 'unauthorized' 
          })
        }
    }) 
    }



  setStatusToResolved(){
    if(this.state.is_resolved === this.state.is_checked)
      alert('Nothing to update')
    else{
      console.log('resolve report api call')
      console.log('user_id:')
      console.log(this.state.user_id)
      fetch('http://localhost:3001/resolve-report', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            "report_id": this.state.report_id,
            "resolved_by": this.state.user_id
          })
      })
      .then(function(response){
        return response.json()})
      .then((body) => {
        this.setState({
          is_updated: true,
          redirect:true
        })
      }) 
    }
    
  }

  render() {
    return (
      <div className="reportBg">
      {this.renderRedirect()}

        <strong>ID:</strong> {this.state.report_id} <br />
        <strong>Category:</strong> {this.state.report_category} <br />
        <strong>Restaurant: </strong> no restuarant name or id column in db <br />
        <strong>Details:</strong> {this.state.report_details} <br />
        <strong>Created at:</strong> {this.state.created_at} <br />
        <strong>Reported by:</strong> 
        UserID:{this.state.reported_by} <br />
        <strong>Status:</strong>  {this.state.is_resolved ? 'Resolved' : 'Pending'} 
        { this.state.is_resolved ? null :
          <div>
            Change status:
            <label for="somebox"> Resolved </label>
            <input type="checkbox"  id="somebox" onChange={this.toggleCheckBoxValue} />
            <button onClick={this.setStatusToResolved}>Update</button>
            <button onClick={this.handleRedirect}>Return</button>
          </div>
        }
        <br />
        { this.state.is_updated ? 'Update successful' : null }
        
      </div>
    )
  }
}

export default Report;
