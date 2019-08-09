import React from "react";
import Recipe from "./../components/Recipe";
import Pagination from "react-js-pagination";
import axios from "axios";

import { withStyles } from "@material-ui/styles";
const styles = style => ({
    container: {
        maxWidth: "1500px",
        margin: "0 auto"
    },
    content: {
        display: "grid",
        gridTemplateColumns: "20% 80%",
        "& h1": {
            color: "#fed717"
        }
    },
    filter: {
        padding: "0 0 0 30px"
    },
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
    },
    formFilter: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        "& label": {
            padding: "0 0 15px 0",
            "& input": {
                margin: "0 10px 0 0"
            }
        }
    }
});

class Index extends React.Component {
    state = {
        id: 0,
        recipesNumber: null,
        activePage: 1,
        data: [],
        difficulty: "",
        name: ""
    };

    componentDidMount() {
        axios
            .get(
                `http://localhost:5000/api/recipe/page/${this.state.activePage}`
            )
            .then(res => {
                this.setState({
                    data: res.data.recipes,
                    recipesNumber: res.data.numberOfRecipes
                });
            })
            .catch(error => {
                console.log(error);
            });
    }

    handlePageChange = pageNumber => {
        this.setState({ activePage: pageNumber }, () => {
            axios
                .get(
                    `http://localhost:5000/api/search?term=${
                        this.state.name
                    }&difficulty=${this.state.difficulty}&page=${pageNumber}`
                )
                .then(res => {
                    this.setState({
                        data: res.data.filteredRecipes,
                        recipesNumber: res.data.numberOfRows
                    });
                })
                .catch(error => {
                    console.log(error);
                });
        });
    };

    search = e => {
        e.preventDefault();
        this.setState({
            name: e.target[0].value
        });
        axios
            .get(
                `http://localhost:5000/api/search?term=${
                    e.target[0].value
                }&difficulty=${this.state.difficulty}&page=${
                    this.state.activePage
                }`
            )
            .then(res => {
                this.setState({
                    data: res.data.filteredRecipes,
                    recipesNumber: res.data.numberOfRows
                });
            })
            .catch(error => {
                console.log(error);
            });
    };

    optionChange = e => {
        this.setState({
            difficulty: e.target.value
        });
    };

    difficultySelect = e => {
        if (e.target.checked) {
            axios
                .get(
                    `http://localhost:5000/api/search?term=${
                        this.state.name
                    }&difficulty=${e.target.value}&page=${
                        this.state.activePage
                    }`
                )
                .then(res => {
                    this.setState({
                        data: res.data.filteredRecipes,
                        recipesNumber: res.data.numberOfRows
                    });
                })
                .catch(error => {
                    console.log(error);
                });
            this.setState({
                difficulty: e.target.value
            });
        }
    };

    render() {
        const { classes } = this.props;
        console.log(this.state.data);

        return (
            <div className={classes.container}>
                <h1>Wyszukiwarka przepisów</h1>
                <form onSubmit={this.search}>
                    <input type="text" placeholder="wpisz nazwe przepisu" />
                    <button type="submit">Szukaj!</button>
                </form>
                <div className={classes.content}>
                    <div className={classes.filter}>
                        <h1>Filtry</h1>
                        <h2>Trudność</h2>
                        <form
                            className={classes.formFilter}
                            onChange={this.difficultySelect}
                        >
                            <label>
                                <input
                                    type="checkbox"
                                    name="easy"
                                    value="easy"
                                />
                                Łatwy
                            </label>
                            <label>
                                <input
                                    type="checkbox"
                                    name="medium"
                                    value="medium"
                                />
                                <span className={classes.checkmark} />
                                Średni
                            </label>
                            <label>
                                <input
                                    type="checkbox"
                                    name="hard"
                                    value="hard"
                                />
                                <span className={classes.checkmark} />
                                Trudny
                            </label>
                        </form>
                        <h2>Czas</h2>
                        <form className={classes.formFilter}>
                            <label>
                                <input type="checkbox" name="<30" value="<30" />
                                do 30 minut
                            </label>
                            <label>
                                <input
                                    type="checkbox"
                                    name="30-60"
                                    value="30-60"
                                />
                                30-60 minut
                            </label>
                            <label>
                                <input type="checkbox" name=">60" value=">60" />
                                powyżej 60 minut
                            </label>
                        </form>
                    </div>
                    <div className={classes.recipes}>
                        {this.state.data.map(recipe => {
                            return (
                                <Recipe
                                    key={recipe.name}
                                    img={recipe.heroImage}
                                    name={recipe.name}
                                    sposob={recipe.sposob}
                                    difficulty={recipe.difficulty}
                                    time={recipe.time}
                                    styles={classes}
                                    id={recipe.id}
                                    vote={recipe.upvotes}
                                    description={recipe.description}
                                />
                            );
                        })}
                    </div>
                </div>
                <Pagination
                    innerClass={classes.pagination}
                    activePage={this.state.activePage}
                    itemsCountPerPage={10}
                    totalItemsCount={this.state.recipesNumber}
                    pageRangeDisplayed={5}
                    onChange={this.handlePageChange}
                />
            </div>
        );
    }
}

export default withStyles(styles)(Index);
