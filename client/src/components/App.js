import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

const Header = () => <h2>Header</h2>;
const Landing = () => <h2>Landing</h2>;
const Dashboard = () => <h2>Dashboard</h2>;
const ServeyNew = () => <h2>ServeyNew</h2>;

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <Header />
        <Route exact path="/" component={Landing} />
        <Route exact path="/serveys" component={Dashboard} />
        <Route path="/serveys/new" component={ServeyNew} />
      </div>
    </BrowserRouter>
  );
};

export default App;
