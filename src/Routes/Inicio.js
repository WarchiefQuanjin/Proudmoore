import React, { Component } from 'react'
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import firebase from '../config'
import XLSX from 'xlsx'

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

    render() {
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
            <div style={style}>
                <br/>
                <h1>Warsong</h1>
                <div>
                    <button onClick={this.exportFile}>Export to Excel</button>
                    <ReactTable
                        style={{ marginLeft: '-40%', marginRight: '-40%' }}
                        data={this.state.users}
                        columns={userColumns}
                    />
                </div>
            </div>
        )
    }
}

const style = {
    display: 'flex',
    justifyContent: 'center'
}

export default Socioeconomico