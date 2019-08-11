import React from "react";
import { withStyles } from "@material-ui/styles";
import axios from "axios";

const styles = style => ({
    container: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    },
    form: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        "& input": {
            margin: "10px 0",
            width: "100%"
        }
    }
});

class addRecipe extends React.Component {
    state = {
        name: "",
        description: "",
        difficulty: "",
        time: "",
        author: "admin",
        heroImage: "",
        ingredients: [],
        ingredientsHelper: [],
        steps: [],
        stepsHelper: [],
        allergens: [],
        allergensHelper: [],
        cuisine: ""
    };

    nameChange = e => {
        this.setState({
            name: e.target.value
        });
    };

    desChange = e => {
        this.setState({
            description: e.target.value
        });
    };

    authorChange = e => {
        this.setState({
            author: e.target.value
        });
    };

    cuisineChange = e => {
        this.setState({
            cuisine: e.target.value
        });
    };

    timeChange = e => {
        this.setState({
            time: e.target.value
        });
    };

    selectDifficulty = e => {
        this.setState({
            difficulty: e.target.value
        });
    };

    ingredientsNumber = e => {
        e.preventDefault();
        this.setState({
            ingredientsHelper: [...this.state.ingredientsHelper, ""]
        });
    };
    stepsNumber = e => {
        e.preventDefault();
        this.setState({
            stepsHelper: [...this.state.stepsHelper, ""]
        });
    };
    allergensNumber = e => {
        e.preventDefault();
        this.setState({
            allergensHelper: [...this.state.allergensHelper, ""]
        });
    };

    setIngredients = e => {
        e.preventDefault();
        let item = [];
        for (let i = 1; i <= this.state.ingredientsHelper.length * 2; i += 2) {
            item.push({
                name: e.target[i].value,
                value: e.target[i + 1].value
            });
        }
        console.log(item);
        this.setState({
            ingredients: item
        });
    };
    setSteps = e => {
        e.preventDefault();
        let item = [];
        for (let i = 1; i <= this.state.stepsHelper.length; i++) {
            item.push({
                number: i,
                description: e.target[i].value
            });
        }
        console.log(item);
        this.setState({
            steps: item
        });
    };

    setAllergens = e => {
        e.preventDefault();
        let item = [];
        for (let i = 1; i <= this.state.allergensHelper.length; i++) {
            item.push({
                number: i,
                description: e.target[i].value
            });
        }
        console.log(item);
        this.setState({
            allergens: item
        });
    };

    sendRecipe = () => {
        let recipe = {
            name: this.state.name,
            description: this.state.description,
            difficulty: this.state.difficulty,
            time: this.state.time,
            author: this.state.author,
            heroImage: "1.jpeg",
            ingredients: this.state.ingredients,
            steps: this.state.steps,
            allergens: this.state.allergens,
            cuisine: this.state.cuisine
        };
        console.log(recipe);

        axios
            .post("http://localhost:5000/api/recipe", { recipe })
            .then(res => {
                console.log(res);
                console.log(res.data);
            })
            .catch(error => {
                console.log(error);
            });
    };
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.container}>
                Nazwa potrawy
                <input name="name" onChange={this.nameChange} />
                Opis potrawy
                <textarea
                    name="description"
                    type="textarea"
                    onChange={this.desChange}
                />
                Autor
                <input name="author" onChange={this.authorChange} />
                Kuchnia
                <input name="cuisine" onChange={this.cuisineChange} />
                Czas przyrządzenia
                <input name="time" onChange={this.timeChange} />
                Poziom trudności
                <select onChange={this.selectDifficulty}>
                    <option value="" />
                    <option value="easy">easy</option>
                    <option value="medium">medium</option>
                    <option value="hard">hard</option>
                </select>
                <h1>Lista produktów</h1>
                <form onSubmit={this.setIngredients} className={classes.form}>
                    <button onClick={this.ingredientsNumber}>Dodaj pole</button>
                    {this.state.ingredientsHelper.length > 0
                        ? this.state.ingredientsHelper.map((item, index) => {
                              return (
                                  <div className={classes.formItem}>
                                      {`${index + 1} produkt `}
                                      <label>
                                          <br />
                                          Nazwa
                                      </label>
                                      <input name={`nazwa ${index}`} />
                                      <label>Opis</label>
                                      <input name={`ilosc ${index}`} />
                                  </div>
                              );
                          })
                        : null}
                    {this.state.ingredientsHelper.length > 0 ? (
                        <button value="zatwierdź">zatwierdź</button>
                    ) : null}
                </form>
                <form onSubmit={this.setSteps} className={classes.form}>
                    <h1>Lista kroków</h1>
                    <button onClick={this.stepsNumber}>Dodaj pole</button>
                    {this.state.stepsHelper.length > 0
                        ? this.state.stepsHelper.map((item, index) => {
                              return (
                                  <div className={classes.formItem}>
                                      {`${index + 1} krok`}
                                      <input name={`krok ${index}`} />
                                  </div>
                              );
                          })
                        : null}
                    {this.state.stepsHelper.length > 0 ? (
                        <button value="zatwierdź">zatwierdź</button>
                    ) : null}
                </form>
                <form onSubmit={this.setAllergens} className={classes.form}>
                    <h1>Lista alergenów</h1>
                    <button onClick={this.allergensNumber}>Dodaj pole</button>
                    {this.state.allergensHelper.length > 0
                        ? this.state.allergensHelper.map((item, index) => {
                              return (
                                  <div className={classes.formItem}>
                                      {`${index + 1} allergen`}
                                      <input name={`allergen ${index}`} />
                                  </div>
                              );
                          })
                        : null}
                    {this.state.allergensHelper.length > 0 ? (
                        <button value="zatwierdź">zatwierdź</button>
                    ) : null}
                </form>
                <button onClick={this.sendRecipe}>Wyślij przepis!</button>
            </div>
        );
    }
}

export default withStyles(styles)(addRecipe);
