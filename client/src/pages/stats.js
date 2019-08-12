import React from 'react';
import Chart from 'react-google-charts';
import Grid from '@material-ui/core/Grid';

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
            var date = new Date(jsonNoR.recipes[e].date)
            displayN.push([date.toLocaleDateString(), jsonNoR.recipes[e].count])
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
                            chartArea: { width: '70%' },
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
                            chartArea: { width: '70%' },
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
                            chartArea: { width: '70%' },
                            hAxis: {
                                title: 'Data',
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