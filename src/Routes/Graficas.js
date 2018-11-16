import React, { Component } from 'react'
import firebase from '../config'
import { withStyles } from '@material-ui/core/styles';
import Chart from "react-google-charts";
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import debounce from 'lodash.debounce';
import Tooltip from '@material-ui/core/Tooltip';
import PrintIcon from '@material-ui/icons/Print';
import Button from '@material-ui/core/Button';

const styles = theme => ({
    root: {
        display: 'block',
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
    },
    fixed: {
        position: 'fixed',
        width: '50px',
        height: '50px'/* ,
        backgroundColor: '#8BC34A',
        color: 'white' */
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
            year: new Date().getFullYear()
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

    tablaCharts = (image) => {
        var fcantidad = ''
        for(var i=0; i < image.length ; i++){
            fcantidad += '<br/><hr/><br/><img id="ItemPreview" src="'+ image[i] +'" />'
        }

        return fcantidad;
    }

    print = (event, props) => {
        event.preventDefault();

        var count = 0
        Object.keys(this.state).map(s => s.indexOf('chartWrapper') !== -1 && count++)

        const image = []
        for(var i=0; i < count ; i++){
            image[i] = this.state['chartWrapper' + (i + 1)].getChart().getImageURI();
        }

        const gridName="Consulta nuestro aviso de privacidad en http://caritasgdl.org.mx en la seccion; Aviso de Privacidad";

        const tableHeader = '<div style="display:flex">'+
            '<img src="https://igx.4sqi.net/img/general/width960/82417073_V22Qrk5dPbOj3XmuXQi0gksLG4bHRXVJ-Y3JZNgNnXo.png" alt="W3Schools.com" style="width:100px;height:100px;">'+
            '<h2 style="width:600px; height:100px; text-align:center">CASOS EMERGENTES<br>GRAFICAS</h2>'+
            '<h2 style="width:100px; height:100px;"></h2>'+
        '</div>';

        const documentToPrint = window.open(gridName, 'Print', 'location=0,scrollbars=yes,height=900,width=800');
        documentToPrint.document
            .write('<link rel="stylesheet" href="//cdn.jsdelivr.net/bootstrap/latest/css/bootstrap.min.css" />');
        documentToPrint.document.title = gridName;
        documentToPrint.document.write('<body style="font-size: 12px; overflow-y: scroll; height: 100%" onload="window.print();">');
        documentToPrint.document.write(tableHeader);
        documentToPrint.document.write(this.tablaCharts(image));
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

    chartGenerator = (sortBy, chartType, title, type, id) =>  {
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
            return [chartType === 'Pie' ? String(key) + ', '+ counts[key] : String(key), counts[key], counts[key], this.getRandomColor()];
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

                    getChartWrapper={chartWrapper => {
                        this.setState({ ['chartWrapper' + id]: chartWrapper });
                    }}
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
                <div style={{ marginTop: '40px'}}>
                    <TextField
                    required
                    id="year"
                    label="Año"
                    defaultValue={this.state.year}
                    className={classes.textField}
                    margin="normal"
                    onChange={(event) => this.handleChange(event.target.value)}
                    />                    
                </div>
                <div style={{marginBottom: '70px', marginTop: '40px'}}>
                    {this.chartGenerator('DGEstado', 'Bar', 'Casos apoyados por estado', 'Casos', 1)}
                    {this.chartGenerator('DGEstado', 'Pie', 'Cantidad apoyada por estado', 'Cantidad', 2)}
                    {this.chartGenerator('DGVicaria', 'Bar', 'Casos apoyados por vicaria', 'Casos', 3)}
                    {this.chartGenerator('DGVicaria', 'Pie', 'Cantidad apoyada por vicaria', 'Cantidad', 4)}
                    {this.chartGenerator('DGMunicipio', 'Bar', 'Casos apoyados por municipio', 'Casos', 5)}
                    {this.chartGenerator('DGMunicipio', 'Pie', 'Cantidad apoyada por municipio', 'Cantidad', 6)}
                    {this.chartGenerator('DGSexo', 'Pie', 'Casos apoyados por sexo', 'Casos', 7)}
                    {this.chartGenerator('DGSexo', 'Pie', 'Cantidad apoyada por sexo', 'Cantidad', 8)}

                    <Tooltip title="Imprimir" >
                        <Button variant="fab" color="primary" className={classes.fixed} style={{bottom: '20px', right: '25px'}} onClick={(event) => this.print(event, this.state.caso)}>
                            <PrintIcon />
                        </Button>
                    </Tooltip>
                </div>
            </div>
        )
    }
}

export default withStyles(styles)(Graficas);
