import React, { Component } from 'react'
import 'react-table/react-table.css'
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

const styles = theme => ({
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        marginTop: '2px',
        marginBottom: '2px',
        width: 200,
    }
});

class TxtField extends Component {
    /* console.log("-------")
    console.log(props.nombre)
    console.log(props) */
    
    render() {
        var props = this.props;
        var id = props.id ? props.id : props.nombre;
        var term = props.term ? props.term : 'px';

        return (
            <TextField
                id={id}
                label={props.type == 'date' ? ' ' : props.nombre}
                select={props.options !== undefined}
                placeholder={props.nombre}
                className={props.classes.textField}
                margin="normal"
                type={props.type ? props.type : 'string'}
                multiline={props.multiline && props.multiline}
                onChange={(event) => props.onChange(id, event.target.value)}
                
                /* value={this.state[id] ? this.state[id] : ''} */
                value={props.state[id] ? props.state[id] : ''}

                style={props.width && {width: props.width + term}}
            >
            {
                props.options && props.options.map((option, i) => (
                    <MenuItem key={i} value={option.value}>
                        {option.label ? option.label : option.value}
                    </MenuItem>
                ))
            }
            </TextField>  
        )
    }
}

export default withStyles(styles)(TxtField);