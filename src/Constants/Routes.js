import React from 'react';
import Typography from '@material-ui/core/Typography';
// import Info from '@material-ui/icons/Info';
import Inicio from '../Routes/Inicio.js';
import Entrevista from '../Routes/Entrevista.js';
import Graficas from '../Routes/Graficas.js';
import Socioeconomico from '../Routes/Socioeconomico.js';
import Transporte from '../Routes/Transporte.js';

const style = {
    overflow: 'visible',
    color: '#FFFFFF'
};

const routes = [
    {
        path: '/',
        exact: true,
        title: () => <Typography style={style} noWrap type='title'>Inicio</Typography>,
        main: () => <Inicio />,
        linkTo: '/',
        // icon: () => <Info style = {{ color : '#689F38'}} />,
        iconText: 'Inicio'
    },
    {
        path : '/socioeconomico',
        exact: true,
        title: () => <Typography style={style} noWrap type='title'>Socioeconomico</Typography>,
        main: () => <Socioeconomico />,
        linkTo: 'socioeconomico',
        // icon: () => <ColorLens style = {{ color : '#689F38'}} />,
        iconText: 'Estudio Socioeconomico'
    },
    {
        path : '/transporte',
        exact: true,
        title: () => <Typography style={style} noWrap type='title'>Transporte</Typography>,
        main: () => <Transporte />,
        linkTo: 'transporte',
        // icon: () => <ColorLens style = {{ color : '#689F38'}} />,
        iconText: 'Transporte'
    },
    {
        path : '/entrevista',
        exact: true,
        title: () => <Typography style={style} noWrap type='title'>Entrevista</Typography>,
        main: () => <Entrevista />,
        linkTo: 'entrevista',
        // icon: () => <ColorLens style = {{ color : '#689F38'}} />,
        iconText: 'Entrevista'
    }
    ,
    {
        path : '/graficas',
        exact: true,
        title: () => <Typography style={style} noWrap type='title'>Graficas</Typography>,
        main: () => <Graficas />,
        linkTo: 'graficas',
        // icon: () => <ColorLens style = {{ color : '#689F38'}} />,
        iconText: 'Graficas'
    }
];

export default routes
/* module.exports = routes; */