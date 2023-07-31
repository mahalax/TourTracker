import React,{useState} from 'react';
import PropTypes from 'prop-types';

import { makeStyles, useTheme,Hidden,Table, TableHead, TableRow, TableCell, TablePagination, TableSortLabel, Box } from '@material-ui/core'
import { IconButton } from "@material-ui/core";
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import { TextYellow,darkgray } from '../../styles/styles';

const useStyles = makeStyles(theme => ({
    table: {
        
        '& thead th': {
            fontWeight: '600',
            color: "white",
            backgroundColor: darkgray,
        },
     
      
        '& thead tr th span:hover,& .MuiTableSortLabel-root.MuiTableSortLabel-active': {
            fontWeight: '600',
            color: TextYellow,
            backgroundColor: darkgray,
        },
        '& .MuiTableSortLabel-root.MuiTableSortLabel-active.MuiTableSortLabel-root.MuiTableSortLabel-active .MuiTableSortLabel-icon':{
            color: "goldenrod",
        },
        '& tbody td': {
            fontWeight: '300',
            
        },
        '& .MuiButton-root':{
padding:'0px 10px',
margin:'0px'
        },
        '& tbody tr:hover': {
            backgroundColor: '#fffbf2',
            cursor: 'pointer',
        },
      
         

    },
    tablepagination:{
        '&.MuiTablePagination-root':{
          overflowX:"auto",
          borderBottom:"none",
        },
        
    }
}))

const useStyles1 = makeStyles((theme) => ({
    root: {
      flexShrink: 0,
      marginLeft: theme.spacing(2.5),
    },
  }));

// Table Section

function TablePaginationActions(props) {
    const classes = useStyles1();
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;
  
    const handleFirstPageButtonClick = (event) => {
        onPageChange(event, 0);
    };
  
    const handleBackButtonClick = (event) => {
        onPageChange(event, page - 1);
    };
  
    const handleNextButtonClick = (event) => {
        onPageChange(event, page + 1);
    };
  
    const handleLastPageButtonClick = (event) => {
        onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };
  
    return (
        <Box sx={{ flexShrink: 0, ml: 2.5 }}>
        <IconButton
          onClick={handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="first page"
        >
          {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton
          onClick={handleBackButtonClick}
          disabled={page === 0}
          aria-label="previous page"
        >
          {theme.direction === "rtl" ? (
            <KeyboardArrowRight />
          ) : (
            <KeyboardArrowLeft />
          )}
        </IconButton>
        <IconButton
          onClick={handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="next page"
        >
          {theme.direction === "rtl" ? (
            <KeyboardArrowLeft />
          ) : (
            <KeyboardArrowRight />
          )}
        </IconButton>
        <IconButton
          onClick={handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="last page"
        >
          {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </Box>
    );
  }
  
  TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
  };


function useTable(records, headCells,filterFn) {

    const classes = useStyles();
    const pages = [15]
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(pages[page])
    const [order, setOrder] = useState()
    const [orderBy, setOrderBy] = useState()
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, records.length - page * rowsPerPage);

    const TblContainer = props => (
        <Table  className={classes.table} aria-label="simple table">
            {props.children} 
        </Table>
    )

    const TblHead = props => {
        const handleSortRequest = cellId => {
            const isAsc = orderBy === cellId && order === "asc";
            setOrder(isAsc ? 'desc' : 'asc');
            setOrderBy(cellId)
           
        }

        return (<TableHead>
            <TableRow>
                {
                    headCells.map(headCell => (
                        <TableCell key={headCell.id} 
                            sortDirection={orderBy === headCell.id ? order : false} >
                            {headCell.disableSorting ? headCell.label :
                                <TableSortLabel
                                    active={orderBy === headCell.id}
                                    direction={orderBy === headCell.id ? order : 'asc'}
                                    onClick={() => { handleSortRequest(headCell.id) }}>
                                    {headCell.label}
                                </TableSortLabel>
                            }
                        </TableCell>))
                }
            </TableRow>
        </TableHead>)
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    }

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(parseInt(event.target.value, 10))
        setPage(0);
    }

    const TblPagination = () => (
        <>
      <table >
        <tbody>
      <tr>
        <TablePagination className={classes.tablepagination}
              rowsPerPageOptions={[15,20,30, { label: 'All', value: -1 }]}
              colSpan={3}
              count={records.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: {
                  'aria-label': 'rows per page',
                },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
      </tr>
      </tbody>
      </table>
      </>
    
    
    )

    function stableSort(array, comparator) {
        const stabilizedThis = array.map((el, index) => [el, index]);
        stabilizedThis.sort((a, b) => {
            const order = comparator(a[0], b[0]);
            if (order !== 0) return order;
            return a[1] - b[1];
        });
        return stabilizedThis.map((el) => el[0]);
    }

    function getComparator(order, orderBy) {
        return order === 'desc'
            ? (a, b) => descendingComparator(a, b, orderBy)
            : (a, b) => -descendingComparator(a, b, orderBy);
    }

    function descendingComparator(a, b, orderBy) {
        
        if (b[orderBy] < a[orderBy]) {
            return -1;
        }
        if (b[orderBy] > a[orderBy]) {
            return 1;
        }
        return 0;
    }

    const recordsAfterPagingAndSorting = () => {
        return rowsPerPage > 0 ? stableSort(filterFn.fn(records), getComparator(order, orderBy))
            .slice( page * rowsPerPage,
                page * rowsPerPage + rowsPerPage)
                :stableSort(filterFn.fn(records), getComparator(order, orderBy))
    }
    return {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting
    }
}

export default useTable;