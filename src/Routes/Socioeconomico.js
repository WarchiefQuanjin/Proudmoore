import React, { Component } from 'react'
import 'react-table/react-table.css'
import firebase from '../config'
import XLSX from 'xlsx'
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { 
    Parentesco, 
    ECivil, 
    Escolaridad, 
    Empleo, 
    Alimentacion, 
    CondicionVivienda, 
    Zona, 
    Caracteristicas, 
    Menaje, 
    AtencionMedica,
    Pronostico
} from '../Constants/Options';

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
        marginTop: '2px',
        marginBottom: '2px',
        width: 200,
    }
});

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
        var id = props.id ? props.id : props.nombre;

        return (
            <TextField
                id={id}
                label={props.nombre}
                select={props.options !== undefined}
                placeholder={props.nombre}
                className={props.classes.textField}
                value={this.state[id] ? this.state[id] : ''}
                margin="normal"
                onChange={(event) => props.onChange(id, event.target.value)}
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
                    <this.txtField id={"Fam" + i + "nom"} nombre={"Nombre"} classes={classes} width={160} onChange={this.handleChange}/>
                    <this.txtField id={"Fam" + i + "edad"} nombre={"Edad"} classes={classes} width={50} onChange={this.handleChange}/>
                    <this.txtField id={"Fam" + i + "parentesco"} nombre={"Parentesco"} classes={classes} width={100} options={Parentesco} onChange={this.handleChange}/>
                    <this.txtField id={"Fam" + i + "ecivil"} nombre={"Estado Civil"} classes={classes} width={100} onChange={this.handleChange}/>
                    <this.txtField id={"Fam" + i + "ocupacion"} nombre={"Ocupacion"} classes={classes} width={150} onChange={this.handleChange}/>
                    <this.txtField id={"Fam" + i + "empleo"} nombre={"Empleo"} classes={classes} width={100} options={Empleo} onChange={this.handleChange}/>
                    <this.txtField id={"Fam" + i + "escolaridad"} nombre={"Escolaridad"} classes={classes} width={150} options={Escolaridad} onChange={this.handleChange}/>
                </div>
            );
        }
        return rows;
    }

    cvehiculos = (classes) => {
        var rows = [];

        for (var i = 0; i < this.state.vcantidad; i++) {
            rows.push(
                <div key={'vehiculo' + i}>
                    <this.txtField id={"Veh" + i + "mar"} nombre={"Marca"} classes={classes} width={300} onChange={this.handleChange}/>
                    <this.txtField id={"Veh" + i + "mod"} nombre={"Modelo"} classes={classes} width={300} onChange={this.handleChange}/>
                </div>
            );
        }
        return rows;
    }

    cmedica = (classes) => {
        var rows = [];

        for (var i = 0; i < this.state.mcantidad; i++) {
            rows.push(
                <div key={'atencionmedica' + i}>
                    <this.txtField id={"AteMed" + i} nombre={"Hospital"} options={AtencionMedica} classes={classes} width={300} onChange={this.handleChange}/>
                    {this.state["AteMed" + i] === 'Otros' && <this.txtField id={"AteMed" + i + 'Otros'} nombre={"Hospital"} classes={classes} width={300} onChange={this.handleChange}/> }
                </div>
            );
        }
        return rows;
    }
    
    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <div style={{marginBottom: '70px'}}>
                    <h1 style={{backgroundColor: '#5c70d2', color:'white'}}>DATOS GENERALES</h1>
                    <div className={classes.container}>
                        <this.txtField nombre="Nombre del caso" classes={classes} id="Caso" onChange={this.handleChange}/>
                        <this.txtField nombre="Edad" classes={classes} onChange={this.handleChange}/>
                        <this.txtField nombre="Domicilio" classes={classes} onChange={this.handleChange}/>
                        <this.txtField nombre="Telefono" classes={classes} onChange={this.handleChange}/>
                        <this.txtField nombre="Colonia" classes={classes} onChange={this.handleChange}/>
                        <this.txtField nombre="Telefono recados" classes={classes} id ="TelefonoR" onChange={this.handleChange}/>
                        <this.txtField nombre="Cruce de calles" classes={classes} id ="Cruce" onChange={this.handleChange}/>
                        <this.txtField nombre="Celular" classes={classes} onChange={this.handleChange}/>
                        <this.txtField nombre="Estado civil" classes={classes} id ="ECivil" options={ECivil} onChange={this.handleChange}/>
                        <this.txtField nombre="Codigo postal" classes={classes} id ="CP" onChange={this.handleChange}/>
                        <this.txtField nombre="Escolaridad" classes={classes} options={Escolaridad} onChange={this.handleChange}/>
                        <this.txtField nombre="Municipio" classes={classes} onChange={this.handleChange}/>
                        <this.txtField nombre="Ocupacion" classes={classes} onChange={this.handleChange}/>
                        <this.txtField nombre="Estado" classes={classes} onChange={this.handleChange}/>
                        <this.txtField nombre="Parroquia" classes={classes} onChange={this.handleChange}/>
                        <this.txtField nombre="Estado" classes={classes} onChange={this.handleChange}/>
                        <this.txtField nombre="Persona Entrevistada" classes={classes} id ="Persona" onChange={this.handleChange}/>
                        <this.txtField nombre="Parentesco" classes={classes} onChange={this.handleChange}/>
                    </div>

                    <br/>

                    <div className={classes.container}>
                        <h1 style={{backgroundColor: '#5c70d2', color:'white'}}>COMPOSICION FAMILIAR</h1>
                        <TextField
                            id={"Cantidad" }
                            label={"Cantidad" }
                            placeholder={"Cantidad"}
                            className={classes.textField}
                            margin="normal"
                            onChange={(e) => this.setState({ fcantidad: e.target.value })} 
                            style={{width: '80px'}}
                        />

                        {this.cfamiliar(classes)}

                        <TextField
                            id={"ObservacionesCF" }
                            label={"Observaciones" }
                            placeholder={"Observaciones"}
                            multiline
                            className={classes.textField}
                            margin="normal"
                            onChange={(e) => this.setState({ observacionesCF: e.target.value })} 
                            style={{width: '80%'}}
                        />
                    </div>

                    <br/>

                    {/* DATOS ECONOMICOS */}
                    <h1 style={{backgroundColor: '#5c70d2', color:'white'}}>DATOS ECONOMICOS</h1>
                    <div className={classes.container}>

                        {/* INGRESOS MENSUALES */}
                        <div style={{width:'50%'}}>
                            <h4 style={{marginTop: '0px'}}>INGRESOS MENSUALES</h4>

                            <this.txtField nombre="Ingreso Familiar" id='IngresoF' classes={classes} onChange={this.handleChange}/>
                            <this.txtField nombre="Otros Ingresos" id='IngresoO' classes={classes} onChange={this.handleChange}/>
                            
                            <TextField
                                id={'IngresoT'}
                                disabled
                                label={"Total de ingresos"}
                                placeholder={"Total de ingresos"}
                                className={classes.textField}
                                value={parseFloat(this.state['IngresoO'] ? this.state['IngresoO'] : 0) + parseFloat(this.state['IngresoF'] ? this.state['IngresoF'] : 0)}
                                margin="normal"
                            /> 

                            <TextField
                                id={"ObservacionesDE" }
                                label={"Observaciones" }
                                placeholder={"Observaciones"}
                                multiline
                                className={classes.textField}
                                margin="normal"
                                onChange={(e) => this.setState({ observacionesDE: e.target.value })} 
                                style={{width: '80%'}}
                            />
                        </div>

                        {/* EGRESOS MENSUALES */}
                        <div style={{width:'50%'}}>
                            <h4 style={{marginTop: '0px'}}>EGRESOS MENSUALES</h4>

                            <this.txtField nombre="Alimentacion" id='EMAlimentacion' classes={classes} onChange={this.handleChange}/>
                            <this.txtField nombre="Vivienda" id='EMVivienda' classes={classes} onChange={this.handleChange}/>
                            <this.txtField nombre="Servicios Basicos" id='EMServicios' classes={classes} onChange={this.handleChange}/>
                            <this.txtField nombre="Telefono" id='EMTelefono' classes={classes} onChange={this.handleChange}/>
                            <this.txtField nombre="Transporte" id='EMTransporte' classes={classes} onChange={this.handleChange}/>
                            <this.txtField nombre="Educacion" id='EMEducacion' classes={classes} onChange={this.handleChange}/>
                            <this.txtField nombre="Salud" id='EMSalud' classes={classes} onChange={this.handleChange}/>
                            <this.txtField nombre="Vestido" id='EMVestido' classes={classes} onChange={this.handleChange}/>
                            <this.txtField nombre="Recreacion" id='EMRecreacion' classes={classes} onChange={this.handleChange}/>
                            <this.txtField nombre="Deudas" id='EMDeudas' classes={classes} onChange={this.handleChange}/>
                            <this.txtField nombre="Otros" id='EMOtros' classes={classes} onChange={this.handleChange}/>
                            
                            <TextField
                                id={'EMEngresoT'}
                                disabled
                                label={"Total de egresos"}
                                placeholder={"Total de egresos"}
                                className={classes.textField}
                                value={parseFloat(this.state['EMAlimentacion'] ? this.state['EMAlimentacion'] : 0) + 
                                    parseFloat(this.state['EMVivienda'] ? this.state['EMVivienda'] : 0) + 
                                    parseFloat(this.state['EMServicios'] ? this.state['EMServicios'] : 0) + 
                                    parseFloat(this.state['EMTelefono'] ? this.state['EMTelefono'] : 0) + 
                                    parseFloat(this.state['EMTransporte'] ? this.state['EMTransporte'] : 0) + 
                                    parseFloat(this.state['EMEducacion'] ? this.state['EMEducacion'] : 0) + 
                                    parseFloat(this.state['EMSalud'] ? this.state['EMSalud'] : 0) + 
                                    parseFloat(this.state['EMVestido'] ? this.state['EMVestido'] : 0) + 
                                    parseFloat(this.state['EMRecreacion'] ? this.state['EMRecreacion'] : 0) + 
                                    parseFloat(this.state['EMDeudas'] ? this.state['EMDeudas'] : 0) + 
                                    parseFloat(this.state['EMOtros'] ? this.state['EMOtros'] : 0)
                                }
                                margin="normal"
                                style={{width: '80%'}}
                            /> 
                        </div>

                    </div>


                    {/* ALIMENTACION */}
                    <h1 style={{backgroundColor: '#5c70d2', color:'white'}}>ALIMENTACION</h1>
                    <div className={classes.container}>
                        <this.txtField nombre="Cereales" classes={classes} options={Alimentacion} onChange={this.handleChange}/>
                        <this.txtField nombre="Leguminosas" classes={classes} options={Alimentacion} onChange={this.handleChange}/>
                        <this.txtField nombre="Pastas" classes={classes} options={Alimentacion} onChange={this.handleChange}/>
                        <this.txtField nombre="Fruta" classes={classes} options={Alimentacion} onChange={this.handleChange}/>
                        <this.txtField nombre="Tortilla" classes={classes} options={Alimentacion} onChange={this.handleChange}/>
                        <this.txtField nombre="Huevo" classes={classes} options={Alimentacion} onChange={this.handleChange}/>
                        <this.txtField nombre="Leche" classes={classes} options={Alimentacion} onChange={this.handleChange}/>
                        <this.txtField nombre="Refresco" classes={classes} options={Alimentacion} onChange={this.handleChange}/>
                        <this.txtField nombre="Carne" classes={classes} options={Alimentacion} onChange={this.handleChange}/>
                        <this.txtField nombre="Pollo" classes={classes} options={Alimentacion} onChange={this.handleChange}/>
                        <this.txtField nombre="Pescado/Mariscos" classes={classes} options={Alimentacion} onChange={this.handleChange}/>
                        <this.txtField nombre="Tipos de Apoyo" classes={classes} onChange={this.handleChange}/>

                        <TextField
                            id={"ObservacionesA" }
                            label={"Observaciones" }
                            placeholder={"Observaciones"}
                            multiline
                            className={classes.textField}
                            margin="normal"
                            onChange={(e) => this.setState({ observacionesA: e.target.value })} 
                            style={{width: '80%'}}
                        />
                    </div>

                    {/* VIVIENDA */}
                    <h1 style={{backgroundColor: '#5c70d2', color:'white'}}>VIVIENDA</h1>
                    <div className={classes.container}>
                        
                        <this.txtField nombre="Condicion" classes={classes} options={CondicionVivienda} onChange={this.handleChange}/>
                        <this.txtField nombre="Zona" classes={classes} options={Zona} onChange={this.handleChange}/>
                        <this.txtField nombre="Caracteristicas" classes={classes} options={Caracteristicas} onChange={this.handleChange}/>
                        <this.txtField nombre="Menaje" classes={classes} options={Menaje} onChange={this.handleChange}/>
                        <this.txtField nombre="Dormitorios" classes={classes} onChange={this.handleChange}/>
                        <this.txtField nombre="Cocina" classes={classes} onChange={this.handleChange}/>
                        <this.txtField nombre="Sala" classes={classes} onChange={this.handleChange}/>
                        <this.txtField nombre="Comedor" classes={classes} onChange={this.handleChange}/>
                        <this.txtField nombre="Baños" classes={classes} onChange={this.handleChange}/>
                        <this.txtField nombre="Otros" classes={classes} onChange={this.handleChange}/>
                        <this.txtField nombre="Organizacion e higiene" id="OrgEHig" classes={classes} onChange={this.handleChange}/>

                        <div style={{width: '100%'}}>
                            <br/>
                            <hr style={{height: '2px', backgroundColor: '#172fdc'}}/>   
                            <TextField
                                id={"CantidadV" }
                                label={"Cantidad Vehiculos" }
                                placeholder={"Cantidad Vehiculos"}
                                className={classes.textField}
                                margin="normal"
                                onChange={(e) => this.setState({ vcantidad: e.target.value })} 
                                style={{width: '150px'}}
                            />
                            {this.cvehiculos(classes)}
                            <br/>
                            <hr style={{height: '2px', backgroundColor: '#172fdc'}}/> 
                        </div> 

                        <TextField
                            id={"ObservacionesA" }
                            label={"Observaciones" }
                            placeholder={"Observaciones"}
                            multiline
                            className={classes.textField}
                            margin="normal"
                            onChange={(e) => this.setState({ observacionesA: e.target.value })} 
                            style={{width: '80%'}}
                        />
                    </div>

                    {/* SALUD */}
                    <h1 style={{backgroundColor: '#5c70d2', color:'white'}}>SALUD</h1>
                    <div className={classes.container}>
                        <div style={{width: '100%'}}>
                            <br/>
                            <hr style={{height: '2px', backgroundColor: '#172fdc'}}/>   
                            <TextField
                                id={"CantidadAM" }
                                label={"Cantidad Atencion Medica" }
                                placeholder={"Cantidad Atencion Medica"}
                                className={classes.textField}
                                margin="normal"
                                onChange={(e) => this.setState({ mcantidad: e.target.value })} 
                                style={{width: '250px'}}
                            />
                            {this.cmedica(classes)}
                            <br/>
                            <hr style={{height: '2px', backgroundColor: '#172fdc'}}/> 
                        </div> 

                        <TextField
                            id={"ObservacionesA" }
                            label={"Observaciones" }
                            placeholder={"Observaciones"}
                            multiline
                            className={classes.textField}
                            margin="normal"
                            onChange={(e) => this.setState({ observacionesA: e.target.value })} 
                            style={{width: '80%'}}
                        />

                        <h3 style={{backgroundColor: '#acb8f3', color:'white'}}>ESTADO ACTUAL DE SALUD</h3>

                        <TextField
                            id={"CasoES" }
                            label={"Caso" }
                            placeholder={"Caso"}
                            multiline
                            className={classes.textField}
                            margin="normal"
                            onChange={(e) => this.setState({ casoES: e.target.value })} 
                            style={{width: '80%'}}
                        />

                        <TextField
                            id={"FamiliaES" }
                            label={"Familia" }
                            placeholder={"Familia"}
                            multiline
                            className={classes.textField}
                            margin="normal"
                            onChange={(e) => this.setState({ familiaES: e.target.value })} 
                            style={{width: '80%'}}
                        />
                    </div>

                    {/* SALUD */}
                    <h1 style={{backgroundColor: '#5c70d2', color:'white'}}>OTROS</h1>
                    <div className={classes.container}>

                        <TextField
                            id={"ReferenciasC" }
                            label={"Referencias Con Colaterales" }
                            placeholder={"Referencias Con Colaterales"}
                            multiline
                            className={classes.textField}
                            margin="normal"
                            onChange={(e) => this.setState({ referenciasC: e.target.value })} 
                            style={{width: '80%'}}
                        />

                        <TextField
                            id={"HistoriaS" }
                            label={"Historia Social" }
                            placeholder={"Historia Social"}
                            multiline
                            className={classes.textField}
                            margin="normal"
                            onChange={(e) => this.setState({ historiaS: e.target.value })} 
                            style={{width: '80%'}}
                        />

                        <TextField
                            id={"DiagnosticoSE" }
                            label={"Diagnostico Socio-Economico" }
                            placeholder={"Diagnostico Socio-Economico"}
                            multiline
                            className={classes.textField}
                            margin="normal"
                            onChange={(e) => this.setState({ diagnosticoSE: e.target.value })} 
                            style={{width: '80%'}}
                        />

                        <this.txtField nombre="Pronostico" classes={classes} options={Pronostico} onChange={this.handleChange}/>

                        <TextField
                            id={"PlanI" }
                            label={"Plan de Intervencion" }
                            placeholder={"Plan de Intervencion"}
                            multiline
                            className={classes.textField}
                            margin="normal"
                            onChange={(e) => this.setState({ planI: e.target.value })} 
                            style={{width: '80%'}}
                        />

                        <TextField
                            id={"Presupuesto" }
                            label={"Presupuesto" }
                            placeholder={"Presupuesto"}
                            multiline
                            className={classes.textField}
                            margin="normal"
                            onChange={(e) => this.setState({ presupuesto: e.target.value })} 
                            style={{width: '80%'}}
                        />

                        <TextField
                            id={"NotasSE" }
                            label={"Notas de seguimiento y/o Evolucion" }
                            placeholder={"Notas de seguimiento y/o Evolucion"}
                            multiline
                            className={classes.textField}
                            margin="normal"
                            onChange={(e) => this.setState({ notasSE: e.target.value })} 
                            style={{width: '80%'}}
                        />
                    </div>

                </div>
            </div>
        )
    }
}

export default withStyles(styles)(Socioeconomico);
