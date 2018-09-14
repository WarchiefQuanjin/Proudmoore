import React, { Component } from 'react'
import 'react-table/react-table.css'
import firebase from '../config'
import XLSX from 'xlsx'
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
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
    Pronostico,
    Vivienda,
    Bano,
    Dormitorios,
    TrabajadoraS
} from '../Constants/Options';
import TxtField from '../Components/TxtField';

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

class Socioeconomico extends Component {
    constructor(props) {
        super(props)
        this.state = {
            fcantidad : 0
        }
    }

    componentDidMount() {
        var user = this.props.location.user;
        
        if(user !== undefined){
            for (var i = 0; i < Object.keys(user.val).length; i++) {
                this.setState({[Object.keys(user.val)[i]]: Object.values(user.val)[i]});
            }
        }
    }

    tablaFamilia = (props) => {
        var fcantidad = '<p style="width: 100%;text-align: center;background-color: #4a76c5;color: white;margin-top: 30px;">COMPOSICION FAMILIAR</p>'+
        '<table style="width: 100%; align: left">'+
        '<tr>'+
            '<th>NOMBRE</th>'+
            '<th>EDAD</th>'+
            '<th>PARENTESCO</th>'+
            '<th>ESTADO CIVIL</th>'+
            '<th>OCUPACION</th>'+
            '<th>EMPLEO</th>'+
            '<th>ESCOLARIDAD</th>'
        '</tr>';

        for(var i = 0; i < props.fcantidad; i++){
            fcantidad += '<tr>'+
                '<td>'+props['Fam'+i+'nom']+'</td>'+
                '<td>'+props['Fam'+i+'edad']+'</td>'+
                '<td>'+props['Fam'+i+'parentesco']+'</td>'+
                '<td>'+props['Fam'+i+'ecivil']+'</td>'+
                '<td>'+props['Fam'+i+'ocupacion']+'</td>'+
                '<td>'+props['Fam'+i+'empleo']+'</td>'+
                '<td>'+props['Fam'+i+'escolaridad']+'</td>'
            '</tr>'
        }

        fcantidad += '</table>';

        return fcantidad;
    }

    tablaVivienda = (props) => {
        var vcantidad = '<p style="width: 100%;text-align: center;background-color: #4a76c5;color: white;margin-top: 30px;">VIVIENDA</p>'+
        '<div style="display: flex">'+
            '<div style="width: 50%">'+
                '<p style="width: 50%; display: inline-flex; margin-bottom: 8px">CONDICION </p><input style="width: 30%;" value="'+props.Condicion+'"/><br>'+
                '<p style="width: 50%; display: inline-flex; margin-bottom: 8px">CARACTERISTICAS </p><input style="width: 30%;" value="'+props.Caracteristicas+'"/><br>'+
                '<p style="width: 50%; display: inline-flex; margin-bottom: 8px">DORMITORIOS </p><input style="width: 30%;" value="'+props.Dormitorios+'"/><br>'+
                '<p style="width: 50%; display: inline-flex; margin-bottom: 8px">SALA </p><input style="width: 30%;" value="'+props.Sala+'"/><br>'+
                '<p style="width: 50%; display: inline-flex; margin-bottom: 8px">BAÑOS </p><input style="width: 30%;" value="'+props.Baños+'"/><br>'+
                '<p style="width: 50%; display: inline-flex; margin-bottom: 8px">ORGANIZACION E HIGIENE </p><input style="width: 30%;" value="'+props.OrgEHig+'"/><br>'+
            '</div>'+
            '<div style="width: 50%">'+
                '<p style="width: 50%; display: inline-flex; margin-bottom: 8px">ZONA </p><input style="width: 30%;" value="'+props.Zona+'"/><br>'+
                '<p style="width: 50%; display: inline-flex; margin-bottom: 8px">MENAJE </p><input style="width: 30%;" value="'+props.Menaje+'"/><br>'+
                '<p style="width: 50%; display: inline-flex; margin-bottom: 8px">COCINA </p><input style="width: 30%;" value="'+props.Cocina+'"/><br>'+
                '<p style="width: 50%; display: inline-flex; margin-bottom: 8px">COMEDOR </p><input style="width: 30%;" value="'+props.Comedor+'"/><br>'+
                '<p style="width: 50%; display: inline-flex; margin-bottom: 8px">OTROS </p><input style="width: 30%;" value="'+props.Otros+'"/><br>'+
            '</div>'+
        '</div>'+
        '<p style="width: 100%;text-align: center;">VEHICULOS</p>'+
        '<table style="width: 100%; align: left">'+
        '<tr>'+
            '<th>MARCA</th>'+
            '<th>MODELO</th>'+
        '</tr>';

        for(var i = 0; i < props.vcantidad; i++){
            vcantidad += '<tr>'+
                '<td>'+props['Veh'+i+'mar']+'</td>'+
                '<td>'+props['Veh'+i+'mod']+'</td>'+
            '</tr>'
        }

        vcantidad += '</table>'+
        '<p style="width: 50%">OBSERVACIONES </p><textarea rows="4" style="width: 100%; margin-top: -15px" >'+props.ObservacionesV+'</textarea>';

        return vcantidad;
    }

    tablaSalud = (props) => {
        var mcantidad = '<p style="width: 100%;text-align: center;background-color: #4a76c5;color: white;margin-top: 30px;">SALUD</p>'+
        '<table style="width: 100%; align: left">'+
        '<tr>'+
            '<th>HOSPITAL</th>'+
            '<th>NOTA</th>'+
        '</tr>';

        for(var i = 0; i < props.mcantidad; i++){
            mcantidad += '<tr>'+
                '<td>'+props['AteMed'+i]+'</td>';

            mcantidad += props['AteMed'+i+'Otros'] != undefined ? '<td>'+props['AteMed'+i+'Otros']+'</td>' : '';

            mcantidad += '</tr>';
        }

        mcantidad += '</table>'+
        '<p style="width: 50%">OBSERVACIONES </p><textarea rows="4" style="width: 100%; margin-top: -15px" >'+props.ObservacionesS+'</textarea>'+
        '<p style="width: 100%;text-align: center;background-color: #4a76c5;color: white;margin-top: 30px;">SALUD</p>'+
        '<p style="width: 50%">CASO </p><textarea rows="4" style="width: 100%; margin-top: -15px" >'+props.CasoES+'</textarea>'+
        '<p style="width: 50%">FAMILIA </p><textarea rows="4" style="width: 100%; margin-top: -15px" >'+props.FamiliaES+'</textarea>';

        return mcantidad;
    }

    print = (event, props) => {
        event.preventDefault();

        const gridName="Warsong";

        const tableHeader = '<div style="display:flex">'+
        '<img src="https://igx.4sqi.net/img/general/width960/82417073_V22Qrk5dPbOj3XmuXQi0gksLG4bHRXVJ-Y3JZNgNnXo.png" alt="W3Schools.com" style="width:100px;height:100px;">'+
        '<h2 style="width:600px; height:100px; text-align:center">CASOS EMERGENTES<br>ESTUDIO SOCIOECONOMICO</h2>'+
        '<h2 style="width:100px; height:100px;"></h2>'+
        '</div>';
        
        const formato = '<div style="display: flex">'+
        '<div style="width: 50%; text-align:right">'+
            '<p style="width: 100px; display: contents">FECHA DE APLICACION </p><input value="'+props.Fecha+'"/><br>'+
            '<p style="width: 100px; display: contents">APOYO QUE SOLICITA </p><input value="'+props.Apoyo+'"/>'+
        '</div>'+
        '<div style="width: 50%; text-align:right">'+
            '<p style="width: 100px; display: contents">NO. DE CASO </p><input value="'+props.Numero+'"/><br>'+
            '<p style="width: 100px; display: contents">Trabajadora Social </p><input value="'+props.Trabajadora+'"/>'+
        '</div></div>';

        const datosg = '<p style="width: 100%;text-align: center;background-color: #4a76c5;color: white;margin-top: 30px;">DATOS GENERALES</p>'+
        '<div style="display:flex">'+
            '<div style="width: 60%; text-align:right">'+
                '<p style="width: 100px; display: contents">NOMBRE DEL CASO </p><input style="width: 50%;" value="'+props.Caso+'"/><br>'+
                '<p style="width: 100px; display: contents">CALLE </p><input style="width: 50%;" value="'+props.Calle+'"/><br>'+
                '<p style="width: 100px; display: contents">COLONIA </p><input style="width: 50%;" value="'+props.Colonia+'"/><br>'+
                '<p style="width: 100px; display: contents">MUNICIPIO </p><input value="'+props.Municipio+'"/><br>'+
                '<p style="width: 100px; display: contents">TELEFONO </p><input style="width: 50%;" value="'+props.Telefono+'"/><br>'+
                '<p style="width: 100px; display: contents">TEL. RECADOS </p><input style="width: 50%;" value="'+props.TelefonoR+'"/><br>'+
                '<p style="width: 100px; display: contents">OCUPACION </p><input style="width: 50%;" value="'+props.Ocupacion+'"/><br>'+
                '<p style="width: 100px; display: contents">PARROQUIA </p><input style="width: 50%;" value="'+props.Parroquia+'"/><br>'+
                '<p style="width: 100px; display: contents">VICARIA </p><input value="'+props.Vicaria+'"/><br>'+
                '<p style="width: 100px; display: contents">PARENTESCO </p><input style="width: 50%;" value="'+props.Parentesco+'"/>'+
            '</div>'+
            '<div style="width: 40%; text-align:right">'+
                '<p style="width: 100px; display: contents">EDAD </p><input style="width: 20%;" value="'+props.Edad+'"/><br>'+
                '<p style="width: 100px; display: contents">CRUCE DE CALLES </p><input style="width: 50%;" value="'+props.Cruce+'"/><br>'+
                '<p style="width: 100px; display: contents">C.P. </p><input value="'+props.CP+'"/><br>'+
                '<p style="width: 100px; display: contents">ESTADO </p><input value="'+props.Estado+'"/><br>'+
                '<p style="width: 100px; display: contents">CEL </p><input value="'+props.Celular+'"/><br>'+
                '<p style="width: 100px; display: contents">ESTADO CIVIL </p><input style="width: 50%;" style="width: 60%;" value="'+props.ECivil+'"/><br>'+
                '<p style="width: 100px; display: contents">ESCOLARIDAD </p><input style="width: 50%;" value="'+props.Escolaridad+'"/><br>'+
                '<p style="width: 100px; display: contents">DECANATO </p><input value="'+props.Decanato+'"/><br>'+
                '<p style="width: 100px; display: contents">PERSONA ENTREVISTADA </p><input style="width: 50%;" value="'+props.Persona+'"/>'+
            '</div>'+
        '</div>';

        const observaciones = '<div style="margin-top: 25px"><p style="width: 100%">OBSERVACIONES </p><textarea rows="4" style="width: 100%; margin-top: -15px" >'+props.ObservacionesCF+'</textarea></div>'
        
        const ingresoT = parseFloat(props.IngresoF ? props.IngresoF : 0) + parseFloat(props.IngresoO ? props.IngresoO : 0);
        const egresoT = parseFloat(props.EMAlimentacion ? props.EMAlimentacion : 0) + parseFloat(props.EMVivienda ? props.EMVivienda : 0) + 
            parseFloat(props.EMServicios ? props.EMServicios : 0) + parseFloat(props.EMTelefono ? props.EMTelefono : 0) + 
            parseFloat(props.EMTransporte ? props.EMTransporte : 0) + parseFloat(props.EMEducacion ? props.EMEducacion : 0) + 
            parseFloat(props.EMSalud ? props.EMSalud : 0) + parseFloat(props.EMVestido ? props.EMVestido : 0) + 
            parseFloat(props.EMRecreacion ? props.EMRecreacion : 0) + parseFloat(props.EMDeudas ? props.EMDeudas : 0) + 
            parseFloat(props.EMOtros ? props.EMOtros : 0);
        const diferencia = ingresoT - egresoT;
        const economicos = '<p style="width: 100%;text-align: center;background-color: #4a76c5;color: white;margin-top: 30px;">DATOS ECONOMICOS</p><div style="display: flex">'+
            '<div style="width: 50%">'+
                '<p style="width: 100%;text-align: center;">INGRESOS MENSUALES</p>'+
                '<p style="width: 50%; display: inline-flex; margin-bottom: 8px">INGRESO FAMILIAR </p><input style="width: 20%;" value="'+props.IngresoF+'"/><br>'+
                '<p style="width: 50%; display: inline-flex; margin-bottom: 8px">OTROS INGRESOS </p><input style="width: 20%;" value="'+props.IngresoO+'"/><br>'+
                '<p style="width: 50%; display: inline-flex; margin-bottom: 8px">TOTAL DE INGRESOS </p><input style="width: 20%;" value="'+ingresoT+'"/><br>'+
                '<p style="width: 50%; display: inline-flex; margin-bottom: 8px">DIFERENCIA </p><input style="width: 20%;" value="'+diferencia+'"/><br>'+
                '<p style="width: 50%">OBSERVACIONES </p><textarea rows="4" style="width: 95%; margin-top: -15px" >'+props.ObservacionesDE+'</textarea>'+
            '</div>'+
            '<div style="width: 50%">'+
                '<p style="width: 100%;text-align: center;">EGRESOS MENSUALES</p>'+
                '<p style="width: 50%; display: inline-flex; margin-bottom: 8px">ALIMENTACION </p><input style="width: 20%;" value="'+props.EMAlimentacion+'"/><br>'+
                '<p style="width: 50%; display: inline-flex; margin-bottom: 8px">VIVIENDA </p><input style="width: 20%;" value="'+props.EMVivienda+'"/><br>'+
                '<p style="width: 50%; display: inline-flex; margin-bottom: 8px">SERVICIOS BASICOS </p><input style="width: 20%;" value="'+props.EMServicios+'"/><br>'+
                '<p style="width: 50%; display: inline-flex; margin-bottom: 8px">TELEFONO </p><input style="width: 20%;" value="'+props.EMTelefono+'"/><br>'+
                '<p style="width: 50%; display: inline-flex; margin-bottom: 8px">TRANSPORTE </p><input style="width: 20%;" value="'+props.EMTransporte+'"/><br>'+
                '<p style="width: 50%; display: inline-flex; margin-bottom: 8px">EDUCACION </p><input style="width: 20%;" value="'+props.EMEducacion+'"/><br>'+
                '<p style="width: 50%; display: inline-flex; margin-bottom: 8px">SALUD </p><input style="width: 20%;" value="'+props.EMSalud+'"/><br>'+
                '<p style="width: 50%; display: inline-flex; margin-bottom: 8px">VESTIDO </p><input style="width: 20%;" value="'+props.EMVestido+'"/><br>'+
                '<p style="width: 50%; display: inline-flex; margin-bottom: 8px">RECREACION </p><input style="width: 20%;" value="'+props.EMRecreacion+'"/><br>'+
                '<p style="width: 50%; display: inline-flex; margin-bottom: 8px">DEUDAS </p><input style="width: 20%;" value="'+props.EMDeudas+'"/><br>'+
                '<p style="width: 50%; display: inline-flex; margin-bottom: 8px">OTROS </p><input style="width: 20%;" value="'+props.EMOtros+'"/><br>'+
                '<p style="width: 50%; display: inline-flex; margin-bottom: 8px">TOTAL DE EGRESOS </p><input style="width: 20%;" value="'+egresoT+'"/><br>'+
            '</div>'+
        '</div>';

        const alimentacion = '<p style="width: 100%;text-align: center;background-color: #4a76c5;color: white;margin-top: 30px;">ALIMENTACION</p>'+
        '<div style="display: flex">'+
            '<div style="width: 50%">'+
                '<p style="width: 50%; display: inline-flex; margin-bottom: 8px">CEREALES </p><input style="width: 20%;" value="'+props.Cereales+'"/><br>'+
                '<p style="width: 50%; display: inline-flex; margin-bottom: 8px">PASTAS </p><input style="width: 20%;" value="'+props.Pastas+'"/><br>'+
                '<p style="width: 50%; display: inline-flex; margin-bottom: 8px">TORTILLA </p><input style="width: 20%;" value="'+props.Tortilla+'"/><br>'+
                '<p style="width: 50%; display: inline-flex; margin-bottom: 8px">LECHE </p><input style="width: 20%;" value="'+props.Leche+'"/><br>'+
                '<p style="width: 50%; display: inline-flex; margin-bottom: 8px">CARNE </p><input style="width: 20%;" value="'+props.Carne+'"/><br>'+
                '<p style="width: 50%; display: inline-flex; margin-bottom: 8px">PESCADO/MARISCOS </p><input style="width: 20%;" value="'+props.Mar+'"/><br>'+
            '</div>'+
            '<div style="width: 50%">'+
                '<p style="width: 50%; display: inline-flex; margin-bottom: 8px">LEGUMINOSAS </p><input style="width: 20%;" value="'+props.Leguminosas+'"/><br>'+
                '<p style="width: 50%; display: inline-flex; margin-bottom: 8px">FRUTA </p><input style="width: 20%;" value="'+props.Fruta+'"/><br>'+
                '<p style="width: 50%; display: inline-flex; margin-bottom: 8px">HUEVO </p><input style="width: 20%;" value="'+props.Huevo+'"/><br>'+
                '<p style="width: 50%; display: inline-flex; margin-bottom: 8px">REFRESCO </p><input style="width: 20%;" value="'+props.Refresco+'"/><br>'+
                '<p style="width: 50%; display: inline-flex; margin-bottom: 8px">POLLO </p><input style="width: 20%;" value="'+props.Pollo+'"/><br>'+
                '<p style="width: 50%; display: inline-flex; margin-bottom: 8px">TIPOS DE APOYO </p><input style="width: 20%;" value="'+props.TiposA+'"/><br>'+
            '</div>'+
        '</div>'+
        '<p style="width: 50%">OBSERVACIONES </p><textarea rows="4" style="width: 100%; margin-top: -15px" >'+props.ObservacionesA+'</textarea>';

        const otros = '<p style="width: 100%;text-align: center;background-color: #4a76c5;color: white;margin-top: 30px;">OTROS</p>'+
        '<p style="width: 50%">REFERENCIA CON COLATERALES  </p><textarea rows="4" style="width: 100%; margin-top: -15px" >'+props.ReferenciasC+'</textarea>'+
        '<p style="width: 50%">HISTORIA SOCIAL </p><textarea rows="4" style="width: 100%; margin-top: -15px" >'+props.HistoriaS+'</textarea>'+
        '<p style="width: 50%">DIAGNOSTICO SOCIO-ECONOMICO </p><textarea rows="4" style="width: 100%; margin-top: -15px" >'+props.DiagnosticoSE+'</textarea>'+
        '<p style="width: 50%; display: inline-flex; margin-bottom: 8px">PRONOSTICO </p><input style="width: 20%;" value="'+props.Pronostico+'"/><br>'+
        '<p style="width: 50%">PLAN DE INTERVENCION </p><textarea rows="4" style="width: 100%; margin-top: -15px" >'+props.PlanI+'</textarea>'+
        '<p style="width: 50%">PRESUPUESTO </p><textarea rows="4" style="width: 100%; margin-top: -15px" >'+props.Presupuesto+'</textarea>'+
        '<p style="width: 50%">NOTAS DE SEGUIMIENTO </p><textarea rows="4" style="width: 100%; margin-top: -15px" >'+props.NotasSE+'</textarea>';


        const documentToPrint = window.open('about:blank', 'Print', 'location=0,height=1500,width=800');
        documentToPrint.document
            .write('<link rel="stylesheet" href="//cdn.jsdelivr.net/bootstrap/latest/css/bootstrap.min.css" />');
        documentToPrint.document.title = gridName;
        documentToPrint.document.write('<body onload="window.print();">');
        documentToPrint.document.write(tableHeader);
        documentToPrint.document.write(formato);
        documentToPrint.document.write(datosg);
        documentToPrint.document.write(this.tablaFamilia(props));
        documentToPrint.document.write(observaciones);
        documentToPrint.document.write(economicos);
        documentToPrint.document.write(alimentacion);
        documentToPrint.document.write(this.tablaVivienda(props));
        documentToPrint.document.write(this.tablaSalud(props));
        documentToPrint.document.write(otros);
        documentToPrint.document.write('</body>');
        documentToPrint.document.close();
    }

    modify = (event) => {
        event.preventDefault();
        var user = this.props.location.user;
        var itemsRef = firebase.database().ref('casos');
        let casos = {};

        Object.keys(this.state).map(i => casos[i] = this.state[i])

        itemsRef.child(user.key).update(casos);
    }

    save = (event) => {
        event.preventDefault();
        let casos = {};
        /* Object.keys(this.state).map(i => {if(i!="users"){casos[i] = this.state[i]}}) */
        Object.keys(this.state).map(i => casos[i] = this.state[i])
        /* Object.keys(this.state).map(i => casos.push(i)) */
        Object.keys(this.state).map(i => console.log(i)) 
        /* console.log("------");
        console.log(casos) */

        /* Object.keys(this.state).map(i => console.log(this.state[i])) */

        firebase.database().ref('casos').push(casos);
    }

    txtField = (props) => {
        var id = props.id ? props.id : props.nombre;
        var term = props.term ? props.term : 'px';

        return (
            <TextField
                id={id}
                label={props.nombre}
                select={props.options !== undefined}
                placeholder={props.nombre}
                className={props.classes.textField}
                margin="normal"
                multiline={props.multiline && props.multiline}
                onChange={(event) => props.onChange(id, event.target.value)}
                value={this.state[id] ? this.state[id] : ''}
                style={props.width && {width: props.width + term}}
            >
            {
                props.options && props.options.map((option, i) => (
                    <MenuItem key={i} value={option.value}>
                        {option.label ? option.label : option.value}
                    </MenuItem>
                ))
            }
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
                    <this.txtField id={"Fam" + i + "ecivil"} nombre={"Estado Civil"} classes={classes} width={100} options={ECivil} onChange={this.handleChange}/>
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
                    <TxtField id={"AteMed" + i} nombre={"Hospital"} options={AtencionMedica} classes={classes} width={300} onChange={this.handleChange} state={this.state}/>
                    {this.state["AteMed" + i] === 'OTROS' && <TxtField id={"AteMed" + i + 'OTROS'} nombre={"Hospital"} classes={classes} width={300} onChange={this.handleChange} state={this.state}/> }
                </div>
            );
        }
        return rows;
    }
    
    render() {
        const { classes } = this.props;
        const modifying = this.props.location.modifying;

        const ingresoTotal = parseFloat(this.state['IngresoO'] ? this.state['IngresoO'] : 0) + parseFloat(this.state['IngresoF'] ? this.state['IngresoF'] : 0); 
        const egresoTotal = parseFloat(this.state['EMAlimentacion'] ? this.state['EMAlimentacion'] : 0) + 
            parseFloat(this.state['EMVivienda'] ? this.state['EMVivienda'] : 0) + parseFloat(this.state['EMServicios'] ? this.state['EMServicios'] : 0) + 
            parseFloat(this.state['EMTelefono'] ? this.state['EMTelefono'] : 0) + parseFloat(this.state['EMTransporte'] ? this.state['EMTransporte'] : 0) + 
            parseFloat(this.state['EMEducacion'] ? this.state['EMEducacion'] : 0) + parseFloat(this.state['EMSalud'] ? this.state['EMSalud'] : 0) + 
            parseFloat(this.state['EMVestido'] ? this.state['EMVestido'] : 0) + parseFloat(this.state['EMRecreacion'] ? this.state['EMRecreacion'] : 0) + 
            parseFloat(this.state['EMDeudas'] ? this.state['EMDeudas'] : 0) + parseFloat(this.state['EMOtros'] ? this.state['EMOtros'] : 0);
        const diferencia = ingresoTotal - egresoTotal;

        return (
            <div className={classes.root}>
                <div style={{marginBottom: '70px'}}>
                    <Button variant="contained" color="primary" className={classes.button} onClick={(event) => this.print(event, this.state)}> 
                    {/* <Button variant="contained" color="primary" className={classes.button} onClick={(event) => this.save(event)}>  */}
                        Imprimir
                    </Button>
                    <h1 style={{backgroundColor: '#5c70d2', color:'white'}}>FORMATO</h1>
                    <div className={classes.container}>
                        <TxtField nombre="Fecha" type={'date'} onChange={this.handleChange} state={this.state}/>
                        <TxtField nombre="Apoyo" onChange={this.handleChange} state={this.state} state={this.state}/>
                        <TxtField nombre="No. De Caso" id="Numero" classes={classes} onChange={this.handleChange} state={this.state}/>
                        <TxtField nombre="Trabajadora Social" id="Trabajadora" options={TrabajadoraS} classes={classes} onChange={this.handleChange} state={this.state}/>
                    </div>

                    <h1 style={{backgroundColor: '#5c70d2', color:'white'}}>DATOS GENERALES</h1>
                    <div className={classes.container}>
                        <TxtField nombre="Nombre del caso" classes={classes} id="Caso" onChange={this.handleChange} state={this.state}/>
                        <TxtField nombre="Edad" classes={classes} onChange={this.handleChange} state={this.state}/>
                        <TxtField nombre="Calle" classes={classes} onChange={this.handleChange} state={this.state}/>
                        <TxtField nombre="Cruce de calles" classes={classes} id ="Cruce" onChange={this.handleChange} state={this.state}/>
                        <TxtField nombre="Colonia" classes={classes} onChange={this.handleChange} state={this.state}/>
                        <TxtField nombre="Codigo postal" classes={classes} id ="CP" onChange={this.handleChange} state={this.state}/>
                        <TxtField nombre="Municipio" classes={classes} onChange={this.handleChange} state={this.state}/>
                        <TxtField nombre="Estado" classes={classes} onChange={this.handleChange} state={this.state}/>
                        <TxtField nombre="Telefono" classes={classes} onChange={this.handleChange} state={this.state}/>
                        <TxtField nombre="Celular" classes={classes} onChange={this.handleChange} state={this.state}/>
                        <TxtField nombre="Telefono recados" classes={classes} id ="TelefonoR" onChange={this.handleChange} state={this.state}/>
                        <TxtField nombre="Estado civil" classes={classes} id ="ECivil" options={ECivil} onChange={this.handleChange} state={this.state}/>
                        <TxtField nombre="Ocupacion" classes={classes} onChange={this.handleChange} state={this.state}/>
                        <TxtField nombre="Escolaridad" classes={classes} options={Escolaridad} onChange={this.handleChange} state={this.state}/>
                        <TxtField nombre="Parroquia" classes={classes} onChange={this.handleChange} state={this.state}/>
                        <TxtField nombre="Decanato" classes={classes} onChange={this.handleChange} state={this.state}/>
                        <TxtField nombre="Vicaria" classes={classes} onChange={this.handleChange} state={this.state}/>
                        <TxtField nombre="Persona Entrevistada" classes={classes} id ="Persona" onChange={this.handleChange} state={this.state}/>
                        <TxtField nombre="Parentesco" classes={classes} options={Parentesco} onChange={this.handleChange} state={this.state}/>
                    </div>

                    <br/>

                    <div className={classes.container}>
                        <h1 style={{backgroundColor: '#5c70d2', color:'white'}}>COMPOSICION FAMILIAR</h1>
                        <TxtField nombre={"Cantidad"} id={"fcantidad"} classes={classes} width={80} onChange={this.handleChange} state={this.state}/>
                        {this.cfamiliar(classes)}
                        <TxtField id={"ObservacionesCF"} nombre={"Observaciones"} multiline={true} classes={classes} width={80} term={"%"} onChange={this.handleChange} state={this.state}/>
                    </div>

                    <br/>

                    {/* DATOS ECONOMICOS */}
                    <h1 style={{backgroundColor: '#5c70d2', color:'white'}}>DATOS ECONOMICOS</h1>
                    <div className={classes.container}>

                        {/* INGRESOS MENSUALES */}
                        <div style={{width:'50%'}}>
                            <h4 style={{marginTop: '0px'}}>INGRESOS MENSUALES</h4>

                            <TxtField nombre="Ingreso Familiar" id='IngresoF' classes={classes} onChange={this.handleChange} state={this.state}/>
                            <TxtField nombre="Otros Ingresos" id='IngresoO' classes={classes} onChange={this.handleChange} state={this.state}/>
                            
                            <TextField
                                id={'IngresoT'}
                                disabled
                                label={"Total de ingresos"}
                                placeholder={"Total de ingresos"}
                                className={classes.textField}
                                value={ingresoTotal}
                                margin="normal"
                            />
                            <TextField
                                id={'Diferencia'}
                                disabled
                                label={"Diferencia"}
                                placeholder={"Diferencia"}
                                className={classes.textField}
                                value={diferencia}
                                margin="normal"
                            />
                            <TxtField id={"ObservacionesDE"} nombre={"Observaciones"} multiline={true} classes={classes} width={80} term={"%"} onChange={this.handleChange} state={this.state}/>
                        </div>

                        {/* EGRESOS MENSUALES */}
                        <div style={{width:'50%'}}>
                            <h4 style={{marginTop: '0px'}}>EGRESOS MENSUALES</h4>

                            <TxtField nombre="Alimentacion" id='EMAlimentacion' classes={classes} onChange={this.handleChange} state={this.state}/>
                            <TxtField nombre="Vivienda" id='EMVivienda' classes={classes} onChange={this.handleChange} state={this.state}/>
                            <TxtField nombre="Servicios Basicos" id='EMServicios' classes={classes} onChange={this.handleChange} state={this.state}/>
                            <TxtField nombre="Telefono" id='EMTelefono' classes={classes} onChange={this.handleChange} state={this.state}/>
                            <TxtField nombre="Transporte" id='EMTransporte' classes={classes} onChange={this.handleChange} state={this.state}/>
                            <TxtField nombre="Educacion" id='EMEducacion' classes={classes} onChange={this.handleChange} state={this.state}/>
                            <TxtField nombre="Salud" id='EMSalud' classes={classes} onChange={this.handleChange} state={this.state}/>
                            <TxtField nombre="Vestido" id='EMVestido' classes={classes} onChange={this.handleChange} state={this.state}/>
                            <TxtField nombre="Recreacion" id='EMRecreacion' classes={classes} onChange={this.handleChange} state={this.state}/>
                            <TxtField nombre="Deudas" id='EMDeudas' classes={classes} onChange={this.handleChange} state={this.state}/>
                            <TxtField nombre="Otros" id='EMOtros' classes={classes} onChange={this.handleChange} state={this.state}/>
                            
                            <TextField
                                id={'EMEngresoT'}
                                disabled
                                label={"Total de egresos"}
                                placeholder={"Total de egresos"}
                                className={classes.textField}
                                value={egresoTotal}
                                margin="normal"
                                style={{width: '80%'}}
                            /> 
                        </div>
                    </div>

                    {/* ALIMENTACION */}
                    <h1 style={{backgroundColor: '#5c70d2', color:'white'}}>ALIMENTACION</h1>
                    <div className={classes.container}>
                        <TxtField nombre="Cereales" classes={classes} options={Alimentacion} onChange={this.handleChange} state={this.state}/>
                        <TxtField nombre="Leguminosas" classes={classes} options={Alimentacion} onChange={this.handleChange} state={this.state}/>
                        <TxtField nombre="Pastas" classes={classes} options={Alimentacion} onChange={this.handleChange} state={this.state}/>
                        <TxtField nombre="Fruta" classes={classes} options={Alimentacion} onChange={this.handleChange} state={this.state}/>
                        <TxtField nombre="Tortilla" classes={classes} options={Alimentacion} onChange={this.handleChange} state={this.state}/>
                        <TxtField nombre="Huevo" classes={classes} options={Alimentacion} onChange={this.handleChange} state={this.state}/>
                        <TxtField nombre="Leche" classes={classes} options={Alimentacion} onChange={this.handleChange} state={this.state}/>
                        <TxtField nombre="Refresco" classes={classes} options={Alimentacion} onChange={this.handleChange} state={this.state}/>
                        <TxtField nombre="Carne" classes={classes} options={Alimentacion} onChange={this.handleChange} state={this.state}/>
                        <TxtField nombre="Pollo" classes={classes} options={Alimentacion} onChange={this.handleChange} state={this.state}/>
                        <TxtField nombre="Pescado o Mariscos" id="Mar" classes={classes} options={Alimentacion} onChange={this.handleChange} state={this.state}/>
                        <TxtField nombre="Tipos de Apoyo" id="TiposA" classes={classes} onChange={this.handleChange} state={this.state}/>
                        <TxtField id={"ObservacionesA"} nombre={"Observaciones"} multiline={true} classes={classes} width={80} term={"%"} onChange={this.handleChange} state={this.state}/>
                    </div>

                    {/* VIVIENDA */}
                    <h1 style={{backgroundColor: '#5c70d2', color:'white'}}>VIVIENDA</h1>
                    <div className={classes.container}>
                        
                        <TxtField nombre="Condicion" classes={classes} options={CondicionVivienda} onChange={this.handleChange} state={this.state}/>
                        <TxtField nombre="Zona" classes={classes} options={Zona} onChange={this.handleChange} state={this.state}/>
                        <TxtField nombre="Caracteristicas" classes={classes} options={Caracteristicas} onChange={this.handleChange} state={this.state}/>
                        <TxtField nombre="Menaje" classes={classes} options={Menaje} onChange={this.handleChange} state={this.state}/>
                        <TxtField nombre="Dormitorios" classes={classes} options={Dormitorios} onChange={this.handleChange} state={this.state}/>
                        <TxtField nombre="Cocina" classes={classes} options={Vivienda} onChange={this.handleChange} state={this.state}/>
                        <TxtField nombre="Sala" classes={classes} options={Vivienda} onChange={this.handleChange} state={this.state}/>
                        <TxtField nombre="Comedor" classes={classes} options={Vivienda} nChange={this.handleChange} state={this.state}/>
                        <TxtField nombre="Baños" classes={classes} options={Bano} onChange={this.handleChange} state={this.state}/>
                        <TxtField nombre="Otros" classes={classes} onChange={this.handleChange} state={this.state}/>
                        <TxtField nombre="Organizacion e higiene" id="OrgEHig" classes={classes} onChange={this.handleChange} state={this.state}/>

                        <div style={{width: '100%'}}>
                            <br/>
                            <hr style={{height: '2px', backgroundColor: '#172fdc'}}/>   
                            <TxtField id={"vcantidad"} nombre={"Cantidad Vehiculos"} classes={classes} width={150} term={"px"} onChange={this.handleChange} state={this.state}/>
                            {this.cvehiculos(classes)}
                            <br/>
                            <hr style={{height: '2px', backgroundColor: '#172fdc'}}/> 
                        </div>
                        <TxtField id={"ObservacionesV"} nombre={"Observaciones"} multiline={true} classes={classes} width={80} term={"%"} onChange={this.handleChange} state={this.state}/>
                    </div>

                    {/* SALUD */}
                    <h1 style={{backgroundColor: '#5c70d2', color:'white'}}>SALUD</h1>
                    <div className={classes.container}>
                        <div style={{width: '100%'}}>
                            <br/>
                            <hr style={{height: '2px', backgroundColor: '#172fdc'}}/>   
                            <TxtField id={"mcantidad"} nombre={"Cantidad Atencion Medica"} classes={classes} width={250} term={"px"} onChange={this.handleChange} state={this.state}/>
                            {this.cmedica(classes)}
                            <br/>
                            <hr style={{height: '2px', backgroundColor: '#172fdc'}}/> 
                        </div> 
                        <TxtField id={"ObservacionesS"} nombre={"Observaciones"} multiline={true} classes={classes} width={80} term={"%"} onChange={this.handleChange} state={this.state}/>
                        <h3 style={{backgroundColor: '#acb8f3', color:'white'}}>ESTADO ACTUAL DE SALUD</h3>
                        <TxtField id={"CasoES"} nombre={"Caso"} multiline={true} classes={classes} width={80} term={"%"} onChange={this.handleChange} state={this.state}/>
                        <TxtField id={"FamiliaES"} nombre={"Familia"} multiline={true} classes={classes} width={80} term={"%"} onChange={this.handleChange} state={this.state}/>
                    </div>

                    {/* OTROS */}
                    <h1 style={{backgroundColor: '#5c70d2', color:'white'}}>OTROS</h1>
                    <div className={classes.container}>
                        <TxtField id={"ReferenciasC"} nombre={"Referencias Con Colaterales"} multiline={true} classes={classes} width={80} term={"%"} onChange={this.handleChange} state={this.state}/>
                        <TxtField id={"HistoriaS"} nombre={"Historia Social"} multiline={true} classes={classes} width={80} term={"%"} onChange={this.handleChange} state={this.state}/>
                        <TxtField id={"DiagnosticoSE"} nombre={"Diagnostico Socio-Economico"} multiline={true} classes={classes} width={80} term={"%"} onChange={this.handleChange} state={this.state}/>
                        <TxtField nombre="Pronostico" classes={classes} options={Pronostico} onChange={this.handleChange} state={this.state}/>
                        <TxtField id={"PlanI"} nombre={"Plan de Intervencion"} multiline={true} classes={classes} width={80} term={"%"} onChange={this.handleChange} state={this.state}/>
                        <TxtField nombre={"Presupuesto"} multiline={true} classes={classes} width={80} term={"%"} onChange={this.handleChange} state={this.state}/>
                        <TxtField id={"NotasSE"} nombre={"Notas de seguimiento y/o Evolucion"} multiline={true} classes={classes} width={80} term={"%"} onChange={this.handleChange} state={this.state}/>
                    </div>

                    <div className={classes.container}>
                        <Button variant="contained" color="primary" className={classes.button} onClick={(event) => modifying === 1 ? this.modify(event) : this.save(event)}> 
                        {/* <Button variant="contained" color="primary" className={classes.button} onClick={(event) => this.save(event)}>  */}
                            Guardar
                        </Button>
                    </div>

                </div>
            </div>
        )
    }
}

export default withStyles(styles)(Socioeconomico);
