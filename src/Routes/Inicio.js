import React, { Component } from 'react'
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import firebase from '../config'
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import XLSX from 'xlsx'
import { Link, HashRouter as Router, Route, Switch } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';

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
  });

class Socioeconomico extends Component {
    constructor(props) {
        super(props)
        this.state = {
            users: []
        }
        this.exportFile = this.exportFile.bind(this)
    }

    componentWillMount() {
        this.getUsers()
    }

    /* getUsers() {
        let users = []
        firebase.database().ref(`users/`).once('value', snapshot => {
            snapshot.forEach(snap => {
                users.push(snap.val())
            })
            this.setState({
                users
            })
        })
    } */

    getUsers() {
        let users = []
        let user = {};

        firebase.database().ref(`casos/`).once('value', snapshot => {
            snapshot.forEach(snap => {
                user.val = snap.val();
                user.key = snap.key;

                users.push(user)
                user ={}
                /* users.push(snap.val()) */
            })
            this.setState({
                users
            }, () => console.log(this.state.users))
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

    render() {
        const { classes } = this.props;
        const data = this.state.users;

        const userColumns = [
            {
                Header: "Name",
                columns: [
                    {
                        Header: "Caso",
                        id: "Caso",
                        accessor: d => d.Caso
                    },
                    {
                        Header: "Domicilio",
                        id: "Domicilio",
                        accessor: d => d.Domicilio
                    }
                ]
            },
            {
                Header: "Celular",
                columns: [
                    {
                        Header: "Celular",
                        id: "Celular",
                        accessor: d => d.Celular
                    }
                ]
            }
        ]

        /* const userColumns = [
            {
                Header: "Name",
                columns: [
                    {
                        Header: "First Name",
                        id: "firstname",
                        accessor: d => d.firstname
                    },
                    {
                        Header: "Last Name",
                        id: "lastname",
                        accessor: d => d.lastname
                    }
                ]
            },
            {
                Header: "Age",
                columns: [
                    {
                        Header: "Age",
                        id: "age",
                        accessor: d => d.age
                    }
                ]
            }
        ] */

        /* const users = this.state.users; */
        return (
            <div style={style}>
                {/* <br/>
                <h1>Warsong</h1>
                <br/>
                <br/> */}
                <div>
                    <button onClick={this.exportFile}>Export to Excel</button>
                    {/* <ReactTable
                        style={{ marginLeft: '-40%', marginRight: '-40%' }}
                        data={this.state.users}
                        columns={userColumns}
                    /> */}

                    <Table className={classes.table}>
                        <TableHead>
                        <TableRow>
                            <TableCell>Caso</TableCell>
                            <TableCell numeric>Telefono</TableCell>
                            <TableCell numeric>Celular</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {data.map((row, i) => {
                            return (
                            <TableRow key={row.key}>
                                <Link to={{ 
                                    pathname: '/socioeconomico', 
                                    user: this.state.users[i]
                                }}>
                                    <Button variant="contained" color="primary" className={classes.button} /* onClick={(event) => this.saveForm(event)} */> 
                                        Editar
                                    </Button>
                                </Link>
                                <TableCell component="th" scope="row">
                                    {row.val.Caso}
                                </TableCell>
                                <TableCell numeric>{row.val.Telefono}</TableCell>
                                <TableCell numeric>{row.val.Celular}</TableCell>
                            </TableRow>
                            );
                        })}
                        </TableBody>
                    </Table>
                </div>
                
                {/* <Link to={{ 
                    pathname: '/socioeconomico', 
                    users
                }}>My route</Link> */}

                {/* <Link to={"/socioeconomico" } params={{ data: this.state.users }}>Warsong</Link> */}

            </div>
        )
    }
}

const style = {
    display: 'flex',
    justifyContent: 'center'
}

export default withStyles(styles)(Socioeconomico);
/* export default Socioeconomico */