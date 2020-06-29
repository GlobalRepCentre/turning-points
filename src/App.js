import React from 'react';

import videos from './videos/videos.json'

import Header from './components/Header'
import VideoSection from './components/VideoSection'

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      currentlyActiveVideo: 0
    }
    this.handleIsPlayingChange = this.handleIsPlayingChange.bind(this);
    this.handleWheelScroll = this.handleWheelScroll.bind(this);
  }

  handleIsPlayingChange(video) {
    this.setState({
      currentlyActiveVideo: video
    })
  }

  handleWheelScroll(e) {
    e.preventDefault();
    // determine mousewheel direction
    // scroll horizontally accordingly
    const direction = Math.sign(e.deltaY);
    const scrollValue = direction * 150;

    if (direction === 1) {
      document.documentElement.scrollLeft += scrollValue;
    }
    else if (direction === -1) {
      document.documentElement.scrollLeft += scrollValue;
    }
  }

  render() {
    // Map video items from json file
    const videoItems = videos.map((video) =>
      <VideoSection 
        // set the currently playing video, if any
        isAnyVideoPlaying={this.handleIsPlayingChange}
        // check if the currently playing video matches
        currentlyActive={this.state.currentlyActiveVideo === video.id}
        key={video.id}
        name={video.name}
        videoId={video.id}
      />
    );
    
    return(
      <div className="App" onWheel={this.handleWheelScroll}>
        <div className="wrapper">
          <Header />
          {videoItems}
        </div>
      </div>
    );
  }
}

export default App;