import React, { Component } from 'react';

class Unauthorized extends Component {
  
  render() {
    return (
      <div>
        <h3>You need to log in to view the page you're trying to access.</h3>
      </div>
    );
  }
}

export default Unauthorized;
