import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { Button } from "react-bootstrap";


const CustomTable = (props) => {

    const columns = [
        {id: 'Poster', label: 'Poster', minWidth: 170},
        {id: 'imdbID', label: 'ID', minWidth:170},
        {id: 'Title', label: 'Title', minWidth: 100},
        {id: 'Type',  label: 'Type',minWidth: 170},
        {id: 'Year',  label: 'Year',minWidth: 170}   
      ];
      
      const rows = props.movies;
      const useStyles = makeStyles({
        root: {
          width: '100%',
        },
        container: {
          maxHeight: "auto",
        },
      });
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  // align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
              <TableCell
                  key="action"
                  // align={column.align}
                  style={{ minWidth: 170 }}
                >
                  Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id}>
                        {column.id === 'Poster' ? <img width="80" height="90" src={value}  /> : value}
                      </TableCell>
                    );
                  })}
                  {props.myWatchlist.includes(row.imdbID) ? <Button onClick={() => props.onRemove(row.imdbID)}> - Watchlist </Button> : <Button onClick={() => props.onAdd(row.imdbID)}>+ Watchlist</Button>}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        page={props.currentPage}
        count={props.totalResults}
        rowsPerPage={props.movies.length}
        rowsPerPageOptions={[]}
        onChangePage={props.changePage}
      />
    </Paper>
  );
}

export default CustomTable
