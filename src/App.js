import React, { Component } from 'react'
import ReactTable from 'react-table' 
import 'react-table/react-table.css' 
import firebase from './config' 

class App extends Component {
   constructor(props) {
     super(props)
     this.state = {
       users: []
     }
   }
   componentWillMount(){
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
         <div>
           <h1>Export Demo</h1>
           <button>Export to Excel</button>
           <ReactTable
             style={{marginLeft:'-40%', marginRight:'-40%'}}
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
export default App

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
