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
import DeleteIcon from '@material-ui/icons/Delete'
import FileCopyIcon from '@material-ui/icons/FileCopy'
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import TxtField from '../Components/TxtField';
import TablePaginationActions from '../Components/TablePaginationActions.js'
import { Search } from '../Constants/Options';
import * as moment from 'moment';

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflow: 'hidden',
    },
    button: {
        margin: theme.spacing.unit,
        marginLeft: '10px',
        width: '40px',
        height: '40px'
    },
    table: {
        minWidth: 700
    },
    textField: {
        marginLeft: '10px',
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
            admin: false,
            address: false,
            data: [],
            year: new Date().getFullYear(),
            value: 0,
            page: 0,
            pageT: 0,
            rowsPerPage: 10,
            searchBySE: 'Persona',
            searchByT: 'Persona',
            searchT: '',
            searchSE: '',
            dialogOpen: false
        }
    }

    componentWillMount() {
        this.props.checkToken()

        this.getSocioeconomicoData();
        this.getTransporteData();
        this.checkAdmin();
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

    checkAdmin() {
        firebase.database().ref(`admins/`).orderByChild("Mail").equalTo(this.props.user.email).once("value", snapshot => {
            if (window.navigator.userAgent.indexOf("MSIE ") > 0 || window.navigator.userAgent.indexOf("Trident") > 0 || window.navigator.userAgent.indexOf("Edge") > 0) // If Internet Explorer, return version number
            {
                var wmi = new global.ActiveXObject("WbemScripting.SWbemLocator");
                var service = wmi.ConnectServer(".");
                var e = new global.Enumerator(service.ExecQuery("SELECT * FROM Win32_NetworkAdapterConfiguration WHERE IPEnabled = True"));
                for (; !e.atEnd(); e.moveNext()) {
                    var s = e.item();
                    var macAddress = unescape(s.MACAddress);
                }

                firebase.database().ref(`pc/`).orderByChild("Address").equalTo(macAddress).once("value", snap => {
                    this.setState({
                        admin: snap.exists() && snapshot.exists()
                    })
                });
            } else {
                this.setState({
                    admin: false
                })
            }
        });
    }

    exportFile() {
        const wb = XLSX.utils.book_new()
        const months = ['ENERO', 'FEBRERO', 'MARZO', 'ABRIL', 'MAYO', 'JUNIO', 'JULIO', 'AGOSTO',
            'SEPTIEMBRE', 'OCTUBRE', 'NOVIEMBRE', 'DICIEMBRE']

        months.forEach((month, i) => {
            let data = JSON.parse(JSON.stringify(Excel))
            let id = 1;

            this.state.data.filter((caso) => moment(caso.val.FMFecha, 'YYYY/MM/DD').year() === parseInt(this.state.year, 10))
                .filter((caso) => moment(caso.val.FMFecha, 'YYYY/MM/DD').month() === i)
                .forEach((caso) => {
                    const val = caso.val;
                    const clasificacion = val.DGEdad <= 17 ? "INFANTIL" :
                        val.DGEdad >= 60 ? "GERIATRICO" : "DIVERSO";

                    let apoyo = [];
                    for (var i = 0; i < val.apcantidad; i++) {
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
                        val.OTFCabildo, val.OTFOlga, val.OTDonacion, val.OTDonante, val.OTMesA, val.OTAnoA, val.OTABeneficiado, val.OTProveedor, val.OTProcedencia === 'OTROS' ? val.OTProcedenciaOt : val.OTProcedencia,
                        apoyo.length, val.SLHemodialisis, '', val.FMTrabajadora
                    ]

                    id++;
                    data.push(casosArray)
                })

            this.state.transporteData.filter((caso) => moment(caso.val.FMFecha, 'YYYY/MM/DD').year() === parseInt(this.state.year, 10))
                .filter((caso) => moment(caso.val.FMFecha, 'YYYY/MM/DD').month() === i)
                .forEach((caso) => {
                    const val = caso.val;
                    const clasificacion = val.DGEdad <= 17 ? "INFANTIL" :
                        val.DGEdad >= 60 ? "GERIATRICO" : "DIVERSO";

                    let apoyo = [];
                    for (var i = 0; i < val.apcantidad; i++) {
                        apoyo.push(val["FMApoyo" + i]);
                    }

                    let casosArray = [id, val.FMFecha, val.FMNumero, val.DGCaso, val.DGDomicilio, val.DGColonia,
                        val.DGMunicipio, val.DGEstado, val.DGEdad, val.DGSexo, clasificacion, 'FORANEA',
                        'OTROS/FORANEO', 'ZONA FORÁNEA, OTRAS DIOCESIS', '', '', '', '', '', '', '', '', '', '',
                        '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 1, '', '', '', '',
                        '', '', '', '', '', '', '', '', val.APCantidad, '', '', '', '', '', '', '', '', val.APAportacion,
                        val.APProveedor, val.APProcedencia === 'OTROS' ? val.APProcedenciaOt : val.APProcedencia,
                        1, val.SLHemodialisis, '', val.FMTrabajadora
                    ]

                    id++;
                    data.push(casosArray)
                })

            const wsAll = XLSX.utils.aoa_to_sheet(data)

            XLSX.utils.book_append_sheet(wb, wsAll, month)
        })

        XLSX.writeFile(wb, "BASE DE DATOS " + this.state.year + ".xlsx")
    }

    delete = () => {
        var casosRef = firebase.database().ref(this.state.type);
        casosRef.child(this.state.deleteRecord).remove();

        this.getSocioeconomicoData();
        this.getTransporteData();
        this.closeDeleteDialog();
    }

    openDeleteDialog = (record, type) => {
        this.setState({ dialogOpen: true, deleteRecord: record.key, type: type });
    }

    closeDeleteDialog = () => {
        this.setState({ dialogOpen: false });
    };

    handleChange = (field, value, type) => {
        if (field === 'year' && (isNaN(value) || value.length >= 5))
            return

        if (field === 'searchBySE') {
            this.setState({ searchSE: '' })
        } else if (field === 'searchByT') {
            this.setState({ searchT: '' })
        }

        this.props.checkToken(() => this.setState({
            [field]: value
        }))
    }

    handleChangePage = (event, page, type) => {
        this.props.checkToken(() => {
            this.setState({ [type]: page })
        });
    };

    handleChangeRowsPerPage = event => {
        this.props.checkToken(() => this.setState({ rowsPerPage: event.target.value }));
    };

    handleTabChange = (event, value) => {
        this.props.checkToken(() => this.setState({ value }));
    };

    socioeconomicoTable = (data, classes) => {
        const { rowsPerPage, page, searchSE, searchBySE } = this.state;
        const searchBy = searchBySE === 'Persona' ? 'DGCaso' :
            searchBySE === 'Fecha' ? 'FMFecha' : 'FMNumero'

        const filteredData = data.filter(caso => caso.val[searchBy]
            .indexOf(searchSE) !== -1)

        console.log('Warsong')
        console.log(filteredData)

        return (
            <div style={{ paddingTop: "50px" }}>
                <div style={{ paddingLeft: "10px" }}>
                    <TextField
                        id={'Buscar'}
                        label={searchBySE === 'Fecha' ? '' : 'Buscar'}
                        placeholder={searchBySE === 'Fecha' ? '' : 'Buscar'}
                        type={searchBySE === 'Fecha' ? 'date' : 'string'}
                        defaultValue={searchSE}
                        onChange={(event) => this.handleChange('searchSE', event.target.value)} />
                    <TxtField
                        id={"searchBySE"}
                        nombre={"Buscar Por"}
                        width={100}
                        options={Search}
                        onChange={this.handleChange}
                        state={this.state} />
                </div>
                <div style={{ overflowX: 'scroll', height: '100%' }}>
                    <Table className={classes.table} >
                        <TableHead>
                            <TableRow>
                                <TablePagination
                                    colSpan={3}
                                    count={filteredData.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    onChangePage={(e, p) => this.handleChangePage(e, p, 'page')}
                                    onChangeRowsPerPage={(e) => this.handleChangeRowsPerPage(e)}
                                    ActionsComponent={TablePaginationActions}
                                />
                            </TableRow>
                            <TableRow>
                                <TableCell></TableCell>
                                <TableCell>No. Caso</TableCell>
                                <TableCell>Caso</TableCell>
                                <TableCell>Tipo</TableCell>
                                <TableCell numeric>Celular</TableCell>
                                <TableCell >Fecha</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, i) => {
                                return (
                                    <TableRow key={row.key}>
                                        <TableCell style={{ display: 'flex' }}>
                                            <Link to={{
                                                pathname: '/socioeconomico',
                                                user: row,
                                                modifying: 1
                                            }}>
                                                <IconButton variant="contained" color="primary" className={classes.button}>
                                                    <EditIcon />
                                                </IconButton >
                                            </Link>
                                            <Link to={{
                                                pathname: '/socioeconomico',
                                                user: row,
                                                modifying: 0
                                            }}>
                                                <IconButton variant="contained" color="primary" className={classes.button}>
                                                    <FileCopyIcon />
                                                </IconButton>
                                            </Link>
                                            <IconButton variant="contained" color="primary" className={classes.button}
                                                onClick={() => this.openDeleteDialog(data[page * rowsPerPage + i], 'casos')}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </TableCell>
                                        <TableCell>{row.val.FMNumero}</TableCell>
                                        <TableCell component="th" scope="row">
                                            {row.val.DGCaso}
                                        </TableCell>
                                        <TableCell numeric>{row.val.FMTImpresion}</TableCell>
                                        <TableCell numeric>{row.val.DGCelular}</TableCell>
                                        <TableCell>{moment(row.val.FMFecha, 'YYYY-MM-DD').format('DD-MM-YYYY')}</TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TablePagination
                                    colSpan={3}
                                    count={filteredData.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    onChangePage={(e, p) => this.handleChangePage(e, p, 'page')}
                                    onChangeRowsPerPage={(e) => this.handleChangeRowsPerPage(e)}
                                    ActionsComponent={TablePaginationActions}
                                />
                            </TableRow>
                        </TableFooter>
                    </Table>
                </div>
            </div>
        )
    }

    transporteTable = (data, classes) => {
        const { rowsPerPage, pageT, searchT, searchByT } = this.state;
        const searchBy = searchByT === 'Persona' ? 'DGCaso' :
            searchByT === 'Fecha' ? 'FMFecha' : 'FMNumero'


        const filteredData = data.filter(caso => caso.val[searchBy].indexOf(searchT) !== -1)

        return (
            <div style={{ paddingTop: "50px" }}>
                <div style={{ paddingLeft: "10px" }}>
                    <TextField
                        id={'Buscar'}
                        label={searchByT === 'Fecha' ? '' : 'Buscar'}
                        placeholder={searchByT === 'Fecha' ? '' : 'Buscar'}
                        type={searchByT === 'Fecha' ? 'date' : 'string'}
                        defaultValue={searchT}
                        onChange={(event) => this.handleChange('searchT', event.target.value)} />
                    <TxtField
                        id={"searchByT"}
                        nombre={"Buscar Por"}
                        width={100}
                        options={Search}
                        onChange={this.handleChange}
                        state={this.state} />
                </div>
                <div style={{ overflowX: 'scroll', height: '100%' }}>
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                <TablePagination
                                    colSpan={3}
                                    count={filteredData.length}
                                    rowsPerPage={rowsPerPage}
                                    page={pageT}
                                    onChangePage={(e, p) => this.handleChangePage(e, p, 'pageT')}
                                    onChangeRowsPerPage={(e) => this.handleChangeRowsPerPage(e)}
                                    ActionsComponent={TablePaginationActions}
                                />
                            </TableRow>
                            <TableRow>
                                <TableCell></TableCell>
                                <TableCell>Numero</TableCell>
                                <TableCell>Caso</TableCell>
                                <TableCell>Fecha</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredData.slice(pageT * rowsPerPage, pageT * rowsPerPage + rowsPerPage).map((row, i) => {

                                return (
                                    <TableRow key={row.key}>
                                        <TableCell style={{ display: 'flex' }}>
                                            <Link to={{
                                                pathname: '/transporte',
                                                user: row,
                                                modifying: 1
                                            }}>
                                                <IconButton variant="contained" color="primary" className={classes.button}>
                                                    <EditIcon />
                                                </IconButton >
                                            </Link>
                                            <Link to={{
                                                pathname: '/transporte',
                                                user: row,
                                                modifying: 0
                                            }}>
                                                <IconButton variant="contained" color="primary" className={classes.button}>
                                                    <FileCopyIcon />
                                                </IconButton>
                                            </Link>
                                            <IconButton variant="contained" color="primary" className={classes.button}
                                                onClick={() => this.openDeleteDialog(data[pageT * rowsPerPage + i], 'transporte')}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </TableCell>
                                        <TableCell>{row.val.FMNumero}</TableCell>
                                        <TableCell component="th" scope="row">
                                            {row.val.DGCaso}
                                        </TableCell>
                                        <TableCell>{moment(row.val.FMFecha, 'YYYY-MM-DD').format('DD-MM-YYYY')}</TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TablePagination
                                    colSpan={3}
                                    count={filteredData.length}
                                    rowsPerPage={rowsPerPage}
                                    page={pageT}
                                    onChangePage={(e, p) => this.handleChangePage(e, p, 'pageT')}
                                    onChangeRowsPerPage={(e) => this.handleChangeRowsPerPage(e)}
                                    ActionsComponent={TablePaginationActions}
                                />
                            </TableRow>
                        </TableFooter>
                    </Table>
                </div>
            </div>
        )
    }

    render() {
        const { classes } = this.props;
        const data = this.state.data;
        const transporteData = this.state.transporteData;
        const value = this.state.value;

        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Tabs value={value} style={{ backgroundColor: '#5c70d2' }} onChange={this.handleTabChange}>
                        <Tab label="Socioeconomico"></Tab>
                        <Tab label="Transporte"></Tab>
                    </Tabs>
                </AppBar>

                <Dialog
                    open={this.state.dialogOpen}
                    onClose={this.closeDeleteDialog}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Esta seguro de borrar esta registro?"}</DialogTitle>
                    <DialogActions>
                        <Button onClick={this.closeDeleteDialog} color="primary">
                            Cancelar
                        </Button>
                        <Button onClick={() => this.props.checkToken(() => this.delete())} color="primary" autoFocus>
                            Eliminar
                        </Button>
                    </DialogActions>
                </Dialog>

                <div style={{ marginTop: '20px', display: 'flex' }}>
                    <Button variant="contained" color="primary" disabled={!this.state.admin} style={{ marginLeft: '10px' }}
                        onClick={() => this.props.checkToken(() => this.exportFile())}>
                        Exportar a excel
                    </Button>
                    <TextField
                        required
                        id="standard-required"
                        label="Año"
                        value={this.state.year}
                        className={classes.textField}
                        margin="normal"
                        onChange={(event) => this.handleChange('year', event.target.value)}
                    />
                </div>

                {value === 0 && this.socioeconomicoTable(data, classes)}
                {value === 1 && this.transporteTable(transporteData, classes)}

            </div>
        )
    }
}

export default withStyles(styles)(Inicio);