import React from "react";
import Index from "./pages/main";
import recipePage from "./pages/recipePage";
import Stats from "./pages/stats";
import addRecipe from "./pages/addRecipe";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

export default class App extends React.Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path={"/"} component={Index} />
                    <Route path={"/add/"} component={addRecipe} />
                    <Route path={"/:id"} component={recipePage} />

                    <Route path={"/stats/"} component={Stats} />
                </Switch>
            </Router>
        );
    }
}
