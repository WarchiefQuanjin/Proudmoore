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
    textFieldError: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        marginTop: '2px',
        marginBottom: '2px',
        width: 200,
        borderStyle: 'dotted', 
        borderColor: 'red',
        borderBottomWidth: '2px'
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
        let { term, type, id, options, state, width, nombre, required, missingFields, classes, multiline, onChange } = this.props;
        
        type = type ? type : 'string'
        term = term ? term : 'px';

        return (
            <TextField
                id={id}
                label={type === 'date' ? ' ' : nombre}
                select={options !== undefined}
                placeholder={nombre}
                className={
                    missingFields && missingFields.includes(id) 
                        ? classes.textFieldError
                        : classes.textField
                }
                margin={"normal"}
                type={type}
                multiline={multiline && multiline}
                onChange={(event) => onChange(id, event.target.value, type)}
                required={required}
                InputProps={{
                    classes: {
                        input: classes.font,
                    },
                }}
                value={state[id] ? state[id] : ''}
                style={width && {width: width + term}}
            >
            {
                options && options.map((option, i) => (
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