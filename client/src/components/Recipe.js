import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/styles";
import image from "./../recipeImage.jpg";
import difficultyIcon from "./../icons/difficulty-icon.png";
import timeIcon from "./../icons/time-icon.png";
import upVoteIcon from "./../icons/upvote-icon.png";
import { Link } from "react-router-dom";
import easy from "./../icons/easy.png";
import medium from "./../icons/medium.png";
import hard from "./../icons/hard.png";

const useStyles = makeStyles({
  imgFluid: {
    maxWidth: "100%",
    height: "auto"
  },
  heroImage: {
    height: 240,
    backgroundSize: "cover",
    backgroundPosition: "center"
  },
  card: {
    boxShadow: "none"
  },
  content: {
    display: "grid",
    gridTemplateColumns: "1fr"
  },
  info: {
    borderRight: "2px solid #f5f5f5",
    display: "grid",
    gridTemplateColumns: "1fr",
    boxShadow: "1px 1px 20px -12px rgba(0,0,0,0.2)"
  },
  properties: {
    display: "grid",
    gridTemplateColumns: "repeat(4,1fr)",
    backgroundColor: "#f5f5f5",

    justifyItems: "center",
    alignContent: "center",
    "& img": {
      maxWidth: "20%"
    },
    "& div": {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontSize: "22px",
      padding: "12px 0 4px"
    }
  },
  nameDes: {
    color: "black",
    fontSize: "16px",
    padding: "25px 0 0 0px",
    margin: "0px",
    textTransform: "uppercase",
    textDecoration: "none"
  },
  upVote: {
    backgroundColor: "#ebebeb",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%"
  },
  name: {
    minHeight: "200px",
    padding: "0 20px "
  },
  link: {
    textDecoration: "none"
  },
  time: {
    "& p": {
      padding: "0 0 0 5px"
    }
  }
});

const Recipe = props => {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <CardContent className={classes.content}>
        <div
          style={{
            backgroundImage: `url(${process.env.REACT_APP_AWS_CLOUDFRONT_URL}/${
              props.img
            })`
          }}
          className={classes.heroImage}
          alt="zdjecie"
        />
        <div className={classes.info}>
          <div className={classes.properties}>
            <div className={classes.upVote}>
              <img src={upVoteIcon} alt="zdjecie" />
              <p>{props.vote}</p>
            </div>
            <div>
              <img
                src={difficultyIcon}
                className={classes.imgFluid}
                alt="zdjecie"
              />
            </div>
            <div className={classes.time}>
              <img src={timeIcon} alt="zdjecie" />
              <p>{props.time}</p>
            </div>
          </div>
          <div className={classes.name}>
            <Link to={`/${props.name}`} className={classes.link}>
              <h1 className={classes.nameDes}>{props.name}</h1>
            </Link>
            <p>{props.description}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Recipe;
