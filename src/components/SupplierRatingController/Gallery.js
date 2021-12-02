import React from 'react';
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";
import Avatar from '@material-ui/core/Avatar';
//import AvatarGroup from '@material-ui/lab/AvatarGroup';
import AvatarGroup from './AvatarGroup';
import { makeStyles } from '@material-ui/core/styles';
import SlideShow from './SlideShow'
import "./gallerystyles.css";


// Avatar
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  large: {
    width: theme.spacing(14),
    height: theme.spacing(15),
  },
}));



export default function ImageAvatars(props) {
  
  
  const [thumbNailimg, setthumbNailimg] = React.useState([]);
  const [LargeImgSrc, setLargeImgSrc] = React.useState([]);  
  const [IndexClicked, setIndexClicked] = React.useState(0);  
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  var img_data = props.images
  img_data = img_data.replace(/\\/g, "");
  const img_data_object = JSON.parse(img_data)
  //console.log(img_data_object)
  var thumbNail = []
  var largeImg = []
  var thumbNailLimit = 0
  for (let [key, value] of Object.entries(img_data_object)) {
    thumbNailLimit += 1; 
    largeImg.push(value.IMG_DOC_500X500.toString() === "" ? (value.IMG_DOC_PATH.toString() === "" ? value.IMG_DOC_125X125.toString() : value.IMG_DOC_PATH.toString()) : value.IMG_DOC_500X500.toString())
    //if(thumbNailLimit < 4){
      thumbNail.push(value.IMG_DOC_125X125);    
    //}    
  }
  if(thumbNail.length > 0 && thumbNailimg.length !== thumbNail.length){
    setthumbNailimg([...thumbNail])
  }
  if(largeImg.length > 0 && LargeImgSrc.length !== largeImg.length){
    setLargeImgSrc([...largeImg])
  }
  
  const HandleClick = (event) =>{
    const IndexofSrc = (element) => element === event.target.src;    
    let index = thumbNailimg.findIndex(IndexofSrc)
    if(index === -1){
      if(event.target.id === "extraAvatar"){
        index = 3
      }
    }
    setIndexClicked(index)
    setOpen(true);
  } 
  const CloseSlideShow = () => {
    setOpen(false)
  }
  return (
    <div className={classes.root} style={{overflow:"hidden"}} >
      <AvatarGroup max={4} spacing='medium' onClick={HandleClick} >
        {
          thumbNailimg.map(function(val,index){
            return (
                <Avatar id="PhotoAvatar" key={index} src={val} onClick={HandleClick} className={classes.large}  variant="rounded" />
            )
          })
        }
      </AvatarGroup>
        {open && (<SlideShow open={open} ind={IndexClicked} closeSlide={CloseSlideShow} images={LargeImgSrc} />)}
      
    </div>
  );
}
