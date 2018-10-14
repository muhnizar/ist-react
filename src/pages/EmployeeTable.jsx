import TablePagination from '@material-ui/core/TablePagination';
import TableToolbar from '../components/TableToolbar.jsx';
import TableHead from '../components/TableHead.jsx';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
const React = require('react');

const styles = theme => ({
    root: {
      width: '100%',
      marginTop: theme.spacing.unit * 3,
    },
    table: {
      minWidth: 1020,
    },
    tableWrapper: {
      overflowX: 'auto',
    },    
    row: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.background.black        
      }        
    },
    cell: {
        whiteSpace: "normal",
        width: '30%',                                         
        wordWrap: "break-word"
    }
});
class EmployeeTable extends React.Component {    
    constructor(props) {
        super(props);                         
    }
 
    isSelected = id => this.props.selected.indexOf(id) !== -1;     
    
    render(){
        const {onClick, selected, pageData, employees, links, classes } = this.props;        
        let count = 0;
        let rowsPerPage = 0; 
        let page = 0;
        if (JSON.stringify(pageData) !== "{}"){
            count = pageData.totalElements; 
            rowsPerPage = pageData.size;
            page = pageData.number ;
        }

        return (
            <Paper className={classes.root}>            
            <TableToolbar onDelete={this.props.onDelete} selected={selected}/>
             <div className={classes.tableWrapper}>
                <Table className={classes.table}>
                <TableHead
                    order={this.state.order}
                    orderBy={this.state.orderBy}
                    rowCount={employees.length}                    
                    pageData={pageData}
                />
                <TableBody >                        
                        {employees.map(employee => {
                        const isSelected = this.isSelected(employee._links.self.href);
                        return (                            
                            <TableRow 
                                    role="checkbox"
                                    hover
                                    key={employee._links.self.href}
                                    onClick={event => onClick(event, employee._links.self.href)}
                                    selected={isSelected}
                                    aria-checked={isSelected}                            >
                                <TableCell padding="checkbox">
                                    <Checkbox  checked={isSelected} />
                                </TableCell>
                                <TableCell className={classes.cell} component="td" scope="row" padding="none">
                                        {employee.firstName}
                                </TableCell>
                                <TableCell className={classes.cell} component="td" scope="row" padding="none" >
                                        {employee.lastName}
                                </TableCell>
                                <TableCell className={classes.cell} component="td" scope="row" padding="none">
                                        {employee.description}
                                </TableCell>
                            </TableRow>
                            );
                        })}
                </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                    colSpan={3}
                    count={count}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={this.props.onNavigate}
                    onChangeRowsPerPage={this.props.updatePageSize}
                    ActionsComponent={TablePaginationActionsWrapped}
                />
              </TableRow>
            </TableFooter>
                </Table>
                </div>
      </Paper>
        )
    }
}

EmployeeTable.propTypes = {
    classes: PropTypes.object.isRequired,
    };

export default withStyles(styles)(EmployeeTable);