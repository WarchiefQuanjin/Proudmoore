import React, { Component } from 'react'
import firebase from '../config'
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import TxtField from '../Components/TxtField';
import Snackbar from '@material-ui/core/Snackbar';
import Fade from '@material-ui/core/Fade';
import Autocomplete from '../Components/Autocomplete';
import Tooltip from '@material-ui/core/Tooltip';
import PrintIcon from '@material-ui/icons/Print';
import CreateIcon from '@material-ui/icons/Create';
import SaveIcon from '@material-ui/icons/Save';
import { 
    ECivil, 
    Empleo, 
    Alimentacion, 
    CondicionVivienda, 
    Zona,
    Menaje, 
    AtencionMedica,
    Apoyos,
    Pronostico,
    Vivienda,
    Bano,
    Dormitorios,
    TrabajadoraS,
    Piso,
    Techo,
    Muro,
    Procedencia,
    Sexo,
    Escolaridad,
    Parentesco,
    Estados,
    Decanatos,
    Municipios,
    TipoI,
    Edad,
    Donantes,
    Meses
} from '../Constants/Options';

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
        height: '50px'
    },
    title: {
        backgroundColor: '#5c70d2', 
        color: 'white',
        width: '95%'
    }
});

class Socioeconomico extends Component {
    constructor(props) {
        super(props)

        this.state = this.defaultState;
    }

    get defaultState() {
        return {  
            caso: {
                apcantidad: 0,
                fcantidad: 0,
                mcantidad: 0,
                vcantidad: 0,
                key: '',
                CFObservaciones: 'Ninguna',
                DEObservaciones: 'Ninguna',
                ALObservaciones: 'Ninguna',
                VVObservaciones: 'Ninguna',
                SLObservaciones: 'Ninguna',
                OTPlanI: 'ENTREVISTA INICIAL\nAPLICACION ESE\nVALORACION\nORIENTACION\nSEGUIMIENTO'
            }
        }
    }

    componentDidMount() {
        var user = this.props.location.user;
        
        this.props.checkToken()

        if(user !== undefined){
            var caso = {};
            for (var i = 0; i < Object.keys(user.val).length; i++) {
                caso[Object.keys(user.val)[i]] = Object.keys(user.val).map(i => user.val[i])[i];
            }

            this.setState({caso: caso, key: user.key});
        }
    }

    tablaFamilia = (props) => {
        var fcantidad = '<p style="width: 100%;text-align: center;background-color: #4a76c5;color: white;margin-top: 30px; -webkit-print-color-adjust: exact">COMPOSICION FAMILIAR</p>'
        
        if(parseInt(props.fcantidad, 10) > 0) {
            fcantidad += '<table style="width: 100%; align: left; font-size: 12px">'+
            '<tr>'+
                '<th>NOMBRE</th>'+
                '<th>EDAD</th>'+
                '<th>PARENTESCO</th>'+
                '<th>ESTADO CIVIL</th>'+
                '<th>OCUPACION</th>'+
                '<th>EMPLEO</th>'+
                '<th>ESCOLARIDAD</th>'+
            '</tr>';

            for(var i = 0; i < props.fcantidad; i++){
                fcantidad += '<tr>'+
                    '<td>'+props['CFFam'+i+'nom']+'</td>'+
                    '<td>'+props['CFFam'+i+'edad']+ ' ' +props['CFFam'+i+'tedad']+'</td>'+
                    '<td>'+props['CFFam'+i+'parentesco']+'</td>'+
                    '<td>'+props['CFFam'+i+'ecivil']+'</td>'+
                    '<td>'+props['CFFam'+i+'ocupacion']+'</td>'+
                    '<td>'+props['CFFam'+i+'empleo']+'</td>'+
                    '<td>'+props['CFFam'+i+'escolaridad']+'</td>'+
                '</tr>'
            }

            fcantidad += '</table>'
        }
        
        fcantidad += '<div style="margin-top: 25px">'+
            '<p style="width: 100%">OBSERVACIONES </p>'+
            '<textarea rows="'+this.resizeTextArea(props.CFObservaciones, 2)+'" style="width: 100%; margin-top: -15px; overflow-y: hidden" >'+props.CFObservaciones+'</textarea>'+
        '</div>'
        
        return fcantidad;
    }

    tablaVivienda = (props) => {
        var vcantidad = '<p style="width: 100%;text-align: center;background-color: #4a76c5;color: white;margin-top: 30px; -webkit-print-color-adjust: exact">VIVIENDA</p>'+
        '<div style="display: flex">'+
            '<div style="width: 50%">'+
                '<p style="width: 50%; display: inline-flex; margin-bottom: 8px">CONDICION </p><input style="width: 30%;" value="'+props.VVCondicion+'"/><br>'+
                '<p style="width: 50%; display: inline-flex; margin-bottom: 8px">PISO </p><input style="width: 30%;" value="'+props.VVPiso+'"/><br>'+
                '<p style="width: 50%; display: inline-flex; margin-bottom: 8px">TECHO </p><input style="width: 30%;" value="'+props.VVTecho+'"/><br>'+
                '<p style="width: 50%; display: inline-flex; margin-bottom: 8px">DORMITORIOS </p><input style="width: 30%;" value="'+props.VVDormitorios+'"/><br>'+
                '<p style="width: 50%; display: inline-flex; margin-bottom: 8px">SALA </p><input style="width: 30%;" value="'+props.VVSala+'"/><br>'+
                '<p style="width: 50%; display: inline-flex; margin-bottom: 8px">BAÑOS </p><input style="width: 30%;" value="'+props.VVBanos+'"/><br>'+
                '<p style="width: 50%; display: inline-flex; margin-bottom: 8px">ORGANIZACION E HIGIENE </p><input style="width: 30%;" value="'+(props.VVOrgEHig ? props.VVOrgEHig : '')+'"/><br>'+
            '</div>'+
            '<div style="width: 50%">'+
                '<p style="width: 50%; display: inline-flex; margin-bottom: 8px">ZONA </p><input style="width: 30%;" value="'+props.VVZona+'"/><br>'+
                '<p style="width: 50%; display: inline-flex; margin-bottom: 8px">MURO </p><input style="width: 30%;" value="'+props.VVMuro+'"/><br>'+
                '<p style="width: 50%; display: inline-flex; margin-bottom: 8px">MENAJE </p><input style="width: 30%;" value="'+props.VVMenaje+'"/><br>'+
                '<p style="width: 50%; display: inline-flex; margin-bottom: 8px">COCINA </p><input style="width: 30%;" value="'+props.VVCocina+'"/><br>'+
                '<p style="width: 50%; display: inline-flex; margin-bottom: 8px">COMEDOR </p><input style="width: 30%;" value="'+props.VVComedor+'"/><br>'+
                '<p style="width: 50%; display: inline-flex; margin-bottom: 8px">OTROS </p><input style="width: 30%;" value="'+(props.VVOtros ? props.VVOtros : '')+'"/><br>'+
            '</div>'+
        '</div>'+
        '<p style="width: 100%;text-align: center;">VEHICULOS</p>'+
        '<table style="width: 100%; align: left; font-size: 12px; margin-bottom: 15px">'+
        '<tr>'+
            '<th>MARCA</th>'+
            '<th>MODELO</th>'+
        '</tr>';

        for(var i = 0; i < props.vcantidad; i++){
            vcantidad += '<tr>'+
                '<td>'+props['VV'+i+'mar']+'</td>'+
                '<td>'+props['VV'+i+'mod']+'</td>'+
            '</tr>'
        }

        vcantidad += '</table>'+
        '<p style="margin-bottom: 0px">OBSERVACIONES</p><textarea rows="'+this.resizeTextArea(props.VVObservaciones, 2)+'" style="width: 100%; overflow-y: hidden" >'+props.VVObservaciones+'</textarea>';

        return vcantidad;
    }

    tablaOtros = (props) => {
        var procedencia = props.OTProcedencia === 'OTROS' ? props.OTProcedenciaOt : props.OTProcedencia;
        var otros = '<p style="width: 100%;text-align: center;background-color: #4a76c5;color: white;margin-top: 30px; -webkit-print-color-adjust: exact">OTROS</p>'+
        '<p style="width: 50%">REFERENCIA CON COLATERALES  </p><textarea rows="'+(props.OTReferenciasC ? this.resizeTextArea(props.OTReferenciasC, 2) : 1)+'" style="width: 100%; margin-top: -15px; overflow-y: hidden">'+(props.OTReferenciasC ? props.OTReferenciasC : '')+'</textarea>'+
        '<p style="width: 50%">HISTORIA SOCIAL </p><textarea rows="'+(props.OTHistoriaS ? this.resizeTextArea(props.OTHistoriaS, 2) : 1)+'" style="width: 100%; margin-top: -15px; overflow-y: hidden">'+(props.OTHistoriaS ? props.OTHistoriaS : '')+'</textarea>'+
        '<p style="width: 50%">DIAGNOSTICO SOCIO-ECONOMICO </p><textarea rows="'+(props.OTDiagnosticoSE ? this.resizeTextArea(props.OTDiagnosticoSE, 2) : 1)+'" style="width: 100%; margin-top: -15px; overflow-y: hidden">'+(props.OTDiagnosticoSE ? props.OTDiagnosticoSE : '')+'</textarea>'+
        '<div style="display: inline-flex; margin: 10px 0px">'+
            '<p style="display: inline-flex; margin-bottom: 8px; margin-right: 5px">PRONOSTICO </p><input style="margin-right: 10px" value="'+props.OTPronostico+'"/><br>'+
        '</div>'+
        '<p style="width: 50%">PROVEEDOR</p><textarea rows="'+(props.OTProveedor ? this.resizeTextArea(props.OTProveedor, 2) : 1)+'" style="width: 100%; margin-top: -15px; margin-bottom: 15px; overflow-y: hidden">'+(props.OTProveedor ? props.OTProveedor : '')+'</textarea>'+ 
        '<p style="width: 50%">PROCEDENCIA</p><textarea rows="'+(procedencia ? this.resizeTextArea(procedencia, 2) : 1)+'" style="width: 100%; margin-top: -15px; margin-bottom: 15px; overflow-y: hidden">'+(procedencia ? procedencia : '')+'</textarea>'+ 
        '<p style="width: 50%">PLAN DE INTERVENCION </p><textarea rows="'+this.resizeTextArea(props.OTPlanI, 2)+'" style="width: 100%; margin-top: -15px; overflow-y: hidden">'+props.OTPlanI+'</textarea>'+

        '<div style="display: flex; margin: 10px 0px">'+
            '<div style="width: 50%; text-align: right">'+
                '<p style="display: inline-flex; margin-bottom: 8px; margin-right: 5px">CANTIDAD AUTORIZADA</p><input style="margin-right: 10px" value="'+props.OTPresupuesto+'"/><br>'+
                '<p style="display: inline-flex; margin-bottom: 8px; margin-right: 5px">DONATIVO HOSPITAL</p><input style="margin-right: 10px" value="'+(props.OTDHospital ? props.OTDHospital : '')+'"/><br>'+
                '<p style="display: inline-flex; margin-bottom: 8px; margin-right: 5px">FONDO PROYECTO</p><input style="margin-right: 10px" value="'+(props.OTFProyecto ? props.OTFProyecto : '')+'"/><br>'+
                '<p style="display: inline-flex; margin-bottom: 8px; margin-right: 5px">DONACION</p><input style="margin-right: 10px" value="'+(props.OTDonacion ? props.OTDonacion : '')+'"/><br>'+
                '<p style="display: inline-flex; margin-bottom: 8px; margin-right: 5px">MES APADRINAMIENTO</p><input style="margin-right: 10px" value="'+(props.OTMesA ? props.OTMesA : '')+'"/><br>'+
                '<p style="display: inline-flex; margin-bottom: 8px; margin-right: 5px">APORTACION BENEFICIADO</p><input style="margin-right: 10px" value="'+(props.OTABeneficiado ? props.OTABeneficiado : '')+'"/><br>'+
            '</div>'+
            '<div style="width: 50%; text-align: right">'+
                '<p style="display: inline-flex; margin-bottom: 8px; margin-right: 5px">FONDO ARZOBISPADO</p><input style="margin-right: 10px" value="'+(props.OTFArzobispado ? props.OTFArzobispado : '')+'"/><br>'+
                '<p style="display: inline-flex; margin-bottom: 8px; margin-right: 5px">FONDO OLGA</p><input style="margin-right: 10px" value="'+(props.OTFOlga ? props.OTFOlga : '')+'"/><br>'+
                '<p style="display: inline-flex; margin-bottom: 8px; margin-right: 5px">FONDO CABILDO</p><input style="margin-right: 10px" value="'+(props.OTFCabildo ? props.OTFCabildo : '')+'"/><br>'+
                '<p style="display: inline-flex; margin-bottom: 8px; margin-right: 5px">DONANTE</p><input style="margin-right: 10px" value="'+(props.OTDonante ? props.OTDonante : '')+'"/><br>'+
                '<p style="display: inline-flex; margin-bottom: 8px; margin-right: 5px">AÑO APADRINAMIENTO</p><input style="margin-right: 10px" value="'+(props.OTAnoA ? props.OTAnoA : '')+'"/><br>'+
            '</div>'+
        '</div>'+
        '<p style="width: 50%">NOTAS DE SEGUIMIENTO </p><textarea rows="'+(props.OTNotasSE ? this.resizeTextArea(props.OTNotasSE, 2) : 1)+'" style="width: 100%; margin-top: -15px; overflow-y: hidden">'+(props.OTNotasSE ? props.OTNotasSE : '')+'</textarea>';
    
        return otros;
    }

    tablaEntrevista = (props) => {
        var procedencia = props.OTProcedencia === 'OTROS' ? props.OTProcedenciaOt : props.OTProcedencia;
        var otros = '<p style="width: 100%;text-align: center;background-color: #4a76c5;color: white;margin-top: 30px; -webkit-print-color-adjust: exact">HISTORIA SOCIAL</p>'+
        '<p style="width: 50%">HISTORIA SOCIAL </p><textarea rows="'+(props.OTHistoriaS ? this.resizeTextArea(props.OTHistoriaS, 2) : 1)+'" style="width: 100%; margin-top: -15px" >'+(props.OTHistoriaS ? props.OTHistoriaS : '')+'</textarea>'+
        
        '<p style="width: 100%;text-align: center;background-color: #4a76c5;color: white;margin-top: 30px; -webkit-print-color-adjust: exact">COTIZACIONES</p>'+
        '<div style="display: inline-flex; margin: 10px 0px">'+
            '<p style="display: inline-flex; margin-bottom: 8px; margin-right: 5px">PRONOSTICO </p><input style="margin-right: 10px" value="'+props.OTPronostico+'"/><br>'+
        '</div>'+
        '<p style="width: 50%">PROVEEDOR</p><textarea rows="'+(props.OTProveedor ? this.resizeTextArea(props.OTProveedor, 2) : 1)+'" style="width: 100%; margin-top: -15px; margin-bottom: 15px" >'+(props.OTProveedor ? props.OTProveedor : '')+'</textarea>'+ 
        '<p style="width: 50%">PROCEDENCIA</p><textarea rows="'+(procedencia ? this.resizeTextArea(procedencia, 2) : 1)+'" style="width: 100%; margin-top: -15px; margin-bottom: 15px" >'+(procedencia ? procedencia : '')+'</textarea>'+ 
        '<p style="display: inline-flex; margin-bottom: 8px; margin-right: 5px">CANTIDAD AUTORIZADA</p><input style="margin-right: 10px" value="'+props.OTPresupuesto+'"/><br>';
    
        return otros;
    }

    tablaSalud = (props) => {
        var mcantidad = '<p style="width: 100%;text-align: center;background-color: #4a76c5;color: white;margin-top: 30px; -webkit-print-color-adjust: exact">SALUD</p>'+
        '<table style="width: 100%; align: left; font-size: 12px">'+
        '<tr>'+
            '<th>HOSPITAL</th>'+
            '<th>NOTA</th>'+
        '</tr>';

        for(var i = 0; i < props.mcantidad; i++){
            mcantidad += '<tr>'+
                '<td>'+props['SLAteMed'+i]+'</td>';

            mcantidad += props['SLAteMed' + i + 'OTROS'] !== undefined ? '<td>' + props['SLAteMed' + i + 'OTROS']+'</td>' : '';

            mcantidad += '</tr>';
        }

        mcantidad += '</table>'+
            '<p style="width: 170px; display: inline-flex">CANTIDAD DE HEMODIALISIS</p><input style="width: 50px;" value="'+props.SLHemodialisis+'"/><br>'+
            '<p style="width: 50%">OBSERVACIONES </p><textarea rows="'+this.resizeTextArea(props.SLObservaciones, 2)+'" style="width: 100%; margin-top: -15px; overflow-y: hidden">'+props.SLObservaciones+'</textarea>'+
            '<p style="width: 100%;text-align: center;background-color: #4a76c5;color: white;margin-top: 30px;">ESTADO ACTUAL DE SALUD</p>'+
            '<p style="width: 50%">CASO </p><textarea rows="'+this.resizeTextArea(props.SLCaso, 2)+'" style="width: 100%; margin-top: -15px; overflow-y: hidden" >'+props.SLCaso+'</textarea>'+
            '<p style="width: 50%">FAMILIA </p><textarea rows="'+this.resizeTextArea(props.SLFamilia, 2)+'" style="width: 100%; margin-top: -15px; overflow-y: hidden" >'+props.SLFamilia+'</textarea>';

        return mcantidad;
    }

    tablaFormato = (props) => {
        let apoyos = '';

        for(var i = 0; i < props.apcantidad; i++){
            apoyos += props['FMApoyo'+i]
            apoyos += i !== props.apcantidad - 1 ? ', ' : '';
        }

        var fcantidad = '<div style="display: flex">'+
        '<div style="width: 50%; text-align:right">'+
            '<p style="width: 100px; display: inline">FECHA DE APLICACION </p><input value="'+props.FMFecha+'"/><br>'+
            '<p style="width: 100px; display: inline">Trabajadora Social </p><input value="'+props.FMTrabajadora+'"/>'+
        '</div>'+
        '<div style="width: 50%; text-align:right">'+
            '<p style="width: 100px; display: inline">NO. DE CASO </p><input value="'+props.FMNumero+'"/><br>'+
            '<p style="display: inline">APOYOS </p><textarea rows="'+this.resizeTextArea(apoyos, 1)+'" style="width: 50%;">'+apoyos+'</textarea>'+
        '</div></div>';

        return fcantidad;
    }

    print = (event, props) => {
        if(this.checkFields()){
            return;
        }

        const gridName="Consulta nuestro aviso de privacidad en http://caritasgdl.org.mx en la seccion; Aviso de Privacidad";

        const tableHeader = '<div style="display:flex">'+
            '<img src="https://igx.4sqi.net/img/general/width960/82417073_V22Qrk5dPbOj3XmuXQi0gksLG4bHRXVJ-Y3JZNgNnXo.png" alt="W3Schools.com" style="width:100px;height:100px;">'+
            '<h2 style="width:600px; height:100px; text-align:center">CASOS EMERGENTES<br>'+(props.FMTImpresion === 'ESE' ? 'ESTUDIO SOCIOECONOMICO' : 'GUIA DE ENTREVISTA')+'</h2>'+
            '<h2 style="width:100px; height:100px;"></h2>'+
        '</div>';

        const datosg = '<p style="width: 100%; text-align: center; background-color: #4a76c5; color: white; margin-top: 30px; -webkit-print-color-adjust: exact">DATOS GENERALES</p>'+
        '<div style="display:flex">'+
            '<div style="width: 50%; text-align:right">'+
                '<p style="display: inline">NOMBRE DEL CASO </p><textarea rows="'+this.resizeTextArea(props.DGCaso, 1)+'" style="width: 60%; overflow-y: hidden">'+props.DGCaso+'</textarea><br>'+
                '<p style="display: inline">CALLE </p><textarea rows="'+this.resizeTextArea(props.DGCalle, 1)+'" style="width: 50%; overflow-y: hidden">'+props.DGCalle+'</textarea><br>'+
                '<p style="width: 100px; display: inline">COLONIA </p><input style="width: 50%;" value="'+props.DGColonia+'"/><br>'+
                '<p style="width: 100px; display: inline">MUNICIPIO </p><input style="width: 50%;" value="'+props.DGMunicipio+'"/><br>'+
                '<p style="width: 100px; display: inline">TELEFONO </p><input style="width: 50%;" value="'+(props.DGTelefono ? props.DGTelefono : '')+'"/><br>'+
                '<p style="width: 100px; display: inline">TEL. RECADOS </p><input style="width: 50%;" value="'+(props.DGTelefonoR ? props.DGTelefonoR : '')+'"/><br>'+
                '<p style="width: 100px; display: inline">OCUPACION </p><input style="width: 50%;" value="'+props.DGOcupacion+'"/><br>'+
                '<p style="display: inline">PARROQUIA </p><textarea rows="'+this.resizeTextArea(props.DGParroquia, 1)+'" style="width: 50%; overflow-y: hidden">'+props.DGParroquia+'</textarea><br>'+
                '<p style="display: inline">VICARIA </p><textarea rows="'+this.resizeTextArea(props.DGVicaria, 1)+'" style="width: 80%; overflow-y: hidden">'+props.DGVicaria+'</textarea><br>'+
                '<p style="width: 100px; display: inline">PARENTESCO </p><input style="width: 50%;" value="'+props.DGParentesco+'"/>'+
            '</div>'+
            '<div style="width: 50%; text-align:right">'+
                '<p style="width: 100px; display: inline">EDAD</p><input style="width: 20%;" value="'+props.DGEdad+" "+props.DGTEdad+'"/><br>'+
                '<p style="display: inline">CRUCE DE CALLES</p><textarea rows="'+this.resizeTextArea(props.DGCruce, 1)+'" style="width: 70%; overflow-y: hidden">'+props.DGCruce+'</textarea><br>'+
                '<p style="width: 100px; display: inline">C.P. </p><input value="'+props.DGCP+'"/><br>'+
                '<p style="width: 100px; display: inline">ESTADO </p><input value="'+props.DGEstado+'"/><br>'+
                '<p style="width: 100px; display: inline">CEL </p><input value="'+(props.DGCelular ? props.DGCelular : '')+'"/><br>'+
                '<p style="width: 100px; display: inline">ESTADO CIVIL </p><input style="width: 50%;" style="width: 60%;" value="'+props.DGECivil+'"/><br>'+
                '<p style="width: 100px; display: inline">ESCOLARIDAD </p><input style="width: 50%;" value="'+(props.DGEscolaridad ? props.DGEscolaridad : '')+'"/><br>'+
                '<p style="display: inline">DECANATO </p><textarea rows="'+this.resizeTextArea(props.DGDecanato, 1)+'" style="width: 70%; overflow-y: hidden">'+props.DGDecanato+'</textarea><br>'+
                '<p style="display: inline">PERSONA ENTREVISTADA </p><textarea rows="'+this.resizeTextArea(props.DGPersona, 1)+'" style="width: 50%; overflow-y: hidden">'+props.DGPersona+'</textarea>'+
            '</div>'+
        '</div>';

        const ingresoT = parseFloat(props.DEIngresoF ? props.DEIngresoF : 0) + parseFloat(props.DEIngresoO ? props.DEIngresoO : 0);
        const egresoT = parseFloat(props.DEAlimentacion ? props.DEAlimentacion : 0) + parseFloat(props.DEVivienda ? props.DEVivienda : 0) + 
            parseFloat(props.DEServicios ? props.DEServicios : 0) + parseFloat(props.DETelefono ? props.DETelefono : 0) + 
            parseFloat(props.DETransporte ? props.DETransporte : 0) + parseFloat(props.DEEducacion ? props.DEEducacion : 0) + 
            parseFloat(props.DESalud ? props.DESalud : 0) + parseFloat(props.DEVestido ? props.DEVestido : 0) + 
            parseFloat(props.DERecreacion ? props.DERecreacion : 0) + parseFloat(props.DEDeudas ? props.DEDeudas : 0) + 
            parseFloat(props.DEOtros ? props.DEOtros : 0);
        const diferencia = ingresoT - egresoT;
        const economicos = '<p style="width: 100%;text-align: center;background-color: #4a76c5;color: white;margin-top: 30px; -webkit-print-color-adjust: exact">DATOS ECONOMICOS</p><div style="display: flex">'+
            '<div style="width: 50%">'+
                '<p style="width: 100%;text-align: center;">INGRESOS MENSUALES</p>'+
                '<p style="width: 50%; display: inline-flex; margin-bottom: 8px">INGRESO FAMILIAR </p><input style="width: 20%;" value="'+props.DEIngresoF+'"/><br>'+
                '<p style="width: 50%; display: inline-flex; margin-bottom: 8px">OTROS INGRESOS </p><input style="width: 20%;" value="'+props.DEIngresoO+'"/><br>'+
                '<p style="width: 50%; display: inline-flex; margin-bottom: 8px">TOTAL DE INGRESOS </p><input style="width: 20%;" value="'+ingresoT+'"/><br>'+
                '<p style="width: 50%; display: inline-flex; margin-bottom: 8px">DIFERENCIA </p><input style="width: 20%;" value="'+diferencia+'"/><br>'+
                '<p style="width: 50%">OBSERVACIONES </p><textarea rows="'+this.resizeTextArea(props.DEObservaciones, 1)+'" style="width: 95%; margin-top: -15px; overflow-y: hidden" >'+props.DEObservaciones+'</textarea>'+
            '</div>'+
            '<div style="width: 50%">'+
                '<p style="width: 100%;text-align: center;">EGRESOS MENSUALES</p>'+
                '<p style="width: 50%; display: inline-flex; margin-bottom: 8px">ALIMENTACION </p><input style="width: 20%;" value="'+props.DEAlimentacion+'"/><br>'+
                '<p style="width: 50%; display: inline-flex; margin-bottom: 8px">VIVIENDA </p><input style="width: 20%;" value="'+props.DEVivienda+'"/><br>'+
                '<p style="width: 50%; display: inline-flex; margin-bottom: 8px">SERVICIOS BASICOS </p><input style="width: 20%;" value="'+props.DEServicios+'"/><br>'+
                '<p style="width: 50%; display: inline-flex; margin-bottom: 8px">TELEFONO </p><input style="width: 20%;" value="'+props.DETelefono+'"/><br>'+
                '<p style="width: 50%; display: inline-flex; margin-bottom: 8px">TRANSPORTE </p><input style="width: 20%;" value="'+props.DETransporte+'"/><br>'+
                '<p style="width: 50%; display: inline-flex; margin-bottom: 8px">EDUCACION </p><input style="width: 20%;" value="'+props.DEEducacion+'"/><br>'+
                '<p style="width: 50%; display: inline-flex; margin-bottom: 8px">SALUD </p><input style="width: 20%;" value="'+props.DESalud+'"/><br>'+
                '<p style="width: 50%; display: inline-flex; margin-bottom: 8px">VESTIDO </p><input style="width: 20%;" value="'+props.DEVestido+'"/><br>'+
                '<p style="width: 50%; display: inline-flex; margin-bottom: 8px">RECREACION </p><input style="width: 20%;" value="'+props.DERecreacion+'"/><br>'+
                '<p style="width: 50%; display: inline-flex; margin-bottom: 8px">DEUDAS </p><input style="width: 20%;" value="'+props.DEDeudas+'"/><br>'+
                '<p style="width: 50%; display: inline-flex; margin-bottom: 8px">OTROS </p><input style="width: 20%;" value="'+props.DEOtros+'"/><br>'+
                '<p style="width: 50%; display: inline-flex; margin-bottom: 8px">TOTAL DE EGRESOS </p><input style="width: 20%;" value="'+egresoT+'"/><br>'+
            '</div>'+
        '</div>';

        const alimentacion = '<p style="width: 100%;text-align: center;background-color: #4a76c5;color: white;margin-top: 30px; -webkit-print-color-adjust: exact">ALIMENTACION</p>'+
        '<div style="display: flex">'+
            '<div style="width: 50%">'+
                '<p style="width: 50%; display: inline-flex; margin-bottom: 8px">CEREALES </p><input style="width: 20%;" value="'+props.ALCereales+'"/><br>'+
                '<p style="width: 50%; display: inline-flex; margin-bottom: 8px">PASTAS </p><input style="width: 20%;" value="'+props.ALPastas+'"/><br>'+
                '<p style="width: 50%; display: inline-flex; margin-bottom: 8px">TORTILLA </p><input style="width: 20%;" value="'+props.ALTortilla+'"/><br>'+
                '<p style="width: 50%; display: inline-flex; margin-bottom: 8px">LECHE </p><input style="width: 20%;" value="'+props.ALLeche+'"/><br>'+
                '<p style="width: 50%; display: inline-flex; margin-bottom: 8px">CARNE </p><input style="width: 20%;" value="'+props.ALCarne+'"/><br>'+
                '<p style="width: 50%; display: inline-flex; margin-bottom: 8px">PESCADO/MARISCOS </p><input style="width: 20%;" value="'+props.ALMar+'"/><br>'+
            '</div>'+
            '<div style="width: 50%">'+
                '<p style="width: 50%; display: inline-flex; margin-bottom: 8px">LEGUMINOSAS </p><input style="width: 20%;" value="'+props.ALLeguminosas+'"/><br>'+
                '<p style="width: 50%; display: inline-flex; margin-bottom: 8px">FRUTA </p><input style="width: 20%;" value="'+props.ALFruta+'"/><br>'+
                '<p style="width: 50%; display: inline-flex; margin-bottom: 8px">HUEVO </p><input style="width: 20%;" value="'+props.ALHuevo+'"/><br>'+
                '<p style="width: 50%; display: inline-flex; margin-bottom: 8px">REFRESCO </p><input style="width: 20%;" value="'+props.ALRefresco+'"/><br>'+
                '<p style="width: 50%; display: inline-flex; margin-bottom: 8px">POLLO </p><input style="width: 20%;" value="'+props.ALPollo+'"/><br>'+
                '<p style="width: 50%; display: inline-flex; margin-bottom: 8px">TIPOS DE APOYO </p><input style="width: 20%;" value="'+(props.ALTiposA ? props.ALTiposA : '')+'"/><br>'+
            '</div>'+
        '</div>'+
        '<p style="width: 50%">OBSERVACIONES </p><textarea rows="'+this.resizeTextArea(props.ALObservaciones, 2)+'" style="width: 100%; margin-top: -15px; overflow-y: hidden" >'+props.ALObservaciones+'</textarea>';

        const firmas = '<br/><br/><br/><br/><br/><div style="display: flex">'+
            '<div style="width: 33%; text-align: center">'+
                '<hr style="border-color: black; width:80%">'+
                '<p style="display: inline-flex; margin-bottom: 8px">FIRMA DEL COORDINADOR</p>'+
            '</div>'+
            '<div style="width: 33%; text-align: center">'+
                '<hr style="border-color: black; width:80%">'+
                '<p style="display: inline-flex; margin-bottom: 8px">FIRMA DEL BENEFICIARIO</p>'+
            '</div>'+
            '<div style="width: 33%; text-align: center">'+
                '<hr style="border-color: black; width:80%">'+
                '<p style="display: inline-flex; margin-bottom: 8px">FIRMA DE QUIEN ELABORO</p>'+
            '</div>'+
        '</div>'

        const documentToPrint = window.open(gridName, 'Print', 'location=0,scrollbars=yes,height=900,width=800');
        documentToPrint.document
            .write('<link rel="stylesheet" href="//cdn.jsdelivr.net/bootstrap/latest/css/bootstrap.min.css" />');
        documentToPrint.document.title = gridName;
        documentToPrint.document.write('<body style="font-size: 12px; overflow-y: scroll; height: 100%" onload="window.print();">');
        documentToPrint.document.write(tableHeader);
        documentToPrint.document.write(this.tablaFormato(props));
        documentToPrint.document.write(datosg);

        if(props.FMTImpresion === 'ESE'){
            documentToPrint.document.write(this.tablaFamilia(props));
            documentToPrint.document.write(economicos);
            documentToPrint.document.write(alimentacion);
            documentToPrint.document.write(this.tablaVivienda(props));
            documentToPrint.document.write(this.tablaSalud(props));
            documentToPrint.document.write(this.tablaOtros(props));
        } else {
            documentToPrint.document.write(this.tablaEntrevista(props));
        }
        documentToPrint.document.write(firmas);
        documentToPrint.document.write('</body>');
        documentToPrint.document.close();
    }

    modify = (event) => {
        if(this.checkFields()){
            return;
        }

        /* var user = this.props.location.user; */
        var user = this.state.key;
        var itemsRef = firebase.database().ref('casos');
        let casos = {};

        Object.keys(this.state.caso).map(i => casos[i] = i!=="message" && i!=="open" && this.state.caso[i])

        itemsRef.child(user).update(casos);
        this.setState({ open: true, message: 'El caso ha sido modificado'});
    }
    
    save = (event) => {
        let casos = {};
        
        if(this.checkFields()){
            return;
        }

        this.props.location.modifying = 1

        Object.keys(this.state.caso).map(i => casos[i] = i!=="message" && i!=="open" && this.state.caso[i])

        var dataRef = firebase.database().ref('casos').push(casos);
        this.setState({ key: dataRef.key, open: true, message: 'El caso ha sido guardado'});
    }

    nuevo = () => {
        this.props.location.modifying = 0

        this.setState(this.defaultState)
    }

    resizeTextArea = (value, type) => {
        let n=1;

        if (value === undefined)
            return n;

        var rows = value.split("\n");
        var arc = type === 1 ? 25 : 50;

        rows.forEach(element => {
            var res = element.split(" ");

            if (element.length > 20){
                n = n + parseInt(element.length / arc, 10);
            }

            for(var i=0; i < res.length; i++){
                if (res[i].length > 20){
                    n = n + 1;
                }
            }
        });
        
        return n > 1 ? n + 1 : n;
    }

    checkFields = () => {
        const Fields = ['DGCP', 'DGCalle', 'DGCaso', 'DGSexo', 'DGColonia', 'DGCruce', 'DGDecanato', 'DGECivil', 'DGEdad', 'DGTEdad', 
            'DGEstado', 'DGMunicipio', 'DGOcupacion', 'DGParentesco', 'DGParroquia', 'DGPersona', 'FMTImpresion',
            'DGVicaria', 'FMFecha', 'FMNumero', 'FMTrabajadora', 'OTPresupuesto', 'OTHistoriaS', 'OTPronostico', 'OTProveedor',
            'OTProcedencia' ];

        let missingFields = false;
        
        for (var j = 0; j < Fields.length; j++){
            if( !Object.keys(this.state.caso).includes(Fields[j]) || this.state.caso[Fields[j]] === undefined){
                missingFields = true;
                console.log(Fields[j])
                this.setState({ open: true, message: 'Todos los campos deben contener informacion'});
            };
        }
        return missingFields;
    }

    handleChange = (id, value, type) => {
        let caso = this.state.caso
        caso[id] = value

        if(type === 'int' && (isNaN(value) ))
            return
        
        if(id === 'DGDecanato'){
            let vicaria = ''

            switch(value) {
                case "DULCE NOMBRE DE JESÚS":
                case "LA PAZ":
                case "SAGRARIO METROPOLITANO":
                case "ZAPOPAN ESTADIO":
                    vicaria = "EL SANTUARIO DE GUADALUPE"
                    break;
                case "GETSEMANÍ DE LA CRUZ":
                case "LOURDES":
                case "MIRAVALLE":
                case "POLANCO":
                    vicaria = "NUESTRA SEÑORA DE LOURDES"
                    break;
                case "JESUCRISTO OBRERO":
                case "TESISTÁN":
                case "ZAPOPAN":
                    vicaria = "NUESTRA SEÑORA DE ZAPOPAN"
                    break;
                case "ATEMAJAC":
                case "LA VISITACIÓN":
                case "NUESTRA SEÑORA DEL REFUGIO":
                    vicaria = "NUESTRA SEÑORA DEL ROSARIO, ATEMAJAC"
                    break;
                case "ANALCO":
                case "LA LUZ":
                case "SAN FELIPE":
                    vicaria = "SAN JOSÉ DE ANALCO"
                    break;
                case "SAN JOSÉ DEL CASTILLO":
                case "SAN PEDRITO":
                case "SAN PEDRO":
                case "TONALÁ":
                case "ZAPOTLANEJO":
                    vicaria = "SAN PEDRO"
                    break;
                case "HUENTITÁN":
                case "SAN ILDEFONSO":
                case "SANTA CECILIA":
                case "TALPITA":
                    vicaria = "SANTA CECILIA"
                    break;
                case "JESUCRISTO REY DEL UNIVERSO":
                case "SANTA ANA TEPETITLÁN":
                case "TOLUQUILLA":
                    vicaria = "NUESTRA SEÑORA DEL ROSARIO, TOLUQUILLA"
                    break;
                case "SAN ANDRÉS":
                case "TETLÁN":
                case "ZALATITÁN":
                    vicaria = "SAN ANDRÉS"
                    break;
                case "GUADALUPE CHAPALITA":
                case "LA SANTA CRUZ":
                case "SAN JUAN BAUTISTA":
                case "SANTA ROSA DE LIMA":
                    vicaria = "SANTOS MARTIRES MEXICANOS"
                    break;
                case "SAN ISIDRO":
                case "SAN PIO DE PIETRELCINA":
                case "TLAJOMULCO":
                    vicaria = "SAN ANTONIO TLAJOMULCO"
                    break;
                case "AHUALULCO":
                case "AMECA":
                case "COCULA":
                case "MAGDALENA":
                    vicaria = "EL SEÑOR GRANDE, AMECA"
                    break;
                case "LA BARCA":
                case "OCOTLÁN":
                case "PONCITLÁN":
                    vicaria = "EL SEÑOR DE LA MISERICORDIA , OCOTLÁN"
                    break;
                case "CHAPALA":
                case "JOCOTEPEC":
                    vicaria = "SAN FRANCISCO DE ASÍS, CHAPALA"
                    break;
                case "IXTLAHUACÁN DEL RÍO":
                case "JUCHIPILA":
                case "NOCHISTLÁN":
                    vicaria = "SAN FRANCISCO, NOCHISTLÁN"
                    break;
                case "TEMASTIÁN":
                case "EL TEÚL":
                    vicaria = "EL SEÑOR DE LOS RAYOS, TEMASTIÁN"
                    break;
                case "OTROS/FORANEO":
                    vicaria = "ZONA FORÁNEA, OTRAS DIOCESIS"
                    break;
                default:
                    vicaria = ""
            }

            caso['DGVicaria'] = vicaria;
        }

        this.setState({objectState: caso})
    }

    cfamiliar = () => {
        var rows = [];

        for (var i = 0; i < this.state.caso.fcantidad; i++) {
            rows.push(
                <div key={'familia' + i}>
                    <TxtField id={"CFFam" + i + "nom"} nombre={"Nombre"} width={160} onChange={this.handleChange} state={this.state.caso}/>
                    <TxtField id={"CFFam" + i + "edad"} nombre={"Edad"} width={50} onChange={this.handleChange} type={'int'} state={this.state.caso}/>
                    <TxtField id={"CFFam" + i + "tedad"} nombre={"Tipo de Edad"} width={120} required options={Edad} onChange={this.handleChange} state={this.state.caso}/>
                    <Autocomplete id={"CFFam" + i + "parentesco"} nombre={"Parentesco"} options={Parentesco} onChange={this.handleChange} state={this.state.caso}/>
                    <TxtField id={"CFFam" + i + "ecivil"} nombre={"Estado Civil"} width={100} options={ECivil} onChange={this.handleChange} state={this.state.caso}/>
                    <TxtField id={"CFFam" + i + "ocupacion"} nombre={"Ocupacion"} width={150} onChange={this.handleChange} state={this.state.caso}/>
                    <TxtField id={"CFFam" + i + "empleo"} nombre={"Empleo"} width={100} options={Empleo} onChange={this.handleChange} state={this.state.caso}/>
                    <Autocomplete id={"CFFam" + i + "escolaridad"} nombre={"Escolaridad"} options={Escolaridad} onChange={this.handleChange} state={this.state.caso}/>
                    
                    <hr style={{borderColor: 'black'}}></hr>
                </div>
            );
        }
        
        return rows;
    }

    cvehiculos = () => {
        var rows = [];

        for (var i = 0; i < this.state.caso.vcantidad; i++) {
            rows.push(
                <div key={'vehiculo' + i}>
                    <TxtField id={"VV" + i + "mar"} nombre={"Marca"} width={300} onChange={this.handleChange} state={this.state.caso}/>
                    <TxtField id={"VV" + i + "mod"} nombre={"Modelo"} width={300} onChange={this.handleChange} state={this.state.caso}/>
                </div>
            );
        }
        return rows;
    }

    cmedica = () => {
        var rows = [];

        for (var i = 0; i < this.state.caso.mcantidad; i++) {
            rows.push(
                <div key={'atencionmedica' + i}>
                    <TxtField id={"SLAteMed" + i} nombre={"Hospital"} options={AtencionMedica} width={300} onChange={this.handleChange} state={this.state.caso}/>
                    {this.state.caso["SLAteMed" + i] === 'OTROS' && <TxtField id={"SLAteMed" + i + 'OTROS'} nombre={"Hospital"} width={300} onChange={this.handleChange} state={this.state.caso}/> }
                </div>
            );
        }
        return rows;
    }

    cProcedencia = () => (
        <div>
            <TxtField id={"OTProcedencia"} required nombre={"Procedencia"} width={180} options={Procedencia} onChange={this.handleChange} state={this.state.caso}/>
            {this.state.caso["OTProcedencia"] === 'OTROS' && <TxtField id={"OTProcedenciaOt"} nombre={"Procedencia"} width={180} onChange={this.handleChange} state={this.state.caso}/> }
        </div>
    )
    
    cApoyo = () => {
        var rows = [];

        for (var i = 0; i < this.state.caso.apcantidad; i++) {
            rows.push(
                <div key={'apoyo' + i}>
                    <TxtField id={"FMApoyo" + i} nombre={"Apoyo"} options={Apoyos} width={300} onChange={this.handleChange} state={this.state.caso}/>
                </div>
            );
        }
        return rows;
    }

    handleClose = () => {
        this.setState({ open: false });
    };
    
    render() {
        const { classes } = this.props;
        const modifying = this.props.location.modifying;
        const vertical = 'top', horizontal = 'center'
        const { open, message } = this.state;

        const ingresoTotal = parseFloat(this.state.caso['DEIngresoO'] ? this.state.caso['DEIngresoO'] : 0) + parseFloat(this.state.caso['DEIngresoF'] ? this.state.caso['DEIngresoF'] : 0); 
        const egresoTotal = parseFloat(this.state.caso['DEAlimentacion'] ? this.state.caso['DEAlimentacion'] : 0) + 
            parseFloat(this.state.caso['DEVivienda'] ? this.state.caso['DEVivienda'] : 0) + parseFloat(this.state.caso['DEServicios'] ? this.state.caso['DEServicios'] : 0) + 
            parseFloat(this.state.caso['DETelefono'] ? this.state.caso['DETelefono'] : 0) + parseFloat(this.state.caso['DETransporte'] ? this.state.caso['DETransporte'] : 0) + 
            parseFloat(this.state.caso['DEEducacion'] ? this.state.caso['DEEducacion'] : 0) + parseFloat(this.state.caso['DESalud'] ? this.state.caso['DESalud'] : 0) + 
            parseFloat(this.state.caso['DEVestido'] ? this.state.caso['DEVestido'] : 0) + parseFloat(this.state.caso['DERecreacion'] ? this.state.caso['DERecreacion'] : 0) + 
            parseFloat(this.state.caso['DEDeudas'] ? this.state.caso['DEDeudas'] : 0) + parseFloat(this.state.caso['DEOtros'] ? this.state.caso['DEOtros'] : 0);
        const diferencia = ingresoTotal - egresoTotal;

        return (
            <div className={classes.root}>
                <div style={{marginBottom: '70px'}}>
                    <Snackbar
                        anchorOrigin={{ vertical, horizontal }}
                        open={open}
                        onClose={this.handleClose}
                        TransitionComponent={Fade}
                        autoHideDuration={3000}
                        ContentProps={{
                            'aria-describedby': 'message-id',
                        }}
                        message={<span id="message-id">{message}</span>}
                    />
                    
                    <Tooltip title="Imprimir" >
                        <Button variant="fab" color="primary" className={classes.fixed} style={{bottom: '20px', right: '25px'}} 
                            onClick={(event) => this.props.checkToken( () => this.print(event, this.state.caso) )}>
                            <PrintIcon />
                        </Button>
                    </Tooltip>

                    <Tooltip title="Nuevo" >
                        <Button variant="fab" color="primary" className={classes.fixed} style={{bottom: '80px', right: '25px'}} 
                            onClick={(event) => this.props.checkToken( () => this.nuevo(event) )}>
                            <CreateIcon />
                        </Button>
                    </Tooltip>

                    <Tooltip title="Guardar" >
                        <Button variant="fab" color="primary" className={classes.fixed} style={{bottom: '140px', right: '25px'}} 
                            onClick={(event) => modifying === 1 ? 
                                this.props.checkToken(() => this.modify(event)) : 
                                this.props.checkToken(() => this.save(event))}>
                            <SaveIcon />
                        </Button>
                    </Tooltip>

                    {/* FORMATO */}
                    <h1 className={classes.title}>FORMATO</h1>
                    <div className={classes.container}>
                        <TxtField nombre="Fecha" id="FMFecha" required type={'date'} onChange={this.handleChange} state={this.state.caso}/>
                        <TxtField nombre="No. De Caso" id="FMNumero" required onChange={this.handleChange} state={this.state.caso}/>
                        <TxtField nombre="Tipo de Impresion" id="FMTImpresion" required options={TipoI} onChange={this.handleChange} state={this.state.caso}/>
                        <TxtField nombre="Trabajadora Social" id="FMTrabajadora" required options={TrabajadoraS} onChange={this.handleChange} state={this.state.caso}/>
                        <TxtField nombre="Cantidad Apoyo" id="apcantidad" onChange={this.handleChange} type={'int'} state={this.state.caso}/>
                        {this.cApoyo()}
                    </div>

                    {/* DATOS GENERALES */}
                    <h1 className={classes.title}>DATOS GENERALES</h1>
                    <div className={classes.container}>
                        <TxtField nombre="Nombre del caso" id={"DGCaso"} required multiline={true} onChange={this.handleChange} state={this.state.caso}/>
                        <TxtField nombre="Edad" id={"DGEdad"} required onChange={this.handleChange} type={'int'} state={this.state.caso}/>
                        <TxtField nombre="Tipo de Edad" id={"DGTEdad"} required options={Edad} onChange={this.handleChange} state={this.state.caso}/>
                        <TxtField nombre="Sexo" id={"DGSexo"} required options={Sexo} onChange={this.handleChange} state={this.state.caso}/>
                        <TxtField nombre="Calle" id={"DGCalle"} required multiline={true} onChange={this.handleChange} state={this.state.caso}/>
                        <TxtField nombre="Cruce de calles" id={"DGCruce"} required multiline={true} onChange={this.handleChange} state={this.state.caso}/>
                        <TxtField nombre="Colonia" id={"DGColonia"} required onChange={this.handleChange} state={this.state.caso}/>
                        <TxtField nombre="Codigo postal" id={"DGCP"} required onChange={this.handleChange} type={'int'} state={this.state.caso}/>
                        <Autocomplete nombre={"Municipio"} id={"DGMunicipio"} required options={Municipios} onChange={this.handleChange} state={this.state.caso}/>
                        <Autocomplete nombre={"Estado"} id={"DGEstado"} required options={Estados} onChange={this.handleChange} state={this.state.caso}/>
                        <TxtField nombre="Telefono" id="DGTelefono" onChange={this.handleChange} type={'int'} state={this.state.caso}/>
                        <TxtField nombre="Celular" id="DGCelular" onChange={this.handleChange} type={'int'} state={this.state.caso}/>
                        <TxtField nombre="Telefono recados" id="DGTelefonoR" onChange={this.handleChange} type={'int'} state={this.state.caso}/>
                        <TxtField nombre="Estado civil" id="DGECivil" required options={ECivil} onChange={this.handleChange} state={this.state.caso}/>
                        <TxtField nombre="Ocupacion" id="DGOcupacion" required onChange={this.handleChange} state={this.state.caso}/>
                        <Autocomplete id={"DGEscolaridad"} nombre={"Escolaridad"} options={Escolaridad} onChange={this.handleChange} state={this.state.caso}/>
                        <TxtField nombre="Parroquia" id="DGParroquia" required multiline={true} onChange={this.handleChange} state={this.state.caso}/>
                        <Autocomplete nombre={"Decanato"} id={"DGDecanato"} required multiline={true} options={Decanatos} onChange={this.handleChange} state={this.state.caso}/>
                        <TxtField nombre="Vicaria" id="DGVicaria" required multiline onChange={this.handleChange} state={this.state.caso}/>
                        <TxtField nombre="Persona Entrevistada" id="DGPersona" required multiline={true} onChange={this.handleChange} state={this.state.caso}/>
                        <Autocomplete nombre={"Parentesco"} id={"DGParentesco"} required options={Parentesco} onChange={this.handleChange} state={this.state.caso}/>
                    </div>
                    <br/>

                    {/* COMPOSICION FAMILIAR */}
                    <div className={classes.container} style={{display: 'inline'}}>
                        <h1 className={classes.title}>COMPOSICION FAMILIAR</h1>
                        <TxtField nombre={"Cantidad"} id={"fcantidad"} width={80} onChange={this.handleChange} type={'int'} state={this.state.caso}/>
                        <div>
                            {this.cfamiliar()}
                        </div>
                        <TxtField nombre={"Observaciones"} id={"CFObservaciones"} multiline={true} width={80} term={"%"} onChange={this.handleChange} state={this.state.caso}/>
                    </div>

                    <br/>

                    {/* DATOS ECONOMICOS */}
                    <h1 className={classes.title}>DATOS ECONOMICOS</h1>
                    <div className={classes.container}>

                        {/* INGRESOS MENSUALES */}
                        <div style={{width:'50%'}}>
                            <h4 style={{marginTop: '0px'}}>INGRESOS MENSUALES</h4>

                            <TxtField nombre="Ingreso Familiar" id='DEIngresoF' onChange={this.handleChange} type={'int'} state={this.state.caso}/>
                            <TxtField nombre="Otros Ingresos" id='DEIngresoO' onChange={this.handleChange} type={'int'} state={this.state.caso}/>
                            
                            <TextField
                                id={'DEIngresoT'}
                                disabled
                                label={"Total de ingresos"}
                                placeholder={"Total de ingresos"}
                                className={classes.textField}
                                value={ingresoTotal}
                                margin="normal"
                            />
                            <TextField
                                id={'DEDiferencia'}
                                disabled
                                label={"Diferencia"}
                                placeholder={"Diferencia"}
                                className={classes.textField}
                                value={diferencia}
                                margin="normal"
                            />
                            <TxtField id={"DEObservaciones"} nombre={"Observaciones"} multiline={true} width={80} term={"%"} onChange={this.handleChange} state={this.state.caso}/>
                        </div>

                        {/* EGRESOS MENSUALES */}
                        <div style={{width:'50%'}}>
                            <h4 style={{marginTop: '0px'}}>EGRESOS MENSUALES</h4>

                            <TxtField nombre="Alimentacion" id='DEAlimentacion' onChange={this.handleChange} type={'int'} state={this.state.caso}/>
                            <TxtField nombre="Vivienda" id='DEVivienda' onChange={this.handleChange} type={'int'} state={this.state.caso}/>
                            <TxtField nombre="Servicios Basicos" id='DEServicios' onChange={this.handleChange} type={'int'} state={this.state.caso}/>
                            <TxtField nombre="Telefono" id='DETelefono' onChange={this.handleChange} type={'int'} state={this.state.caso}/>
                            <TxtField nombre="Transporte" id='DETransporte' onChange={this.handleChange} type={'int'} state={this.state.caso}/>
                            <TxtField nombre="Educacion" id='DEEducacion' onChange={this.handleChange} type={'int'} state={this.state.caso}/>
                            <TxtField nombre="Salud" id='DESalud' onChange={this.handleChange} type={'int'} state={this.state.caso}/>
                            <TxtField nombre="Vestido" id='DEVestido' onChange={this.handleChange} type={'int'} state={this.state.caso}/>
                            <TxtField nombre="Recreacion" id='DERecreacion' onChange={this.handleChange} type={'int'} state={this.state.caso}/>
                            <TxtField nombre="Deudas" id='DEDeudas' onChange={this.handleChange} type={'int'} state={this.state.caso}/>
                            <TxtField nombre="Otros" id='DEOtros' onChange={this.handleChange} type={'int'} state={this.state.caso}/>
                            
                            <TextField
                                id={'DEEngresoT'}
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
                    <h1 className={classes.title}>ALIMENTACION</h1>
                    <div className={classes.container}>
                        <TxtField nombre="Cereales" id="ALCereales" options={Alimentacion} onChange={this.handleChange} state={this.state.caso}/>
                        <TxtField nombre="Leguminosas" id="ALLeguminosas" options={Alimentacion} onChange={this.handleChange} state={this.state.caso}/>
                        <TxtField nombre="Pastas" id="ALPastas" options={Alimentacion} onChange={this.handleChange} state={this.state.caso}/>
                        <TxtField nombre="Fruta" id="ALFruta" options={Alimentacion} onChange={this.handleChange} state={this.state.caso}/>
                        <TxtField nombre="Tortilla" id="ALTortilla" options={Alimentacion} onChange={this.handleChange} state={this.state.caso}/>
                        <TxtField nombre="Huevo" id="ALHuevo" options={Alimentacion} onChange={this.handleChange} state={this.state.caso}/>
                        <TxtField nombre="Leche" id="ALLeche" options={Alimentacion} onChange={this.handleChange} state={this.state.caso}/>
                        <TxtField nombre="Refresco" id="ALRefresco" options={Alimentacion} onChange={this.handleChange} state={this.state.caso}/>
                        <TxtField nombre="Carne" id="ALCarne" options={Alimentacion} onChange={this.handleChange} state={this.state.caso}/>
                        <TxtField nombre="Pollo" id="ALPollo" options={Alimentacion} onChange={this.handleChange} state={this.state.caso}/>
                        <TxtField nombre="Pescado o Mariscos" id="ALMar" options={Alimentacion} onChange={this.handleChange} state={this.state.caso}/>
                        <TxtField nombre="Tipos de Apoyo" id="ALTiposA" onChange={this.handleChange} state={this.state.caso}/>
                        <TxtField nombre={"Observaciones"} id={"ALObservaciones"} multiline={true} width={80} term={"%"} onChange={this.handleChange} state={this.state.caso}/>
                    </div>

                    {/* VIVIENDA */}
                    <h1 className={classes.title}>VIVIENDA</h1>
                    <div className={classes.container}>
                        <TxtField nombre="Condicion" id="VVCondicion" options={CondicionVivienda} onChange={this.handleChange} state={this.state.caso}/>
                        <TxtField nombre="Zona" id="VVZona" options={Zona} onChange={this.handleChange} state={this.state.caso}/>
                        <TxtField nombre="Piso" id="VVPiso" options={Piso} onChange={this.handleChange} state={this.state.caso}/>
                        <TxtField nombre="Techo" id="VVTecho" options={Techo} onChange={this.handleChange} state={this.state.caso}/>
                        <TxtField nombre="Muro" id="VVMuro" options={Muro} onChange={this.handleChange} state={this.state.caso}/>
                        <TxtField nombre="Menaje" id="VVMenaje" options={Menaje} onChange={this.handleChange} state={this.state.caso}/>
                        <TxtField nombre="Dormitorios" id="VVDormitorios" options={Dormitorios} onChange={this.handleChange} state={this.state.caso}/>
                        <TxtField nombre="Cocina" id="VVCocina" options={Vivienda} onChange={this.handleChange} state={this.state.caso}/>
                        <TxtField nombre="Sala" id="VVSala" options={Vivienda} onChange={this.handleChange} state={this.state.caso}/>
                        <TxtField nombre="Comedor" id="VVComedor" options={Vivienda} onChange={this.handleChange} state={this.state.caso}/>
                        <TxtField nombre="Baños" id="VVBanos" options={Bano} onChange={this.handleChange} state={this.state.caso}/>
                        <TxtField nombre="Otros" id="VVOtros" onChange={this.handleChange} state={this.state.caso}/>
                        <TxtField nombre="Organizacion e higiene" id="VVOrgEHig" onChange={this.handleChange} state={this.state.caso}/>

                        <div style={{width: '100%'}}>
                            <br/>
                            <hr style={{height: '2px', backgroundColor: '#172fdc'}}/>   
                            <TxtField id={"vcantidad"} nombre={"Cantidad Vehiculos"} width={150} term={"px"} onChange={this.handleChange} type={'int'} state={this.state.caso}/>
                            {this.cvehiculos()}
                            <br/>
                            <hr style={{height: '2px', backgroundColor: '#172fdc'}}/> 
                        </div>
                        <TxtField nombre={"Observaciones"} id={"VVObservaciones"} multiline={true} width={80} term={"%"} onChange={this.handleChange} state={this.state.caso}/>
                    </div>

                    {/* SALUD */}
                    <h1 className={classes.title}>SALUD</h1>
                    <div className={classes.container}>
                        <div style={{width: '100%'}}>
                            <br/>
                            <hr style={{height: '2px', backgroundColor: '#172fdc'}}/>   
                            <TxtField id={"mcantidad"} nombre={"Cantidad Atencion Medica"} width={250} term={"px"} onChange={this.handleChange} type={'int'} state={this.state.caso}/>
                            {this.cmedica()}
                            <br/>
                            <hr style={{height: '2px', backgroundColor: '#172fdc'}}/> 
                        </div> 
                        <TxtField id={"SLHemodialisis"} nombre={"Cantidad de hemodialisis"} onChange={this.handleChange} type={'int'} state={this.state.caso}/>
                        <TxtField id={"SLObservaciones"} nombre={"Observaciones"} multiline={true} width={80} term={"%"} onChange={this.handleChange} state={this.state.caso}/>
                        <h3 style={{backgroundColor: '#acb8f3', color:'white'}}>ESTADO ACTUAL DE SALUD</h3>
                        <TxtField id={"SLCaso"} nombre={"Caso"} multiline={true} width={80} term={"%"} onChange={this.handleChange} state={this.state.caso}/>
                        <TxtField id={"SLFamilia"} nombre={"Familia"} multiline={true} width={80} term={"%"} onChange={this.handleChange} state={this.state.caso}/>
                    </div>

                    {/* OTROS */}
                    <h1 className={classes.title}>OTROS</h1>
                    <div className={classes.container}>
                        <TxtField nombre={"Referencias Con Colaterales"} id={"OTReferenciasC"} multiline={true} width={80} term={"%"} onChange={this.handleChange} state={this.state.caso}/>
                        <TxtField nombre={"Historia Social"} id={"OTHistoriaS"} required multiline={true} width={80} term={"%"} onChange={this.handleChange} state={this.state.caso}/>
                        <TxtField nombre={"Diagnostico Socio-Economico"} id={"OTDiagnosticoSE"} multiline={true} width={80} term={"%"} onChange={this.handleChange} state={this.state.caso}/>
                        <TxtField nombre={"Pronostico"} id={"OTPronostico"} required options={Pronostico} onChange={this.handleChange} state={this.state.caso}/>
                        <TxtField nombre={"Proveedor"} id={"OTProveedor"} required onChange={this.handleChange} state={this.state.caso}/>
                        {this.cProcedencia()}
                        <TxtField nombre={"Plan de Intervencion"} id={"OTPlanI"} multiline={true} width={80} term={"%"} onChange={this.handleChange} state={this.state.caso}/>
                        <TxtField nombre={"Cantidad Autorizada"} id={"OTPresupuesto"} required width={80} term={"%"} onChange={this.handleChange} type={'int'} state={this.state.caso}/>
                        <TxtField nombre={"Donativo Hospital"} id={"OTDHospital"} onChange={this.handleChange} type={'int'} state={this.state.caso}/>
                        <TxtField nombre={"Fondo Proyecto"} id={"OTFProyecto"} onChange={this.handleChange} type={'int'} state={this.state.caso}/>
                        <TxtField nombre={"Fondo Arzobispado"} id={"OTFArzobispado"} onChange={this.handleChange} type={'int'} state={this.state.caso}/>
                        <TxtField nombre={"Fondo Cabildo"} id={"OTFCabildo"} onChange={this.handleChange} type={'int'} state={this.state.caso}/>
                        <TxtField nombre={"Fondo Olga"} id={"OTFOlga"} onChange={this.handleChange} type={'int'} state={this.state.caso}/>
                        <TxtField nombre={"Donacion"} id={"OTDonacion"} onChange={this.handleChange} type={'int'} state={this.state.caso}/>
                        {/* <TxtField nombre={"Donante"} id={"OTDonante"} onChange={this.handleChange} state={this.state.caso}/> */}
                        <Autocomplete nombre={"Donante"} id={"OTDonante"} options={Donantes} onChange={this.handleChange} state={this.state.caso}/>
                        <Autocomplete nombre={"Mes Apadrinamiento"} id={"OTMesA"} options={Meses} onChange={this.handleChange} state={this.state.caso}/>
                        <TxtField nombre={"Año Apadrinamiento"} id={"OTAnoA"} onChange={this.handleChange} type={'int'} state={this.state.caso}/>
                        <TxtField nombre={"Aportacion Beneficiado"} id={"OTABeneficiado"} onChange={this.handleChange} type={'int'} state={this.state.caso}/>
                        <TxtField nombre={"Notas de seguimiento y/o Evolucion"} id={"OTNotasSE"} multiline={true} width={80} term={"%"} onChange={this.handleChange} state={this.state.caso}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default withStyles(styles)(Socioeconomico);
