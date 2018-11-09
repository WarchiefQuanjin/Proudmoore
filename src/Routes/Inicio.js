import React, { Component } from 'react'
import firebase from '../config'
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import XLSX from 'xlsx'
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { Excel } from '../Constants/Options';
import TextField from '@material-ui/core/TextField';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AppBar from '@material-ui/core/AppBar';
import EditIcon from '@material-ui/icons/Edit'
import FileCopyIcon from '@material-ui/icons/FileCopy'
import IconButton from '@material-ui/core/IconButton';
import TxtField from '../Components/TxtField';
import TablePaginationActions from '../Components/TablePaginationActions.js'
import { Search } from '../Constants/Options';

const styles = theme => ({
    root: {
      width: '100%',
      marginTop: theme.spacing.unit * 3,
      overflowX: 'auto',
    },
    button: {
        margin: theme.spacing.unit,
    },
    table: {
      minWidth: 700,
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        marginTop: '2px',
        marginBottom: '2px',
        width: 200,
    }
});

class Inicio extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            year: new Date().getFullYear(),
            value: 0,
            page: 0,
            rowsPerPage: 10,
            searchBySE: 'Persona',
            searchByT: 'Persona',
            searchT: '',
            searchSE: ''
        }
    }

    componentWillMount() {
        this.getSocioeconomicoData()
        this.getTransporteData()
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

    exportFile() {
        const wb = XLSX.utils.book_new()
        const months = ['ENERO', 'FEBRERO', 'MARZO', 'ABRIL', 'MAYO', 'JUNIO', 'JULIO', 'AGOSTO', 
            'SEPTIEMBRE', 'OCTUBRE', 'NOVIEMBRE', 'DICIEMBRE']

        months.forEach((month, i) => {
            let data = JSON.parse(JSON.stringify(Excel))
            let id = 1;

            this.state.data.filter((caso) => new Date(caso.val.FMFecha).getFullYear() === parseInt(this.state.year, 10) )
                .filter((caso) => new Date(caso.val.FMFecha).getMonth() === i )
                .forEach((caso) => {
                    const val = caso.val;
                    const clasificacion = val.DGEdad <= 17 ? "INFANTIL" :
                        val.DGEdad >= 60 ? "GERIATRICO" : "DIVERSO";

                    let apoyo = [];
                    for(var i = 0; i < val.apcantidad; i++){
                        apoyo.push(val["FMApoyo" + i]);
                    }
                    
                    let casosArray = [id, val.FMFecha, val.FMNumero, val.DGCaso, val.DGCalle, val.DGColonia, 
                        val.DGMunicipio, val.DGEstado, val.DGEdad, val.DGSexo, clasificacion, val.DGParroquia, 
                        val.DGDecanato, val.DGVicaria, apoyo.includes("ORIENTACION") ? 1 : '', apoyo.includes("DESPENSA") ? 1 : '',
                        apoyo.includes("ALIMENTO") ? 1 : '', apoyo.includes("LECHE") ? 1 : '', apoyo.includes("PAÑALES") ? 1 : '',
                        apoyo.includes("MEDICAMENTO") ? 1 : '', apoyo.includes("ESTUDIOS MEDICOS") ? 1 : '', apoyo.includes("IMPLEMENTOS MEDICOS") ? 1 : '',
                        apoyo.includes("T.M.OFTALMOLOGICO") ? 1 : '', apoyo.includes("T.M. ONCOLOGICO") ? 1 : '', apoyo.includes("T.M. DIALISIS") ? 1 : '',
                        apoyo.includes("T.M. HEMODIALISIS") ? 1 : '', apoyo.includes("T.M. OXIGENO") ? 1 : '', apoyo.includes("AUDITIVO") ? 1 : '',
                        apoyo.includes("PROTESIS EXTERNAS") ? 1 : '', apoyo.includes("SILLAS DE RUEDAS") ? 1 : '', apoyo.includes("ANDADERAS") ? 1 : '',
                        apoyo.includes("MULETAS") ? 1 : '', apoyo.includes("CAMA DE HOSPITAL") ? 1 : '', apoyo.includes("COLCHON ORTOPEDICO") ? 1 : '',
                        apoyo.includes("AUXILIAR DE BAÑO") ? 1 : '', apoyo.includes("ASPIRADOR DE SECRECIONES") ? 1 : '', apoyo.includes("BASTON") ? 1 : '',
                        apoyo.includes("CORSET") ? 1 : '', apoyo.includes("I. ORTOPEDICO") ? 1 : '', apoyo.includes("ENSERES DOMESTICOS") ? 1 : '',
                        apoyo.includes("RENTA") ? 1 : '', apoyo.includes("TRANSPORTE") ? 1 : '', apoyo.includes("PEQUEÑO COMERCIO") ? 1 : '',
                        apoyo.includes("DOCUMENTOS DE EMPLEO") ? 1 : '', apoyo.includes("FUNERAL") ? 1 : '', apoyo.includes("ROPA") ? 1 : '',
                        apoyo.includes("ZAPATOS O TENIS") ? 1 : '', apoyo.includes("KIT DE LIMPIEZA") ? 1 : '', apoyo.includes("COBIJAS") ? 1 : '',
                        apoyo.includes("CENAS NAVIDEÑAS") ? 1 : '', apoyo.includes("SEGUIMIENTO") ? 1 : '', apoyo.includes("RENOVO CANALIZACION") ? 1 : '',
                        apoyo.includes("DERIVACION") ? 1 : '', apoyo.includes("OTROS") ? 1 : '', val.OTPresupuesto, val.OTDHospital, val.OTFArzobispado,
                        val.OTFCabildo, val.OTFOlga, val.OTDonante, val.OTABeneficiado, val.OTProveedor, val.OTProcedencia === 'OTROS' ? val.OTProcedenciaOt : val.OTProcedencia,
                        apoyo.length, val.SLHemodialisis, '', '', '', '', val.FMTrabajadora
                    ]

                    id++;
                    data.push(casosArray)
            })

            this.state.transporteData.filter((caso) => new Date(caso.val.FMFecha).getFullYear() === parseInt(this.state.year, 10) )
                .filter((caso) => new Date(caso.val.FMFecha).getMonth() === i )
                .forEach((caso) => {
                    const val = caso.val;
                    const clasificacion = val.DGEdad <= 17 ? "INFANTIL" :
                        val.DGEdad >= 60 ? "GERIATRICO" : "DIVERSO";

                    let apoyo = [];
                    for(var i = 0; i < val.apcantidad; i++){
                        apoyo.push(val["FMApoyo" + i]);
                    }
                    
                    let casosArray = [id, val.FMFecha, val.FMNumero, val.DGCaso, val.DGDomicilio, val.DGColonia, 
                        val.DGMunicipio, val.DGEstado, val.DGEdad, val.DGSexo, clasificacion, 'FORANEA', 
                        'OTROS/FORANEO', 'ZONA FORÁNEA, OTRAS DIOCESIS', '', '', '', '', '', '', '', '', '', '', 
                        '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 1, '', '', '', '',
                        '', '', '', '', '', '', '', '', val.APCantidad, '', '', '', '', '', val.APAportacion, 
                        val.APProveedor, val.APProcedencia === 'OTROS' ? val.APProcedenciaOt : val.APProcedencia,
                        1, val.SLHemodialisis, '', '', '', '', val.FMTrabajadora
                    ]

                    id++;
                    data.push(casosArray)
            })

            const wsAll = XLSX.utils.aoa_to_sheet(data)
            
            XLSX.utils.book_append_sheet(wb, wsAll, month)
        })

        XLSX.writeFile(wb, "BASE DE DATOS " + this.state.year + ".xlsx")
    }

    transporteTable = (data, classes) => {
        const { rowsPerPage, page, searchT, searchByT } = this.state;
        const rows = this.state.data
        const searchBy = searchByT === 'Persona' ? 'DGCaso' : 'FMNumero'

        return (
            <div style={{paddingTop: "90px"}}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <TextField 
                                    id={'Buscar'}
                                    label={'Buscar'}
                                    placeholder={'Buscar'}
                                    defaultValue={searchT}
                                    onChange={(event) => this.handleSearch('searchT', event.target.value)}
                                />
                                
                            </TableCell>
                            <TableCell>
                                {<TxtField id={"searchByT"} nombre={"Buscar Por"} width={100} options={Search} onChange={this.handleSearch} state={this.state}/>}
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell></TableCell>
                            <TableCell>Numero</TableCell>
                            <TableCell>Caso</TableCell>
                            <TableCell>Fecha</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.filter(caso => caso.val[searchBy].includes(searchT)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, i) => {
                            return (
                            <TableRow key={row.key}>
                                <TableCell style={{display: 'flex'}}>
                                    <Link to={{ 
                                        pathname: '/transporte', 
                                        user: data[i],
                                        modifying: 1
                                    }}>
                                        <IconButton  variant="contained" color="primary" className={classes.button}> 
                                            <EditIcon/>
                                        </IconButton >
                                    </Link>
                                    <Link to={{ 
                                        pathname: '/transporte', 
                                        user: data[i],
                                        modifying: 0
                                    }}>
                                        <IconButton variant="contained" color="primary" className={classes.button}> 
                                            <FileCopyIcon/>
                                        </IconButton>
                                    </Link>
                                </TableCell>
                                <TableCell>{row.val.FMNumero}</TableCell>
                                <TableCell component="th" scope="row">
                                    {row.val.DGCaso}
                                </TableCell>
                                <TableCell>{row.val.FMFecha}</TableCell>
                            </TableRow>
                            );
                        })}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                            colSpan={3}
                            count={rows.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onChangePage={(e, p) => this.handleChangePage(e, p)}
                            onChangeRowsPerPage={(e) => this.handleChangeRowsPerPage(e)}
                            ActionsComponent={TablePaginationActions}
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </div>
        )
    }

    socioeconomicoTable = (data, classes) => {
        const { rowsPerPage, page, searchSE, searchBySE } = this.state;
        const rows = this.state.data
        const searchBy = searchBySE === 'Persona' ? 'DGCaso' : 'FMNumero'
        
        return (
            <div style={{paddingTop: "90px"}}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <TextField 
                                    id={'Buscar'}
                                    label={'Buscar'}
                                    placeholder={'Buscar'}
                                    defaultValue={searchSE}
                                    onChange={(event) => this.handleSearch('searchSE', event.target.value)}
                                />
                                
                            </TableCell>
                            <TableCell>
                                {<TxtField id={"searchBySE"} nombre={"Buscar Por"} width={100} options={Search} onChange={this.handleSearch} state={this.state}/>}
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell></TableCell>
                            <TableCell>No.</TableCell>
                            <TableCell>Caso</TableCell>
                            <TableCell>Tipo</TableCell>
                            <TableCell numeric>Celular</TableCell>
                            <TableCell >Fecha</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.filter(caso => caso.val[searchBy].includes(searchSE)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, i) => {
                            return (
                            <TableRow key={row.key}>
                                <TableCell style={{display: 'flex'}}>
                                    <Link to={{ 
                                        pathname: '/socioeconomico', 
                                        user: data[i],
                                        modifying: 1
                                    }}>
                                        <IconButton  variant="contained" color="primary" className={classes.button}> 
                                            <EditIcon/>
                                        </IconButton >
                                    </Link>
                                    <Link to={{ 
                                        pathname: '/socioeconomico', 
                                        user: data[i],
                                        modifying: 0
                                    }}>
                                        <IconButton variant="contained" color="primary" className={classes.button}> 
                                            <FileCopyIcon/>
                                        </IconButton>
                                    </Link>
                                </TableCell>
                                <TableCell>{row.val.FMNumero}</TableCell>
                                <TableCell component="th" scope="row">
                                    {row.val.DGCaso}
                                </TableCell>
                                <TableCell numeric>{row.val.FMTImpresion}</TableCell>
                                <TableCell numeric>{row.val.DGCelular}</TableCell>
                                <TableCell >{row.val.FMFecha}</TableCell>
                            </TableRow>
                            );
                        })}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                            colSpan={3}
                            count={rows.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onChangePage={(e, p) => this.handleChangePage(e, p)}
                            onChangeRowsPerPage={(e) => this.handleChangeRowsPerPage(e)}
                            ActionsComponent={TablePaginationActions}
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </div>
        )
    }

    handleChange = (value) => {
        if(isNaN(value) || value.length >= 5)
            return

        this.setState({
            year: value
        })
    }

    handleSearch = (field, value) => {
        /* console.log('-------------')
        console.log(value)
        const data = this.state.data;
        console.log(data)
        const result = data.filter(caso => caso.val.DGCaso.includes(value))
        console.log(result) */
        /* console.log('-------------')
        console.log(field)
        console.log(value) */
        this.setState({[field]: value})
    }

    handleChangePage = (event, page) => {
        console.log(page)
        this.setState({ page });
    };
    
    handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: event.target.value });
    };

    handleTabChange = (event, value) => {
        this.setState({ value });
    };

    render() {
        const { classes } = this.props;
        const data = this.state.data;
        const transporteData = this.state.transporteData;
        const value = this.state.value;
        /* const { rows, rowsPerPage, page } = this.state;
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage); */

        return (
            <div >
                <AppBar position="static">
                    <Tabs value={value} onChange={this.handleTabChange}>
                        <Tab label="Socioeconomico" />
                        <Tab label="Transporte" />
                    </Tabs>
                </AppBar>

                <div style={{marginTop: '20px'}}>
                    <Button variant="contained" color="primary" className={classes.button} onClick={() => this.exportFile(value)/* () => this.exportFile() */}> 
                        Exportar a excel
                    </Button>
                    <TextField
                        required
                        id="standard-required"
                        label="Año"
                        value={this.state.year}
                        className={classes.textField}
                        margin="normal"
                        onChange={(event) => this.handleChange(event.target.value)}
                    />
                </div>

                {value === 0 && this.socioeconomicoTable(data, classes)}
                {value === 1 && this.transporteTable(transporteData, classes)}

            </div>
        )
    }
}

export default withStyles(styles)(Inicio);