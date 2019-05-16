import React, { Component } from 'react';

class CommentsAdminPage extends Component {

  constructor(props) {
   
    super(props)
    this.state = {
      user_id: this.props.user_id || 100,
      username: this.props.username || '',
      user_type: this.props.user_type || 1,
      comments: [],
      search_keyword: '',
      search_results: []
    }
    // this.handleSearchKeywordChange = this.handleSearchKeywordChange.bind(this)
    // this.searchComments = this.searchComments.bind(this)

    fetch('http://localhost:3001/get-all-comments')
      .then((response) => {return response.json() })
      .then((body) => {
        if(body.statusCode === 200){
          this.setState({ 
            search_results: body.comments
          })  
        }
      })
  }

  render() {
    return (
     <div className="commentBody">
      <div className="tableDiv">
      <table className="summaryTable">

        <th>Comment ID</th>
        <th>Restaurant ID</th>
        <th>User ID</th>
        <th>Comment Content</th>

         {this.state.search_results.map((comment) => {
             return (
              <tr key={comment.comment_id}>

                <td>
                  {comment.comment_id}
                </td>

                <td>
                  {comment.restaurant_id}
                </td>

                <td>
                  {comment.user_id}
                </td>

                <td>
                  {comment.comment_content}
                </td>

              </tr>
            )
          })} 


      </table>
     </div>
     </div>
    );
  }
}

export default CommentsAdminPage;