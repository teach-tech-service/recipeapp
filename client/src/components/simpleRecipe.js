import React, { useEffect } from "react";
import recipesList from "./../data/recipes.json";
import axios from "axios";
import recipeImage from "./../recipeImage.jpg";
import Step from "./Step";
import { makeStyles } from "@material-ui/styles";
import difficultyIcon from "./../icons/difficulty-icon.png";
import timeIcon from "./../icons/time-icon.png";
import upVoteIcon from "./../icons/upvote-icon.png";
import { withStyles } from "@material-ui/styles";
const styles = style => ({
    imgFluid: {
        maxWidth: "100%",
        height: "auto"
    },
    container: {
        display: "grid",
        gridTemplateColumns: "30% 70%"
    },
    infoName: {
        fontSize: "38px",
        margin: "5px 0 65px",
        padding: "0 25px",
        color: "#f2cd22",
        textDecoration: "none"
    },
    infoDescription: {
        padding: "0 25px"
    },
    recipeImage: {
        height: "600px",
        backgroundImage: `url(${recipeImage})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat"
    },
    recipeParameters: {
        backgroundColor: "#ffd71d",
        display: "flex",
        justifyContent: "space-between",
        padding: "0 50px 5px 50px"
    },
    parameters: {
        display: "flex",
        justifyContent: "start",
        alignItems: "center"
    },
    parameter: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "0 25px",

        "& h1": {
            fontSize: "72px",
            fontWeight: "100",
            margin: "0",
            color: "white"
        }
    },
    parameterWrapper: {
        display: "flex",
        fontSize: "10px",
        fontWeight: "bold",
        alignItems: "center",
        "& img": {
            height: "20px"
        },
        "& span": {
            fontSize: "10px",
            color: "gray"
        }
    },
    ingredients: {
        backgroundColor: "#f8f8f8",
        fontSize: "16px",
        color: "#121920",
        margin: "40px 0 20px 0",
        padding: "25px",
        "& ul": {
            padding: "0",
            "& li": {
                listStyleType: "none",
                "& p": {
                    margin: "0",
                    fontSize: "18px"
                }
            }
        }
    },
    difficultyIcon: {
        height: "50px",
        padding: "24px 0"
    },
    stepsInfo: {
        margin: "40px 70px 40px 50px"
    },
    actions: {
        display: "flex",
        justifyContent: "end"
    },
    action: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "end",
        alignItems: "center",
        "& img": {
            maxWidth: "30%"
        }
    }
});
class SimpleRecipe extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            time: "",
            name: "",
            description: "",
            ingredients: [],
            steps: [],
            difficulty: "",
            cuisines: []
        };
    }

    componentDidMount() {
        axios
            .get(`http://localhost:5000/api/search?term=${this.props.name}`)
            .then(res => {
                this.setState({
                    data: res.data.filteredRecipes,
                    time: res.data.filteredRecipes[0].time,
                    description: res.data.filteredRecipes[0].description,
                    name: res.data.filteredRecipes[0].name,
                    ingredients: res.data.filteredRecipes[0].ingredients,
                    steps: res.data.filteredRecipes[0].steps,
                    difficulty: res.data.filteredRecipes[0].difficulty
                });
            })
            .catch(error => {
                console.log(error);
            });
    }

    setDifficulty = param => {
        switch (param) {
            case "easy":
                return " łatwy";
            case "medium":
                return " średni";
            case "hard":
                return " trudny";
        }
    };

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.container}>
                {this.state.data.length > 0
                    ? console.log(this.state.data[0])
                    : console.log(this.state.data)}
                <div className={classes.recipeDescription}>
                    <div>
                        <h1 className={classes.infoName}>{this.state.name}</h1>
                        <p className={classes.infoDescription}>
                            {this.state.description}
                        </p>
                    </div>
                    <div className={classes.ingredients}>
                        <h1>Składniki</h1>
                        <ul>
                            {this.state.data.length > 0
                                ? this.state.ingredients.map(itemb => {
                                    return (
                                        <li key={itemb.name}>
                                            {console.log(itemb.name)}
                                            {itemb.value === "" ? (
                                                <p>{itemb.name}</p>
                                            ) : (
                                                    <p>
                                                        {" "}
                                                        {itemb.name} -{" "}
                                                        {itemb.value}
                                                    </p>
                                                )}
                                        </li>
                                    );
                                })
                                : null}
                        </ul>
                    </div>
                </div>
                <div className={classes.recipeInfo}>
                    <div className={classes.recipeImage} />
                    <div className={classes.recipeParameters}>
                        <div className={classes.parameters}>
                            <div className={classes.parameter}>
                                <h1>{this.state.time}</h1>
                                <div className={classes.parameterWrapper}>
                                    <img
                                        src={timeIcon}
                                        alt="timeIcon"
                                        className={classes.imgFluid}
                                    />
                                    <p>Czas przygotowania</p>
                                </div>
                            </div>
                            <div className={classes.parameter}>
                                <img
                                    src={difficultyIcon}
                                    alt="timeIcon"
                                    className={classes.difficultyIcon}
                                />
                                <div className={classes.parameterWrapper}>
                                    <p>
                                        <b>Poziom: </b>
                                    </p>
                                    <span>
                                        {this.setDifficulty(
                                            this.state.difficulty
                                        )}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className={classes.actions}>
                            <div className={classes.action}>
                                <img src={upVoteIcon} alt="upvoteicon" />
                                <p>Dodaj do ulubionych</p>
                            </div>
                        </div>
                    </div>
                    <div className={classes.stepsInfo}>
                        <div className={classes.steps}>
                            {this.state.data.length > 0
                                ? this.state.steps.map(step => {
                                    return (
                                        <div className={classes.step}>
                                            <Step
                                                key={step.number}
                                                number={step.number}
                                                description={step.description}
                                            />
                                        </div>
                                    );
                                })
                                : null}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(SimpleRecipe);
