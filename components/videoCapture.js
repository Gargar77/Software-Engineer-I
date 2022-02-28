import {useRef, useState, useEffect} from 'react'

import { Button, Box, Container } from '@chakra-ui/react';
import { Spinner } from '@chakra-ui/react';

import Webcam from  'react-webcam'
import getImageData from '../utils/imageAnalyzer'
import {getAvgRGBAValue, convertRgbToFrequency} from '../utils/colorAnalyzer';


const videoConstraints = {
    width: 200,
    height: 250,
    facingMode: "user"
  };

export default function VideoCapture({stopWebcam}) {
    const webcamRef = useRef(null);
    const [analyzingColor, setAnalyzingColor] = useState(false);
    const [intervalId, setIntervalId] = useState(null);
    const [readyToAnalyze, setReadyToAnalyze] = useState(false);
    const [audioSource, setAudioSource] = useState(null);
    const [rgbaValue, setrgbaValue] = useState([0,0,0,0])

    useEffect(() => {
            if (!readyToAnalyze) return;
            if (!rgbaValue) return;
            if (!audioSource) {
                startAudio(rgbaValue)   
            } else {
                audioSource.frequency.value = convertRgbToFrequency(rgbaValue)
            }
        },[rgbaValue])

     const startAudio = (rgbaValue) => {
        const audioContext = new AudioContext();
        let source = audioContext.createOscillator();
        source.frequency.value = convertRgbToFrequency(rgbaValue)
        source.connect(audioContext.destination);
        setAudioSource(source);
        source.start();
    };

    const analyzeVideoFrame = async (imageCapture) => {
        let imageData = await getImageData(imageCapture);
        let avgRgbValue = getAvgRGBAValue(imageData);
        setrgbaValue(avgRgbValue);
    };

    const record = async () => {
        setAnalyzingColor(true);
        const mediaStreamTrack = webcamRef.current.stream.getVideoTracks()[0];
        const imageCapture = new ImageCapture(mediaStreamTrack);
        let id = setInterval(() => analyzeVideoFrame(imageCapture), 500);
        setIntervalId(id);

    };
    const stopRecord = () => {
        clearInterval(intervalId);
        setIntervalId(null);
        setAnalyzingColor(false);
        audioSource && audioSource.stop();
        setAudioSource(null);
    }

    const endSession = () => {
        stopRecord();
        stopWebcam();
    }

    const getRgbaString = () => {
        return (
            `rgb(${rgbaValue[0]},${rgbaValue[1]},${rgbaValue[2]})`
        )
    }

    return (
        <Container centerContent>
        <Webcam 
            videoConstraints={videoConstraints}
            audio={false}
            ref={webcamRef}
            onUserMedia={() => setReadyToAnalyze(true)}
            />
        {readyToAnalyze ?
        <Box> 
            <Button disabled={analyzingColor} onClick={record}>Analyze</Button>
            <Button disabled={!analyzingColor || !audioSource} onClick={stopRecord}>Stop</Button>
            <Box height={10} width={10} bgColor={getRgbaString()}></Box>
          <Button onClick={()=> endSession()}>Stop Video</Button>
        </Box> :
        <Spinner size='xl'/>
        }
        </Container>
    )
}