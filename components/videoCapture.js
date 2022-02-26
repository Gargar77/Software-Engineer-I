import {useRef, useState} from 'react'

import Webcam from  'react-webcam'
import getImageData from '../utils/imageDataScraper';
import {calculateDominantColor, getRGBsums} from '../utils/colorAnalyzer';

const videoConstraints = {
    width: 200,
    height: 200,
    facingMode: "user"
  };

export default function VideoCapture() {
    const webcamRef = useRef(null);
    const [recording, setRecording] = useState(false);
    const [intervalId, setIntervalId] = useState(null);
    const [rgbSums, setRgbSums] = useState([0,0,0]);

    const getVideoFrameData = async (imageCapture) => {
        let imageBitmap = await imageCapture.grabFrame();
        let imageData = getImageData(imageBitmap).data;
        setRgbSums(getRGBsums(imageData));
    }

    const record = async () => {
        setRecording(true);
        const mediaStreamTrack = webcamRef.current.stream.getVideoTracks()[0];
        const imageCapture = new ImageCapture(mediaStreamTrack);
        let id = setInterval(() => getVideoFrameData(imageCapture), 1000);
        setIntervalId(id);

    };
    const stopRecord = () => {
        clearInterval(intervalId);
        setIntervalId(false);
        setRecording(false);
    }

    return (
        <>
        <Webcam 
            videoConstraints={videoConstraints}
            audio={false}
            ref={webcamRef}
            />
        <p>{recording ? calculateDominantColor(rgbSums) : ""}</p>
        <button disabled={recording} onClick={record}>record</button>
        <button disabled={!recording} onClick={stopRecord}>stop</button>
        </>
    )
}