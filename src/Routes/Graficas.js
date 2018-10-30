import React, { Component } from 'react'
import firebase from '../config'
import { withStyles } from '@material-ui/core/styles';
import Chart from "react-google-charts";

const styles = theme => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        paddingLeft: '40px'
    },
    button: {
        margin: theme.spacing.unit,
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        marginTop: '2px',
        marginBottom: '2px',
        width: 200,
    }
});

class Graficas extends Component {
    constructor(props) {
        super(props)

        this.state = this.defaultState;
    }

    get defaultState() {
        return {  
            data: [0],
            transporteData: [],
            entrevistaData: []
        }
    }

    componentDidMount() {
        this.getSocioeconomicoData();
        this.getTransporteData();
    }

    getSocioeconomicoData() {
        let data = []
        let info = {};

        firebase.database().ref(`casos/`).once('value', snapshot => {
            snapshot.forEach(snap => {
                info.val = snap.val();
                info.key = snap.key;

                data.push(info)
                info = {}
            })
            this.setState({
                data
            })
        })
    }

    getTransporteData() {
        let transporteData = []
        let info = {};

        firebase.database().ref(`transporte/`).once('value', snapshot => {
            snapshot.forEach(snap => {
                info.val = snap.val();
                info.key = snap.key;

                transporteData.push(info)
                info = {}
            })
            this.setState({
                transporteData
            })
        })
    }

    tablaObservaciones = (props) => {
        var fcantidad = '<p style="width: 100%;text-align: center;background-color: #4a76c5;color: white;margin-top: 30px; -webkit-print-color-adjust: exact">OBSERVACIONES</p>'+
        '<p style="width: 50%">OBSERVACIONES </p><textarea rows="'+this.resizeTextArea(props.OBObservaciones, 2)+'" style="width: 100%; margin-top: -15px" >'+props.OBObservaciones+'</textarea>';

        return fcantidad;
    }

    print = (event, props) => {
        event.preventDefault();

        const gridName="Consulta nuestro aviso de privacidad en http://caritasgdl.org.mx en la seccion; Aviso de Privacidad";

        const tableHeader = '<div style="display:flex">'+
            '<img src="https://igx.4sqi.net/img/general/width960/82417073_V22Qrk5dPbOj3XmuXQi0gksLG4bHRXVJ-Y3JZNgNnXo.png" alt="W3Schools.com" style="width:100px;height:100px;">'+
            '<h2 style="width:600px; height:100px; text-align:center">CASOS EMERGENTES<br>AREA DE TRANSPORTE</h2>'+
            '<h2 style="width:100px; height:100px;"></h2>'+
        '</div>';

        const documentToPrint = window.open(gridName, 'Print', 'location=0,scrollbars=yes,height=900,width=800');
        documentToPrint.document
            .write('<link rel="stylesheet" href="//cdn.jsdelivr.net/bootstrap/latest/css/bootstrap.min.css" />');
        documentToPrint.document.title = gridName;
        documentToPrint.document.write('<body style="font-size: 12px; overflow-y: scroll; height: 100%" onload="window.print();">');
        documentToPrint.document.write(tableHeader);
        documentToPrint.document.write(this.tablaObservaciones(props));
        documentToPrint.document.write('</body>');
        documentToPrint.document.close();
    }

    getRandomColor = () => {
        var letters = '0123456789ABCDEF';
        var color = '#';

        for (var i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }

        return color;
    }

    g1 = (sortBy, chartType, title) =>  {
        var datas = this.state.transporteData.concat(this.state.data)

        /* if (this.state.data.length === 0 && this.state.transporteData === 0)
            return */

        const arc = [];
        datas.filter((caso) => new Date(caso.val.FMFecha).getFullYear() === parseInt(2018, 10) )
        .forEach((caso) => {
            arc.push(caso.val[sortBy])
        })

        var counts = {};
        for (var i = 0; i < arc.length; i++) {
            counts[arc[i]] = 1 + (counts[arc[i]] || 0);
        }

        var result = Object.keys(counts).map((key) => {
            return [String(key), counts[key], counts[key], this.getRandomColor()];
        });
        
        result.sort(function(a,b){ return a[0] > b[0] ? 1 : -1; })
        result = [['Estados', 'Cantidad', { role: 'annotation'}, { role: "style" }]].concat(result)
        
        const pieOptions = {
            title: title,
            chartArea: {
                height: '100%',
                width: '50%',
                top: 32,
                /* left: 32,
                bottom: 32,
                right: 16 */
            },
            /* height: '100%',
            width: '50%', */
            hAxis: {
                title: 'Estado'
            },
            vAxis: {
                title: 'Casos Apoyados'
            }
        };

        var chart = ''
        if(chartType === 'Bar'){
            chart = <Chart
                chartType="BarChart"
                width="900px"
                height="400px"
                data={result}
                options={pieOptions}
                /* legendToggle={false} */
            />
        }
        else if (chartType === 'Pie'){
            chart = <Chart
                chartType="PieChart"
                data={result}
                options={pieOptions}
                graph_id="PieChart"
                width={"900px"}
                height={"400px"}
                legend_toggle
            />
        }
        else {
            chart = <Chart
                chartType="ColumnChart"
                width="900px"
                height="400px"
                options={pieOptions}
                data={result}
            />
        }

        return chart;
        /* return (
            <div>
                <Chart
                    chartType="BarChart"
                    width="900px"
                    height="400px"
                    data={result}
                    options={pieOptions}
                />

                <Chart
                    chartType="PieChart"
                    data={result}
                    options={pieOptions}
                    graph_id="PieChart"
                    width={"100%"}
                    height={"400px"}
                    legend_toggle
                />

                <Chart
                    chartType="ColumnChart"
                    width="100%"
                    height="400px"
                    data={result}
                />
            </div>
        ); */
    };

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <div style={{marginBottom: '70px'}}>

                    
                    {this.state.transporteData.length > 0 && this.g1('DGEstado', 'Bar', 'Casos apoyados por estado')}
                    {/* this.state.transporteData.length > 0 && this.g1('DGEstado', 'Pie', 'Casos apoyados por estado') */}
                    <br/>
                    <hr/>
                    <br/>
                    {this.state.transporteData.length > 0 && this.g1('DGVicaria', 'Bar', 'Casos apoyados por vicaria')}
                </div>
            </div>
        )
    }
}

export default withStyles(styles)(Graficas);
