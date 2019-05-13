import React, { Component } from 'react';
import 'circular-std';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import SignUp from './components/SignUp.js'
import Home from './components/Home';
import Landing from './components/Landing';
import Search from './components/Search';
import Randomizer from './components/Randomizer.js'
import Restaurant from './components/Restaurant';
import Ratedmore from './components/Regular/Ratedmore.js'
import Likedmore from './components/Regular/Likedmore.js'
import Report from './components/Admin/Report';
import UserAdminView from './components/Admin/User';
import Unauthorized from './components/Unauthorized';
// import InsufficientPermissions from './components/InsufficientPermissions';
import Upload from './components/Upload'
// import UserEdit from './components/UserEdit.js';
import User from './components/UserProfile.js';

import 'bootstrap/dist/css/bootstrap.css';

class App extends Component {

  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <Route exact={true} path="/" component={Landing} />
            <Route exact={true} path="/signup" component={SignUp} />
            <Route exact={true} path="/home" component={Home} />
            <Route exact={true} path="/search" component={Search} />
            <Route exact={true} path="/randomizer" component={Randomizer} />
            <Route exact={true} path="/restaurant/:shop_id" component={Restaurant} />
            <Route exact={true} path="/ratedmore" component={Ratedmore} />
            <Route exact={true} path="/likedmore" component={Likedmore} />
            <Route exact={true} path="/report/:report_id" component={Report} />
            <Route exact={true} path="/upload" component={Upload} />
            <Route exact={true} path="/unauthorized" component={Unauthorized} />
            { /* <Route exact={true} path="/insufficient-permissions" component={InsufficientPermissions}/ > */}
            { /*<Route exact={true} path="/user-edit" component={UserEdit}/> */}
            <Route exact={true} path="/profile/:user_id" component={User} />
            <Route exact={true} path="/user/:user_id" component={UserAdminView} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
