/* eslint-disable react/forbid-prop-types */
import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import UndoIcon from '@material-ui/icons/Undo';
import TableCellOption from '../TabelCellOptions';
import Constants from '../../helpers/constants';
import  EmptyImg from '../../assets/images/empty_data.png';
import {ReactComponent as DownIcon} from '../../assets/icons/general/dropdown_red.svg';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiPaper-elevation1':{
      boxShadow:'0px 6px 6px rgba(232, 238, 255, 0.3)',
    },
  },
  paper: {
    marginBottom: theme.spacing(2),
    borderRadius: 10,
  },
  table: {
    minWidth: 450,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
  checkBox: {
    '& .MuiCheckbox-root': {
      color: Constants.color.primaryHard,
    }
  },
}));

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort, headCells } = props;
  const classes = useStyles();
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox" className={classes.checkBox}>
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all desserts' }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align="center"
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
              IconComponent={DownIcon}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  headCells: PropTypes.array.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  highlight:
    theme.palette.type === 'light'
      ? {
        color: theme.palette.secondary.main,
        backgroundColor: lighten(theme.palette.secondary.light, 0.85),
      }
      : {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.secondary.dark,
      },
  title: {
    flex: '1 1 100%',
  },
}));

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  const { numSelected, onDeleteIconClicked } = props;

  return (
    <div
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
          {numSelected} selected
        </Typography>
      ) : (
        <div/>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Uncheck All">
          <IconButton aria-label="delete" onClick={onDeleteIconClicked} style={{backgroundColor: '#FFF5F480', margin: 5, padding: 7.5}}>
            <UndoIcon style={{color: '#DC241F'}} />
          </IconButton>
        </Tooltip>
      ) : (
        <div/>
      )}
    </div>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onDeleteIconClicked: PropTypes.func.isRequired,
};

const DynamicTableWithCheck=(props) => {
  const classes = useStyles();
  const { rowsPerPage, data, fields, cellOption, onSelectedItems } = props;

  const rows = data;
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPageValue, setRowsPerPage] = React.useState(rowsPerPage);

  useEffect(()=>{
    console.log("<<<<< SELECTED : ", JSON.stringify(selected));
    onSelectedItems(selected);
  },[selected]);
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleDeleteIconClicked = () =>{
    setSelected([]);
  };
  const isSelected = (id) => selected.indexOf(id) !== -1;

  const emptyRows = rowsPerPageValue - Math.min(rowsPerPageValue, rows.length - page * rowsPerPageValue);

  return (
    <div className={classes.root}>
      <TableContainer component={Paper} className={classes.paper}>
        <Table
          className={classes.table}
          aria-labelledby="tableTitle"
          size="small"
          aria-label="enhanced table"
        >
          <EnhancedTableHead
            classes={classes}
            headCells={fields}
            numSelected={selected.length}
            order={order}
            orderBy={orderBy}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={rows.length}
          />
          <TableBody>
            {stableSort(rows, getComparator(order, orderBy))
              .slice(page * rowsPerPageValue, page * rowsPerPageValue + rowsPerPageValue)
              .map((row, index) => {
                const isItemSelected = isSelected(row.id);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, row.id)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                    style={{height: 50,}}
                  >
                    <TableCell padding="checkbox" className={classes.checkBox}>
                      <Checkbox
                        checked={isItemSelected}
                        inputProps={{ 'aria-labelledby': labelId }}
                      />
                    </TableCell>
                      
                    {Object.keys(row).map((object, j) => {
                      const typeCell = cellOption[j];
                      return (
                        <TableCell className={classes.tableValueCell}>
                          {typeCell === 'action' ? (
                            <TableCellOption
                              cellType={cellOption[j]}
                              value={Object.values(row)[j]}
                              className={classes.tableCell}
                            />
                          ) : (
                            <TableCellOption
                              cellType={cellOption[j]}
                              value={Object.values(row)[j]}
                              className={classes.tableCell}
                            />
                          )}
                        </TableCell>
                      );
                    })}

                  </TableRow>
                );
              })}
            {emptyRows > 0 && (
              <TableRow style={{ height: 50 * emptyRows }}>
                {data.length < 1 ? 
                  <TableCell colSpan={fields.length} style={{backgroundImage: `url(${EmptyImg})`, backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundSize: 75, opacity:0.5}} />
                  : 
                  <TableCell colSpan={6} />
                }
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <EnhancedTableToolbar 
        numSelected={selected.length} 
        onDeleteIconClicked={handleDeleteIconClicked}
      />
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPageValue}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </div>
  );
};

DynamicTableWithCheck.propTypes = {
  rowsPerPage: PropTypes.number,
  data: PropTypes.array,
  fields: PropTypes.array,
  cellOption: PropTypes.array,
  onSelectedItems: PropTypes.func,
};
  
DynamicTableWithCheck.defaultProps = {
  rowsPerPage: 10,
  data: [],
  fields: [
    'ID',
    'ATM ID',
    'Priority',
    'Progression',
    'Status',
    'Assignee',
    'Action',
  ],
  cellOption: [
    'string',
    'string',
    'string',
    'string',
    'string',
    'string',
    'action',
  ],
  onSelectedItems: ()=>{console.log("<<<< Selected Items Has Changed");},
};

export default DynamicTableWithCheck;