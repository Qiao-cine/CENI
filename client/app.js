import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './views/home/home';
import performanceStatus from './views/performance-status/performance-status';
import NavBar from './components/navbar/navbar';
import './app.scss'
import 'bootstrap/dist/css/bootstrap.min.css'

class App extends Component {
  render() {
    return (
      <Router>
        <div class="root">
          <NavBar />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/performance-status' component={performanceStatus} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;