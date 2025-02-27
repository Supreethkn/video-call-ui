import store from '../../store/store';
import S3 from "react-aws-s3";

let mediaRecorder;
let videoFileName;

let userVideoFileName;


let mediaRecorder2;

const vp9Codec = "video/mp4; codecs=h264";
const vp9Options = { mimeType: vp9Codec };
var recordedChunks = [];


const config = {
  bucketName: '',
  region: '',
  accessKeyId: '',
  secretAccessKey: '',
};
const ReactS3Client = new S3(config);


export const startRecording = (videoName) => {
  videoFileName = videoName;
  const remoteStream = store.getState().call.localStream;

  console.log('remote stream', remoteStream);

  if (MediaRecorder.isTypeSupported(vp9Codec)) {
    mediaRecorder = new MediaRecorder(remoteStream, vp9Options);
  } else {
    mediaRecorder = new MediaRecorder(remoteStream);
  }

  mediaRecorder.ondataavailable = handleDataAvailable;
  console.log("Start Recording");


  mediaRecorder.start();
};

export const startRecording1 = (videoName) => {
  console.log('method called');

  userVideoFileName = videoName;
  console.log('userrecording name',userVideoFileName);
  const remoteStream = store.getState().call.localStream;

  console.log('local stream user', remoteStream);

  if (MediaRecorder.isTypeSupported(vp9Codec)) {
    mediaRecorder2 = new MediaRecorder(remoteStream, vp9Options);
  } else {
    mediaRecorder2 = new MediaRecorder(remoteStream);
  }

  mediaRecorder2.ondataavailable = handleDataAvailable1;
  console.log("Start Recording user");

  mediaRecorder2.start();
  console.log('method end');
};


export const stopRecording = () => {
  console.log("Stop Recording");
  mediaRecorder.stop();
};

export const stopRecording1 = () => {
  if(mediaRecorder2.state == 'recording'){
    mediaRecorder2.stop();
  }
};


const downloadRecordedVideo = () => {
  const blob = new Blob(recordedChunks, {
    type: "video/mp4",
  });

  // const url = URL.createObjectURL(blob);
  // const a = document.createElement("a");
  // document.body.appendChild(a);
  // a.style = "display: none;";
  // a.href = url;
  // a.download = "recording.webm";
  // a.click();
  // window.URL.revokeObjectURL(url);
  
  //   ReactS3Client.uploadFile(blob, videoFileName).then(
  //     (data) => {
  //     console.log(data);
  //     if (data.status === 204) {
  //       console.log("success");
  //     } else {
  //       console.log("fail");
  //     }
  //   },
  //   (err)=>{
  //     console.log("errrrrrrr");
  //     console.log(err);
  //   });
    var myBlob = blob;
    console.log(myBlob);
    var fileName = videoFileName+'.mp4';
    console.log('operatorfile',fileName);
    var fd = new FormData();
    fd.append('my_file', myBlob, fileName);
        fetch(process.env.REACT_APP_SERVER +'/upload', {
        method: 'post',
        body: fd
    });

    recordedChunks = [];
};

const downloadRecordedVideo1 = () => {
  const blob = new Blob(recordedChunks, {
    type: "video/mp4",
  });

  // const url = URL.createObjectURL(blob);
  // const a = document.createElement("a");
  // document.body.appendChild(a);
  // a.style = "display: none;";
  // a.href = url;
  // a.download = "recordinguser.webm";
  // a.click();
  // window.URL.revokeObjectURL(url);

    var myBlob = blob;
    console.log(myBlob);
    var fileName = userVideoFileName+'.mp4';
    console.log('userfile',fileName);
    var fd = new FormData();
    fd.append('my_file', myBlob, fileName);
        fetch(process.env.REACT_APP_SERVER +'/userupload', {
        method: 'post',
        body: fd

    });

    recordedChunks = [];
};

const handleDataAvailable = (event) => {
  console.log("download ??????");
  if (event.data.size > 0) {
    recordedChunks.push(event.data);
    downloadRecordedVideo();
  }
};

const handleDataAvailable1 = (event) => {
  console.log("download user");
  if (event.data.size > 0) {
    recordedChunks.push(event.data);
    downloadRecordedVideo1();
  }
};
