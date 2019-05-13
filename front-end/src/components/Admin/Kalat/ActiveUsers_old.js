import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ActiveUsers extends Component {

  constructor(props) {
   
    super(props)
    this.state = {
      user_id: this.props.user_id || 100,
      username: this.props.username || '',
      user_type: this.props.user_type || 1,
      active_users: [],
      search_keyword: '',
      search_result: [], 
      clearResultButtonVisibility: false
    }
    this.handleSearchKeywordChange = this.handleSearchKeywordChange.bind(this)
    this.searchUser = this.searchUser.bind(this)
    this.clearResult = this.clearResult.bind(this)

    fetch('http://localhost:3001/get-active-users')
    .then((response) => {return response.json() })
    .then((body) => {
      if(body.statusCode === 200){
        this.setState({ 
          active_users: body.active_users,
          search_result: body.active_users
        })
      }
    })
  }

  handleSearchKeywordChange(e){
    this.setState({
      search_keyword: e.target.value
    })
  }

  searchUser(){
    fetch('http://localhost:3001/find-active-user-by-username/'+ this.state.search_keyword)
    .then((response) => {return response.json() })
    .then((body) => {
      if(body.statusCode === 200){
        this.setState({ 
          search_result: body.user,
          clearResultButtonVisibility: true
        })
      }
    })
  }

  clearResult(e){
    this.setState({
      search_result: this.state.active_users,
      clearResultButtonVisibility: false
    })
  }

  render() {
    return (
      <div>
        <h3>Active Users</h3>
        <div>
          <input type='text' placeholder='search username' onChange={this.handleSearchKeywordChange}/>
          <button type='submit' onClick={this.searchUser}>Search</button> <br />
          {this.state.clearResultButtonVisibility && <button type='submit' onClick={this.clearResult}>clear result</button>}
        </div>
        <div>
          <ul> 
            {this.state.search_result.map((user) => {
              return <li key={user.user_id}>
                <b>User ID: {user.user_id}</b> -- 
                <Link to={{pathname: `/user/${user.user_id}`, 
                state: { 
                  user_id: user.user_id, 
                  admin_id: this.state.user_id
                } }}>
                {user.username}
                </Link>
                 -- {user.firstname} {user.lastname}
              </li>
            })} 
          </ul>
        </div>
      </div>
    );
  }
}

export default ActiveUsers;