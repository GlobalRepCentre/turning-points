import React from 'react';
import Player from '@vimeo/player';
import 'intersection-observer';
import Observer from '@researchgate/react-intersection-observer';

import LoadingAnimation from './LoadingAnimation';

class VideoSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      entered: false,
      loading: false,
      started: false,
      cleared: false
    }
    this.videoRef = React.createRef();
    this.handleIntersection = this.handleIntersection.bind(this);
    this.handlePlaying = this.handlePlaying.bind(this);
    this.playVideo = this.playVideo.bind(this);
  }

  componentDidMount() {
    const videoIframe = this.videoRef.current;
    this.videoPlayer = new Player(videoIframe);

    const self = this;
    this.videoPlayer.on('play', function() {
      // Once the video is ready to play for the first time
      // remove the loader, cover image, and title
      if (!self.state.started) {
        // Set the active video
        setTimeout(() => { 
          self.setState({ 
            started: true,
            loading: false
          })
          setTimeout(() => {
            self.setState({ cleared: true }) 
          }, 2000)
        }, 1000)
      }
      else {
        self.handlePlaying(self.props.videoId);
      }
    });
  }

  componentDidUpdate() {
    // if this video's currentlyActive prop is false
    // but it's still streaming, pause it
    if (!this.props.currentlyActive) {
      const self = this;
      this.videoPlayer.getPaused().then(function(paused) {
        if (!paused) { self.videoPlayer.pause(); }
      });
    }
  }

  handleIntersection(e, unobserve) {
    if (e.isIntersecting) {
      console.log(e.target.id + ' has entered the viewport and will no longer be observed.');
      this.setState({
        entered: true
      })
      unobserve();
    }
  }

  handlePlaying(videoId) {
    this.props.isAnyVideoPlaying(videoId);
  }

  // Starting video via custom play button
  playVideo() {
    this.setState({
      loading: true
    })
    this.handlePlaying(this.props.videoId);
    this.videoPlayer.play();
  }

  render() {
    const observerOptions = {
      onChange: this.handleIntersection
    }
    return (
      <Observer {...observerOptions}>
        <section className={this.state.entered ? 'video entered' : 'video'} id={'video-0' + this.props.videoId.toString()}>
          <section className="video-container">
            <div className={this.state.started ? 'started' : ''}>
              <div>
                <div className="responsive-video">
                  {this.state.loading && <LoadingAnimation cleared={this.state.cleared} />}
                  <img 
                    className={this.state.cleared ? 'cleared' : ''}
                    src={require(`../../public/assets/img/0${this.props.videoId}.jpg`)} 
                    alt={this.props.alt}
                  />
                  <iframe 
                    ref={this.videoRef}
                    title={this.props.name + "'s Story"} 
                    src={'https://player.vimeo.com/video/' + this.props.vimeoId} 
                    width="640" 
                    height="360" 
                    frameBorder="0" 
                    allow="autoplay; fullscreen" 
                    allowFullScreen
                  ></iframe>
                </div>
                <button onClick={this.playVideo} className={this.state.cleared ? 'play cleared' : 'play'}>play</button>
              </div>
              <blockquote>"{this.props.blockQuote}"</blockquote>
              <h2 className={this.state.cleared ? 'cleared' : ''}>{this.props.name}</h2>
            </div>
          </section>
          <section className="video-description">
            <div>
              <span>{'0' + this.props.videoId.toString()}</span>
              <p>Description</p>
            </div>
          </section>
        </section>
      </Observer>
    );
  }
}

export default VideoSection;