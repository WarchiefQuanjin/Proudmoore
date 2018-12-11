import React from 'react';
/* import Typography from '@material-ui/core/Typography'; */
import Inicio from '../Routes/Inicio.js';
import Graficas from '../Routes/Graficas.js';
import Socioeconomico from '../Routes/Socioeconomico.js';
import Transporte from '../Routes/Transporte.js';
import Home from '@material-ui/icons/Home';
import Assignment from '@material-ui/icons/Assignment';
import Car from '@material-ui/icons/TimeToLeave';
import PieChart from '@material-ui/icons/PieChart';

/* const style = {
    overflow: 'visible',
    color: 'white',
    fontSize: '25px'
}; */

const routes = [
    {
        path: '/',
        exact: true,
        /* title: () => <Typography style={style} noWrap>Inicio</Typography>, */
        title: () => 'Inicio',
        main: () => <Inicio />,
        linkTo: '/',
        /* icon: () => <Home style = {{ color : 'white'}} />, */
        icon: <Home style = {{ color : 'white'}} />,
        iconText: 'Inicio'
    },
    {
        path : '/socioeconomico',
        exact: true,
        /* title: () => <Typography style={style} noWrap>Socioeconomico</Typography>, */
        title: () => 'Socioeconomico',
        main: () => <Socioeconomico />,
        linkTo: 'socioeconomico',
        /* icon: () => <Assignment style = {{ color : 'white'}} />, */
        icon: <Assignment style = {{ color : 'white'}} />,
        iconText: 'Estudio Socioeconomico'
    },
    {
        path : '/transporte',
        exact: true,
        /* title: () => <Typography style={style} noWrap>Transporte</Typography>, */
        title: () => 'Transporte',
        main: () => <Transporte />,
        linkTo: 'transporte',
        /* icon: () => <Car style = {{ color : 'white'}} />, */
        icon: <Car style = {{ color : 'white'}} />,
        iconText: 'Transporte'
    },
    {
        path : '/graficas',
        exact: true,
        /* title: () => <Typography style={style} noWrap>Graficas</Typography>, */
        title: () => 'Graficas',
        main: () => <Graficas />,
        linkTo: 'graficas',
        /* icon: () => <PieChart style = {{ color : 'white'}} />, */
        icon: <PieChart style = {{ color : 'white'}} />,
        iconText: 'Graficas'
    }
];

export default routes
/* module.exports = routes; */