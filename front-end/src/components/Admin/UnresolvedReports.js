import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './css/AdminStyle.css';

class UnresolvedReports extends Component {

  constructor(props) {
    super(props) 
    this.state = {
      user_id: 100 || this.props.user_id,
      username: '' || this.props.username,
      user_type: 1 || this.props.user_type,
      unresolvedReports: [],
      report_categories: [],
      filter_by: ''
    }
    this.handleFilterKeyChange = this.handleFilterKeyChange.bind(this)

    fetch('http://localhost:3001/view-reports')
    .then((response) => {return response.json() })
    .then((body) => {
      console.log('done serving report lists')
      let categories_obj = body.categories
      let categories_arr = []
      categories_obj.forEach(function(cat) {
        categories_arr.push(cat.report_category);
      })
      this.setState({ 
        unresolvedReports: body.unresolved,
        report_categories: categories_arr
      })  
      console.log('done w api call')
      console.log(this.state.report_categories)
    })
  }

  handleFilterKeyChange(e){
    this.setState({
      filter_by: e.target.value
    })
  }

  render() {
    var filter = []
    if (this.state.filter_by.length !== 0)
      filter = [this.state.filter_by]
    else
      //filter = ['Closed', 'Changed Location', 'Complaint', 'Others']
      filter = this.state.report_categories
    return (
      <div>
        <div className="reportDiv">
          <button className="reportButton" type="submit" value='' onClick={this.handleFilterKeyChange}>View All</button>
          {this.state.report_categories.map((category) => {
              return(
                <button className="reportButton" type="submit" value={category} onClick={this.handleFilterKeyChange}>{category}</button>
              )
            })
          }
        </div>
        {/*
          <div className="reportDiv">
          <button className="reportButton" type="submit" value='' onClick={this.handleFilterKeyChange}>View All</button>
          <button className="reportButton" type="submit" value='Changed Location' onClick={this.handleFilterKeyChange}>Change Location</button>
          <button className="reportButton" type="submit" value='Closed' onClick={this.handleFilterKeyChange}>Closed</button>
          <button className="reportButton" type="submit" value='Complaint' onClick={this.handleFilterKeyChange}>Complaint</button>
          <button className="reportButton" type="submit" value='Others' onClick={this.handleFilterKeyChange}>Others</button>
        </div>
        */}
       
        <div className="tableDiv">
        <table className="summaryTable">
          <th>ID</th>
          <th>Category</th>
          <th>Details</th>

            {this.state.unresolvedReports.map((report) => {
              if (filter.includes(report.report_category)){
                return (<tr key={report.report_id}>
                  <td><Link to={{pathname: `/report/${report.report_id}`, 
                    state: { 
                      user_id: this.state.user_id, 
                      username: this.state.username,
                      user_type: this.state.user_type,
                      report_id: report.report_id
                    } }}>
                    {report.report_id}
                    </Link>
                  </td>
                  <td>
                    {report.report_category}
                  </td>

                  <td>
                    {report.report_details}
                  </td>
                </tr>)
              } else {return null}
            })} 
            
        </table>
        </div>
      </div>
    );
  }
}

export default UnresolvedReports;