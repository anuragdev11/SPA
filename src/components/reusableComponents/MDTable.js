import React from 'react';
import { MDBDataTable } from 'mdbreact';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import PaginationPage from "./Pagination";

function DatatablePage(props){

    return (
        <Card style={props.style}>
            <CardContent style={props.innerStyle}>
        <MDBDataTable
            id={props.id}
            striped={props.striped === null?true:props.striped}
            bordered
            responsive={props.responsive}
            hover
            className={props.className}
            data={props.data}
            searching={false}
            info={props.info}
            noBottomColumns
            paging={props.defaultPaging}
            sortable={false}
            style={props.style}
            entries={props.entries}
        />
        <div className="d-flex justify-content-between">
            {props.paging?<div className="pl-2">Showing entries {props.pageStart} to {props.pageStart+9>props.count?props.count:props.pageStart+9} of {props.count}</div>:""}
            {props.paging?<PaginationPage count={props.count} paging={props.paging} activePage = {props.activePage}/>:""}
        </div>
            </CardContent>
            <div className="d-flex justify-content-between mt-2">
                {props.ospaging?<div className="pl-2">Showing entries {props.pageStart} to {props.pageStart+9>props.count?props.count:props.pageStart+9} of {props.count}</div>:""}
                {props.ospaging?<PaginationPage count={props.count} paging={props.ospaging} activePage = {props.activePage}/>:""}
            </div>
        </Card>
    );
}

export default DatatablePage;