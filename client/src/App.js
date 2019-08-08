import React from "react";
import Index from "./pages/main";
import recipePage from "./pages/recipePage";
import Stats from "./pages/stats";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

export default class App extends React.Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path={"/"} component={Index} />
                    <Route path={"/recipe/:id"} component={recipePage} />
                    <Route path={"/stats/"} component={Stats} />
                </Switch>
            </Router>
        );
    }
}
