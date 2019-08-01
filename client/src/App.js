import React from "react";
import Index from "./pages/main";
import recipePage from "./pages/recipePage";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

export default class App extends React.Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path={"/"} component={Index} />
                    <Route path={"/:id"} component={recipePage} />
                </Switch>
            </Router>
        );
    }
}
