import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Header from "./Header";
const Landing = () => <h2>Landing</h2>;
const Dashboard = () => <h2>Dashboard</h2>;
const ServeyNew = () => <h2>ServeyNew</h2>;

const App = () => {
  return (
    <BrowserRouter>
      <div className="container">
        <Header />
        <Route exact path="/" component={Landing} />
        <Route exact path="/serveys" component={Dashboard} />
        <Route path="/serveys/new" component={ServeyNew} />
      </div>
    </BrowserRouter>
  );
};

export default App;
