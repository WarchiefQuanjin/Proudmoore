import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

const styles = theme => ({
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        marginTop: '2px',
        marginBottom: '2px',
        width: 200
    },
    font: {
        fontSize: '14px',
        height: 'inherit',
        overflow: 'hidden'
    },
    selected: {
        backgroundColor: '#ffffff',
    }
});

class TxtField extends Component {
    render() {
        var props = this.props;
        var term = props.term ? props.term : 'px';
        var type = props.type ? props.type : 'string'

        return (
            <TextField
                id={props.id}
                label={props.type === 'date' ? ' ' : props.nombre}
                select={props.options !== undefined}
                placeholder={props.nombre}
                className={props.classes.textField}
                margin={"normal"}
                type={type}
                multiline={props.multiline && props.multiline}
                onChange={(event) => props.onChange(props.id, event.target.value, type)}
                required={props.required}
                InputProps={{
                    classes: {
                        input: props.classes.font,
                        /* hover: props.classes.selected */
                    },
                }}
                value={props.state[props.id] ? props.state[props.id] : ''}
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