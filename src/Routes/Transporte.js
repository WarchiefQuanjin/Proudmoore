import React, { Component } from 'react'
import firebase from '../config'
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
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
    Frecuencia,
    Sexo
} from '../Constants/Options';
import TxtField from '../Components/TxtField';
import Snackbar from '@material-ui/core/Snackbar';
import Fade from '@material-ui/core/Fade';

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

class Transporte extends Component {
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
        var user = this.props.location.user;
        
        if(user !== undefined){
            var caso = {};
            for (var i = 0; i < Object.keys(user.val).length; i++) {
                caso[Object.keys(user.val)[i]] = Object.values(user.val)[i];
            }

            this.setState({caso});
        }
    }

    tablaFamilia = (props) => {
        var fcantidad = '<p style="width: 100%;text-align: center;background-color: #4a76c5;color: white;margin-top: 30px; -webkit-print-color-adjust: exact">COMPOSICION FAMILIAR</p>'
        
        if(parseInt(props.gcantidad, 10) > 0) {
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

            for(var i = 0; i < props.gcantidad; i++){
                fcantidad += '<tr>'+
                    '<td>'+props['CFFam'+i+'nom']+'</td>'+
                    '<td>'+props['CFFam'+i+'edad']+'</td>'+
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
            '<textarea rows="'+this.resizeTextArea(props.CFObservaciones, 2)+'" style="width: 100%; margin-top: -15px" >'+props.CFObservaciones+'</textarea>'+
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
                '<p style="width: 50%; display: inline-flex; margin-bottom: 8px">ORGANIZACION E HIGIENE </p><input style="width: 30%;" value="'+props.VVOrgEHig+'"/><br>'+
            '</div>'+
            '<div style="width: 50%">'+
                '<p style="width: 50%; display: inline-flex; margin-bottom: 8px">ZONA </p><input style="width: 30%;" value="'+props.VVZona+'"/><br>'+
                '<p style="width: 50%; display: inline-flex; margin-bottom: 8px">MURO </p><input style="width: 30%;" value="'+props.VVMuro+'"/><br>'+
                '<p style="width: 50%; display: inline-flex; margin-bottom: 8px">MENAJE </p><input style="width: 30%;" value="'+props.VVMenaje+'"/><br>'+
                '<p style="width: 50%; display: inline-flex; margin-bottom: 8px">COCINA </p><input style="width: 30%;" value="'+props.VVCocina+'"/><br>'+
                '<p style="width: 50%; display: inline-flex; margin-bottom: 8px">COMEDOR </p><input style="width: 30%;" value="'+props.VVComedor+'"/><br>'+
                '<p style="width: 50%; display: inline-flex; margin-bottom: 8px">OTROS </p><input style="width: 30%;" value="'+props.VVOtros+'"/><br>'+
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
        '<p style="margin-bottom: 0px">OBSERVACIONES</p><textarea rows="'+this.resizeTextArea(props.VVObservaciones, 2)+'" style="width: 100%" >'+props.VVObservaciones+'</textarea>';

        return vcantidad;
    }

    tablaOtros = (props) => {
        var procedencia = props.OTProcedencia === 'OTROS' ? props.OTProcedenciaOt : props.OTProcedencia;
        var otros = '<p style="width: 100%;text-align: center;background-color: #4a76c5;color: white;margin-top: 30px; -webkit-print-color-adjust: exact">OTROS</p>'+
        '<p style="width: 50%">REFERENCIA CON COLATERALES  </p><textarea rows="'+this.resizeTextArea(props.OTReferenciasC, 2)+'" style="width: 100%; margin-top: -15px" >'+props.OTReferenciasC+'</textarea>'+
        '<p style="width: 50%">HISTORIA SOCIAL </p><textarea rows="'+this.resizeTextArea(props.OTHistoriaS, 2)+'" style="width: 100%; margin-top: -15px" >'+props.OTHistoriaS+'</textarea>'+
        '<p style="width: 50%">DIAGNOSTICO SOCIO-ECONOMICO </p><textarea rows="'+this.resizeTextArea(props.OTDiagnosticoSE, 2)+'" style="width: 100%; margin-top: -15px" >'+props.OTDiagnosticoSE+'</textarea>'+
        '<div style="display: inline-flex; margin: 10px 0px">'+
            '<p style="display: inline-flex; margin-bottom: 8px; margin-right: 5px">PRONOSTICO </p><input style="margin-right: 10px" value="'+props.OTPronostico+'"/><br>'+
        '</div>'+
        '<p style="width: 50%">PROVEEDOR</p><textarea rows="'+this.resizeTextArea(props.OTProveedor, 2)+'" style="width: 100%; margin-top: -15px; margin-bottom: 15px" >'+props.OTProveedor+'</textarea>'+ 
        '<p style="width: 50%">PROCEDENCIA</p><textarea rows="'+this.resizeTextArea(procedencia, 2)+'" style="width: 100%; margin-top: -15px; margin-bottom: 15px" >'+procedencia+'</textarea>'+ 
        '<p style="width: 50%">PLAN DE INTERVENCION </p><textarea rows="'+this.resizeTextArea(props.OTPlanI, 2)+'" style="width: 100%; margin-top: -15px" >'+props.OTPlanI+'</textarea>'+

        '<div style="display: flex; margin: 10px 0px">'+
            '<div style="width: 50%; text-align: right">'+
                '<p style="display: inline-flex; margin-bottom: 8px; margin-right: 5px">CANTIDAD AUTORIZADA</p><input style="margin-right: 10px" value="'+props.OTPresupuesto+'"/><br>'+
                '<p style="display: inline-flex; margin-bottom: 8px; margin-right: 5px">DONATIVO HOSPITAL</p><input style="margin-right: 10px" value="'+props.OTDHospital+'"/><br>'+
                '<p style="display: inline-flex; margin-bottom: 8px; margin-right: 5px">FONDO ARZOBISPADO</p><input style="margin-right: 10px" value="'+props.OTFArzobispado+'"/><br>'+
                '<p style="display: inline-flex; margin-bottom: 8px; margin-right: 5px">FONDO CABILDO</p><input style="margin-right: 10px" value="'+props.OTFCabildo+'"/><br>'+
            '</div>'+
            '<div style="width: 50%; text-align: right">'+
                '<p style="display: inline-flex; margin-bottom: 8px; margin-right: 5px">FONDO OLGA</p><input style="margin-right: 10px" value="'+props.OTFOlga+'"/><br>'+
                '<p style="display: inline-flex; margin-bottom: 8px; margin-right: 5px">DONANTE</p><input style="margin-right: 10px" value="'+props.OTDonante+'"/><br>'+
                '<p style="display: inline-flex; margin-bottom: 8px; margin-right: 5px">APORTACION BENEFICIADO</p><input value="'+props.OTABeneficiado+'"/><br>'+
            '</div>'+
        '</div>'+
        '<p style="width: 50%">NOTAS DE SEGUIMIENTO </p><textarea rows="'+this.resizeTextArea(props.OTNotasSE, 2)+'" style="width: 100%; margin-top: -15px" >'+props.OTNotasSE+'</textarea>';
    
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
            '<p style="width: 50%">OBSERVACIONES </p><textarea rows="'+this.resizeTextArea(props.SLObservaciones, 2)+'" style="width: 100%; margin-top: -15px" >'+props.SLObservaciones+'</textarea>'+
            '<p style="width: 100%;text-align: center;background-color: #4a76c5;color: white;margin-top: 30px;">ESTADO ACTUAL DE SALUD</p>'+
            '<p style="width: 50%">CASO </p><textarea rows="'+this.resizeTextArea(props.SLCaso, 2)+'" style="width: 100%; margin-top: -15px" >'+props.SLCaso+'</textarea>'+
            '<p style="width: 50%">FAMILIA </p><textarea rows="'+this.resizeTextArea(props.SLFamilia, 2)+'" style="width: 100%; margin-top: -15px" >'+props.SLFamilia+'</textarea>';

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
            '<p style="width: 100px; display: contents">FECHA DE APLICACION </p><input value="'+props.FMFecha+'"/><br>'+
            '<p style="width: 100px; display: contents">Trabajadora Social </p><input value="'+props.FMTrabajadora+'"/>'+
        '</div>'+
        '<div style="width: 50%; text-align:right">'+
            '<p style="width: 100px; display: contents">NO. DE CASO </p><input value="'+props.FMNumero+'"/><br>'+
            '<p style="display: contents">APOYOS </p><textarea rows="'+this.resizeTextArea(apoyos, 1)+'" style="width: 50%;">'+apoyos+'</textarea>'+
        '</div></div>';

        return fcantidad;
    }

    print = (event, props) => {
        event.preventDefault();

        if(this.checkFields()){
            return;
        }

        const gridName="Consulta nuestro aviso de privacidad en http://caritasgdl.org.mx en la seccion; Aviso de Privacidad";

        const tableHeader = '<div style="display:flex">'+
            '<img src="https://igx.4sqi.net/img/general/width960/82417073_V22Qrk5dPbOj3XmuXQi0gksLG4bHRXVJ-Y3JZNgNnXo.png" alt="W3Schools.com" style="width:100px;height:100px;">'+
            '<h2 style="width:600px; height:100px; text-align:center">CASOS EMERGENTES<br>ESTUDIO SOCIOECONOMICO</h2>'+
            '<h2 style="width:100px; height:100px;"></h2>'+
        '</div>';

        const datosg = '<p style="width: 100%; text-align: center; background-color: #4a76c5; color: white; margin-top: 30px; -webkit-print-color-adjust: exact">DATOS GENERALES</p>'+
        '<div style="display:flex">'+
            '<div style="width: 50%; text-align:right">'+
                '<p style="display: contents">NOMBRE DEL CASO </p><textarea rows="'+this.resizeTextArea(props.DGCaso, 1)+'" style="width: 60%;">'+props.DGCaso+'</textarea><br>'+
                '<p style="display: contents">CALLE </p><textarea rows="'+this.resizeTextArea(props.DGCalle, 1)+'" style="width: 50%;">'+props.DGCalle+'</textarea><br>'+
                '<p style="width: 100px; display: contents">COLONIA </p><input style="width: 50%;" value="'+props.DGColonia+'"/><br>'+
                '<p style="width: 100px; display: contents">MUNICIPIO </p><input style="width: 50%;" value="'+props.DGMunicipio+'"/><br>'+
                '<p style="width: 100px; display: contents">TELEFONO </p><input style="width: 50%;" value="'+props.DGTelefono+'"/><br>'+
                '<p style="width: 100px; display: contents">TEL. RECADOS </p><input style="width: 50%;" value="'+props.DGTelefonoR+'"/><br>'+
                '<p style="width: 100px; display: contents">OCUPACION </p><input style="width: 50%;" value="'+props.DGOcupacion+'"/><br>'+
                '<p style="display: contents">PARROQUIA </p><textarea rows="'+this.resizeTextArea(props.DGParroquia, 1)+'" style="width: 50%;">'+props.DGParroquia+'</textarea><br>'+
                '<p style="display: contents">VICARIA </p><textarea rows="'+this.resizeTextArea(props.DGVicaria, 1)+'" style="width: 80%;">'+props.DGVicaria+'</textarea><br>'+
                '<p style="width: 100px; display: contents">PARENTESCO </p><input style="width: 50%;" value="'+props.DGParentesco+'"/>'+
            '</div>'+
            '<div style="width: 50%; text-align:right">'+
                '<p style="width: 100px; display: contents">EDAD</p><input style="width: 20%;" value="'+props.DGEdad+'"/><br>'+
                '<p style="display: contents">CRUCE DE CALLES</p><textarea rows="'+this.resizeTextArea(props.DGCruce, 1)+'" style="width: 70%;">'+props.DGCruce+'</textarea><br>'+
                '<p style="width: 100px; display: contents">C.P. </p><input value="'+props.DGCP+'"/><br>'+
                '<p style="width: 100px; display: contents">ESTADO </p><input value="'+props.DGEstado+'"/><br>'+
                '<p style="width: 100px; display: contents">CEL </p><input value="'+props.DGCelular+'"/><br>'+
                '<p style="width: 100px; display: contents">ESTADO CIVIL </p><input style="width: 50%;" style="width: 60%;" value="'+props.DGECivil+'"/><br>'+
                '<p style="width: 100px; display: contents">ESCOLARIDAD </p><input style="width: 50%;" value="'+props.DGEscolaridad+'"/><br>'+
                '<p style="display: contents">DECANATO </p><textarea rows="'+this.resizeTextArea(props.DGDecanato, 1)+'" style="width: 70%;">'+props.DGDecanato+'</textarea><br>'+
                '<p style="display: contents">PERSONA ENTREVISTADA </p><textarea rows="'+this.resizeTextArea(props.DGPersona, 1)+'" style="width: 50%;">'+props.DGPersona+'</textarea>'+
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
                '<p style="width: 50%">OBSERVACIONES </p><textarea rows="'+this.resizeTextArea(props.DEObservaciones, 2)+'" style="width: 95%; margin-top: -15px" >'+props.DEObservaciones+'</textarea>'+
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
                '<p style="width: 50%; display: inline-flex; margin-bottom: 8px">TIPOS DE APOYO </p><input style="width: 20%;" value="'+props.ALTiposA+'"/><br>'+
            '</div>'+
        '</div>'+
        '<p style="width: 50%">OBSERVACIONES </p><textarea rows="'+this.resizeTextArea(props.ALObservaciones, 2)+'" style="width: 100%; margin-top: -15px" >'+props.ALObservaciones+'</textarea>';

        const firmas = '<div style="padding-top: 80px; display: flex">'+
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
        documentToPrint.document.write(this.tablaFamilia(props));
        documentToPrint.document.write(economicos);
        documentToPrint.document.write(alimentacion);
        documentToPrint.document.write(this.tablaVivienda(props));
        documentToPrint.document.write(this.tablaSalud(props));
        documentToPrint.document.write(this.tablaOtros(props));
        documentToPrint.document.write(firmas);
        documentToPrint.document.write('</body>');
        documentToPrint.document.close();
    }

    modify = (event) => {
        event.preventDefault();

        if(this.checkFields()){
            return;
        }

        var user = this.props.location.user;
        var itemsRef = firebase.database().ref('transporte');
        let casos = {};

        Object.keys(this.state.caso).map(i => casos[i] = i!=="message" && i!=="open" && this.state.caso[i])

        itemsRef.child(user.key).update(casos);
        this.setState({ open: true, message: 'El caso ha sido modificado'});
    }
    
    save = (event) => {
        event.preventDefault();
        let casos = {};
        
        if(this.checkFields()){
            return;
        }

        this.props.location.modifying = 1

        Object.keys(this.state.caso).map(i => casos[i] = i!=="message" && i!=="open" && this.state.caso[i])

        firebase.database().ref('transporte').push(casos);
        this.setState({ open: true, message: 'El caso ha sido guardado'});
    }

    nuevo = () => {
        this.props.location.modifying = 0

        this.setState(this.defaultState)
    }

    resizeTextArea = (value, type) => {
        let n=1;

        if(type === 1) {
            var res = value.split(" ");

            if (value.length > 20){
                n = n + parseInt(value.length / 25, 10);
            }

            for(var i=0; i < res.length; i++){
                if (res[i].length > 20){
                    n = n + 1;
                }
            }
        }
        else if(type === 2){
            n = value.split("\n").length;
        }

        return n;
    }

    checkFields = () => {
        const Fields = [ 'FMFecha', 'FMNumero', 'FMDerivado', 'FMFrecuencia', 'FMTrabajadora', 'IDTipo', 
        'IDOriginario', 'IDTiempo', 'IDHospeda', 'SDDestino', 'SDMotivo', 'APDestino', 'APBoletos', 'APFolioTS' ];
        
        let missingFields = false;
        
        for (var j = 0; j < Fields.length; j++){
            if( !Object.keys(this.state.caso).includes(Fields[j]) || this.state.caso[Fields[j]] === undefined){
                missingFields = true;
                this.setState({ open: true, message: 'Todos los campos deben contener informacion'});
            };
        }
        return missingFields;
    }

    handleChange = (id, value) => {
        let caso = this.state.caso
        caso[id] = value
        this.setState({objectState: caso})
    }

    cGenerales = () => {
        var rows = [];

        for (var i = 0; i < this.state.caso.gcantidad; i++) {
            rows.push(
                <div key={'familia' + i} >
                    <TxtField id={"CFFam" + i + "nom"} nombre={"Nombre"} width={160} onChange={this.handleChange} state={this.state.caso}/>
                    <TxtField id={"CFFam" + i + "edad"} nombre={"Edad"} width={50} onChange={this.handleChange} state={this.state.caso}/>
                    <TxtField id={"CFFam" + i + "ecivil"} nombre={"Estado Civil"} width={100} options={ECivil} onChange={this.handleChange} state={this.state.caso}/>
                    <TxtField id={"CFFam" + i + "ocupacion"} nombre={"Ocupacion"} width={150} onChange={this.handleChange} state={this.state.caso}/>
                    <TxtField id={"CFFam" + i + "escolaridad"} nombre={"Escolaridad"} width={150} onChange={this.handleChange} state={this.state.caso}/>
                    
                    <hr style={{borderColor: 'black'}}></hr>
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
                    
                    <Button variant="contained" color="primary" className={classes.button} onClick={(event) => this.print(event, this.state.caso)}> 
                        Imprimir
                    </Button>
                    <Button variant="contained" color="primary" className={classes.button} onClick={(event) => this.nuevo(event)}> 
                        Nuevo
                    </Button>

                    {/* FORMATO */}
                    <h1 style={{backgroundColor: '#5c70d2', color:'white'}}>FORMATO</h1>
                    <div className={classes.container}>
                        <TxtField nombre="Fecha" id="FMFecha" required type={'date'} onChange={this.handleChange} state={this.state.caso}/>
                        <TxtField nombre="No. De Caso" id="FMNumero" required onChange={this.handleChange} state={this.state.caso}/>
                        <TxtField nombre="Derivado por" id="FMDerivado" required onChange={this.handleChange} state={this.state.caso}/>
                        <TxtField nombre="Frecuencia" id="FMFrecuencia" required options={Frecuencia} onChange={this.handleChange} state={this.state.caso}/>
                        <TxtField nombre="Trabajadora Social" id="FMTrabajadora" required options={TrabajadoraS} onChange={this.handleChange} state={this.state.caso}/>
                    </div>

                    {/* DATOS GENERALES */}
                    <div className={classes.container}>
                        <h1 style={{backgroundColor: '#5c70d2', color:'white'}}>DATOS GENERALES</h1>
                        <TxtField nombre={"Cantidad"} id={"gcantidad"} width={80} onChange={this.handleChange} state={this.state.caso}/>
                        {this.cGenerales()}
                        <div>
                            <TxtField id={"DGDomicilio"} nombre={"Domicilio"}  onChange={this.handleChange} state={this.state.caso}/>
                            <TxtField id={"DGColonia"} nombre={"Colonia"} onChange={this.handleChange} state={this.state.caso}/>
                            <TxtField id={"DGMunicipio"} nombre={"Municipio"} onChange={this.handleChange} state={this.state.caso}/>
                            <TxtField id={"DGEstado"} nombre={"Estado"} onChange={this.handleChange} state={this.state.caso}/>
                            <TxtField id={"DGPais"} nombre={"Pais"} onChange={this.handleChange} state={this.state.caso}/>
                        </div>
                    </div>
                    <br/>

                    {/* IDENTIFICACION */}
                    <h1 style={{backgroundColor: '#5c70d2', color:'white'}}>IDENTIFICACION</h1>
                    <div className={classes.container}>
                        <TxtField nombre="Tipo de identificacion" id="IDTipo" required width={300} onChange={this.handleChange} state={this.state.caso}/>
                        <TxtField nombre="Originario de" id="IDOriginario" required width={300} onChange={this.handleChange} state={this.state.caso}/>
                        <TxtField nombre="Tiempo que tiene en la ciudad" id="IDTiempo" required width={300} onChange={this.handleChange} state={this.state.caso}/>
                        <TxtField nombre="Lugar donde se hospeda" id="IDHospeda" required width={300} onChange={this.handleChange} state={this.state.caso}/>
                    </div>
                    <br/>

                    {/* SOLICITUD */}
                    <h1 style={{backgroundColor: '#5c70d2', color:'white'}}>SOLICITUD</h1>
                    <div className={classes.container}>
                        <TxtField nombre={"Destino"} id={"SDDestino"} required width={300} onChange={this.handleChange} state={this.state.caso}/>
                        <TxtField nombre={"Motivo"} id={"SDMotivo"} multiline={true} required width={80} term={"%"} onChange={this.handleChange} state={this.state.caso}/>
                    </div>
                    <br/>

                    {/* APOYO */}
                    <h1 style={{backgroundColor: '#5c70d2', color:'white'}}>APOYO</h1>
                    <div className={classes.container}>
                        <TxtField nombre={"Destino"} id="APDestino" required width={300} onChange={this.handleChange} state={this.state.caso}/>
                        <TxtField nombre={"Numero de boletos"} id="APBoletos" options={Frecuencia} required width={300} onChange={this.handleChange} state={this.state.caso}/>
                        <TxtField nombre={"Cantidad Autorizada"} id="APCantidad" width={300} onChange={this.handleChange} state={this.state.caso}/>
                        <TxtField nombre={"Aportacion del solicitante"} id="APAportacion" width={300} onChange={this.handleChange} state={this.state.caso}/>
                        <TxtField nombre={"Folio de trabajo social"} id="APFolioTS" required width={300} onChange={this.handleChange} state={this.state.caso}/>
                        <TxtField nombre={"Folio de caja"} id="APFolioC" width={300} onChange={this.handleChange} state={this.state.caso}/>
                    </div>
                    <br/>

                    {/* OBSERVACIONES */}
                    <h1 style={{backgroundColor: '#5c70d2', color:'white'}}>OBSERVACIONES</h1>
                    <div className={classes.container}>
                        <TxtField nombre={"Observaciones"} id={"OBObservaciones"} multiline={true} width={80} term={"%"} onChange={this.handleChange} state={this.state.caso}/>
                    </div>
                    <br/>

                    <div className={classes.container}>
                        <Button variant="contained" color="primary" className={classes.button} onClick={(event) => modifying === 1 ? this.modify(event) : this.save(event)}> 
                            Guardar
                        </Button>
                    </div>

                </div>
            </div>
        )
    }
}

export default withStyles(styles)(Transporte);
