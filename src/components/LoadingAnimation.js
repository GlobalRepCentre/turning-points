import React from 'react';

function LoadingAnimation(props) {
  return (
    <div className={props.cleared ? 'loader cleared' : 'loader'}>
      <div><span></span><span></span><span></span><span></span></div>
      loading
    </div>
  )
}

export default LoadingAnimation;