import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Input from '@material-ui/core/Input';

const styles = theme => ({
  root: {
    flexShrink: 0,
    color: theme.palette.text.secondary,
    marginLeft: theme.spacing.unit * 2.5,
    display: 'flex',
    alignItems: 'center',
    paddingLeft: '5px'
  },
  select: {
    color: '#0000008a',
    marginLeft: '8px',
    marginRight: '32px',
    fontSize: '12px'
  },
  innerSelect: {
    paddingRight: '16px'
  }
});

class TablePaginationActions extends React.Component {
  handleFirstPageButtonClick = event => {
    const { onChangePage } = this.props;

    onChangePage(event, 0);
  };

  handleBackButtonClick = event => {
    const { onChangePage, page } = this.props;

    onChangePage(event, page - 1);
  };

  handleNextButtonClick = event => {
    const { onChangePage, page } = this.props;

    onChangePage(event, page + 1);
  };

  handleLastPageButtonClick = event => {
    const { onChangePage, count, rowsPerPage } = this.props;

    onChangePage(
      event,
      Math.max(0, Math.ceil(count / rowsPerPage) - 1),
    );
  };

  render() {
    const { classes, count, page, rowsPerPage, onChangeRowsPerPage } = this.props;

    let from = page * rowsPerPage + 1;
    let to = (page + 1) * rowsPerPage;
    to = to > count ? count : to;

    return (
      <div className={classes.root}>
        <Typography variant="caption" gutterBottom align="center">
          Rows per page:
          </Typography>
        <Select
          className={classes.select}
          classes={{
            select: classes.innerSelect
          }}
          disableUnderline={true}
          value={rowsPerPage}
          onChange={onChangeRowsPerPage}
          input={<Input />}
        >
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={20}>20</MenuItem>
          <MenuItem value={30}>30</MenuItem>
        </Select>
        <Typography variant="caption" gutterBottom align="center">
          {`${from}-${to} de ${count}`}
        </Typography>
        <IconButton
          onClick={this.handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="First Page"
        >
          {<FirstPageIcon />}
        </IconButton>
        <IconButton
          onClick={this.handleBackButtonClick}
          disabled={page === 0}
          aria-label="Previous Page"
        >
          {<KeyboardArrowLeft />}
        </IconButton>
        <IconButton
          onClick={this.handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Next Page"
        >
          {<KeyboardArrowRight />}
        </IconButton>
        <IconButton
          onClick={this.handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Last Page"
        >
          {<LastPageIcon />}
        </IconButton>
      </div>
    );
  }
}

export default withStyles(styles)(TablePaginationActions);