import {useRef, useState} from 'react'

import Webcam from  'react-webcam'
import getImageData from './imageDataScraper';

const videoConstraints = {
    width: 200,
    height: 200,
    facingMode: "user"
  };
  
export default function VideoCapture() {
    const webcamRef = useRef(null);
    const [recording, setRecording] = useState(false);
    const [intervalId, setIntervalId] = useState(null);

    const getVideoFrame = async (imageCapture) => {
        let imageBitmap = await imageCapture.grabFrame();
        console.log(getImageData(imageBitmap));
    }

    const record = () => {
        const mediaStreamTrack = webcamRef.current.stream.getVideoTracks()[0];
        console.log(mediaStreamTrack);
        const imageCapture = new ImageCapture(mediaStreamTrack);
        console.log(imageCapture);
        getVideoFrame(imageCapture);
        setRecording(true);
        // let id = setInterval(() => getVideoFrame(imageCapture), 60);
        // setIntervalId(id);

    };
    const stopRecord = () => {
        // clearInterval(intervalId);
        // setIntervalId(false);
        setRecording(false);
    }

    return (
        <>
        <Webcam 
            videoConstraints={videoConstraints}
            audio={false}
            ref={webcamRef}
            />
        <button disabled={recording} onClick={record}>record</button>
        <button disabled={!recording} onClick={stopRecord}>stop</button>
        </>
    )
}