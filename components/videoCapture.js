import {useRef, useState, useEffect} from 'react'

import Webcam from  'react-webcam'
import getImageData from '../utils/imageDataScraper';
import {calculateDominantColor, getRGBsums} from '../utils/colorAnalyzer';
import frequencyMap from '../frequencyMap';
const videoConstraints = {
    width: 200,
    height: 200,
    facingMode: "user"
  };

export default function VideoCapture() {
    const webcamRef = useRef(null);
    const [analyzingColor, setAnalyzingColor] = useState(false);
    const [intervalId, setIntervalId] = useState(null);
    const [readyToAnalyze, setReadyToAnalyze] = useState(false);
    const [audioSource, setAudioSource] = useState(null);
    const [dominantColor, setDominantColor] = useState("");

    useEffect(() => {
            if (!readyToAnalyze) return;
            if (!dominantColor) return dominantColor;
            if (!audioSource) {
                startAudio(dominantColor)   
            } else {
                audioSource.frequency.value = frequencyMap[dominantColor]
            }
        },[dominantColor])

     const startAudio = (dominant) => {
        const audioContext = new AudioContext();
        let source = audioContext.createOscillator();
        source.frequency.value = frequencyMap[dominant];
        source.connect(audioContext.destination);
        setAudioSource(source);
        source.start();
    };

    const getVideoFrameData = async (imageCapture) => {
        let imageBitmap = await imageCapture.grabFrame();
        let imageData = getImageData(imageBitmap).data;
        let rgbSums = getRGBsums(imageData);
        setDominantColor(calculateDominantColor(rgbSums));
    };

    const record = async () => {
        setAnalyzingColor(true);
        const mediaStreamTrack = webcamRef.current.stream.getVideoTracks()[0];
        const imageCapture = new ImageCapture(mediaStreamTrack);
        let id = setInterval(() => getVideoFrameData(imageCapture), 500);
        setIntervalId(id);

    };
    const stopRecord = () => {
        clearInterval(intervalId);
        setIntervalId(null);
        setAnalyzingColor(false);
        audioSource.stop();
        setAudioSource(null);
        setDominantColor("")
    }

    return (
        <>
        <Webcam 
            videoConstraints={videoConstraints}
            audio={false}
            ref={webcamRef}
            onUserMedia={() => setReadyToAnalyze(true)}
            />
        <p>{analyzingColor ?  dominantColor : ""}</p>
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