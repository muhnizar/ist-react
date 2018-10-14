import React, { Component } from 'react';
import Appbar from './Appbar'
import Drawer from './MainDrawer.jsx'
export default class extends Component {
    constructor(props) {
        super(props);
        this.state = { open: false }
    }
    
    render() {
        return (
            <header>
                <Appbar/>              
                <Drawer/>  
            </header>
        );
    }
}

