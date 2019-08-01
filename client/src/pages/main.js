import React from "react";
import recipesList from "./../data/recipes.json";
import Recipe from "./../components/Recipe";
import Pagination from "react-js-pagination";

import { withStyles } from "@material-ui/styles";
const styles = style => ({
    recipes: {
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)"
    },
    pagination: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",

        "& li": {
            backgroundColor: "#4da6ff",
            listStyleType: "none",
            "& a": {
                color: "white",
                fontSize: "48px",
                textDecoration: "none",

                padding: "0 20px"
            },
            "& a:hover": {
                backgroundColor: "#0033cc"
            }
        }
    }
});

class Index extends React.Component {
    state = {
        id: 0,
        recipes: null,
        recipesPage: null,
        activePage: 1
    };

    componentDidMount() {
        this.setState(
            {
                recipes: recipesList
            },
            () => {
                let table = [];
                for (let i = 0; i < 5; i++) {
                    table.push(
                        <Recipe
                            name={this.state.recipes[i].name}
                            sposob={this.state.recipes[i].description}
                            difficulty={this.state.recipes[i].difficulty}
                            time={this.state.recipes[i].time}
                            id={this.state.recipes[i].id}
                        />
                    );
                }
                this.setState({
                    recipesPage: table
                });
            }
        );
    }

    change = e => {
        this.setState({
            recipes: recipesList.filter(recipe => {
                return (
                    recipe.name
                        .toUpperCase()
                        .indexOf(e.target.value.toUpperCase()) !== -1
                );
            })
        });

        let table = [];
        for (
            let i = this.state.activePage * 5 - 5;
            i < this.state.activePage * 5;
            i++
        ) {
            if (this.state.recipes.length === 0) break;
            else if (i === this.state.recipes.length - 1) {
                table.push(
                    <Recipe
                        name={this.state.recipes[i].name}
                        sposob={this.state.recipes[i].description}
                        difficulty={this.state.recipes[i].difficulty}
                        time={this.state.recipes[i].time}
                        id={this.state.recipes[i].id}
                    />
                );
                break;
            } else {
                table.push(
                    <Recipe
                        name={this.state.recipes[i].name}
                        sposob={this.state.recipes[i].description}
                        difficulty={this.state.recipes[i].difficulty}
                        time={this.state.recipes[i].time}
                        id={this.state.recipes[i].id}
                    />
                );
            }
        }
        this.setState({
            recipesPage: table
        });
    };

    pageChange = () => {
        let table = [];
        for (
            let i = this.state.activePage * 5 - 5;
            i < this.state.activePage * 5;
            i++
        ) {
            if (this.state.recipes.length === 0) break;
            else if (i === this.state.recipes.length - 1) {
                table.push(
                    <Recipe
                        name={this.state.recipes[i].name}
                        sposob={this.state.recipes[i].description}
                        difficulty={this.state.recipes[i].difficulty}
                        time={this.state.recipes[i].time}
                        id={this.state.recipes[i].id}
                    />
                );
                break;
            } else {
                table.push(
                    <Recipe
                        name={this.state.recipes[i].name}
                        sposob={this.state.recipes[i].description}
                        difficulty={this.state.recipes[i].difficulty}
                        time={this.state.recipes[i].time}
                        id={this.state.recipes[i].id}
                    />
                );
            }
        }
        this.setState({
            recipesPage: table
        });
    };

    handlePageChange = pageNumber => {
        console.log(`active page is ${pageNumber}`);
        this.setState({ activePage: pageNumber }, () => {
            this.pageChange();
        });
    };

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.container}>
                <h1>Wyszukiwarka przepisów</h1>
                <input
                    type="text"
                    onChange={this.change}
                    placeholder="wpisz nazwe przepisu"
                />
                <div className={classes.recipes}>
                    {this.state.recipes === null ? (
                        <h1>Nie ma żadnych przepisów</h1>
                    ) : this.state.recipesPage === null ? null : (
                        this.state.recipesPage.map(recipe => {
                            return (
                                <Recipe
                                    name={recipe.props.name}
                                    sposob={recipe.props.sposob}
                                    difficulty={recipe.props.difficulty}
                                    time={recipe.props.time}
                                    styles={classes}
                                    id={recipe.props.id}
                                />
                            );
                        })
                    )}
                </div>
                <Pagination
                    innerClass={classes.pagination}
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
        );
    }
}

export default withStyles(styles)(Index);
