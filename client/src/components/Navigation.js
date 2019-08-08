import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import Grid from "@material-ui/core/Grid";
import SearchIcon from "@material-ui/icons/Search";
import HomeIcon from "@material-ui/icons/Home";
import ListIcon from "@material-ui/icons/ListAlt";

const useStyles = makeStyles({
    root: {
        width: 100
    }
});

export default () => {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    return (
        <Grid container justify="center" alignItems="center">
            <Grid>
                <BottomNavigation
                    value={value}
                    onChange={(event, newValue) => {
                        setValue(newValue);
                    }}
                    showLabels
                    className={classes.root}
                >
                    <BottomNavigationAction
                        component={Link}
                        to="/"
                        label="Główna"
                        icon={<HomeIcon />}
                    />
                    <BottomNavigationAction
                        component={Link}
                        to="/recipes"
                        label="Przepisy"
                        icon={<ListIcon />}
                    />
                    <BottomNavigationAction
                        component={Link}
                        to="/search"
                        label="Szukaj"
                        icon={<SearchIcon />}
                    />
                </BottomNavigation>
            </Grid>
        </Grid>
    );
};
