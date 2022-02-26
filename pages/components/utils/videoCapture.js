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
    const [rgbSums, setRgbSums] = useState([0,0,0]);

    const calculateDominantColor = () => {
        const [red, green, blue] = rgbSums;
        if (red === green === blue) {
            console.log('no winner');
            return;
        }

        let largest = -Infinity;
        let winner;
        for(let i = 0; i < rgbSums.length; i++) {
            const value = rgbSums[i];
            if (value > largest) {
                largest = value;
                winner = i;
            }
        }
        if (winner === 0) {
            console.log('red');
        } else if (winner === 1) {
            console.log('green');
        } else if (winner === 2){
            console.log('blue')
        } else {
            console.log({winner})
        }
    }

    const getRGBsums = (data) => {
        const sums = [0,0,0];
        let redSum = 0;
        let greenSum = 0;
        let blueSum = 0;
        for (let i = 0; i < data.length; i += 4) {
            redSum += data[i];
            greenSum += data[i+1];
            blueSum += data[i+2];

            if (redSum >= 1000) {
                sums[0] += 1;
                redSum = redSum - 1000;
            }

            if (greenSum >= 1000) {
                sums[1] += 1;
                greenSum = greenSum - 1000;
            }

            if (blueSum >= 1000) {
                sums[2] += 1;
                blueSum = blueSum - 1000;
            }
        }
        setRgbSums(sums);
    }

    const getVideoFrameData = async (imageCapture) => {
        let imageBitmap = await imageCapture.grabFrame();
        let imageData = getImageData(imageBitmap).data;
        getRGBsums(imageData)
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
        {recording ? calculateDominantColor() : null}
        <button disabled={recording} onClick={record}>record</button>
        <button disabled={!recording} onClick={stopRecord}>stop</button>
        </>
    )
}