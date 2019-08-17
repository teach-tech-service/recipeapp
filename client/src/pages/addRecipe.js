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
import Grid from "@material-ui/core/Grid";
import { withRouter } from "react-router-dom";

const styles = style => ({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    "& > input": {
      margin: "10px 0 "
    },
    margin: 10
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
    "& label": {
      padding: "15px 0"
    }
  },
  formItem: {
    "& button": {
      backgroundColor: "#ffd71d",
      border: "none",
      padding: "10px 30px",
      margin: "15px 0 0 0",
      cursor: "pointer"
    },
    borderBottom: "2px solid #ffd71d",
    padding: "15px 0"
  },
  addedItem: {
    borderBottom: "2px solid #ffd71d"
  },
  sendBtn: {
    backgroundColor: "#ffd71d",
    border: "none",
    fontSize: "24px",
    padding: "10px 30px",
    margin: "2rem 0 4rem 0",
    boxShadow: "1px 1px 2px black"
  },
  textInputform: {
    display: "flex",
    flexDirection: "column"
  },
  textField: {
    margin: "0",
    padding: 2
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
    nameIng: "",
    descIng: "",
    step: "",
    allergen: "",
    errorAllergen: "",
    errorStep: "",
    errorIng: "",
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
      ...this.state,
      [e.target.name]: e.target.value
    });
    console.log(this.state.step);
  };

  selectDifficulty = e => {
    this.setState({
      ...this.state,
      difficulty: e.target.value
    });
  };

  setIngredients = e => {
    e.preventDefault();

    var items = this.state.ingredients;
    if (this.state.nameIng === "" || this.state.descIng === "") {
      this.setState({
        ...this.state,
        ingredients: items,
        nameIng: "",
        descIng: "",
        errorIng: "Te pola nie mogą być puste"
      });
    } else {
      items.push({
        name: this.state.nameIng,
        value: this.state.descIng
      });
      console.log(e.target.value);
      this.setState({
        ...this.state,
        ingredients: items,
        nameIng: "",
        descIng: "",
        errorIng: ""
      });
    }

    console.log(this.state.ingredients);
  };
  setSteps = e => {
    e.preventDefault();
    var items = this.state.steps;
    if (this.state.step !== "") {
      items.push({
        number: this.state.steps.length + 1,
        description: this.state.step
      });

      console.log(items);
      this.setState({
        ...this.state,
        steps: items,
        step: ""
      });
    } else {
      this.setState({
        ...this.state,
        steps: items,
        step: "",
        errorStep: "To pole nie może być puste"
      });
    }
  };

  setAllergens = e => {
    e.preventDefault();
    var item = this.state.allergens;
    if (this.state.allergen !== "") {
      item.push({
        number: this.state.allergens.length + 1,
        name: this.state.allergen
      });
      console.log(item);
      this.setState({
        ...this.state,
        allergens: item,
        allergen: "",
        errorAllergen: ""
      });
    } else {
      this.setState({
        ...this.state,
        allergens: item,
        allergen: "",
        errorAllergen: "To pole nie może być puste"
      });
    }
  };

  removeItems = (e, name) => {
    console.log(e, name);
    if (name === "ingredients") {
      let items = this.state.ingredients.filter((item, key) => {
        if (key !== e) {
          return item;
        }
      });
      console.log(items);

      this.setState({
        ...this.state,
        ingredients: items
      });
    } else if (name === "steps") {
      let items = this.state.steps.filter((item, key) => {
        if (key !== e) {
          return item;
        }
      });
      console.log(items);
      for (let i = 0; i < items.length; i++) {
        items[i].number = i + 1;
      }
      this.setState({
        ...this.state,
        steps: items
      });
    } else if (name === "allergen") {
      let items = this.state.allergens.filter((item, key) => {
        if (key !== e) {
          return item;
        }
      });
      console.log(items);
      for (let i = 0; i < items.length; i++) {
        items[i].number = i + 1;
      }
      this.setState({
        ...this.state,
        allergens: items
      });
    }
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
      ...this.state,
      errors: errorsList
    });

    let URL = "/api/recipe";
    if (process.env.NODE_ENV === "development") {
      URL = "http://localhost:5000/api/recipe";
    }

    axios
      .post(URL, { recipe })
      .then(res => {
        console.log(res);
        console.log(res.data);
        this.props.history.push("/");
      })
      .catch(error => {
        console.log(error);
      });
  };
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.container}>
        <form noValidate autoComplete="off" className={classes.textInputform}>
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
            onChange={this.handleChange}
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
            <form className={classes.form}>
              <div className={classes.formItem}>
                <h1>Lista produktów</h1>

                <Grid
                  container
                  spacing={3}
                  direction="row"
                  justify="center"
                  alignItems="center"
                >
                  <Grid item xs={12}>
                    <TextField
                      id="standard-name"
                      label="Nazwa"
                      className={classes.textField}
                      name="nameIng"
                      onChange={this.handleChange}
                      margin="normal"
                      value={this.state.nameIng}
                      fullWidth={true}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      id="outlined-multiline-static"
                      label="Opis"
                      multiline
                      rows="4"
                      value={this.state.descIng}
                      className={classes.textField}
                      margin="normal"
                      variant="outlined"
                      fullWidth={true}
                      name="descIng"
                      onChange={this.handleChange}
                    />
                  </Grid>
                </Grid>
                <button value="zatwierdź" onClick={this.setIngredients}>
                  zatwierdź
                </button>
                {this.state.errorIng !== "" ? (
                  <p>{this.state.errorIng}</p>
                ) : null}
              </div>
              {this.state.ingredients.length > 0
                ? this.state.ingredients.map((row, key) => (
                    <div className={classes.addedItem}>
                      <h4>{row.name}</h4>
                      <p>{row.value}</p>
                      <Button
                        color="primary"
                        style={{ color: "#000000" }}
                        className={classes.button}
                        onClick={() => this.removeItems(key, "ingredients")}
                      >
                        USUŃ
                      </Button>
                    </div>
                  ))
                : null}
            </form>
          </div>
          <div className={classes.listItem}>
            <form onSubmit={this.setSteps} className={classes.form}>
              <div className={classes.formItem}>
                <h1>Lista kroków</h1>
                <Grid
                  container
                  spacing={3}
                  direction="row"
                  justify="center"
                  alignItems="center"
                >
                  <Grid item xs={12}>
                    <TextField
                      id="outlined-multiline-static2"
                      label="Krok"
                      multiline
                      rows="4"
                      value={this.state.step}
                      className={classes.textField}
                      margin="normal"
                      variant="outlined"
                      fullWidth={true}
                      name="step"
                      onChange={this.handleChange}
                    />
                  </Grid>
                </Grid>
                <button value="zatwierdź" onClick={this.setSteps}>
                  zatwierdź
                </button>
                {this.state.errorStep !== "" ? (
                  <p>{this.state.errorStep}</p>
                ) : null}
              </div>
              {this.state.steps.length > 0
                ? this.state.steps.map((row, key) => (
                    <div className={classes.addedItem}>
                      <h4>Krok {key + 1}</h4>
                      <p>{row.description}</p>
                      <Button
                        color="primary"
                        style={{ color: "#000000" }}
                        className={classes.button}
                        onClick={() => this.removeItems(key, "steps")}
                      >
                        USUŃ
                      </Button>
                    </div>
                  ))
                : null}
            </form>
          </div>

          <div className={classes.listItem}>
            <form onSubmit={this.setAllergens} className={classes.form}>
              <div className={classes.formItem}>
                <h1>Lista alergenów</h1>
                <Grid
                  container
                  spacing={3}
                  direction="row"
                  justify="center"
                  alignItems="center"
                >
                  <Grid item xs={12}>
                    <TextField
                      id="outlined-multiline-static3"
                      label="Alergen"
                      multiline
                      rows="4"
                      value={this.state.allergen}
                      className={classes.textField}
                      margin="normal"
                      variant="outlined"
                      fullWidth={true}
                      name="allergen"
                      onChange={this.handleChange}
                    />
                  </Grid>
                </Grid>
                <button value="zatwierdź" onClick={this.setAllergens}>
                  zatwierdź
                </button>
                {this.state.errorAllergen !== "" ? (
                  <p>{this.state.errorAllergen}</p>
                ) : null}
              </div>
              {this.state.allergens.length > 0
                ? this.state.allergens.map((row, key) => (
                    <div className={classes.addedItem}>
                      <h4>Alergen {key + 1}</h4>
                      <p>{row.name}</p>
                      <Button
                        color="primary"
                        style={{ color: "#000000" }}
                        className={classes.button}
                        onClick={() => this.removeItems(key, "allergen")}
                      >
                        USUŃ
                      </Button>
                    </div>
                  ))
                : null}
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

export default withStyles(styles)(withRouter(addRecipe));
