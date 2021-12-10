import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';
import {createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import Star from '@material-ui/icons/Star';
import "./styles.css";
import Avatar from '@material-ui/core/Avatar';
import Rating from '@material-ui/lab/Rating';
import toastr from 'toastr';
import 'toastr/build/toastr.css';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import SortIcon from '@material-ui/icons/Sort';
import Loader from '../../assets/logos/PulseLoader.svg';
import Typography from '@material-ui/core/Typography';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCartOutlined';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import InfluenceThumbs from './Influence_thumbs';
import Gallery from './Gallery';




const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
    marginRight: theme.spacing(1),
  },
  nameTag: {
    fontSize:'14px',
    color:'#000000',
    fontWeight:'bold'
  },
  LocationTag: {
    fontSize:'12px',
    color:'#585857'
  }
}));

function formatDate(date) {
  var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  date= date.replaceAll('-','/')
  var arr = date.split('/')
  //console.log(arr[0])
  date = arr[1] + '/' + arr[0] + '/' + arr[2]
  var d = new Date(date),
      month = '' + monthNames[d.getMonth()],
      day = '' + d.getDate(),
      year = d.getFullYear();
  if (month.length < 2) 
      month = '0' + month;
  if (day.length < 2) 
      day = '0' + day;

  return [day, month, year].join('-');
}

function randomColor() {
  let hex = Math.floor(Math.random() * 0xFFFFFF);
  let color = "#" + hex.toString(16);

  return color;
}

function SortArray(IntArray){
  var result_int = IntArray.map(function (x) { 
    return parseInt(x, 10); 
  }); 
  result_int = result_int.sort(function(a, b) {
    return a - b;
  });
  result_int.reverse()
  var result_sorted = []
  while(result_int.length) { 
    result_sorted.push(result_int.shift().toString());
   }
  return result_sorted
}



export default function CenteredGrid(props) {
  const classes = useStyles();
  //const [progress, setProgress] = React.useState(0);  
  const ThemeGreenStar = createMuiTheme({
    palette: {
      secondary: {
           main: '#72AE44'
       },
       primary:{
         main:'#ff5722'                 // Change property  color="secondary" to get Orange color in Linear Progress Bar
       }      
    }
  })

  const [ReviewData,setReviewData] = React.useState({})
  const [ReviewKeys,setReviewKeys] = React.useState([])
  const [isLoading,setisLoading] = React.useState(true)
   const [inPercentage, setinPercentage] = React.useState(0)
  const [countFiveStar, setcountFiveStar] = React.useState(0)
  const [countFourStar, setcountFourStar] = React.useState(0)
  const [countThreeStar, setcountThreeStar] = React.useState(0)
  const [countTwoStar, setcountTwoStar] = React.useState(0)
  const [countOneStar, setcountOneStar] = React.useState(0)
  const [avgRating,setavgRating] = React.useState(0)
  const [countRatings, setcountRatings] = React.useState(0)
  const [percent5Star,setpercent5Star] = React.useState(0)
  const [percent4Star,setpercent4Star] = React.useState(0)
  const [percent3Star,setpercent3Star] = React.useState(0)
  const [percent2Star,setpercent2Star] = React.useState(0)
  const [percent1Star,setpercent1Star] = React.useState(0)
  const [influ_response,setinflu_response] = React.useState(0)  
  const [influ_quality,setinflu_quality] = React.useState(0)
  const [influ_delivery,setinflu_delivery] = React.useState(0)
  const [influ_behaviour,setinflu_behaviour] = React.useState(0)
  const [Five_keys,setFive_keys] = React.useState([])
  const [Four_keys,setFour_keys] = React.useState([])
  const [Three_keys,setThree_keys] = React.useState([])
  const [Two_keys,setTwo_keys] = React.useState([])
  const [One_keys,setOne_keys] = React.useState([])
  const [Only_Comment,setOnly_Comment] = React.useState([])
  const [Date_Ascending,setDate_Ascending] = React.useState([])
  const [Only_Image,setOnly_Image] = React.useState([])
  const [Highest_HelpfulCount,setHighest_HelpfulCount] = React.useState([])
  const [Only_TopReviews,setOnly_TopReviews] = React.useState([])

  let url = "https://merp.intermesh.net/go/supplierrating/v1/ratingdetails?"
  url += "glid=" + props.glid + "&empid=" + props.employeeid + "&AK=" + props.AK 
  

  
  React.useEffect(() => {
    async function fetchData(){
      await fetch(url,{
        method: 'POST',
        headers: {
          'Accept': 'application/json'
      },
      })
      .then(res => res.json())
          .then(function (response) {          
            if(response.status === 200){
              setinPercentage(response.data.in_percentage)
              setReviewData(response.data.rating_list)
              setcountFiveStar(response.data.rating_counts.five_star_count)
              setcountFourStar(response.data.rating_counts.four_star_count)
              setcountThreeStar(response.data.rating_counts.three_star_count)
              setcountTwoStar(response.data.rating_counts.two_star_count)
              setcountOneStar(response.data.rating_counts.one_star_count)
              setavgRating(Math.round(response.data.rating_counts.avg_rating*10)/10)
              setcountRatings(response.data.rating_counts.total_count)
              setpercent5Star( Math.round( ((response.data.rating_counts.five_star_count)/ (response.data.rating_counts.total_count)) * 100 ))
              setpercent4Star( Math.round( ((response.data.rating_counts.four_star_count)/ (response.data.rating_counts.total_count)) * 100 ))
              setpercent3Star( Math.round( ((response.data.rating_counts.three_star_count)/ (response.data.rating_counts.total_count)) * 100 ))
              setpercent2Star( Math.round( ((response.data.rating_counts.two_star_count)/ (response.data.rating_counts.total_count)) * 100 ))
              setpercent1Star( Math.round( ((response.data.rating_counts.one_star_count)/ (response.data.rating_counts.total_count)) * 100 ))
              
              if(response.data.rating_influ_params_name.Response !== undefined){
                var Response_Influence = response.data.rating_influ_params_name.Response.split(',')
                setinflu_response(parseInt(Response_Influence[0]))
              }
              
              if(response.data.rating_influ_params_name.Quality !== undefined){
                var Quality_Influence = response.data.rating_influ_params_name.Quality.split(',')
                setinflu_quality(parseInt(Quality_Influence[0]))
              }
              if(response.data.rating_influ_params_name.Delivery !== undefined){
                var Delivery_Influence = response.data.rating_influ_params_name.Delivery.split(',')
                setinflu_delivery(parseInt(Delivery_Influence[0]))
              }
              if(response.data.rating_influ_params_name.Behaviour !== undefined){
                var Behaviour_Influence = response.data.rating_influ_params_name.Delivery.split(',')
                setinflu_behaviour(parseInt(Behaviour_Influence[0]))
              }
              
              //console.log( Math.round( ((response.data.rating_counts.five_star_count)/ (response.data.rating_counts.total_count)) * 100 ))
              let keysofrev = []
              let Five = []
              let Four = []
              let Three = []
              let Two = []
              let One = []
              let OnlyComments = []
              let NoComments = []
              let dateAscending=[]
              let helpful_count=[]
              let without_helpful_count=[]
              let onlyImage=[]
              let withoutImage=[]
              let topReviews=[]

              for (let [key, value] of Object.entries(response.data.rating_list)) {
                keysofrev.push(key)
                if(value.GLUSR_RATING_VALUE === 5){
                  Five.push(key)
                }else if(value.GLUSR_RATING_VALUE === 4){
                  Four.push(key)
                }else if(value.GLUSR_RATING_VALUE === 3){
                  Three.push(key)
                }else if(value.GLUSR_RATING_VALUE === 2){
                  Two.push(key)
                }else if(value.GLUSR_RATING_VALUE === 1){
                  One.push(key)
                }
                if(value.GLUSR_RATING_COMMENTS !== ""){
                  OnlyComments.push(key)
                }else{
                  NoComments.push(key)
                }
                if(value.RATING_IMGS !== "null"){
                  onlyImage.push(key)
                }
                else{
                  withoutImage.push(key)
                }
                if(value.RATING_REVIEW_USEFULNESS != null){
                  helpful_count.push([key, value.RATING_REVIEW_USEFULNESS])
                }
                else{
                  without_helpful_count.push(key)
                }
              }
              setFive_keys(Five)
              setFour_keys(Four)
              setThree_keys(Three)
              setTwo_keys(Two)
              setOne_keys(One)
              
              OnlyComments=SortArray(OnlyComments)
              NoComments=SortArray(NoComments)
              setOnly_Comment(OnlyComments.concat(NoComments))

              helpful_count.sort((a,b)=>a[1]-b[1]) // sort keys on the basis helpful count value
              helpful_count=helpful_count.map(ele=> ele[0]) // remove only keys from key-value array
              helpful_count=helpful_count.reverse()
              setHighest_HelpfulCount(helpful_count.concat(without_helpful_count))

              onlyImage=SortArray(onlyImage)
              withoutImage=SortArray(withoutImage)
              setOnly_Image(onlyImage.concat(withoutImage))

              dateAscending=SortArray(keysofrev)
              dateAscending=dateAscending.reverse()
              if (dateAscending.length > 0){
                setDate_Ascending(dateAscending)
              }
              
              if(keysofrev !== undefined && keysofrev.length>0){     
                var ReviewData_Sorted = SortArray(keysofrev)      
                if(ReviewData_Sorted !== undefined && ReviewData_Sorted.length>0){        
                setReviewKeys([...ReviewData_Sorted])
                }           
               //setReviewKeys(keysofrev)
              }
              setisLoading(false)
              toastr.success("Data Fetched successfully")
            }
            else{
              setisLoading(false)
              toastr.warning("Problem in fetching Data. Please contact weberp Team.")
            }
            
        })        
        .catch(error => {toastr.error("Some error occured! Please try again") 
        setisLoading(false)
      })
    };
     fetchData();
     toastr.options = {
      "closeButton": true,
      "debug": false,
      "newestOnTop": true,
      "progressBar": true,
      "positionClass": "toast-top-right",
      "preventDuplicates": false,
      "onclick": null,
      "showDuration": "300",
      "hideDuration": "1000",
      "timeOut": "1000",
      "extendedTimeOut": "1000",
      "showEasing": "swing",
      "hideEasing": "linear",
      "showMethod": "fadeIn",
      "hideMethod": "fadeOut"
    };
  },[])

  const handleFilterChange = (event) => {
    if(event.target.value === 1){
      let ReviewData_Sorted = SortArray(ReviewKeys)      
      if(ReviewData_Sorted !== undefined && ReviewData_Sorted.length>0){        
      setReviewKeys([...ReviewData_Sorted])
      }
    }

    else if (event.target.value === 5){
      setReviewKeys([...Date_Ascending])
    }

    else if(event.target.value === 2){
      //High to Low
      var HightoLow = []
      if(HightoLow.length === 0){
        HightoLow.push.apply(HightoLow,SortArray(Five_keys))
        HightoLow.push.apply(HightoLow,SortArray(Four_keys))
        HightoLow.push.apply(HightoLow,SortArray(Three_keys))
        HightoLow.push.apply(HightoLow,SortArray(Two_keys))
        HightoLow.push.apply(HightoLow,SortArray(One_keys))
      }
      if(HightoLow !== undefined && HightoLow.length>0){        
        setReviewKeys([...HightoLow])
        }
    }
    else if(event.target.value === 3){
      //Low to High
      var LowtoHigh = []
      if(LowtoHigh.length === 0){
        LowtoHigh.push.apply(LowtoHigh,SortArray(One_keys))
        LowtoHigh.push.apply(LowtoHigh,SortArray(Two_keys))
        LowtoHigh.push.apply(LowtoHigh,SortArray(Three_keys))
        LowtoHigh.push.apply(LowtoHigh,SortArray(Four_keys))
        LowtoHigh.push.apply(LowtoHigh,SortArray(Five_keys))
      }
      if(LowtoHigh !== undefined && LowtoHigh.length>0){        
        setReviewKeys([...LowtoHigh])
      }
    }
    else if(event.target.value === 4){
        setReviewKeys([...Only_Comment])
    }
    else if (event.target.value === 6){
      setReviewKeys([...Only_Image])
    }
    else if (event.target.value === 7){
      setReviewKeys([...Highest_HelpfulCount])
    }

  };
  var htmlRating;
  if(inPercentage === 0){
    htmlRating=(
      <>
      <li className="liRatingcount" >{countFiveStar}  </li>
            <li className="liRatingcount" >{countFourStar}  </li>
            <li className="liRatingcount" >{countThreeStar} </li>
            <li className="liRatingcount" >{countTwoStar}   </li>
            <li className="liRatingcount" >{countOneStar}   </li>
     </>
    );
  }
  else{
    htmlRating=(
      <>
      <li className="liRatingcount" >{percent5Star}%  </li>
            <li className="liRatingcount" >{percent4Star}% </li>
            <li className="liRatingcount" >{percent3Star}% </li>
            <li className="liRatingcount" >{percent2Star}%   </li>
            <li className="liRatingcount" >{percent1Star}%   </li>
      </>
    );
  }
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <h2 style={{padding:"20px"}} >Rating and Reviews</h2>
        </Grid>
        <Grid item xs={12} sm={2} container direction="column" justify="center" alignItems="center">
          <div style={{display:"flex"}}>   
            <h2 >{avgRating}<span style={{fontSize:"1.2rem"}}>/5</span> </h2>
            
          </div>
          <div>
          <Rating defaultValue={avgRating} precision={0.1} readOnly name="size-medium" style={{width:"75%"}} value={avgRating} />
          </div>
          <div>
            <p style={{color:"#878787",fontSize:"14px"}}>Reviewed by {countRatings} Users</p>
          </div>
          
        </Grid>
        <Grid item xs={12} sm={4} style={{display:"flex"}}>          
          <ul style={{listStyle:'none',paddingLeft:'10px'}}>
            <li>5<Star fontSize="small" style={{color:"#ffb400",fontWeight:"bold"}} /></li>
            <li>4<Star fontSize="small" style={{color:"#ffb400",fontWeight:"bold"}} /></li>
            <li>3<Star fontSize="small" style={{color:"#ffb400",fontWeight:"bold"}} /></li>
            <li>2<Star fontSize="small" style={{color:"#ffb400",fontWeight:"bold"}} /></li>
            <li>1<Star fontSize="small" style={{color:"#ffb400",fontWeight:"bold"}} /></li>
          </ul>
          <ul id="ulRatingProgress" style={{width:'80%'}}>
            <li >
            <MuiThemeProvider theme={ThemeGreenStar}>
              <LinearProgress className="liRating" value={percent5Star} variant="determinate" color="secondary"   style={{width:"80%",marginTop:"13px", marginBottom:"20px",borderRadius:"3px"}} />
            </MuiThemeProvider>
            </li>
            <li>
            <MuiThemeProvider theme={ThemeGreenStar}>
              <LinearProgress className="liRating" value={percent4Star} variant="determinate" color="secondary"  style={{width:"80%",marginTop:"13px", marginBottom:"20px",borderRadius:"3px"}} />
            </MuiThemeProvider>
            </li>
            <li>
            <MuiThemeProvider theme={ThemeGreenStar}>
              <LinearProgress className="liRating" value={percent3Star} variant="determinate" color="secondary"  style={{width:"80%",marginTop:"13px", marginBottom:"20px",borderRadius:"3px"}} />
            </MuiThemeProvider>
            </li>
            <li>
            <MuiThemeProvider theme={ThemeGreenStar}>
              <LinearProgress className="liRating" value={percent2Star} variant="determinate" color="secondary"  style={{width:"80%",marginTop:"13px", marginBottom:"20px",borderRadius:"3px"}} />
            </MuiThemeProvider>
            </li>
            <li>
            <MuiThemeProvider theme={ThemeGreenStar}>
              <LinearProgress className="liRating" value={percent1Star} variant="determinate" color="secondary"  style={{width:"80%",marginTop:"13px", marginBottom:"20px",borderRadius:"3px"}} />
            </MuiThemeProvider>
            </li>
          </ul>
          <ul style={{listStyle:'none',paddingLeft:'0px',marginLeft:'-3vw'}}>
         {htmlRating}
          </ul>
        </Grid>
        
        <Grid item xs={12} sm={6} container alignItems="center">
          <div style={{display:"flex"}}>   
            <h3 style={{fontWeight:"bold",paddingLeft:10}} > User Satisfaction  <ThumbUpIcon className="thumsUp"/> <ThumbDownIcon className="thumsDn" /></h3>            
          </div>
          <Grid item xs={12} sm={12} style={{display:"flex"}}>          
            <ul style={{paddingLeft:'12px',width:'14%'}}>
              <li>Response</li>
              <li>Quality</li>
              <li>Delivery</li>
              <li>Behaviour</li>
            </ul>
            <ul style={{width:"45%",minWidth:220}}>
            <li>
               <MuiThemeProvider theme={ThemeGreenStar}>
                 <LinearProgress className="liInfluence" value={influ_response} variant="determinate" color="secondary"   style={{width:"80%",marginTop:"13px", marginBottom:"20px",borderRadius:"3px"}} />
               </MuiThemeProvider>
            </li>
            <li>
               <MuiThemeProvider theme={ThemeGreenStar}>
                 <LinearProgress className="liInfluence" value={influ_quality} variant="determinate" color="secondary"   style={{width:"80%",marginTop:"13px", marginBottom:"20px",borderRadius:"3px"}} />
               </MuiThemeProvider>
            </li>
            <li>
               <MuiThemeProvider theme={ThemeGreenStar}>
                 <LinearProgress className="liInfluence" value={influ_delivery} variant="determinate" color="secondary"   style={{width:"80%",marginTop:"13px", marginBottom:"20px",borderRadius:"3px"}} />
               </MuiThemeProvider>
            </li>
            <li>
               <MuiThemeProvider theme={ThemeGreenStar}>
                 <LinearProgress className="liInfluence" value={influ_behaviour} variant="determinate" color="secondary"   style={{width:"80%",marginTop:"13px", marginBottom:"20px",borderRadius:"3px"}} />
               </MuiThemeProvider>
            </li>
          </ul>
          <ul style={{listStyle:'none',paddingLeft:'0px',marginLeft:'-3vw'}}>
            <li>{influ_response !== 0 ? influ_response + '%' : 'NA'}</li>
            <li>{influ_quality!== 0 ? influ_quality + '%' : 'NA'}</li>
            <li>{influ_delivery!== 0 ? influ_delivery + '%' : 'NA'}</li>
            <li>{influ_behaviour!== 0 ? influ_behaviour + '%' : 'NA'}</li>
          </ul>
          </Grid>
        </Grid>
        
        <Grid item xs={12} sm={12} container style={{paddingLeft:20}}>
          <FormControl className={classes.formControl} style={{minWidth:"200px",marginLeft:"1vw"}}>
            <InputLabel id="demo-controlled-open-select-label"><SortIcon />&nbsp;<strong>Sort by</strong></InputLabel>
            <Select
              labelId="demo-controlled-open-select-label"
              id="demo-controlled-open-select"
              style={{width:'14vw',minWidth:"200px"}}
              defaultValue={1}
              onChange={handleFilterChange}
            >
              <MenuItem value={1}>Most Recent</MenuItem>
              <MenuItem value={5}>Most Previous</MenuItem>
              <MenuItem value={2}>Review: High to Low</MenuItem>
              <MenuItem value={3}>Review: Low to High</MenuItem>
              <MenuItem value={4}>Review: With Comments</MenuItem>
              <MenuItem value={6}>With Images</MenuItem>
              <MenuItem value={7}>Highest Helpful Count</MenuItem>
              {/* <MenuItem value={8}>Top Reviews</MenuItem> */}
              
            </Select>
          </FormControl>
        </Grid>
        <br/>
        { isLoading ? <div className="mod d-flex justify-content-center align-items-center" style={{margin:"auto"}}><img src={Loader} height="100px" width="100px" className="loader"/></div>:
          ReviewKeys.length > 0 &&
          ReviewKeys.map(function(key, index) {
            
            return (
              <Grid item key={key} xs={12} sm={6} lg={4}>
                <Paper className={classes.paper} elevation={3} style={{margin:"5px",backgroundColor:"#E8E8E8",height:"94%",overflow:"hidden",paddingLeft:"8px",overflowX:"auto"}} >
                  <table>
                    <tbody>
                      <tr style={{width:"100%"}}>
                        <td style={{width:"5%",textAlign:"left"}}>
                          <Avatar className={classes.small} style={{backgroundColor: "#267E3E", borderRadius: "14%" , width: "40px", height: "35px"}} > <span style={{fontSize:"13px", fontWeight:'bold'}}>{ReviewData[key].GLUSR_RATING_VALUE}</span><Star style={{fontSize:"13px"}} /></Avatar>
                        </td>

                        {ReviewData[key].BUYER_COUNTRY_NAME === "India" ?   
                          <td style={{width:"65%",textAlign:"left", lineHeight:"1rem"}} >
                       <span className={classes.nameTag}>{ReviewData[key].BUYER_NAME}</span> <br/>
					   <span className={classes.LocationTag}>{ReviewData[key].BUYER_COMPANY_NAME !== "" ? ReviewData[key].BUYER_COMPANY_NAME : '' } </span>
					   <span style={{fontSize:"10px"}}>{ReviewData[key].BUYER_COMPANY_NAME !== "" ? '|' : '' } </span>
					   <span className={classes.LocationTag}>{ReviewData[key].BUYER_CITY_NAME}</span> {ReviewData[key].BUYER_CITY_NAME === "" ? '' : ',' } <span className={classes.LocationTag}>{ReviewData[key].BUYER_COUNTRY_NAME}</span>
                          </td>
                       : 
                       <td style={{width:"65%",textAlign:"left" , lineHeight:"1rem"}} >
                       <span className={classes.nameTag}>{ReviewData[key].BUYER_NAME}</span> <br/>
					    <span className={classes.LocationTag}>{ReviewData[key].BUYER_COMPANY_NAME !== "" ? ReviewData[key].BUYER_COMPANY_NAME : '' } </span>
					   <span style={{fontSize:"10px"}}>{ReviewData[key].BUYER_COMPANY_NAME !== "" ? '|' : '' } </span>
					  <span className={classes.LocationTag}>{ReviewData[key].BUYER_COUNTRY_NAME}</span>
                          </td>
                       }
					   <td style={{width:"30%"}}>
                           <p style={{color:"#585857",fontSize:"13px",marginBottom:"0.5rem",fontFamily:"Arial"}}>{ ReviewData[key].GLUSR_RATING_DATE !== "" ? formatDate(ReviewData[key].GLUSR_RATING_DATE): ""}</p>
                        </td>
                      </tr>
                      <tr>
                        <td colSpan="3" style={{display:ReviewData[key].RATING_INFLU_PARAMS_NAME === "" ? "none" : "revert", }} >
                          <div id="InfluenceThumb" style={{display:"flex", paddingLeft:"4px"}}>                            
                              {
                                ReviewData[key].RATING_INFLU_PARAMS_NAME === "" ?
                                ""
                                :
                                <InfluenceThumbs data={ ReviewData[key].RATING_INFLU_PARAMS_NAME} /> 
                              }
                          </div>
                        </td>
                      </tr>    
				  {ReviewData[key].RATING_MCAT_NAME !== "" ? 	  
					<tr>
						<td colspan="3" style={{textAlign:"left"}}>
						<ShoppingCartIcon className="ShoppingCartOutlined"/> <span className={classes.nameTag}>{ReviewData[key].RATING_MCAT_NAME}</span>	
						</td>
					</tr>					  
				  : null}	
				  
                      <tr>
                        <td colSpan="2" style={{textAlign:"left", paddingLeft:"5px"}} >
                        <Typography component="p" style={{color:"#000"}}>{ReviewData[key].GLUSR_RATING_COMMENTS}</Typography>
                        </td>
                      </tr>
                     
                      {ReviewData[key].RATING_IMGS !== "null" ?  
                        <tr>
                          <td colSpan="3">
                            <Gallery images={ReviewData[key].RATING_IMGS} />
                          </td>
                        </tr>
                       : null}
                       {ReviewData[key].RATING_REVIEW_USEFULNESS != null ?
                       <tr> 
                         <td colspan="2">
                           <div id="div" style={{fontSize:"11px", textAlign: "left", fontWeight:"bold", color:"darkgoldenrod", fontStyle:"italic", fontFamily:"inherit"}}>{ReviewData[key].RATING_REVIEW_USEFULNESS} people found this helpful.</div>
                          </td>
                        </tr>
                       :
                       null
                       }

					   {ReviewData[key].SUPPLIER_COMMENTS !== "" ?  
					   	  <tr>
                        <td colspan="2" style={{textAlign:"left",color:"#585857",fontSize:"13px",marginBottom:"0.5rem",fontFamily:"Arial"}}><span>Seller replied</span></td>
						<td colspan ="1"><p style={{color:"#585857",fontSize:"13px",marginBottom:"0.5rem",fontFamily:"Arial"}}>{ReviewData[key].GLUSR_RATING_REPLY_DATE}</p></td>                    						
                      </tr>	
					   : null}
					    {ReviewData[key].SUPPLIER_COMMENTS !== "" ? 
					  <tr>
					  	<td colspan = "3" style={{textAlign:"left"}}>
						<Typography component="p" style={{color:"#000"}}>{ReviewData[key].GLUSR_RATING_COMMENTS}</Typography>
						</td> 
					  </tr>
						:null}
					  
                      </tbody>           
                  </table>
                  
                </Paper>
              </Grid>
              )            
          })
        }
       
      </Grid>
    </div>
  );
}