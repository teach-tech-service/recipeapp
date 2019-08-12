import React from "react";
import Recipe from "./../components/Recipe";
import plusIcon from "./../icons/add.svg";
import Pagination from "react-js-pagination";
import axios from "axios";
import { Link } from "react-router-dom";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";

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
    },
    addLink: {
        textDecoration: "none",
        color: "black",

        "& img": {
            width: "40px",
            backgroundColor: "#ffd71d",
            padding: "15px",
            borderRadius: "50%"
        }
    },
    search: {
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column"
    },
    searchForm: {
        width: "60%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",

        "& input": {
            width: "100%",
            fontSize: "2rem",
            padding: "10px"
        },
        "& button": {
            backgroundColor: "#ffd71d",
            border: "none",
            height: "100%",
            fontSize: "2rem",
            padding: "0 40px"
        }
    },
    selectFormContainer: {
        textAlign: "center"
    },
    selectForm: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column"
    },
    formControl: {
        minWidth: 120,
        padding: "0 0 30px 0"
    }
});

class Index extends React.Component {
    state = {
        id: 0,
        recipesNumber: null,
        activePage: 1,
        data: [],
        difficulty: "",
        name: "",
        cuisine: "",
        cuisines: [],
        allergen: "",
        allergens: []
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
                return axios
                    .get(`http://localhost:5000/api/recipe/info`)
                    .then(res => {
                        this.setState({
                            cuisines: res.data.cuisine,
                            allergens: res.data.allergens
                        });
                        console.log(res.data);
                    })
                    .catch(error => {
                        console.log(error);
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
                    }&difficulty=${this.state.difficulty}&cuisine=${
                        this.state.cuisine
                    }&allergens=${this.state.allergen}&page=${pageNumber}`
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
                }&cuisine=${this.state.cuisine}&allergens=${
                    this.state.allergen
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
                    }&cuisine=${this.state.cuisine}&allergens=${
                        this.state.allergen
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

    optionsCuisine = e => {
        this.setState(
            {
                cuisine: e.target.value
            },
            () => {
                axios
                    .get(
                        `http://localhost:5000/api/search?term=${
                            this.state.name
                        }&difficulty=${this.state.difficulty}&page=${
                            this.state.activePage
                        }&cuisine=${this.state.cuisine}&allergens=${
                            this.state.allergen
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
            }
        );
    };

    optionsAllergen = e => {
        this.setState(
            {
                allergen: e.target.value
            },
            () => {
                axios
                    .get(
                        `http://localhost:5000/api/search?term=${
                            this.state.name
                        }&difficulty=${this.state.difficulty}&page=${
                            this.state.activePage
                        }&cuisine=${this.state.cuisine}&allergens=${
                            this.state.allergen
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
            }
        );
    };

    resetfilters = e => {
        e.preventDefault();
        this.setState(
            {
                difficulty: "",
                name: "",
                cuisine: "",
                recipesNumber: null,
                activePage: 1,
                allergen: ""
            },
            () => {
                axios
                    .get(
                        `http://localhost:5000/api/search?term=${
                            this.state.name
                        }&difficulty=${this.state.difficulty}&page=${
                            this.state.activePage
                        }&cuisine=${this.state.cuisine}&allergens=${
                            this.state.allergen
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
            }
        );
    };

    render() {
        const { classes } = this.props;
        console.log(this.state.data);

        return (
            <div className={classes.container}>
                <div>
                    <Link to="/add/" className={classes.addLink}>
                        <img src={plusIcon} alt="plus icon" />
                    </Link>
                </div>
                <div className={classes.search}>
                    <h1>Wyszukiwarka przepisów</h1>
                    <form onSubmit={this.search} className={classes.searchForm}>
                        <input type="text" placeholder="Na co masz ochotę?" />
                        <button type="submit">Szukaj!</button>
                    </form>
                </div>
                <div className={classes.content}>
                    <div className={classes.filter}>
                        <h1>Filtry</h1>
                        <h2>Trudność</h2>
                        <form
                            className={classes.formFilter}
                            onChange={this.difficultySelect}
                        >
                            <label>
                                <input type="radio" name="diff" value="easy" />
                                Łatwy
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="diff"
                                    value="medium"
                                />
                                <span className={classes.checkmark} />
                                Średni
                            </label>
                            <label>
                                <input type="radio" name="diff" value="hard" />
                                <span className={classes.checkmark} />
                                Trudny
                            </label>
                        </form>
                        <div className={classes.selectFormContainer}>
                            <h2>Wybór kuchni</h2>
                            <form
                                className={classes.selectForm}
                                autoComplete="off"
                            >
                                <FormControl className={classes.formControl}>
                                    <InputLabel htmlFor="age-simple">
                                        Kuchnia
                                    </InputLabel>
                                    <Select
                                        onChange={this.optionsCuisine}
                                        inputProps={{
                                            name: "age",
                                            id: "age-simple"
                                        }}
                                        value={this.state.cuisine}
                                    >
                                        <MenuItem value="" />
                                        {this.state.cuisines.length > 0
                                            ? this.state.cuisines.map(item => {
                                                  return (
                                                      <MenuItem
                                                          value={item.name}
                                                          primaryText="reasa"
                                                      >
                                                          {item.name}
                                                      </MenuItem>
                                                  );
                                              })
                                            : null}
                                    </Select>
                                </FormControl>
                                <h2>Wybór allergenów</h2>
                                <FormControl className={classes.formControl}>
                                    <InputLabel htmlFor="age-simple">
                                        Allergen
                                    </InputLabel>
                                    <Select
                                        onChange={this.optionsAllergen}
                                        inputProps={{
                                            name: "age",
                                            id: "age-simple"
                                        }}
                                        value={this.state.allergen}
                                    >
                                        <MenuItem value="" />
                                        {this.state.allergens.length > 0
                                            ? this.state.allergens.map(item => {
                                                  return (
                                                      <MenuItem
                                                          value={item.name}
                                                          primaryText="reasa"
                                                      >
                                                          {item.name}
                                                      </MenuItem>
                                                  );
                                              })
                                            : null}
                                    </Select>
                                </FormControl>
                                <Button
                                    variant="contained"
                                    className={classes.button}
                                    onClick={this.resetfilters}
                                    color="primary"
                                >
                                    Wyczyść filtry
                                </Button>
                            </form>
                        </div>
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
                ); })}
            </div>
        );
    }
}

export default withStyles(styles)(Index);
