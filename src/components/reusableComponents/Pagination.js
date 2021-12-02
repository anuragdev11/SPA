import React from "react";
import { MDBPagination, MDBPageItem, MDBPageNav, MDBCol, MDBRow } from "mdbreact";

const PaginationPage = (props) => {
    const items = []
    let count = Math.floor(props.count/10) + (props.count%10 > 0?1:0);
    if(props.activePage+1 === 1) {
        items.push(<MDBPageItem disabled>
            <MDBPageNav className="page-link" style={{borderRadius: "0"}}>
                <span>First</span>
            </MDBPageNav>
        </MDBPageItem>)
    }else{
        items.push(<MDBPageItem onClick={() => props.paging(1)}>
            <MDBPageNav className="page-link" style={{borderRadius: "0"}}>
                <span>First</span>
            </MDBPageNav>
        </MDBPageItem>)
    }
    let start = 1;
    let end = start+4
    if(end>count){
        end = count;
    }
    if(props.activePage>=3){
        start = props.activePage-1;
        end = start+4;
        if(end>count){
            end = count;
            start = end-4;
            if(start < 1){
                start = 1
            }
        }
    }

    console.log(start+" "+end)

    for(let i = start;i<=end;i++){
        if(i === end+1){
            items.push(<MDBPageItem style={{cursor: "default"}} >
                <MDBPageNav>
                    ... <span className="sr-only">(current)</span>
                </MDBPageNav>
            </MDBPageItem>)
        }else {
            if (i === props.activePage+1) {
                items.push(<MDBPageItem active onClick={() => props.paging((i-1) * 10 + 1)}>
                    <MDBPageNav className="page-link">
                        {i}
                    </MDBPageNav>
                </MDBPageItem>)
            } else {
                items.push(<MDBPageItem onClick={() => props.paging((i-1) * 10 + 1)}>
                    <MDBPageNav className="page-link">
                        {i}
                    </MDBPageNav>
                </MDBPageItem>)
            }
        }

    }
    if(props.activePage+1 === count) {
        items.push(<MDBPageItem disabled>
            <MDBPageNav className="page-link" style={{borderRadius: "0"}}>
                <span>Last</span>
            </MDBPageNav>
        </MDBPageItem>)
    }else{
        items.push(<MDBPageItem onClick={() => props.paging((count-1) * 10 + 1)}>
            <MDBPageNav className="page-link" style={{borderRadius: "0"}}>
                <span>Last</span>
            </MDBPageNav>
        </MDBPageItem>)
    }

    return (
        <MDBRow style={{cursor: "pointer"}}>
            <MDBCol>
                <MDBPagination circle>

                    {items}


                </MDBPagination>
            </MDBCol>
        </MDBRow>
    )
}

export default PaginationPage;