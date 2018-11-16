import React from 'react';
import Typography from '@material-ui/core/Typography';
import Inicio from '../Routes/Inicio.js';
import Graficas from '../Routes/Graficas.js';
import Socioeconomico from '../Routes/Socioeconomico.js';
import Transporte from '../Routes/Transporte.js';
import Home from '@material-ui/icons/Home';
import Assignment from '@material-ui/icons/Assignment';
import Car from '@material-ui/icons/TimeToLeave';
import PieChart from '@material-ui/icons/PieChart';

const style = {
    overflow: 'visible',
    color: '#FFFFFF',
    fontSize: '25px'
};

const routes = [
    {
        path: '/',
        exact: true,
        title: () => <Typography style={style} noWrap>Inicio</Typography>,
        main: () => <Inicio />,
        linkTo: '/',
        icon: () => <Home style = {{ color : '#689F38'}} />,
        iconText: 'Inicio'
    },
    {
        path : '/socioeconomico',
        exact: true,
        title: () => <Typography style={style} noWrap>Socioeconomico</Typography>,
        main: () => <Socioeconomico />,
        linkTo: 'socioeconomico',
        icon: () => <Assignment style = {{ color : '#689F38'}} />,
        iconText: 'Estudio Socioeconomico'
    },
    {
        path : '/transporte',
        exact: true,
        title: () => <Typography style={style} noWrap>Transporte</Typography>,
        main: () => <Transporte />,
        linkTo: 'transporte',
        icon: () => <Car style = {{ color : '#689F38'}} />,
        iconText: 'Transporte'
    },
    {
        path : '/graficas',
        exact: true,
        title: () => <Typography style={style} noWrap>Graficas</Typography>,
        main: () => <Graficas />,
        linkTo: 'graficas',
        icon: () => <PieChart style = {{ color : '#689F38'}} />,
        iconText: 'Graficas'
    }
];

export default routes
/* module.exports = routes; */