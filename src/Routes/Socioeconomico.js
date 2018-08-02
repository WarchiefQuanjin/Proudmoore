import React, { Component } from 'react'
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import firebase from '../config'
import XLSX from 'xlsx'
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

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
                id={props.nombre}
                label={props.nombre}
                placeholder={props.nombre}
                className={props.classes.textField}
                margin="normal"
            />
        )
    }
    

    render() {
        const { classes } = this.props;

        const userColumns = [
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
        ]

        return (
            <div className={classes.root}/* style={style} */>
                <div>
                    <h1>Datos Generales</h1>
                    <div className={classes.container}>
                        <this.txtField nombre="Nombre del caso" classes={classes}/>
                        <this.txtField nombre="Edad" classes={classes}/>
                        <this.txtField nombre="Domicilio" classes={classes}/>
                        <this.txtField nombre="Telefono" classes={classes}/>
                        <this.txtField nombre="Colonia" classes={classes}/>
                        <this.txtField nombre="Telefono recados" classes={classes}/>
                        <this.txtField nombre="Cruce de calles" classes={classes}/>
                        <this.txtField nombre="Celular" classes={classes}/>
                        <this.txtField nombre="Estado civil" classes={classes}/>
                        <this.txtField nombre="Codigo postal" classes={classes}/>
                        <this.txtField nombre="Escolaridad" classes={classes}/>
                        <this.txtField nombre="Municipio" classes={classes}/>
                        <this.txtField nombre="Ocupacion" classes={classes}/>
                        <this.txtField nombre="Estado" classes={classes}/>
                        <this.txtField nombre="Parroquia" classes={classes}/>
                        <this.txtField nombre="Estado" classes={classes}/>
                        <this.txtField nombre="Persona Entrevistada" classes={classes}/>
                        <this.txtField nombre="Parentesco" classes={classes}/>
                    </div>

                    <h1>Composicion Familiar</h1>
                    <div className={classes.container}>
                        <this.txtField nombre="Cantidad" classes={classes}/>
                    </div>
                    {/* <button
                        onClick={this.exportFile}>Export to Excel</button>
                    <ReactTable
                        style={{ marginLeft: '-40%', marginRight: '-40%' }}
                        data={this.state.users}
                        columns={userColumns}
                    /> */}

                </div>
            </div>
        )
    }
}

/* const style = {
    display: 'flex',
    justifyContent: 'center'
} */

/* export default Socioeconomico */
export default withStyles(styles)(Socioeconomico);

// import React, { Component } from 'react';
// import logo from './logo.svg';
// import './App.css';

// class App extends Component {
//   render() {
//     return (
//       <div className="App">
//         <header className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           <h1 className="App-title">Welcome to React</h1>
//         </header>
//         <p className="App-intro">
//           To get started, edit <code>src/App.js</code> and save to reload.
//         </p>
//       </div>
//     );
//   }
// }

// export default App;