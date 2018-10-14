const React = require('react');
import PropTypes from 'prop-types';
import { withStyles, withTheme } from '@material-ui/core/styles';

const toolbarStyles = theme => ({
    root: {
      paddingRight: theme.spacing.unit,
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
    spacer: {
      flex: '1 1 100%',
    },
    actions: {
      color: theme.palette.text.secondary,
    },
    title: {
      flex: '0 0 auto',
    },
  });

class TableToolbar extends React.Component {
    constructor(props) {
        super(props);                 
        this.handleDelete = this.handleDelete.bind(this);
        this.state = {
                status:'',
                updated:0
            }
    }
    
    handleDelete(event) {
        let {selected, onDelete} = this.props;
        selected.map(employee => {
            onDelete(employee)
        });

        this.setState({ status: 'DELETE', updated:selected.length})

        setTimeout(() => {
            this.setState({
              status: '',
            });
          }, 1000);
    }

    render(){
            const { selected, classes } = this.props;
            const {updated ,status} = this.state;
            let numSelected = selected.length;
            let typography;
            if (status !== '' ||  numSelected > 0){
                typography = <Typography color="inherit" variant="subheading">
                     {status === 'DELETE' ? updated + ' deleted' : numSelected + ' selected' }    
                            </Typography>
            } else {
                typography = 
                <Fade in={true} timeout={300}>
                    <Typography variant="title" id="tableTitle">
                        My Family
                    </Typography>
                </Fade>
            }
                        
            return (
                <Toolbar
                className={classNames(classes.root, {
                    [classes.highlight]: numSelected > 0 || status !== '',
                })}
                >                
                <div className={classes.title}>
                    {typography}                
                </div>
                <div className={classes.spacer} />
                <div className={classes.actions}>
                    {numSelected > 0 ? (
                    <Tooltip title="Delete">
                        <IconButton aria-label="Delete">
                        <DeleteIcon onClick={this.handleDelete} />
                        </IconButton>
                    </Tooltip>
                    ) : (
                    <Tooltip title="Filter list">
                        <IconButton aria-label="Filter list">
                        </IconButton>
                    </Tooltip>
                    )}
                </div>
                </Toolbar>                
            );    
    }
  };
  
  TableToolbar.propTypes = {
    classes: PropTypes.object.isRequired,    
  };

export default withStyles(toolbarStyles)(TableToolbar);