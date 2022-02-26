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
    const [analyzingColor, setAnalyzingColor] = useState(false);
    const [intervalId, setIntervalId] = useState(null);
    const [rgbSums, setRgbSums] = useState([0,0,0]);
    const [readyToAnalyze, setReadyToAnalyze] = useState(false);

    const getVideoFrameData = async (imageCapture) => {
        let imageBitmap = await imageCapture.grabFrame();
        let imageData = getImageData(imageBitmap).data;
        setRgbSums(getRGBsums(imageData));
    }

    const record = async () => {
        setAnalyzingColor(true);
        const mediaStreamTrack = webcamRef.current.stream.getVideoTracks()[0];
        const imageCapture = new ImageCapture(mediaStreamTrack);
        let id = setInterval(() => getVideoFrameData(imageCapture), 500);
        setIntervalId(id);

    };
    const stopRecord = () => {
        clearInterval(intervalId);
        setIntervalId(false);
        setAnalyzingColor(false);
    }

    return (
        <>
        <Webcam 
            videoConstraints={videoConstraints}
            audio={false}
            ref={webcamRef}
            onUserMedia={() => setReadyToAnalyze(true)}
            />
        <p>{analyzingColor ? calculateDominantColor(rgbSums) : ""}</p>
        {readyToAnalyze ?
        <div> 
            <button disabled={analyzingColor} onClick={record}>Analyze</button>
            <button disabled={!analyzingColor} onClick={stopRecord}>stop Analyzing</button>
        </div> :
        <p>Loading webcam...</p>
        }
        </>
    )
}