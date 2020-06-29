import React from 'react';

function LoadingAnimation(props) {
  return (
    <div className={`loading${props.active ? ' active' : ''}${props.cleared ? ' cleared' : ''}`}>
      <div><span></span><span></span><span></span><span></span></div>
      loading
    </div>
  )
}

export default LoadingAnimation;