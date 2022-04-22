import store from '../../store/store';
import S3 from "react-aws-s3";

let mediaRecorder;
let videoFileName;

const vp9Codec = "video/webm; codecs=vp=9";
const vp9Options = { mimeType: vp9Codec };
const recordedChunks = [];

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

  if (MediaRecorder.isTypeSupported(vp9Codec)) {
    mediaRecorder = new MediaRecorder(remoteStream, vp9Options);
  } else {
    mediaRecorder = new MediaRecorder(remoteStream);
  }

  mediaRecorder.ondataavailable = handleDataAvailable;
  console.log("Start Recording");

  mediaRecorder.start();
};

export const stopRecording = () => {
  console.log("Stop Recording");
  mediaRecorder.stop();
};

const downloadRecordedVideo = () => {
  const blob = new Blob(recordedChunks, {
    type: "video/webm",
  });

  // const url = URL.createObjectURL(blob);
  // const a = document.createElement("a");
  // document.body.appendChild(a);
  // a.style = "display: none;";
  // a.href = url;
  // a.download = "recording.webm";
  // a.click();
  // window.URL.revokeObjectURL(url);
  
    // ReactS3Client.uploadFile(blob, videoFileName).then(
    //   (data) => {
    //   console.log(data);
    //   if (data.status === 204) {
    //     console.log("success");
    //   } else {
    //     console.log("fail");
    //   }
    // },
    // (err)=>{
    //   console.log("errrrrrrr");
    //   console.log(err);
    // });
    var myBlob = blob;
    console.log(myBlob);
    var fileName = videoFileName+'.mp4';
    var fd = new FormData();
    fd.append('my_file', myBlob, fileName);
        fetch('http://localhost:5000/upload', {
        method: 'post',
        body: fd
    });
};

const handleDataAvailable = (event) => {
  console.log("download ??????");
  if (event.data.size > 0) {
    recordedChunks.push(event.data);
    downloadRecordedVideo();
  }
};
