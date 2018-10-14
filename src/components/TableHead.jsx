const React = require('react');

const rows = [
    { id: 'firstName', numeric: false, disablePadding: true, label: 'First Name' },
    { id: 'lastName', numeric: false, disablePadding: true, label: 'Last Name' },
    { id: 'description', numeric: false, disablePadding: true, label: 'Description' },    
  ];

class TableHead extends React.Component {    
    render() {
        const {order, orderBy } = this.props;
        return (
            <TableHead>
                <TableRow>
                <TableCell padding="checkbox">                    
                </TableCell>
                {rows.map(row => {
                    return (
                    <TableCell component="th" scope="row"
                        key={row.id}
                        numeric={row.numeric}
                        padding={row.disablePadding ? 'none' : 'default'}
                        sortDirection={orderBy === row.id ? order : false}
                    >       
                     {row.label}                 
                    </TableCell>
                    );
                }, this)}
                </TableRow>
            </TableHead>            
        )
    }
}

TableHead.propTypes = {
    // onRequestSort: PropTypes.func.isRequired,
    // numSelected: PropTypes.number.isRequired,
    // onSelectAllClick: PropTypes.func.isRequired,
    // order: PropTypes.string.isRequired,
    // orderBy: PropTypes.string.isRequired,
    // rowCount: PropTypes.number.isRequired,
  };

  export default TableHead;