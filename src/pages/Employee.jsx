'use strict';

const React = require('react');
const stompClient = require('../websocket-listener');
import EmployeeTable from './EmployeeTable.jsx';

class Employee extends React.Component {
    constructor(props) {
        super(props);
        this.state = {employees: [], attributes: [], pageSize: 5, links: {}, pageData: {}, selected: [] };        
        this.onNavigate = this.onNavigate.bind(this);
        this.handleNavigate = this.handleNavigate.bind(this);
        this.updatePageSize = this.updatePageSize.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.refreshCurrentPage = this.refreshCurrentPage.bind(this);
    }

    refreshCurrentPage(message) {

        this.fetchJSON('http://localhost:8080/api/employees?size=2&page='+this.state.pageData.number).then(employeeCollection => {
            this.setState({
                employees: employeeCollection._embedded.employees,
                pageSize: this.state.pageSize,
                links: employeeCollection._links,
                pageData: employeeCollection.page                
            });
        }).catch(error => {
            console.log(error)
        });
    }

    handleClick(event, id) {
        
        const {selected } = this.state;
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
            selected.slice(selectedIndex + 1)
          );
        }

        this.setState({ selected: newSelected });
    };

    onDelete(uri) {        
        fetch(uri, {
            method:'DELETE'
        }).then((response) => {                        
            if (!response.ok) {
                throw new Error('HTTP error ' + response.status);
            }
            this.setState({selected: []});
            this.loadFromServer(this.state.pageSize);        

            return response;
        }).catch(error => {
            console.log(error)
        })
        
    }

    updatePageSize(event) {
        if (event.target.value !== this.state.pageSize) {
			this.loadFromServer(event.target.value);
		}
	}

    handleNavigate(step){
        if(step === 'prev'){
            this.onNavigate(this.state.links.prev.href)            
        }else if (step === 'next'){
            this.onNavigate(this.state.links.next.href)
        }else if (step === 'first'){
            this.onNavigate(this.state.links.first.href)
        }else if (step === 'last'){
            this.onNavigate(this.state.links.last.href)
        }
    }
    onNavigate(uri){
        this.fetchJSON(uri).then(employeeCollection => {
            this.setState({
                employees: employeeCollection._embedded.employees,
                 // attributes: this.state.attributes,
                pageSize: this.state.pageSize,
                links: employeeCollection._links,
                pageData: employeeCollection.page                
            });
        }).catch(error => {
            console.log(error)
        });
    }

    fetchJSON(...args) {
        return fetch(...args)
            .then(response => {
                if (!response.ok) {
                    throw new Error('HTTP error ' + response.status);
                }
                return response.json();
            });
    }

    fetchSchema(url) {
        return this.fetchJSON(url, {
            headers: new Headers({
                'Accept': 'application/schema+json'
            })
        });
    }

    loadFromServer(pageSize){
        Promise.all([
            this.fetchJSON('http://localhost:8080/api/employees?size='+pageSize),
            this.fetchSchema('http://localhost:8080/api/profile/employees')]
        ).then(([empResponse, schema]) => {
            this.schema = schema;
            this.setState({
                order: 'asc',
                orderBy: 'firstName',
                employees: empResponse._embedded.employees,
                attributes: Object.keys(schema.properties),
                pageSize: pageSize,
                links: empResponse._links,
                page: 0,                
                pageData: empResponse.page
            })
        }).catch(error => {
            console.log(error)
        });
    }
 
    componentDidMount() {
        this.loadFromServer(this.state.pageSize);

        stompClient.register([
            {route: '/topic/newEmployee', callback: this.refreshCurrentPage},
            {route: '/topic/updateEmployee', callback: this.refreshCurrentPage},
            {route: '/topic/deleteEmployee', callback: this.refreshCurrentPage}
        ]);
    }

    render() {
        return (    
            <div>
                <EmployeeTable 
                    employees = {this.state.employees}
                    links = {this.state.links}  
                    onNavigate = {this.handleNavigate}
                    updatePageSize = {this.updatePageSize}
                    pageData = {this.state.pageData}
                    onDelete = {this.onDelete}
                    selected = {this.state.selected}
                    onClick = {this.handleClick}                
                />
         </div>
        )        
    }
}

export default Employee;