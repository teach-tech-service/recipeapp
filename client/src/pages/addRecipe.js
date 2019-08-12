import React from "react";
import { withStyles } from "@material-ui/styles";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";

const styles = style => ({
    container: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        "& > input": {
            margin: "10px 0 "
        }
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
    },
    lists: {
        width: "100%",
        textAlign: "center",
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr",
        alignContent: "center",
        justifyContent: "center"
    },
    listItem: {
        "& button": {
            backgroundColor: "#ffd71d",
            border: "none",
            padding: "10px 30px",
            margin: "15px 0 0 0",
            cursor: "pointer"
        },
        "& label": {
            padding: "15px 0"
        }
    },
    formItem: {
        borderBottom: "2px solid #ffd71d",
        padding: "15px 0"
    },
    sendBtn: {
        backgroundColor: "#ffd71d",
        border: "none",
        fontSize: "24px",
        padding: "10px 30px",
        margin: "15px 0 0 0",
        boxShadow: "1px 1px 2px black"
    },
    textInputform: {
        display: "flex",
        flexDirection: "column"
    },
    textField: {
        margin: "0"
    },
    formControl: {
        minWidth: 140
    },
    label: {
        fontSize: "14px"
    },
    error: {
        color: "red",
        fontSize: "10px",
        padding: "5px 0 30px 0",
        margin: 0
    }
});

class addRecipe extends React.Component {
    state = {
        name: "",
        description: "",
        difficulty: "",
        time: "",
        author: "",
        heroImage: "",
        ingredients: [],
        ingredientsHelper: [],
        steps: [],
        stepsHelper: [],
        allergens: [],
        allergensHelper: [],
        cuisine: "",
        errors: ["", "", "", "", ""]
    };
    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    selectDifficulty = e => {
        this.setState({
            difficulty: e.target.value
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
        let errorsList = ["", "", "", "", ""];
        let i = 0;
        if (recipe.name === "") {
            errorsList[0] = "To pole nie może być puste!";
            i++;
        }
        if (recipe.author === "") {
            errorsList[1] = "To pole nie może być puste!";
            i++;
        }
        if (recipe.cuisine === "") {
            errorsList[2] = "To pole nie może być puste!";
            i++;
        }
        if (recipe.time === "") {
            errorsList[3] = "To pole nie może być puste!";
            i++;
        }
        if (recipe.difficulty === "") {
            errorsList[4] = "To pole nie może być puste!";
            i++;
        }
        console.log(errorsList);
        if (i > 0) {
            this.setState({
                errors: errorsList
            });
            return;
        }
        this.setState({
            errors: errorsList
        });

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
                <form
                    noValidate
                    autoComplete="off"
                    className={classes.textInputform}
                >
                    <TextField
                        required
                        id="standard-name"
                        label="Nazwa portawy"
                        name="name"
                        className={classes.textField}
                        onChange={this.handleChange}
                        margin="normal"
                    />
                    <p className={classes.error}>{this.state.errors[0]}</p>

                    <TextareaAutosize
                        aria-label="minimum height"
                        onChange={this.desChange}
                        name="description"
                        rows={3}
                        placeholder="Opis potrawy"
                    />

                    <TextField
                        required
                        id="standard-author"
                        label="Autor"
                        name="author"
                        className={classes.textField}
                        onChange={this.handleChange}
                        margin="normal"
                    />
                    <p className={classes.error}>{this.state.errors[1]}</p>

                    <TextField
                        required
                        id="standard-cuisine"
                        label="Kuchnia"
                        name="cuisine"
                        className={classes.textField}
                        onChange={this.handleChange}
                        margin="normal"
                    />
                    <p className={classes.error}>{this.state.errors[2]}</p>

                    <TextField
                        required
                        id="standard-time"
                        label="Czas przyrządzenia"
                        name="time"
                        className={classes.textField}
                        onChange={this.handleChange}
                        margin="normal"
                    />
                    <p className={classes.error}>{this.state.errors[3]}</p>
                </form>
                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="age-simple" className={classes.label}>
                        Poziom trudności
                    </InputLabel>
                    <Select
                        onChange={this.selectDifficulty}
                        inputProps={{
                            name: "age",
                            id: "age-simple"
                        }}
                        value={this.state.difficulty}
                    >
                        <MenuItem value="" />
                        <MenuItem value="easy">łatwy</MenuItem>
                        <MenuItem value="medium">średni</MenuItem>
                        <MenuItem value="hard">trudny</MenuItem>
                    </Select>
                </FormControl>
                <p className={classes.error}>{this.state.errors[4]}</p>
                <div className={classes.lists}>
                    <div className={classes.listItem}>
                        <h1>Lista produktów</h1>
                        <form
                            onSubmit={this.setIngredients}
                            className={classes.form}
                        >
                            <button onClick={this.ingredientsNumber}>
                                Dodaj pole
                            </button>
                            {this.state.ingredientsHelper.length > 0
                                ? this.state.ingredientsHelper.map(
                                      (item, index) => {
                                          return (
                                              <div className={classes.formItem}>
                                                  {`${index + 1} produkt `}
                                                  <label>
                                                      <br />
                                                      Nazwa
                                                  </label>
                                                  <input
                                                      name={`nazwa ${index}`}
                                                  />
                                                  <label>Opis</label>
                                                  <input
                                                      name={`ilosc ${index}`}
                                                  />
                                              </div>
                                          );
                                      }
                                  )
                                : null}
                            {this.state.ingredientsHelper.length > 0 ? (
                                <button value="zatwierdź">zatwierdź</button>
                            ) : null}
                        </form>
                    </div>
                    <div className={classes.listItem}>
                        <form onSubmit={this.setSteps} className={classes.form}>
                            <h1>Lista kroków</h1>
                            <button onClick={this.stepsNumber}>
                                Dodaj pole
                            </button>
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
                    </div>
                    <div className={classes.listItem}>
                        <form
                            onSubmit={this.setAllergens}
                            className={classes.form}
                        >
                            <h1>Lista alergenów</h1>
                            <button onClick={this.allergensNumber}>
                                Dodaj pole
                            </button>
                            {this.state.allergensHelper.length > 0
                                ? this.state.allergensHelper.map(
                                      (item, index) => {
                                          return (
                                              <div className={classes.formItem}>
                                                  {`${index + 1} allergen`}
                                                  <input
                                                      name={`allergen ${index}`}
                                                  />
                                              </div>
                                          );
                                      }
                                  )
                                : null}
                            {this.state.allergensHelper.length > 0 ? (
                                <button value="zatwierdź">zatwierdź</button>
                            ) : null}
                        </form>
                    </div>
                </div>
                <button onClick={this.sendRecipe} className={classes.sendBtn}>
                    Wyślij przepis!
                </button>
            </div>
        );
    }
}

export default withStyles(styles)(addRecipe);
