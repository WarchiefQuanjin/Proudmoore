import React, { Component } from 'react'
class App extends Component {   
  render() {     
    return (       
      <div style={style}>
         <div>
           <h1>Export Demo</h1>
           <button>Export to Excel</button>
           <table>
             <tr>
               <th>Firstname</th>
               <th>Lastname</th>
               <th>Age</th>
             </tr>
             <tr>
               <td>Garrosh</td>
               <td>Hellscream</td>
               <td>23</td>
             </tr>
             <tr>
               <td>Grommash</td>
               <td>Hellscream</td>
               <td>53</td>
             </tr>
           </table>
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
