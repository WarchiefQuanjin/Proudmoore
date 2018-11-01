import React, { Component } from 'react'
import firebase from '../config'
import { withStyles } from '@material-ui/core/styles';
import Chart from "react-google-charts";
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import debounce from 'lodash.debounce';

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
            data: [],
            transporteData: [],
            year: new Date().getFullYear(),
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

    chartGenerator = (sortBy, chartType, title, type) =>  {
        var datas = this.state.transporteData.concat(this.state.data)

        if (datas.length <= 0)
            return

        const data = [];
        datas.filter((caso) => new Date(caso.val.FMFecha).getFullYear() === parseInt(this.state.year, 10) )
        .forEach((caso) => {
            data.push([caso.val[sortBy], caso.val['OTPresupuesto'] !== undefined ? caso.val['OTPresupuesto'] : caso.val['APCantidad']])
        })

        var counts = {};
        for (var i = 0; i < data.length; i++) {
            type === 'Casos' ?
            counts[data[i][0]] = 1 + (counts[data[i][0]] || 0) :
            counts[data[i][0]] = parseInt(data[i][1], 10) + parseInt((counts[data[i][0]] || 0), 10);
        }

        var result = Object.keys(counts).map((key) => {
            return [String(key), counts[key], counts[key], this.getRandomColor()];
        });
        
        result.sort((a,b) => { return a[0] > b[0] ? 1 : -1; })
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
        
        return (
            result.length <= 1 ?
                <div>
                    <br/><hr/><br/>
                    <Typography component="h2" variant="headline" gutterBottom>
                        {title}
                    </Typography>
                    <Typography style={{color: 'red'}} variant="title" gutterBottom>
                        No hay informacion disponible
                    </Typography>
                </div>
            :
            <div>
                <br/><hr/><br/>
                <Chart
                    chartType={chartType === 'Bar' ? "BarChart" : "PieChart"}
                    data={result}
                    options={pieOptions}
                    /* graph_id="PieChart" */
                    width={"900px"}
                    height={"400px"}
                    /* legend_toggle */
                />
            </div>
        );
    };

    handleChange = debounce((value) => {
        if(isNaN(value) || value.length >= 5)
            return

        this.setState({
            year: value
        })
    }, 300)

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <div style={{marginBottom: '70px'}}>
                    <TextField
                        required
                        id="standard-required"
                        label="Año"
                        defaultValue={this.state.year}
                        className={classes.textField}
                        margin="normal"
                        onChange={(event) => this.handleChange(event.target.value)}
                    />

                    {this.chartGenerator('DGEstado', 'Bar', 'Casos apoyados por estado', 'Casos')}
                    {this.chartGenerator('DGEstado', 'Pie', 'Cantidad apoyada por estado', 'Cantidad')}
                    {this.chartGenerator('DGVicaria', 'Bar', 'Casos apoyados por vicaria', 'Casos')}
                    {this.chartGenerator('DGVicaria', 'Pie', 'Cantidad apoyada por vicaria', 'Cantidad')}
                    {this.chartGenerator('DGMunicipio', 'Bar', 'Casos apoyados por municipio', 'Casos')}
                    {this.chartGenerator('DGMunicipio', 'Pie', 'Cantidad apoyada por municipio', 'Cantidad')}
                    {this.chartGenerator('DGSexo', 'Bar', 'Casos apoyados por sexo', 'Casos')}
                    {this.chartGenerator('DGSexo', 'Pie', 'Cantidad apoyada por sexo', 'Cantidad')}
                </div>
            </div>
        )
    }
}

export default withStyles(styles)(Graficas);
