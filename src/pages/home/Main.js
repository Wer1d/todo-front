import './main.css';
import Datatable from './dataTable';
import React from 'react';
import SideBar from './sidebar';

export default function Main() {

    return (
        <div>
            <SideBar pageWrapId={'page-wrap'} outerContainerId={'outer-container'} />
            <Datatable />
            
        </div>
        
    );
}


