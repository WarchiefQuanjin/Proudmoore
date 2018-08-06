import React, { Component } from 'react'
import 'react-table/react-table.css'
import firebase from '../config'
import XLSX from 'xlsx'
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

const styles = theme => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        paddingLeft: '40px'
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    }
});

const Parentesco = [
    { value: 'Padre' },
    { value: 'Madre'},
    { value: 'Hijo' },
    { value: 'Hija' },
    { value: 'Abuelo' },
    { value: 'Abuela' },
    { value: 'Tio' },
    { value: 'Tia' },
    { value: 'Sobrino' },
    { value: 'Sobrina' },
    { value: 'Primo' },
    { value: 'Prima' },
    { value: 'Ninguno' }
];

const ECivil = [
    { value: 'Casado' },
    { value: 'Soltero'},
    { value: 'Union Libre' },
    { value: 'Viudo' }
];

class Socioeconomico extends Component {
    constructor(props) {
        super(props)
        this.state = {
            users: [],
            fcantidad : 0
        }
        this.exportFile = this.exportFile.bind(this)
    }

    componentWillMount() {
        this.getUsers()
    }

    getUsers() {
        let users = []
        firebase.database().ref(`users/`).once('value', snapshot => {
            snapshot.forEach(snap => {
                users.push(snap.val())
            })
            this.setState({
                users
            })
        })
    }

    exportFile() {
        let users = [["First Name", "Last Name", "Age"]]
        this.state.users.forEach((user) => {
            let userArray = [user.firstname, user.lastname, user.age]
            users.push(userArray)
        })
        const wb = XLSX.utils.book_new()
        const wsAll = XLSX.utils.aoa_to_sheet(users)
        XLSX.utils.book_append_sheet(wb, wsAll, "All Users")
        XLSX.writeFile(wb, "export-demo.xlsx")
    }

    txtField = (props) => {
        return (
            <TextField
                id={props.id ? props.id : props.nombre}
                label={props.nombre}
                select={props.options !== undefined}
                placeholder={props.nombre}
                className={props.classes.textField}
                value={this.state[props.id] ? this.state[props.id] : ''}
                margin="normal"
                onChange={(event) => props.onChange(props.id, event.target.value)}
                style={{width: props.width+'px'}}
            >
            {props.options && props.options.map((option, i) => (
                <MenuItem key={i} value={option.value}>
                    {option.label ? option.label : option.value}
                </MenuItem>
              ))}
            </TextField>  
        )
    }

    handleChange = (id, value) => {
        this.setState({
            [id]: value
        })
    }

    cfamiliar = (classes) => {
        var rows = [];

        for (var i = 0; i < this.state.fcantidad; i++) {
            rows.push(
                <div key={'familia' + i}>
                    <this.txtField id={"Fam" + i + "nom"} nombre={"Nombre"} classes={classes} width={160}/>
                    <this.txtField id={"Fam" + i + "edad"} nombre={"Edad"} classes={classes} width={50}/>
                    <this.txtField id={"Fam" + i + "parentesco"} nombre={"Parentesco"} classes={classes} width={100} options={Parentesco} onChange={this.handleChange}/>
                    <this.txtField id={"Fam" + i + "ecivil"} nombre={"Estado Civil"} classes={classes} width={100}/>
                    <this.txtField id={"Fam" + i + "ocupacion"} nombre={"Ocupacion"} classes={classes} width={150}/>
                </div>
            );
        }
        return rows;
    }
    

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <div>
                    <h1>Datos Generales</h1>
                    <div className={classes.container}>
                        <this.txtField nombre="Nombre del caso" classes={classes} id ="Caso" />
                        <this.txtField nombre="Edad" classes={classes}/>
                        <this.txtField nombre="Domicilio" classes={classes}/>
                        <this.txtField nombre="Telefono" classes={classes}/>
                        <this.txtField nombre="Colonia" classes={classes}/>
                        <this.txtField nombre="Telefono recados" classes={classes} id ="TelefonoR"/>
                        <this.txtField nombre="Cruce de calles" classes={classes} id ="Cruce"/>
                        <this.txtField nombre="Celular" classes={classes}/>
                        <this.txtField nombre="Estado civil" classes={classes} id ="ECivil"/>
                        <this.txtField nombre="Codigo postal" classes={classes} id ="CP"/>
                        <this.txtField nombre="Escolaridad" classes={classes}/>
                        <this.txtField nombre="Municipio" classes={classes}/>
                        <this.txtField nombre="Ocupacion" classes={classes}/>
                        <this.txtField nombre="Estado" classes={classes}/>
                        <this.txtField nombre="Parroquia" classes={classes}/>
                        <this.txtField nombre="Estado" classes={classes}/>
                        <this.txtField nombre="Persona Entrevistada" classes={classes} id ="Persona"/>
                        <this.txtField nombre="Parentesco" classes={classes}/>
                    </div>

                    <h1>Composicion Familiar</h1>
                    <div className={classes.container}>
                        {/* <this.txtField 
                            onChange={(e) => this.setState({ fcantidad: e.target.value })} 
                            nombre="Cantidad" 
                            classes={classes} /> */}

                        <TextField
                            id={"Cantidad" }
                            label={"Cantidad" }
                            placeholder={"Cantidad"}
                            className={classes.textField}
                            margin="normal"
                            onChange={(e) => this.setState({ fcantidad: e.target.value })} 
                            style={{width: '80px'}}
                        />
                    </div>

                    {/* <this.cfamiliar nombre="Warsong" classes={classes}/> */}

                    {this.cfamiliar(classes)}

                </div>
            </div>
        )
    }
}

export default withStyles(styles)(Socioeconomico);
