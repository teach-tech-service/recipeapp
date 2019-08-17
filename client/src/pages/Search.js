import React from "react";
import Recipes from "./../data/recipes.json";
import Recipe from "./../components/Recipe";
import Pagination from "react-js-pagination";

const search = e => {
    console.log(e.target.value);
};

export default class Search extends React.Component {
    state = {
        recipes: null,
        recipesPage: null,
        activePage: 1
    };
    search = e => {
        this.setState({
            recipes: Recipes.filter(recipe => {
                return recipe.nazwa.indexOf(e.target.value) !== -1;
            })
        });
    };

    handlePageChange = pageNumber => {
        console.log(`active page is ${pageNumber}`);
        this.setState({ activePage: pageNumber }, () => {
            this.create();
        });
    };

    create = () => {
        let table = [];
        for (
            let i = this.state.activePage * 5 - 5;
            i < this.state.activePage * 5;
            i++
        ) {
            if (i === this.state.recipes.length - 1) {
                table.push(
                    <Recipe
                        name={this.state.recipes[i].nazwa}
                        sposob={this.state.recipes[i].przyrzadzanie}
                    />
                );
                break;
            } else {
                table.push(
                    <Recipe
                        name={this.state.recipes[i].nazwa}
                        sposob={this.state.recipes[i].przyrzadzanie}
                    />
                );
            }
        }
        this.setState({
            recipesPage: table
        });
    };
    render() {
        return (
            <div className="container">
                <h1>Wyszukiwarka przepisów</h1>
                <input type="text" onChange={this.search} />
                <div className="recipes">
                    {" "}
                    {this.state.recipes === null ? (
                        <h1>Nie ma żadnych przepisów</h1>
                    ) : this.state.recipesPage === null ? null : (
                        this.state.recipesPage.map(recipe => {
                            return (
                                <Recipe
                                    name={recipe.props.name}
                                    sposob={recipe.props.sposob}
                                />
                            );
                        })
                    )}
                    <Pagination
                        activePage={this.state.activePage}
                        itemsCountPerPage={5}
                        totalItemsCount={
                            this.state.recipes === null
                                ? 0
                                : this.state.recipes.length
                        }
                        pageRangeDisplayed={5}
                        onChange={this.handlePageChange}
                    />
                </div>
            </div>
        );
    }
}
