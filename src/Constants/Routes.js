import React from 'react';
import Typography from '@material-ui/core/Typography';
/* import Status from '../Routes/Status.jsx'; */
// import Info from '@material-ui/icons/Info';
import Inicio from '../Routes/Inicio.js';
import Socioeconomico from '../Routes/Socioeconomico.js';
// import ColorLens from '@material-ui/icons/DeleteRounded';

const style = {
    overflow: 'visible',
    color: '#FFFFFF'
};

const routes = [
    {
        path: '/',
        exact: true,
        title: () => <Typography style={style} noWrap type='title' noWrap>Inicio</Typography>,
        main: () => <Inicio />,
        linkTo: '/',
        // icon: () => <Info style = {{ color : '#689F38'}} />,
        iconText: 'Inicio'
    },
    {
        path : '/socioeconomico',
        exact: true,
        title: () => <Typography style={style} noWrap type='title' noWrap>Socioeconomico</Typography>,
        main: () => <Socioeconomico />,
        linkTo: 'socioeconomico',
        // icon: () => <ColorLens style = {{ color : '#689F38'}} />,
        iconText: 'Estudio Socioeconomico'
    }/* ,
    {
        path : '/transition',
        exact: true,
        title: () => <Typography style={style} noWrap type='title' noWrap>Transition</Typography>,
        main: () => <Transition />,
        linkTo: 'transition',
        icon: () => <CompareArrows style = {{ color : '#689F38'}} />,
        iconText: 'Transition'
    },
    {
        path : '/customimage',
        exact: true,
        title: () => <Typography style={style} noWrap type='title' noWrap>Custom Image</Typography>,
        main: () => <CustomImage />,
        linkTo: 'customimage',
        icon: () => <CropOriginal style = {{ color : '#689F38'}} />,
        iconText: 'Custom Image'
    } */
];

export default routes
/* module.exports = routes; */