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
      <video className='Group_call_video_fit' ref={videoRef} autoPlay />
  );
};

export default GroupCallVideo;
