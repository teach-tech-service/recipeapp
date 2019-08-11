import React from 'react';
import Chart from 'react-google-charts';
import PropTypes from 'prop-types';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
    root: {
        width: 300 + 24 * 2,
        padding: 24,
    },
    margin: {
        height: theme.spacing(3),
    },
}));

function ValueLabelComponent(props) {
    const { children, open, value } = props;

    const popperRef = React.useRef(null);
    React.useEffect(() => {
        if (popperRef.current) {
            popperRef.current.update();
        }
    });

    return (
        <Tooltip
            PopperProps={{
                popperRef,
            }}
            open={open}
            enterTouchDelay={0}
            placement="top"
            title={value}
        >
            {children}
        </Tooltip>
    );
}

ValueLabelComponent.propTypes = {
    children: PropTypes.element.isRequired,
    open: PropTypes.bool.isRequired,
    value: PropTypes.number.isRequired,
};

const iOSBoxShadow =
    '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.13),0 0 0 1px rgba(0,0,0,0.02)';

const marks = [
    {
        value: 0,
    },
    {
        value: 20,
    },
    {
        value: 37,
    },
    {
        value: 100,
    },
];

const PrettoSlider = withStyles({
    root: {
        color: '#52af77',
        height: 8,
    },
    thumb: {
        height: 24,
        width: 24,
        backgroundColor: '#fff',
        border: '2px solid currentColor',
        marginTop: -8,
        marginLeft: -12,
        '&:focus,&:hover,&$active': {
            boxShadow: 'inherit',
        },
    },
    active: {},
    valueLabel: {
        left: 'calc(-50% + 4px)',
    },
    track: {
        height: 8,
        borderRadius: 4,
    },
    rail: {
        height: 8,
        borderRadius: 4,
    },
})(Slider);


export default class Stats extends React.Component {
    state = {
        difficulty: [],
        cuisines: [],
        numberOfRecipes: [],
        number: 7
    }

    async componentDidMount() {

        const resDif = await fetch('http://localhost:5000/api/statistics/difficulty');
        const resCu = await fetch('http://localhost:5000/api/statistics/cuisines');
        const resNoR = await fetch(`http://localhost:5000/api/statistics/numberOfRecipes/${this.state.name}`);
        const jsonDif = await resDif.json();
        const jsonCu = await resCu.json();
        const jsonNoR = await resNoR.json();
        var displayD = [["", "Łatwy", "Średni", "Trudny"]]
        var displayC = [["Nazwa", "Ilość"]]
        var displayN = [["Data", "Ilość"]]
        var newD = [""]
        var newC = []
        for (var i = 0; i < jsonDif.recipes.length; i++) {
            newD.push(jsonDif.recipes[i].numberOfRecipes)
        }
        for (var x = 0; x < jsonCu.recipes.length; x++) {
            displayC.push([jsonCu.recipes[x].name, jsonCu.recipes[x].numberOfRecipes])
        }
        for (var e = 0; e < jsonNoR.recipes.length; e++) {
            displayN.push([jsonNoR.recipes[e].date, jsonNoR.recipes[e].count])
        }
        console.log(newC)
        displayD.push(newD)
        console.log(JSON.stringify(displayC))
        this.setState({
            ...this.state,
            difficulty: displayD,
            cuisines: displayC,
            numberOfRecipes: displayN,
        })
        console.log(this.state)
    }

    render() {
        return (
            <Grid xs={12} container
                direction="column"
                justify="center"
                alignItems="center">
                <Grid item xs={12}>
                    <Chart
                        width={800}
                        height={800}
                        chartType="ColumnChart"
                        loader={<div>Wczytywanie...</div>}
                        data={this.state.difficulty}
                        options={{
                            title: 'Wskaźnik trudności przepisów',
                            chartArea: { width: '80%' },
                            hAxis: {
                                title: 'Rodzaj',
                                minValue: 0,
                            },
                            vAxis: {
                                title: 'Ilość',
                            },
                        }}
                        legendToggle
                    />
                </Grid>
                <Grid item xs={12}>
                <Chart
                        width={800}
                        height={800}
                        chartType="ColumnChart"
                        loader={<div>Wczytywanie...</div>}
                        data={this.state.cuisines}
                        options={{
                            title: 'Rodzaje przepisów',
                            chartArea: { width: '80%' },
                            hAxis: {
                                title: 'Rodzaj',
                                minValue: 0,
                            },
                            vAxis: {
                                title: 'Ilość',
                            },
                        }}
                        legendToggle
                    />
                </Grid>
                <Grid item xs={12}>
                <Chart
                    width={800}
                    height={800}
                    chartType="ColumnChart"
                    loader={<div>Wczytywanie...</div>}
                    data={this.state.numberOfRecipes}
                    options={{
                        title: 'Ilość dodanych przepisów w ciągu ostatnich 7 dni',
                        chartArea: { width: '80%' },
                        hAxis: {
                            title: 'Rodzaj',
                            minValue: 0,
                        },
                        vAxis: {
                            title: 'Ilość',
                        },
                    }}
                    legendToggle
                />
                </Grid>
            </Grid>
        );
    }
}