import React from "react";
import SimpleRecipe from "../components/SimpleRecipe";
import recipesList from "./../data/recipes.json";
import { Link } from "react-router-dom";

class recipePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: props.match.params.id
        };
    }

    render() {
        return (
            <div>
                <SimpleRecipe name={this.state.name} />
            </div>
        );
    }
}

export default recipePage;
