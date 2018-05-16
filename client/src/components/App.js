import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from 'react-redux';
import * as actions from '../actions';

import Header from "./Header";
import Landing from './Landing';
import Dashboard from './Dashboard';
const ServeyNew = () => <h2>ServeyNew</h2>;

class App extends React.Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <Header />
          <Route exact path="/" component={Landing} />
          <Route exact path="/surveys" component={Dashboard} />
          <Route path="/surveys/new" component={ServeyNew} />
        </div>
      </BrowserRouter>
    );
  }
}

export default connect(null, actions)(App);
