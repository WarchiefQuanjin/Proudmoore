import React, { Component } from 'react'
import firebase from '../config'
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

class Socioeconomico extends Component {
    constructor(props) {
        super(props)
        this.state = {
            pcantidad: 0,
            apcantidad: 0,
            fcantidad: 0,
            mcantidad: 0,
            vcantidad: 0,
            open: false,
            message: ''
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
        var fcantidad = '<p style="width: 100%;text-align: center;background-color: #4a76c5;color: white;margin-top: 30px; -webkit-print-color-adjust: exact">COMPOSICION FAMILIAR</p>'
        
        if(parseInt(props.fcantidad) > 0) {
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

        const documentToPrint = window.open(gridName, 'Print', 'location=0,height=1500,width=800');
        documentToPrint.document
            .write('<link rel="stylesheet" href="//cdn.jsdelivr.net/bootstrap/latest/css/bootstrap.min.css" />');
        documentToPrint.document.title = gridName;
        documentToPrint.document.write('<body style="font-size: 12px" onload="window.print();">');
        documentToPrint.document.write(tableHeader);
        documentToPrint.document.write(this.tablaFormato(props));
        documentToPrint.document.write(datosg);
        documentToPrint.document.write(this.tablaFamilia(props));
        documentToPrint.document.write(economicos);
        documentToPrint.document.write(alimentacion);
        documentToPrint.document.write(this.tablaVivienda(props));
        documentToPrint.document.write(this.tablaSalud(props));
        documentToPrint.document.write(this.tablaOtros(props));
        documentToPrint.document.write('</body>');
        documentToPrint.document.close();
    }

    modify = (event) => {
        event.preventDefault();

        if(this.checkFields()){
            return;
        }

        var user = this.props.location.user;
        var itemsRef = firebase.database().ref('casos');
        let casos = {};

        Object.keys(this.state).map(i => casos[i] = i!=="message" && i!=="open" && this.state[i])

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

        Object.keys(this.state).map(i => casos[i] = i!=="message" && i!=="open" && this.state[i])

        firebase.database().ref('casos').push(casos);
        this.setState({ open: true, message: 'El caso ha sido guardado'});
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
        const Fields = [ 'ALCarne', 'ALCereales', 'ALFruta', 'ALHuevo', 'ALLeche', 'ALLeguminosas', 'ALMar', 
            'ALObservaciones', 'ALPastas', 'ALPollo', 'ALRefresco', 'ALTiposA', 'ALTortilla', 'CFObservaciones', 
            'DEAlimentacion', 'DEDeudas', 'DEEducacion', 'DEIngresoF', 'DEIngresoO', 'DEObservaciones', 'DEOtros', 
            'DERecreacion', 'DESalud', 'DEServicios', 'DETelefono', 'DETransporte', 'DEVestido', 'DEVivienda', 
            'DGCP', 'DGCalle', 'DGCaso', 'DGColonia', 'DGCruce', 'DGDecanato', 'DGECivil', 'DGEdad', 
            'DGEscolaridad', 'DGEstado', 'DGMunicipio', 'DGOcupacion', 'DGParentesco', 'DGParroquia', 'DGPersona', 
            'DGVicaria', 'FMFecha', 'FMNumero', 'FMTrabajadora', 'OTDiagnosticoSE', 'OTHistoriaS', 'OTNotasSE', 
            'OTPlanI', 'OTPresupuesto', 'OTPronostico', 'OTReferenciasC', 'SLCaso', 'SLFamilia', 'SLObservaciones', 
            'VVBanos', 'VVCocina', 'VVComedor', 'VVCondicion', 'VVDormitorios', 'VVMenaje', 'VVMuro', 
            'VVObservaciones', 'VVOrgEHig', 'VVOtros', 'VVPiso', 'VVSala', 'VVTecho', 'VVZona' ];
        
        let missingFields = false;
            
        for (var j = 0; j < Fields.length; j++){
            if( !Object.keys(this.state).includes(Fields[j]) ){
                missingFields = true;
                this.setState({ open: true, message: 'Todos los campos deben contener informacion'});
                console.log(Fields[j]);
            };
        }

        return missingFields;
    }

    handleChange = (id, value) => {
        this.setState({
            [id]: value
        })
    }

    cfamiliar = () => {
        var rows = [];

        for (var i = 0; i < this.state.fcantidad; i++) {
            rows.push(
                <div key={'familia' + i}>
                    <TxtField id={"CFFam" + i + "nom"} nombre={"Nombre"} width={160} onChange={this.handleChange} state={this.state}/>
                    <TxtField id={"CFFam" + i + "edad"} nombre={"Edad"} width={50} onChange={this.handleChange} state={this.state}/>
                    <TxtField id={"CFFam" + i + "parentesco"} nombre={"Parentesco"} width={100} onChange={this.handleChange} state={this.state}/>
                    <TxtField id={"CFFam" + i + "ecivil"} nombre={"Estado Civil"} width={100} options={ECivil} onChange={this.handleChange} state={this.state}/>
                    <TxtField id={"CFFam" + i + "ocupacion"} nombre={"Ocupacion"} width={150} onChange={this.handleChange} state={this.state}/>
                    <TxtField id={"CFFam" + i + "empleo"} nombre={"Empleo"} width={100} options={Empleo} onChange={this.handleChange} state={this.state}/>
                    <TxtField id={"CFFam" + i + "escolaridad"} nombre={"Escolaridad"} width={150} onChange={this.handleChange} state={this.state}/>
                </div>
            );
        }
        return rows;
    }

    cvehiculos = () => {
        var rows = [];

        for (var i = 0; i < this.state.vcantidad; i++) {
            rows.push(
                <div key={'vehiculo' + i}>
                    <TxtField id={"VV" + i + "mar"} nombre={"Marca"} width={300} onChange={this.handleChange} state={this.state}/>
                    <TxtField id={"VV" + i + "mod"} nombre={"Modelo"} width={300} onChange={this.handleChange} state={this.state}/>
                </div>
            );
        }
        return rows;
    }

    cmedica = () => {
        var rows = [];

        for (var i = 0; i < this.state.mcantidad; i++) {
            rows.push(
                <div key={'atencionmedica' + i}>
                    <TxtField id={"SLAteMed" + i} nombre={"Hospital"} options={AtencionMedica} width={300} onChange={this.handleChange} state={this.state}/>
                    {this.state["SLAteMed" + i] === 'OTROS' && <TxtField id={"SLAteMed" + i + 'OTROS'} nombre={"Hospital"} width={300} onChange={this.handleChange} state={this.state}/> }
                </div>
            );
        }
        return rows;
    }

    cProcedencia = () => (
        <div>
            <TxtField id={"OTProcedencia"} nombre={"Procedencia"} width={180} options={Procedencia} onChange={this.handleChange} state={this.state}/>
            {this.state["OTProcedencia"] === 'OTROS' && <TxtField id={"OTProcedenciaOt"} nombre={"Procedencia"} width={180} onChange={this.handleChange} state={this.state}/> }
        </div>
    )
    
    cApoyo = () => {
        var rows = [];

        for (var i = 0; i < this.state.apcantidad; i++) {
            rows.push(
                <div key={'apoyo' + i}>
                    <TxtField id={"FMApoyo" + i} nombre={"Apoyo"} options={Apoyos} width={300} onChange={this.handleChange} state={this.state}/>
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

        const ingresoTotal = parseFloat(this.state['DEIngresoO'] ? this.state['DEIngresoO'] : 0) + parseFloat(this.state['DEIngresoF'] ? this.state['DEIngresoF'] : 0); 
        const egresoTotal = parseFloat(this.state['DEAlimentacion'] ? this.state['DEAlimentacion'] : 0) + 
            parseFloat(this.state['DEVivienda'] ? this.state['DEVivienda'] : 0) + parseFloat(this.state['DEServicios'] ? this.state['DEServicios'] : 0) + 
            parseFloat(this.state['DETelefono'] ? this.state['DETelefono'] : 0) + parseFloat(this.state['DETransporte'] ? this.state['DETransporte'] : 0) + 
            parseFloat(this.state['DEEducacion'] ? this.state['DEEducacion'] : 0) + parseFloat(this.state['DESalud'] ? this.state['DESalud'] : 0) + 
            parseFloat(this.state['DEVestido'] ? this.state['DEVestido'] : 0) + parseFloat(this.state['DERecreacion'] ? this.state['DERecreacion'] : 0) + 
            parseFloat(this.state['DEDeudas'] ? this.state['DEDeudas'] : 0) + parseFloat(this.state['DEOtros'] ? this.state['DEOtros'] : 0);
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
                    
                    <Button variant="contained" color="primary" className={classes.button} onClick={(event) => this.print(event, this.state)}> 
                    {/* <Button variant="contained" color="primary" className={classes.button} onClick={(event) => this.save(event)}>  */}
                        Imprimir
                    </Button>

                    {/* FORMATO */}
                    <h1 style={{backgroundColor: '#5c70d2', color:'white'}}>FORMATO</h1>
                    <div className={classes.container}>
                        <TxtField nombre="Fecha" id="FMFecha" required type={'date'} onChange={this.handleChange} state={this.state}/>
                        <TxtField nombre="No. De Caso" id="FMNumero" required onChange={this.handleChange} state={this.state}/>
                        <TxtField nombre="Trabajadora Social" id="FMTrabajadora" required options={TrabajadoraS} onChange={this.handleChange} state={this.state}/>
                        <TxtField nombre="Cantidad Apoyo" id="apcantidad" onChange={this.handleChange} state={this.state}/>
                        {this.cApoyo()}
                    </div>

                    {/* DATOS GENERALES */}
                    <h1 style={{backgroundColor: '#5c70d2', color:'white'}}>DATOS GENERALES</h1>
                    <div className={classes.container}>
                        <TxtField nombre="Nombre del caso" id="DGCaso" multiline={true} onChange={this.handleChange} state={this.state}/>
                        <TxtField nombre="Edad" id="DGEdad" onChange={this.handleChange} state={this.state}/>
                        <TxtField nombre="Sexo" id="DGSexo" options={Sexo} onChange={this.handleChange} state={this.state}/>
                        <TxtField nombre="Calle" id="DGCalle" multiline={true} onChange={this.handleChange} state={this.state}/>
                        <TxtField nombre="Cruce de calles" id="DGCruce" multiline={true} onChange={this.handleChange} state={this.state}/>
                        <TxtField nombre="Colonia" id="DGColonia" onChange={this.handleChange} state={this.state}/>
                        <TxtField nombre="Codigo postal" id="DGCP" onChange={this.handleChange} state={this.state}/>
                        <TxtField nombre="Municipio" id="DGMunicipio" onChange={this.handleChange} state={this.state}/>
                        <TxtField nombre="Estado" id="DGEstado" onChange={this.handleChange} state={this.state}/>
                        <TxtField nombre="Telefono" id="DGTelefono" onChange={this.handleChange} state={this.state}/>
                        <TxtField nombre="Celular" id="DGCelular" onChange={this.handleChange} state={this.state}/>
                        <TxtField nombre="Telefono recados" id="DGTelefonoR" onChange={this.handleChange} state={this.state}/>
                        <TxtField nombre="Estado civil" id="DGECivil" options={ECivil} onChange={this.handleChange} state={this.state}/>
                        <TxtField nombre="Ocupacion" id="DGOcupacion" onChange={this.handleChange} state={this.state}/>
                        <TxtField nombre="Escolaridad" id="DGEscolaridad" onChange={this.handleChange} state={this.state}/>
                        <TxtField nombre="Parroquia" id="DGParroquia" multiline={true} onChange={this.handleChange} state={this.state}/>
                        <TxtField nombre="Decanato" id="DGDecanato" multiline={true} onChange={this.handleChange} state={this.state}/>
                        <TxtField nombre="Vicaria" id="DGVicaria" multiline={true} onChange={this.handleChange} state={this.state}/>
                        <TxtField nombre="Persona Entrevistada" id="DGPersona" multiline={true} onChange={this.handleChange} state={this.state}/>
                        <TxtField nombre="Parentesco" id="DGParentesco" onChange={this.handleChange} state={this.state}/>
                    </div>

                    <br/>

                    {/* COMPOSICION FAMILIAR */}
                    <div className={classes.container}>
                        <h1 style={{backgroundColor: '#5c70d2', color:'white'}}>COMPOSICION FAMILIAR</h1>
                        <TxtField nombre={"Cantidad"} id={"fcantidad"} width={80} onChange={this.handleChange} state={this.state}/>
                        {this.cfamiliar()}
                        <TxtField nombre={"Observaciones"} id={"CFObservaciones"} multiline={true} width={80} term={"%"} onChange={this.handleChange} state={this.state}/>
                    </div>

                    <br/>

                    {/* DATOS ECONOMICOS */}
                    <h1 style={{backgroundColor: '#5c70d2', color:'white'}}>DATOS ECONOMICOS</h1>
                    <div className={classes.container}>

                        {/* INGRESOS MENSUALES */}
                        <div style={{width:'50%'}}>
                            <h4 style={{marginTop: '0px'}}>INGRESOS MENSUALES</h4>

                            <TxtField nombre="Ingreso Familiar" id='DEIngresoF' onChange={this.handleChange} state={this.state}/>
                            <TxtField nombre="Otros Ingresos" id='DEIngresoO' onChange={this.handleChange} state={this.state}/>
                            
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
                            <TxtField id={"DEObservaciones"} nombre={"Observaciones"} multiline={true} width={80} term={"%"} onChange={this.handleChange} state={this.state}/>
                        </div>

                        {/* EGRESOS MENSUALES */}
                        <div style={{width:'50%'}}>
                            <h4 style={{marginTop: '0px'}}>EGRESOS MENSUALES</h4>

                            <TxtField nombre="Alimentacion" id='DEAlimentacion' onChange={this.handleChange} state={this.state}/>
                            <TxtField nombre="Vivienda" id='DEVivienda' onChange={this.handleChange} state={this.state}/>
                            <TxtField nombre="Servicios Basicos" id='DEServicios' onChange={this.handleChange} state={this.state}/>
                            <TxtField nombre="Telefono" id='DETelefono' onChange={this.handleChange} state={this.state}/>
                            <TxtField nombre="Transporte" id='DETransporte' onChange={this.handleChange} state={this.state}/>
                            <TxtField nombre="Educacion" id='DEEducacion' onChange={this.handleChange} state={this.state}/>
                            <TxtField nombre="Salud" id='DESalud' onChange={this.handleChange} state={this.state}/>
                            <TxtField nombre="Vestido" id='DEVestido' onChange={this.handleChange} state={this.state}/>
                            <TxtField nombre="Recreacion" id='DERecreacion' onChange={this.handleChange} state={this.state}/>
                            <TxtField nombre="Deudas" id='DEDeudas' onChange={this.handleChange} state={this.state}/>
                            <TxtField nombre="Otros" id='DEOtros' onChange={this.handleChange} state={this.state}/>
                            
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
                    <h1 style={{backgroundColor: '#5c70d2', color:'white'}}>ALIMENTACION</h1>
                    <div className={classes.container}>
                        <TxtField nombre="Cereales" id="ALCereales" options={Alimentacion} onChange={this.handleChange} state={this.state}/>
                        <TxtField nombre="Leguminosas" id="ALLeguminosas" options={Alimentacion} onChange={this.handleChange} state={this.state}/>
                        <TxtField nombre="Pastas" id="ALPastas" options={Alimentacion} onChange={this.handleChange} state={this.state}/>
                        <TxtField nombre="Fruta" id="ALFruta" options={Alimentacion} onChange={this.handleChange} state={this.state}/>
                        <TxtField nombre="Tortilla" id="ALTortilla" options={Alimentacion} onChange={this.handleChange} state={this.state}/>
                        <TxtField nombre="Huevo" id="ALHuevo" options={Alimentacion} onChange={this.handleChange} state={this.state}/>
                        <TxtField nombre="Leche" id="ALLeche" options={Alimentacion} onChange={this.handleChange} state={this.state}/>
                        <TxtField nombre="Refresco" id="ALRefresco" options={Alimentacion} onChange={this.handleChange} state={this.state}/>
                        <TxtField nombre="Carne" id="ALCarne" options={Alimentacion} onChange={this.handleChange} state={this.state}/>
                        <TxtField nombre="Pollo" id="ALPollo" options={Alimentacion} onChange={this.handleChange} state={this.state}/>
                        <TxtField nombre="Pescado o Mariscos" id="ALMar" options={Alimentacion} onChange={this.handleChange} state={this.state}/>
                        <TxtField nombre="Tipos de Apoyo" id="ALTiposA" onChange={this.handleChange} state={this.state}/>
                        <TxtField nombre={"Observaciones"} id={"ALObservaciones"} multiline={true} width={80} term={"%"} onChange={this.handleChange} state={this.state}/>
                    </div>

                    {/* VIVIENDA */}
                    <h1 style={{backgroundColor: '#5c70d2', color:'white'}}>VIVIENDA</h1>
                    <div className={classes.container}>
                        <TxtField nombre="Condicion" id="VVCondicion" options={CondicionVivienda} onChange={this.handleChange} state={this.state}/>
                        <TxtField nombre="Zona" id="VVZona" options={Zona} onChange={this.handleChange} state={this.state}/>
                        <TxtField nombre="Piso" id="VVPiso" options={Piso} onChange={this.handleChange} state={this.state}/>
                        <TxtField nombre="Techo" id="VVTecho" options={Techo} onChange={this.handleChange} state={this.state}/>
                        <TxtField nombre="Muro" id="VVMuro" options={Muro} onChange={this.handleChange} state={this.state}/>
                        <TxtField nombre="Menaje" id="VVMenaje" options={Menaje} onChange={this.handleChange} state={this.state}/>
                        <TxtField nombre="Dormitorios" id="VVDormitorios" options={Dormitorios} onChange={this.handleChange} state={this.state}/>
                        <TxtField nombre="Cocina" id="VVCocina" options={Vivienda} onChange={this.handleChange} state={this.state}/>
                        <TxtField nombre="Sala" id="VVSala" options={Vivienda} onChange={this.handleChange} state={this.state}/>
                        <TxtField nombre="Comedor" id="VVComedor" options={Vivienda} onChange={this.handleChange} state={this.state}/>
                        <TxtField nombre="Baños" id="VVBanos" options={Bano} onChange={this.handleChange} state={this.state}/>
                        <TxtField nombre="Otros" id="VVOtros" onChange={this.handleChange} state={this.state}/>
                        <TxtField nombre="Organizacion e higiene" id="VVOrgEHig" onChange={this.handleChange} state={this.state}/>

                        <div style={{width: '100%'}}>
                            <br/>
                            <hr style={{height: '2px', backgroundColor: '#172fdc'}}/>   
                            <TxtField id={"vcantidad"} nombre={"Cantidad Vehiculos"} width={150} term={"px"} onChange={this.handleChange} state={this.state}/>
                            {this.cvehiculos()}
                            <br/>
                            <hr style={{height: '2px', backgroundColor: '#172fdc'}}/> 
                        </div>
                        <TxtField nombre={"Observaciones"} id={"VVObservaciones"} multiline={true} width={80} term={"%"} onChange={this.handleChange} state={this.state}/>
                    </div>

                    {/* SALUD */}
                    <h1 style={{backgroundColor: '#5c70d2', color:'white'}}>SALUD</h1>
                    <div className={classes.container}>
                        <div style={{width: '100%'}}>
                            <br/>
                            <hr style={{height: '2px', backgroundColor: '#172fdc'}}/>   
                            <TxtField id={"mcantidad"} nombre={"Cantidad Atencion Medica"} width={250} term={"px"} onChange={this.handleChange} state={this.state}/>
                            {this.cmedica()}
                            <br/>
                            <hr style={{height: '2px', backgroundColor: '#172fdc'}}/> 
                        </div> 
                        <TxtField id={"SLHemodialisis"} nombre={"Cantidad de hemodialisis"} onChange={this.handleChange} state={this.state}/>
                        <TxtField id={"SLObservaciones"} nombre={"Observaciones"} multiline={true} width={80} term={"%"} onChange={this.handleChange} state={this.state}/>
                        <h3 style={{backgroundColor: '#acb8f3', color:'white'}}>ESTADO ACTUAL DE SALUD</h3>
                        <TxtField id={"SLCaso"} nombre={"Caso"} multiline={true} width={80} term={"%"} onChange={this.handleChange} state={this.state}/>
                        <TxtField id={"SLFamilia"} nombre={"Familia"} multiline={true} width={80} term={"%"} onChange={this.handleChange} state={this.state}/>
                    </div>

                    {/* OTROS */}
                    <h1 style={{backgroundColor: '#5c70d2', color:'white'}}>OTROS</h1>
                    <div className={classes.container}>
                        <TxtField nombre={"Referencias Con Colaterales"} id={"OTReferenciasC"} multiline={true} width={80} term={"%"} onChange={this.handleChange} state={this.state}/>
                        <TxtField nombre={"Historia Social"} id={"OTHistoriaS"} multiline={true} width={80} term={"%"} onChange={this.handleChange} state={this.state}/>
                        <TxtField nombre={"Diagnostico Socio-Economico"} id={"OTDiagnosticoSE"} multiline={true} width={80} term={"%"} onChange={this.handleChange} state={this.state}/>
                        <TxtField nombre={"Pronostico"} id={"OTPronostico"} options={Pronostico} onChange={this.handleChange} state={this.state}/>
                        <TxtField nombre={"Proveedor"} id={"OTProveedor"} onChange={this.handleChange} state={this.state}/>
                        {this.cProcedencia()}
                        <TxtField nombre={"Plan de Intervencion"} id={"OTPlanI"} multiline={true} width={80} term={"%"} onChange={this.handleChange} state={this.state}/>
                        <TxtField nombre={"Cantidad Autorizada"} id={"OTPresupuesto"} width={80} term={"%"} onChange={this.handleChange} state={this.state}/>
                        <TxtField nombre={"Donativo Hospital"} id={"OTDHospital"} onChange={this.handleChange} state={this.state}/>
                        <TxtField nombre={"Fondo Arzobispado"} id={"OTFArzobispado"} onChange={this.handleChange} state={this.state}/>
                        <TxtField nombre={"Fondo Cabildo"} id={"OTFCabildo"} onChange={this.handleChange} state={this.state}/>
                        <TxtField nombre={"Fondo Olga"} id={"OTFOlga"} onChange={this.handleChange} state={this.state}/>
                        <TxtField nombre={"Donante"} id={"OTDonante"} onChange={this.handleChange} state={this.state}/>
                        <TxtField nombre={"Aportacion Beneficiado"} id={"OTABeneficiado"} onChange={this.handleChange} state={this.state}/>
                        <TxtField nombre={"Notas de seguimiento y/o Evolucion"} id={"OTNotasSE"} multiline={true} width={80} term={"%"} onChange={this.handleChange} state={this.state}/>
                    </div>

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

export default withStyles(styles)(Socioeconomico);
