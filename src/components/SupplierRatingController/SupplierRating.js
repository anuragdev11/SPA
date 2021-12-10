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

              response= {
                "status": 200,
                "message": "Data Found",
                "uniqueId": "c6peg1ol8crsla986pfgc6peg1ol8crsla986pg0c6peg1ol8crsla986pgg",
                "data": {
                    "display_flag": 1,
                    "in_percentage": 1,
                    "is_display": 1,
                    "rating_counts": {
                        "avg_rating": 4.3636363636364,
                        "five_star_count": 5,
                        "four_star_count": 5,
                        "one_star_count": 0,
                        "three_star_count": 1,
                        "total_count": 11,
                        "two_star_count": 0
                    },
                    "rating_influ_params": {
                        "1": "100,4,4",
                        "2": "66,2,3",
                        "3": "100,3,3"
                    },
                    "rating_influ_params_name": {
                        "Delivery": "100,3,3",
                        "Quality": "66,2,3",
                        "Response": "100,4,4"
                    },
                    "rating_list": {
                        "4439273": {
                            "BUYER_CITY_NAME": "Gautam Budh Nagar",
                            "BUYER_COMPANY_NAME": "Global Lift Private Limited",
                            "BUYER_COUNTRY_NAME": "India",
                            "BUYER_NAME": "Aditya Rastogi",
                            "BUYER_STATE_NAME": "Uttar Pradesh",
                            "FK_GLUSR_BUYER_ID": 10359580,
                            "FK_GLUSR_RATING_SOURCE": "-111",
                            "FK_GLUSR_RATING_TYPE": 1,
                            "FK_GLUSR_SUPPLIER_ID": 17772415,
                            "GLUSR_RATING_COMMENTS": "",
                            "GLUSR_RATING_DATE": "13-04-21",
                            "GLUSR_RATING_DISPLAY_STATUS": "",
                            "GLUSR_RATING_ID": 4439273,
                            "GLUSR_RATING_MODID": "ANDROID",
                            "GLUSR_RATING_MODREF_ID": "",
                            "GLUSR_RATING_PARAMETER": "",
                            "GLUSR_RATING_REPLY_DATE": "03-12-21",
                            "GLUSR_RATING_VALUE": 4,
                            "RATING_IMGS": "null",
                            "RATING_INFLU_PARAMS": "null",
                            "RATING_INFLU_PARAMS_NAME": "",
                            "RATING_MCAT_ID": "",
                            "RATING_MCAT_NAME": "",
                            "RATING_MODREF_NAME": "",
                            "RATING_REVIEW_USEFULNESS": 5000,
                            "SORT_TIMESTAMP": "210413114116",
                            "SUPPLIER_COMMENTS": "test"
                        },
                        "5078026": {
                            "BUYER_CITY_NAME": "Ghaziabad",
                            "BUYER_COMPANY_NAME": "Vibhor Communications",
                            "BUYER_COUNTRY_NAME": "India",
                            "BUYER_NAME": "Vibhor",
                            "BUYER_STATE_NAME": "Uttar Pradesh",
                            "FK_GLUSR_BUYER_ID": 71157313,
                            "FK_GLUSR_RATING_SOURCE": "-111",
                            "FK_GLUSR_RATING_TYPE": 1,
                            "FK_GLUSR_SUPPLIER_ID": 17772415,
                            "GLUSR_RATING_COMMENTS": "nice",
                            "GLUSR_RATING_DATE": "28-06-21",
                            "GLUSR_RATING_DISPLAY_STATUS": "",
                            "GLUSR_RATING_ID": 5078026,
                            "GLUSR_RATING_MODID": "SELLERMY",
                            "GLUSR_RATING_MODREF_ID": "1729751121",
                            "GLUSR_RATING_PARAMETER": "",
                            "GLUSR_RATING_REPLY_DATE": "28-06-21",
                            "GLUSR_RATING_VALUE": 5,
                            "RATING_IMGS": "null",
                            "RATING_INFLU_PARAMS": "null",
                            "RATING_INFLU_PARAMS_NAME": "",
                            "RATING_MCAT_ID": "",
                            "RATING_MCAT_NAME": "",
                            "RATING_MODREF_NAME": "",
                            "RATING_REVIEW_USEFULNESS": null,
                            "SORT_TIMESTAMP": "210628120124",
                            "SUPPLIER_COMMENTS": "thank you"
                        },
                        "5114143": {
                            "BUYER_CITY_NAME": "Trivandrum",
                            "BUYER_COMPANY_NAME": "Automotive Sample Companies",
                            "BUYER_COUNTRY_NAME": "India",
                            "BUYER_NAME": "Manish",
                            "BUYER_STATE_NAME": "Kerala",
                            "FK_GLUSR_BUYER_ID": 37217193,
                            "FK_GLUSR_RATING_SOURCE": "-111",
                            "FK_GLUSR_RATING_TYPE": 1,
                            "FK_GLUSR_SUPPLIER_ID": 17772415,
                            "GLUSR_RATING_COMMENTS": "",
                            "GLUSR_RATING_DATE": "02-07-21",
                            "GLUSR_RATING_DISPLAY_STATUS": "",
                            "GLUSR_RATING_ID": 5114143,
                            "GLUSR_RATING_MODID": "SELLERMY",
                            "GLUSR_RATING_MODREF_ID": "1853435162",
                            "GLUSR_RATING_PARAMETER": "",
                            "GLUSR_RATING_REPLY_DATE": "",
                            "GLUSR_RATING_VALUE": 4,
                            "RATING_IMGS": "null",
                            "RATING_INFLU_PARAMS": "{\"1\":\"1\"}",
                            "RATING_INFLU_PARAMS_NAME": "{\"1\":\"Response\"}",
                            "RATING_MCAT_ID": "",
                            "RATING_MCAT_NAME": "",
                            "RATING_MODREF_NAME": "",
                            "RATING_REVIEW_USEFULNESS": null,
                            "SORT_TIMESTAMP": "210702032554",
                            "SUPPLIER_COMMENTS": ""
                        },
                        "5220920": {
                            "BUYER_CITY_NAME": "Noida",
                            "BUYER_COMPANY_NAME": "Nikitasha Kitchenette",
                            "BUYER_COUNTRY_NAME": "India",
                            "BUYER_NAME": "Sheik Ayatullah",
                            "BUYER_STATE_NAME": "Uttar Pradesh",
                            "FK_GLUSR_BUYER_ID": 85613437,
                            "FK_GLUSR_RATING_SOURCE": "-111",
                            "FK_GLUSR_RATING_TYPE": 2,
                            "FK_GLUSR_SUPPLIER_ID": 17772415,
                            "GLUSR_RATING_COMMENTS": "",
                            "GLUSR_RATING_DATE": "15-07-21",
                            "GLUSR_RATING_DISPLAY_STATUS": "",
                            "GLUSR_RATING_ID": 5220920,
                            "GLUSR_RATING_MODID": "ANDROID",
                            "GLUSR_RATING_MODREF_ID": "",
                            "GLUSR_RATING_PARAMETER": "",
                            "GLUSR_RATING_REPLY_DATE": "",
                            "GLUSR_RATING_VALUE": 5,
                            "RATING_IMGS": "null",
                            "RATING_INFLU_PARAMS": "null",
                            "RATING_INFLU_PARAMS_NAME": "",
                            "RATING_MCAT_ID": "",
                            "RATING_MCAT_NAME": "",
                            "RATING_MODREF_NAME": "",
                            "RATING_REVIEW_USEFULNESS": 10,
                            "SORT_TIMESTAMP": "210715082023",
                            "SUPPLIER_COMMENTS": ""
                        },
                        "5261122": {
                            "BUYER_CITY_NAME": "Pushkar",
                            "BUYER_COMPANY_NAME": "Mahi Toys & Private Enterprises  Industrial Company Limited",
                            "BUYER_COUNTRY_NAME": "India",
                            "BUYER_NAME": "Shobhna Verma",
                            "BUYER_STATE_NAME": "Rajasthan",
                            "FK_GLUSR_BUYER_ID": 7349419,
                            "FK_GLUSR_RATING_SOURCE": "-111",
                            "FK_GLUSR_RATING_TYPE": 2,
                            "FK_GLUSR_SUPPLIER_ID": 17772415,
                            "GLUSR_RATING_COMMENTS": "",
                            "GLUSR_RATING_DATE": "20-07-21",
                            "GLUSR_RATING_DISPLAY_STATUS": "",
                            "GLUSR_RATING_ID": 5261122,
                            "GLUSR_RATING_MODID": "ANDROID",
                            "GLUSR_RATING_MODREF_ID": "",
                            "GLUSR_RATING_PARAMETER": "",
                            "GLUSR_RATING_REPLY_DATE": "03-12-21",
                            "GLUSR_RATING_VALUE": 3,
                            "RATING_IMGS": "null",
                            "RATING_INFLU_PARAMS": "null",
                            "RATING_INFLU_PARAMS_NAME": "",
                            "RATING_MCAT_ID": "",
                            "RATING_MCAT_NAME": "",
                            "RATING_MODREF_NAME": "",
                            "RATING_REVIEW_USEFULNESS": null,
                            "SORT_TIMESTAMP": "210720065447",
                            "SUPPLIER_COMMENTS": "okay"
                        },
                        "5415811": {
                            "BUYER_CITY_NAME": "Muzaffarpur",
                            "BUYER_COMPANY_NAME": "Trial Manufacturing",
                            "BUYER_COUNTRY_NAME": "India",
                            "BUYER_NAME": "Amit Tiwari",
                            "BUYER_STATE_NAME": "Bihar",
                            "FK_GLUSR_BUYER_ID": 2205733,
                            "FK_GLUSR_RATING_SOURCE": "-111",
                            "FK_GLUSR_RATING_TYPE": 2,
                            "FK_GLUSR_SUPPLIER_ID": 17772415,
                            "GLUSR_RATING_COMMENTS": "",
                            "GLUSR_RATING_DATE": "08-08-21",
                            "GLUSR_RATING_DISPLAY_STATUS": "",
                            "GLUSR_RATING_ID": 5415811,
                            "GLUSR_RATING_MODID": "ANDROID",
                            "GLUSR_RATING_MODREF_ID": "",
                            "GLUSR_RATING_PARAMETER": "",
                            "GLUSR_RATING_REPLY_DATE": "",
                            "GLUSR_RATING_VALUE": 4,
                            "RATING_IMGS": "null",
                            "RATING_INFLU_PARAMS": "null",
                            "RATING_INFLU_PARAMS_NAME": "",
                            "RATING_MCAT_ID": "",
                            "RATING_MCAT_NAME": "",
                            "RATING_MODREF_NAME": "",
                            "RATING_REVIEW_USEFULNESS": null,
                            "SORT_TIMESTAMP": "210808054318",
                            "SUPPLIER_COMMENTS": ""
                        },
                        "5447996": {
                            "BUYER_CITY_NAME": "Barasat",
                            "BUYER_COMPANY_NAME": "Soumyadeep Enterprise IM Test",
                            "BUYER_COUNTRY_NAME": "India",
                            "BUYER_NAME": "Soumyadeep Roychoudhury",
                            "BUYER_STATE_NAME": "West Bengal",
                            "FK_GLUSR_BUYER_ID": 133066828,
                            "FK_GLUSR_RATING_SOURCE": "-111",
                            "FK_GLUSR_RATING_TYPE": 1,
                            "FK_GLUSR_SUPPLIER_ID": 17772415,
                            "GLUSR_RATING_COMMENTS": "",
                            "GLUSR_RATING_DATE": "13-08-21",
                            "GLUSR_RATING_DISPLAY_STATUS": "",
                            "GLUSR_RATING_ID": 5447996,
                            "GLUSR_RATING_MODID": "ANDROID",
                            "GLUSR_RATING_MODREF_ID": "",
                            "GLUSR_RATING_PARAMETER": "",
                            "GLUSR_RATING_REPLY_DATE": "01-12-21",
                            "GLUSR_RATING_VALUE": 5,
                            "RATING_IMGS": "{}",
                            "RATING_INFLU_PARAMS": "{\"1\":\"1,2,3\"}",
                            "RATING_INFLU_PARAMS_NAME": "{\"1\":\"Response,Quality,Delivery\"}",
                            "RATING_MCAT_ID": "",
                            "RATING_MCAT_NAME": "",
                            "RATING_MODREF_NAME": "",
                            "RATING_REVIEW_USEFULNESS": null,
                            "SORT_TIMESTAMP": "210813123531",
                            "SUPPLIER_COMMENTS": "please change"
                        },
                        "5512236": {
                            "BUYER_CITY_NAME": "Bhubaneswar",
                            "BUYER_COMPANY_NAME": "Chroma Active Solutions",
                            "BUYER_COUNTRY_NAME": "India",
                            "BUYER_NAME": "Yash Kejriwal",
                            "BUYER_STATE_NAME": "Odisha",
                            "FK_GLUSR_BUYER_ID": 127253317,
                            "FK_GLUSR_RATING_SOURCE": "-111",
                            "FK_GLUSR_RATING_TYPE": 1,
                            "FK_GLUSR_SUPPLIER_ID": 17772415,
                            "GLUSR_RATING_COMMENTS": "",
                            "GLUSR_RATING_DATE": "26-08-21",
                            "GLUSR_RATING_DISPLAY_STATUS": 1,
                            "GLUSR_RATING_ID": 5512236,
                            "GLUSR_RATING_MODID": "MY",
                            "GLUSR_RATING_MODREF_ID": "1918616500",
                            "GLUSR_RATING_PARAMETER": "",
                            "GLUSR_RATING_REPLY_DATE": "17-09-21",
                            "GLUSR_RATING_VALUE": 4,
                            "RATING_IMGS": "null",
                            "RATING_INFLU_PARAMS": "null",
                            "RATING_INFLU_PARAMS_NAME": "",
                            "RATING_MCAT_ID": "",
                            "RATING_MCAT_NAME": "",
                            "RATING_MODREF_NAME": "",
                            "RATING_REVIEW_USEFULNESS": null,
                            "SORT_TIMESTAMP": "210826105425",
                            "SUPPLIER_COMMENTS": "thanks"
                        },
                        "5648456": {
                            "BUYER_CITY_NAME": "Delhi",
                            "BUYER_COMPANY_NAME": "Rk sports",
                            "BUYER_COUNTRY_NAME": "India",
                            "BUYER_NAME": "Rohit",
                            "BUYER_STATE_NAME": "Delhi",
                            "FK_GLUSR_BUYER_ID": 87528254,
                            "FK_GLUSR_RATING_SOURCE": "-111",
                            "FK_GLUSR_RATING_TYPE": 1,
                            "FK_GLUSR_SUPPLIER_ID": 17772415,
                            "GLUSR_RATING_COMMENTS": "Testing chal-rahi hai ladke",
                            "GLUSR_RATING_DATE": "23-09-21",
                            "GLUSR_RATING_DISPLAY_STATUS": "",
                            "GLUSR_RATING_ID": 5648456,
                            "GLUSR_RATING_MODID": "SELLERMY",
                            "GLUSR_RATING_MODREF_ID": "1628815342",
                            "GLUSR_RATING_PARAMETER": "",
                            "GLUSR_RATING_REPLY_DATE": "08-12-21",
                            "GLUSR_RATING_VALUE": 4,
                            "RATING_IMGS": "null",
                            "RATING_INFLU_PARAMS": "null",
                            "RATING_INFLU_PARAMS_NAME": "",
                            "RATING_MCAT_ID": "",
                            "RATING_MCAT_NAME": "",
                            "RATING_MODREF_NAME": "",
                            "RATING_REVIEW_USEFULNESS": 1000,
                            "SORT_TIMESTAMP": "210923045426",
                            "SUPPLIER_COMMENTS": "testting"
                        },
                        "5832062": {
                            "BUYER_CITY_NAME": "Dehradun",
                            "BUYER_COMPANY_NAME": "Priyanka Creations",
                            "BUYER_COUNTRY_NAME": "India",
                            "BUYER_NAME": "Priyanka Tanwar",
                            "BUYER_STATE_NAME": "Uttarakhand",
                            "FK_GLUSR_BUYER_ID": 65608038,
                            "FK_GLUSR_RATING_SOURCE": "-111",
                            "FK_GLUSR_RATING_TYPE": 4,
                            "FK_GLUSR_SUPPLIER_ID": 17772415,
                            "GLUSR_RATING_COMMENTS": "",
                            "GLUSR_RATING_DATE": "12-11-21",
                            "GLUSR_RATING_DISPLAY_STATUS": "",
                            "GLUSR_RATING_ID": 5832062,
                            "GLUSR_RATING_MODID": "ANDROID",
                            "GLUSR_RATING_MODREF_ID": "",
                            "GLUSR_RATING_PARAMETER": "",
                            "GLUSR_RATING_REPLY_DATE": "01-12-21",
                            "GLUSR_RATING_VALUE": 5,
                            "RATING_IMGS": "{\"0\":{\"IMG_DOC_PATH\":\"https:\/\/5.imimg.com\/data5\/IMOB\/RatingImage\/2021\/7\/IZ\/WP\/JO\/65608038\/img-20210712-145513-1626082033702-jpg.jpg\",\"IMG_DOC_500X500\":\"https:\/\/5.imimg.com\/data5\/IMOB\/RatingImage\/2021\/7\/IZ\/WP\/JO\/65608038\/img-20210712-145513-1626082033702-jpg-500x500.jpg\",\"IMG_DOC_125X125\":\"https:\/\/5.imimg.com\/data5\/IMOB\/RatingImage\/2021\/7\/IZ\/WP\/JO\/65608038\/img-20210712-145513-1626082033702-jpg-125x125.jpg\",\"IMG_ID\":\"159957051\",\"IMG_REVIEWED_STATUS\":\"1\",\"IMG_REVIEW_COMMENT\":\"Approved\"}}",
                            "RATING_INFLU_PARAMS": "{\"1\":\"1,2,3\"}",
                            "RATING_INFLU_PARAMS_NAME": "{\"1\":\"Response,Quality,Delivery\"}",
                            "RATING_MCAT_ID": "",
                            "RATING_MCAT_NAME": "",
                            "RATING_MODREF_NAME": "",
                            "RATING_REVIEW_USEFULNESS": 100,
                            "SORT_TIMESTAMP": "211112011220",
                            "SUPPLIER_COMMENTS": "to count the amount of letters that a piece of text in an email template had (to avoid passing any character limits). Unfortunately, I could not think of a quick way to do so on my macbook a therefore turned to the 250 end here. acsc now what will happen?"
                        },
                        "5928220": {
                            "BUYER_CITY_NAME": "Nagpur",
                            "BUYER_COMPANY_NAME": "Phoenix IM Test Seller",
                            "BUYER_COUNTRY_NAME": "India",
                            "BUYER_NAME": "Ashwin Name",
                            "BUYER_STATE_NAME": "Maharashtra",
                            "FK_GLUSR_BUYER_ID": 119676005,
                            "FK_GLUSR_RATING_SOURCE": "-111",
                            "FK_GLUSR_RATING_TYPE": 1,
                            "FK_GLUSR_SUPPLIER_ID": 17772415,
                            "GLUSR_RATING_COMMENTS": "check at testimonial",
                            "GLUSR_RATING_DATE": "10-12-21",
                            "GLUSR_RATING_DISPLAY_STATUS": "",
                            "GLUSR_RATING_ID": 5928220,
                            "GLUSR_RATING_MODID": "MY",
                            "GLUSR_RATING_MODREF_ID": "1871126981",
                            "GLUSR_RATING_PARAMETER": "",
                            "GLUSR_RATING_REPLY_DATE": "10-12-21",
                            "GLUSR_RATING_VALUE": 5,
                            "RATING_IMGS": "{\"0\":{\"IMG_ID\":\"179159689\",\"IMG_DOC_PATH\":\"https:\/\/5.imimg.com\/data5\/MY\/RatingImage\/2021\/12\/CC\/CJ\/JS\/119676005\/0a8dcd12a8aae282b12e3e6e1e895675-jpg.jpg\",\"IMG_DOC_125X125\":\"https:\/\/5.imimg.com\/data5\/MY\/RatingImage\/2021\/12\/CC\/CJ\/JS\/119676005\/0a8dcd12a8aae282b12e3e6e1e895675-jpg-125x125.jpg\",\"IMG_DOC_500X500\":\"https:\/\/5.imimg.com\/data5\/MY\/RatingImage\/2021\/12\/CC\/CJ\/JS\/119676005\/0a8dcd12a8aae282b12e3e6e1e895675-jpg-500x500.jpg\"},\"1\":{\"IMG_ID\":\"179159710\",\"IMG_DOC_PATH\":\"https:\/\/5.imimg.com\/data5\/MY\/RatingImage\/2021\/12\/MS\/JQ\/SO\/119676005\/860-8606644-hd-photo-oven-hd-png.png\",\"IMG_DOC_125X125\":\"https:\/\/5.imimg.com\/data5\/MY\/RatingImage\/2021\/12\/MS\/JQ\/SO\/119676005\/860-8606644-hd-photo-oven-hd-png-125x125.png\",\"IMG_DOC_500X500\":\"https:\/\/5.imimg.com\/data5\/MY\/RatingImage\/2021\/12\/MS\/JQ\/SO\/119676005\/860-8606644-hd-photo-oven-hd-png-500x500.png\"},\"2\":{\"IMG_ID\":\"179159735\",\"IMG_DOC_PATH\":\"https:\/\/5.imimg.com\/data5\/MY\/RatingImage\/2021\/12\/TG\/DL\/NE\/119676005\/gsmarena-001-jpg.jpg\",\"IMG_DOC_125X125\":\"https:\/\/5.imimg.com\/data5\/MY\/RatingImage\/2021\/12\/TG\/DL\/NE\/119676005\/gsmarena-001-jpg-125x125.jpg\",\"IMG_DOC_500X500\":\"https:\/\/5.imimg.com\/data5\/MY\/RatingImage\/2021\/12\/TG\/DL\/NE\/119676005\/gsmarena-001-jpg-500x500.jpg\"},\"3\":{\"IMG_ID\":\"179159757\",\"IMG_DOC_PATH\":\"https:\/\/5.imimg.com\/data5\/MY\/RatingImage\/2021\/12\/PR\/TB\/QT\/119676005\/58128630f5528e42bfdc7468fdb7746b03c5-jpg.jpg\",\"IMG_DOC_125X125\":\"https:\/\/5.imimg.com\/data5\/MY\/RatingImage\/2021\/12\/PR\/TB\/QT\/119676005\/58128630f5528e42bfdc7468fdb7746b03c5-jpg-125x125.jpg\",\"IMG_DOC_500X500\":\"https:\/\/5.imimg.com\/data5\/MY\/RatingImage\/2021\/12\/PR\/TB\/QT\/119676005\/58128630f5528e42bfdc7468fdb7746b03c5-jpg-500x500.jpg\"},\"4\":{\"IMG_ID\":\"179159778\",\"IMG_DOC_PATH\":\"https:\/\/5.imimg.com\/data5\/MY\/RatingImage\/2021\/12\/ZK\/XM\/OO\/119676005\/860-8606644-hd-photo-oven-hd-png.png\",\"IMG_DOC_125X125\":\"https:\/\/5.imimg.com\/data5\/MY\/RatingImage\/2021\/12\/ZK\/XM\/OO\/119676005\/860-8606644-hd-photo-oven-hd-png-125x125.png\",\"IMG_DOC_500X500\":\"https:\/\/5.imimg.com\/data5\/MY\/RatingImage\/2021\/12\/ZK\/XM\/OO\/119676005\/860-8606644-hd-photo-oven-hd-png-500x500.png\"}}",
                            "RATING_INFLU_PARAMS": "{\"0\":\"2\",\"1\":\"1,3\"}",
                            "RATING_INFLU_PARAMS_NAME": "{\"0\":\"Quality\",\"1\":\"Response,Delivery\"}",
                            "RATING_MCAT_ID": "",
                            "RATING_MCAT_NAME": "",
                            "RATING_MODREF_NAME": "",
                            "RATING_REVIEW_USEFULNESS": 50,
                            "SORT_TIMESTAMP": "211210102446",
                            "SUPPLIER_COMMENTS": "thanks for rating"
                        }
                    },
                    "rating_percentages": {
                        "five_star_percentage": "45%",
                        "four_star_percentage": "46%",
                        "one_star_percentage": "0%",
                        "three_star_percentage": "9%",
                        "total_count": 11,
                        "two_star_percentage": "0%"
                    }
                }
            }
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

              debugger;
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
              <MenuItem value={8}>Top Reviews</MenuItem>
              
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
				  {ReviewData[key].RATING_MCAT_NAME === "" ? 	  
					<tr>
						<td colspan="3" style={{textAlign:"left"}}>
						<ShoppingCartIcon className="ShoppingCartOutlined"/> <span className={classes.nameTag}>Mobile Repair Part</span>	
						</td>
					</tr>					  
				  : null}	
				  
                      <tr>
                        <td colSpan="2" style={{textAlign:"left", paddingLeft:"5px"}} >
                        <Typography component="p" style={{color:"#000"}}>{ReviewData[key].GLUSR_RATING_COMMENTS}</Typography>
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