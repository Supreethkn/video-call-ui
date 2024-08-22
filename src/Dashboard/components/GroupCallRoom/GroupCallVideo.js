import React, { useRef, useEffect } from 'react';

const styles = {
  videoContainer: {
    width: 'auto',
    height: '100%',
  },
};

const GroupCallVideo = ({ stream }) => {
  const videoRef = useRef();

  useEffect(() => {
    const remoteGroupCallVideo = videoRef.current;
    remoteGroupCallVideo.srcObject = stream;
    remoteGroupCallVideo.onloadedmetadata = () => {
      remoteGroupCallVideo.play();
    };
  }, [stream]);

  return (
    <div style={{ 
      background: 'white', 
      zIndex:'99',
      width: '100%', 
      height: '100%', 
      position: 'absolute', 
      top: '0px', 
      left: '0px' 
    }}>
      <video className='Group_call_video_fit' ref={videoRef} autoPlay />
    </div>
  );
};

export default GroupCallVideo;
