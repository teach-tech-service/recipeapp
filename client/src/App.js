import React from "react";
import Index from "./pages/main";
import recipePage from "./pages/recipePage";
import Stats from "./pages/stats";
import addRecipe from "./pages/addRecipe";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navigation from "./components/Navigation";

export default class App extends React.Component {
  render() {
    return (
      <Router>
        <Navigation />
        <Switch>
          <Route exact path={"/"} component={Index} />
          <Route path={"/add/"} component={addRecipe} />
          <Route path={"/stats/"} component={Stats} />
          <Route path={"/:id"} component={recipePage} />
        </Switch>
      </Router>
    );
  }
}
