import React from "react";
import SimpleRecipe from "./../components/simpleRecipe";
import recipesList from "./../data/recipes.json";
import { Link } from "react-router-dom";

class recipePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.match.params.id
        };
    }

    render() {
        return (
            <div>
                <SimpleRecipe id={this.state.id} />
            </div>
        );
    }
}

export default recipePage;
