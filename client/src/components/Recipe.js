import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/styles";
import difficultyIcon from "./../icons/difficulty-icon.png";
import timeIcon from "./../icons/time-icon.png";
import upVoteIcon from "./../icons/upvote-icon.png";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  imgFluid: {
    maxWidth: "100%",
    height: "auto"
  },
  heroImage: {
    maxWidth: "100%",
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
    gridTemplateColumns: "1fr"
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
    },
    "& p": {
      margin: "0"
    }
  },
  name: {
    padding: "0  30px",
    minHeight: "200px",
    "& p": {
      margin: "0px",
      initialLetter: "10px"
    }
  },
  nameDes: {
    color: "black",
    fontSize: "16px",
    padding: "25px 0 0  0px",
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
  }
});

const Recipe = props => {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <CardContent className={classes.content}>
        <div
          className={classes.heroImage}
          style={{
            backgroundImage: `url(${process.env.REACT_APP_AWS_CLOUDFRONT_URL}/${
              props.img
            })`
          }}
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
            <div>
              <img src={timeIcon} alt="zdjecie" />
              <p>{props.time}</p>
            </div>
          </div>
          <div className={classes.name}>
            <Link to={`/${props.name}`}>
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
