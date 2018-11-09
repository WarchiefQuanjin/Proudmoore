import React, { Component } from 'react'
import firebase from '../config'
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { 
    ECivil, 
    TrabajadoraS,
    Frecuencia,
    Escolaridad,
    Sexo,
    Procedencia,
    Estados,
    Decanatos
} from '../Constants/Options';
import TxtField from '../Components/TxtField';
import Autocomplete from '../Components/Autocomplete';
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

class Entrevista extends Component {
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

    tablaFormato = (props) => {
        var fcantidad = '<div style="display: flex">'+
        '<div style="width: 50%; text-align:right">'+
            '<p style="width: 100px; display: contents">FECHA DE APLICACION </p><input value="'+props.FMFecha+'"/><br>'+
            '<p style="width: 100px; display: contents">DERIVADO POR </p><input value="'+props.FMDerivado+'"/><br>'+
            '<p style="width: 100px; display: contents">TRABAJADORA SOCIAL </p><input value="'+props.FMTrabajadora+'"/>'+
        '</div>'+
        '<div style="width: 50%; text-align:right">'+
            '<p style="width: 100px; display: contents">NO. DE CASO </p><input value="'+props.FMNumero+'"/><br>'+
            '<p style="width: 100px; display: contents">FRECUENCIA </p><input value="'+props.FMFrecuencia+'"/>'+
        '</div></div>';

        return fcantidad;
    }

    tablaDatosGenerales = (props) => {
        var escolaridad = props.DGEscolaridad ? props.DGEscolaridad : '';
        var colonia = props.DGColonia ? props.DGColonia : '';
        var estado = props.DGEstado ? props.DGEstado : '';
        var domicilio = props.DGDomicilio ? props.DGDomicilio : '';
        var municipio = props.DGMunicipio ? props.DGMunicipio : '';
        var pais = props.DGPais ? props.DGPais : '';

        var fcantidad = '<p style="width: 100%;text-align: center;background-color: #4a76c5;color: white;margin-top: 30px; -webkit-print-color-adjust: exact">DATOS GENERALES</p>'+
            '<div style="display:flex">'+
            '<div style="width: 50%; text-align:right">'+
                '<p style="display: contents">NOMBRE </p><textarea rows="'+this.resizeTextArea(props.DGNom, 1)+'" style="width: 50%;">'+props.DGNom+'</textarea><br>'+
                '<p style="width: 100px; display: contents">ESTADO CIVIL </p><input style="width: 50%;" value="'+props.DGECivil+'"/><br>'+
                '<p style="width: 100px; display: contents">ESCOLARIDAD </p><input style="width: 50%;" value="'+escolaridad+'"/><br>'+
                '<p style="display: contents">PARROQUIA </p><textarea rows="'+this.resizeTextArea(props.DGParroquia, 1)+'" style="width: 50%;">'+props.DGParroquia+'</textarea><br>'+
                '<p style="display: contents">VICARIA </p><textarea rows="'+this.resizeTextArea(props.DGVicaria, 1)+'" style="width: 50%;">'+props.DGVicaria+'</textarea><br>'+
                '<p style="width: 100px; display: contents">COLONIA </p><input style="width: 50%;" value="'+colonia+'"/><br>'+
                '<p style="width: 100px; display: contents">ESTADO </p><input value="'+estado+'"/><br>'+
            '</div>'+
            '<div style="width: 50%; text-align:right">'+
                '<p style="width: 100px; display: contents">EDAD </p><input style="width: 50%;" value="'+props.DGEdad+'"/><br>'+
                '<p style="width: 100px; display: contents">OCUPACION </p><input value="'+props.DGOcupacion+'"/><br>'+
                '<p style="width: 100px; display: contents">SEXO </p><input value="'+props.DGSexo+'"/><br>'+
                '<p style="display: contents">DECANATO </p><textarea rows="'+this.resizeTextArea(props.DGDecanato, 1)+'" style="width: 50%;">'+props.DGDecanato+'</textarea><br>'+
                '<p style="display: contents">CALLE </p><textarea rows="'+this.resizeTextArea(domicilio, 1)+'" style="width: 50%;">'+domicilio+'</textarea><br>'+
                '<p style="width: 100px; display: contents">MUNICIPIO </p><input style="width: 50%;" value="'+municipio+'"/><br>'+
                '<p style="width: 100px; display: contents">PAIS </p><input style="width: 50%;" value="'+pais+'"/><br>'+
            '</div>'+
        '</div><br>'
        
        if(parseInt(props.gcantidad, 10) > 0) {
            fcantidad += '<table style="width: 100%; align: left; font-size: 12px">'+
            '<tr>'+
                '<th>NOMBRE</th>'+
                '<th>EDAD</th>'+
                '<th>ESTADO CIVIL</th>'+
                '<th>OCUPACION</th>'+
                '<th>ESCOLARIDAD</th>'+
            '</tr>';

            for(var i = 0; i < props.gcantidad; i++){
                fcantidad += '<tr>'+
                    '<td>'+props['CFFam'+i+'nom']+'</td>'+
                    '<td>'+props['CFFam'+i+'edad']+'</td>'+
                    '<td>'+props['CFFam'+i+'ecivil']+'</td>'+
                    '<td>'+props['CFFam'+i+'ocupacion']+'</td>'+
                    '<td>'+props['CFFam'+i+'escolaridad']+'</td>'+
                '</tr>'
            }

            fcantidad += '</table><br>'
        }
        
        return fcantidad;
    }

    tablaIdentificacion = (props) => {
        var fcantidad = '<p style="width: 100%;text-align: center;background-color: #4a76c5;color: white;margin-top: 30px; -webkit-print-color-adjust: exact">IDENTIFICACION</p>'+
        '<div style="display: flex"><div>'+
            '<p style="width: 100px; display: contents">TIPO DE IDENTIFICACION </p><input value="'+props.IDTipo+'"/><br>'+
            '<p style="width: 100px; display: contents">ORIGINARIO DE </p><input value="'+props.IDOriginario+'"/><br>'+
            '<p style="width: 100px; display: contents">TIEMPO QUE TIENE EN LA CIUDAD </p><input value="'+props.IDTiempo+'"/><br>'+
            '<p style="width: 100px; display: contents">LUGAR DONDE SE HOSPEDA </p><input value="'+props.IDHospeda+'"/>'+
        '</div></div>';

        return fcantidad;
    }

    tablaSolicitud = (props) => {
        var fcantidad = '<p style="width: 100%;text-align: center;background-color: #4a76c5;color: white;margin-top: 30px; -webkit-print-color-adjust: exact">SOLICITUD</p>'+
        '<div style="display: flex"><div>'+
            '<p style="width: 100px; display: contents">DESTINO AL QUE SOLICITA APOYO </p><input value="'+props.SDDestino+'"/><br>'+
            '<p style="display: contents">MOTIVO DE SOLICITUD </p><textarea rows="'+this.resizeTextArea(props.SDMotivo, 1)+'" style="width: 50%;">'+props.SDMotivo+'</textarea><br>'+
        '</div></div>';

        return fcantidad;
    }

    tablaApoyo = (props) => {
        var cantidad = props.APCantidad ? props.APCantidad : '';
        var aportacion = props.APAportacion ? props.APAportacion : '';
        var folioC = props.APFolioC ? props.APFolioC : '';
        var procedencia = props.APProcedencia === 'OTROS' ? props.APProcedenciaOt : props.APProcedencia;

        var fcantidad = '<p style="width: 100%;text-align: center;background-color: #4a76c5;color: white;margin-top: 30px; -webkit-print-color-adjust: exact">APOYO</p>'+
        '<div style="display: flex"><div>'+
            '<p style="width: 100px; display: contents">DESTINO</p><input value="'+props.APDestino+'"/><br>'+
            '<p style="width: 100px; display: contents">NUMERO DE BOLETOS</p><input value="'+props.APBoletos+'"/><br>'+
            '<p style="width: 100px; display: contents">CANTIDAD AUTORIZADA</p><input value="'+cantidad+'"/><br>'+
            '<p style="width: 100px; display: contents">APORTACION DEL SOLICITANTE</p><input value="'+aportacion+'"/><br>'+
            '<p style="display: contents">PROVEEDOR</p><textarea rows="'+(props.APProveedor ? this.resizeTextArea(props.APProveedor, 2) : 1)+'" style="width: 50%" >'+(props.APProveedor ? props.APProveedor : '')+'</textarea><br>'+ 
            '<p style="display: contents">PROCEDENCIA</p><textarea rows="'+(procedencia ? this.resizeTextArea(procedencia, 2) : 1)+'" style="width: 50%" >'+(procedencia ? procedencia : '')+'</textarea><br>'+ 
            '<p style="width: 100px; display: contents">FOLIO DE TRABAJO SOCIAL</p><input value="'+props.APFolioTS+'"/><br>'+
            '<p style="width: 100px; display: contents">FOLIO DE CAJA</p><input value="'+folioC+'"/>'+
        '</div></div>';

        return fcantidad;
    }

    tablaObservaciones = (props) => {
        var fcantidad = '<p style="width: 100%;text-align: center;background-color: #4a76c5;color: white;margin-top: 30px; -webkit-print-color-adjust: exact">OBSERVACIONES</p>'+
        '<p style="width: 50%">OBSERVACIONES </p><textarea rows="'+this.resizeTextArea(props.OBObservaciones, 2)+'" style="width: 100%; margin-top: -15px" >'+props.OBObservaciones+'</textarea>';

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
            '<h2 style="width:600px; height:100px; text-align:center">CASOS EMERGENTES<br>AREA DE TRANSPORTE</h2>'+
            '<h2 style="width:100px; height:100px;"></h2>'+
        '</div>';

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
        documentToPrint.document.write(this.tablaDatosGenerales(props));
        documentToPrint.document.write(this.tablaIdentificacion(props));
        documentToPrint.document.write(this.tablaSolicitud(props));
        documentToPrint.document.write(this.tablaApoyo(props));
        documentToPrint.document.write(this.tablaObservaciones(props));
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
            'IDOriginario', 'IDTiempo', 'IDHospeda', 'SDDestino', 'SDMotivo', 'APDestino', 'APProveedor', 'APProcedencia', 'APBoletos', 'APFolioTS', 
            'DGNom', 'DGEdad', 'DGECivil', 'DGOcupacion', 'DGParroquia', 'DGDecanato', 'DGVicaria', 'DGParroquia', 'DGDecanato', 'DGVicaria', 'DGSexo' ];
        
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

    cProcedencia = () => (
        <div>
            <TxtField id={"APProcedencia"} nombre={"Procedencia"} required width={180} options={Procedencia} onChange={this.handleChange} state={this.state.caso}/>
            {this.state.caso["APProcedencia"] === 'OTROS' && <TxtField id={"APProcedenciaOt"} nombre={"Procedencia"} width={180} onChange={this.handleChange} state={this.state.caso}/> }
        </div>
    )

    handleChange = (id, value) => {
        let caso = this.state.caso
        caso[id] = value

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
                        <div>
                            <TxtField id={"DGNom"} nombre={"Nombre"} width={160} required onChange={this.handleChange} state={this.state.caso}/>
                            <TxtField id={"DGEdad"} nombre={"Edad"} width={50} required onChange={this.handleChange} state={this.state.caso}/>
                            <TxtField id={"DGSexo"} nombre="Sexo" required options={Sexo} onChange={this.handleChange} state={this.state.caso}/>
                            <TxtField id={"DGECivil"} nombre={"Estado Civil"} width={120} required options={ECivil} onChange={this.handleChange} state={this.state.caso}/>
                            <TxtField id={"DGOcupacion"} nombre={"Ocupacion"} width={150} required onChange={this.handleChange} state={this.state.caso}/>
                            <Autocomplete id={"DGEscolaridad"} nombre={"Escolaridad"} options={Escolaridad} onChange={this.handleChange} state={this.state.caso}/>
                            <TxtField nombre={"Parroquia"} id={"DGParroquia"} required multiline={true} onChange={this.handleChange} state={this.state.caso}/>
                            <Autocomplete nombre={"Decanato"} id={"DGDecanato"} required multiline={true} options={Decanatos} onChange={this.handleChange} state={this.state.caso}/>
                            <TxtField nombre={"Vicaria"} id={"DGVicaria"} required multiline onChange={this.handleChange} state={this.state.caso}/>
                            <hr style={{borderColor: 'black'}}></hr>
                            {this.cGenerales()}
                        </div>
                        <div>
                            <TxtField id={"DGDomicilio"} nombre={"Domicilio"}  onChange={this.handleChange} state={this.state.caso}/>
                            <TxtField id={"DGColonia"} nombre={"Colonia"} onChange={this.handleChange} state={this.state.caso}/>
                            <TxtField id={"DGMunicipio"} nombre={"Municipio"} onChange={this.handleChange} state={this.state.caso}/>
                            {/* <TxtField id={"DGEstado"} nombre={"Estado"} onChange={this.handleChange} state={this.state.caso}/> */}
                            <Autocomplete nombre={"Estado"} id={"DGEstado"} required options={Estados} onChange={this.handleChange} state={this.state.caso}/>
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
                        <TxtField nombre={"Proveedor"} id={"APProveedor"} required onChange={this.handleChange} state={this.state.caso}/>
                        {this.cProcedencia()}
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

export default withStyles(styles)(Entrevista);