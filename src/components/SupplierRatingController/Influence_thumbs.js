import React from 'react';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';

function Influence_thumbs(props) {
    
    const [Response,setResponse] = React.useState(0)
    const [Quality,setQuality] = React.useState(0)
    const [Delivery,setDelivery] = React.useState(0)
    const [Behaviour,setBehaviour] = React.useState(0)
    let str = props.data
    let finalData = str.toString().replace(/\\/g, "");
    var obj = JSON.parse(finalData)
    if(obj[1] !== undefined && obj[1] !== null){
        var goodInflu = obj[1].trim()  
        if(goodInflu.toLowerCase().includes('response') && Response === 0 ){
            setResponse(1)
        }
        if(goodInflu.toLowerCase().includes('quality') && Quality === 0 ){
            setQuality(1)
        }
        if(goodInflu.toLowerCase().includes('delivery') && Delivery === 0  ){
            setDelivery(1)
        }
        if(goodInflu.toLowerCase().includes('behaviour') && Behaviour === 0  ){
            setBehaviour(1)
        }   
    }
    if(obj[0] !== undefined && obj[1] !== null){
        var badInflu = obj[0].trim()  
        if(badInflu.toLowerCase().includes('response') && Response === 0 ){
            setResponse(-1)
        }
        if(badInflu.toLowerCase().includes('quality') && Quality === 0 ){
            setQuality(-1)
        }
        if(badInflu.toLowerCase().includes('delivery') && Delivery === 0  ){
            setDelivery(-1)
        }
        if(badInflu.toLowerCase().includes('behaviour') && Behaviour === 0  ){
            setBehaviour(-1)
        }   
    }
    //console.log("Re Render")
    return (
        <div>
            {props.data === "" ? 
            <div> </div>
            :
            <div style={{display:"d-flex"}}>
                <table>
                    <tbody>
                        <tr style={{width:"100%",display:"flex"}} >
                            <td colSpan="1" style={{display: Response === 0 ? "none" : "inline-table" ,marginRight:"10px"}} > Response {Response !== 0 ? (Response === 1 ? <ThumbUpIcon style={{color:"#72AE44",marginLeft:"5px"}} /> : <ThumbDownIcon style={{color:"#e84133",marginLeft:"5px"}}  /> ) : ""} </td>
                            <td colSpan="1" style={{display: Quality === 0 ? "none" : "inline-table"  ,marginRight:"10px"}} > Quality  {Quality !== 0  ? (Quality === 1  ? <ThumbUpIcon style={{color:"#72AE44",marginLeft:"5px"}} /> : <ThumbDownIcon style={{color:"#e84133",marginLeft:"5px"}}  /> ) : ""} </td>
                            <td colSpan="1" style={{display: Delivery === 0 ? "none" : "inline-table" ,marginRight:"10px" }} > Delivery {Delivery !== 0 ? (Delivery === 1  ? <ThumbUpIcon style={{color:"#72AE44",marginLeft:"5px"}} /> : <ThumbDownIcon style={{color:"#e84133",marginLeft:"5px"}}  /> ) : ""} </td>
                            <td colSpan="1" style={{display: Behaviour === 0 ? "none" : "inline-table",marginRight:"10px"  }} > Behaviour {Behaviour !== 0 ? (Behaviour === 1  ? <ThumbUpIcon style={{color:"#72AE44",marginLeft:"5px"}} /> : <ThumbDownIcon style={{color:"#e84133",marginLeft:"5px"}}  /> ) : ""} </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            }
        </div>
    );
}


export default Influence_thumbs;