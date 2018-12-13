import React from 'react';
import Inicio from '../Routes/Inicio.js';
import Graficas from '../Routes/Graficas.js';
import Socioeconomico from '../Routes/Socioeconomico.js';
import Transporte from '../Routes/Transporte.js';
import Home from '@material-ui/icons/Home';
import Assignment from '@material-ui/icons/Assignment';
import Car from '@material-ui/icons/TimeToLeave';
import PieChart from '@material-ui/icons/PieChart';

const routes = [
    {
        path: '/',
        exact: true,
        title: () => 'Inicio',
        main: () => <Inicio />,
        linkTo: '/',
        icon: <Home style = {{ color : 'white'}} />,
        iconText: 'Inicio'
    },
    {
        path : '/socioeconomico',
        exact: true,
        title: () => 'Socioeconomico',
        main: () => <Socioeconomico />,
        linkTo: 'socioeconomico',
        icon: <Assignment style = {{ color : 'white'}} />,
        iconText: 'Estudio Socioeconomico'
    },
    {
        path : '/transporte',
        exact: true,
        title: () => 'Transporte',
        main: () => <Transporte />,
        linkTo: 'transporte',
        icon: <Car style = {{ color : 'white'}} />,
        iconText: 'Transporte'
    },
    {
        path : '/graficas',
        exact: true,
        title: () => 'Graficas',
        main: () => <Graficas />,
        linkTo: 'graficas',
        icon: <PieChart style = {{ color : 'white'}} />,
        iconText: 'Graficas'
    }
];

export default routes