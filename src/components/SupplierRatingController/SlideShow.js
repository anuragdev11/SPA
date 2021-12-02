import React, { Component } from 'react';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css'; // This only needs to be imported once in your app
 

export default class LightboxExample extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photoIndex: this.props.ind !== undefined && parseInt(this.props.ind) > 0 ? this.props.ind : 0,
      isOpen: this.props.show,
    };
    this.CloseSlide = this.CloseSlide.bind(this)
      // console.log('Prop Value' + this.props.ind)
      // console.log('State Value' + this.state.photoIndex)
  }
  CloseSlide() {
    this.props.closeSlide()
  }
  render() {
    const { photoIndex, isOpen } = this.state;
    return (
      <div>
        {this.props.open && (
            <Lightbox
            mainSrc={this.props.images[photoIndex]}
            nextSrc={this.props.images[photoIndex===(this.props.images.length-1) ? undefined : (photoIndex + 1) % this.props.images.length]}
            prevSrc={this.props.images[photoIndex===0 ? undefined : (photoIndex + this.props.images.length - 1) % this.props.images.length]}
            mainSrcThumbnail={this.props.images[photoIndex]}
            prevSrcThumbnail={this.props.images[(photoIndex + this.props.images.length - 1) % this.props.images.length]}
            nextSrcThumbnail={this.props.images[(photoIndex + 1) % this.props.images.length]}
            onCloseRequest={this.CloseSlide}
            onMovePrevRequest={() =>
                this.setState({
                photoIndex: (photoIndex + this.props.images.length - 1) % this.props.images.length,
                })
            }
            onMoveNextRequest={() =>
                this.setState({
                photoIndex: (photoIndex + 1) % this.props.images.length,
                })
            }
            showThumbnails={true}
            />
        )}
        
      </div>
    );
  }
}