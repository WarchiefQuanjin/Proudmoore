import React, { Component } from 'react'
import firebase from '../config'
import { withStyles } from '@material-ui/core/styles';
import { 
    ECivil, 
    Procedencia
} from '../Constants/Options';
import TxtField from '../Components/TxtField';
import Snackbar from '@material-ui/core/Snackbar';
import Fade from '@material-ui/core/Fade';
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
            caso: {
                gcantidad: 0,
                OBObservaciones: 'Ninguna'
            }
        }
    }

    componentDidMount() {
        this.getData();
    }

    getData() {
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

    g1 = () =>  {
        console.log(this.state)

        var pieOptions = {
            title: "",
            pieHole: 0.6,
            slices: [
              {
                color: "#2BB673"
              },
              {
                color: "#d91e48"
              }
            ],
            legend: {
              position: "bottom",
              alignment: "center",
              textStyle: {
                color: "233238",
                fontSize: 14
              }
            },
            tooltip: {
              showColorCode: true
            },
            chartArea: {
              left: 0,
              top: 0,
              width: "100%",
              height: "80%"
            },
            fontName: "Roboto"
        };

        return (
            <div className="App">
              <Chart
                chartType="PieChart"
                data={[["Age", "Weight"], ["a", 12], ["b", 5.5]]}
                options={pieOptions}
                graph_id="PieChart"
                width={"100%"}
                height={"400px"}
                legend_toggle
              />
            </div>
          );
    };

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <div style={{marginBottom: '70px'}}>

                    {this.g1()}

                </div>
            </div>
        )
    }
}

export default withStyles(styles)(Graficas);
