import React, {useRef, useState, useEffect} from 'react'

import { ButtonGroup, Box, Container, Flex } from '@chakra-ui/react';
import { Spinner } from '@chakra-ui/react';
import { IconButton } from '@chakra-ui/react'
import {CloseIcon} from '@chakra-ui/icons'
import { QuestionIcon } from '@chakra-ui/icons';
import InfoPopOver from './infoPopover';
import {
    Slider,
    SliderTrack,
    SliderFilledTrack,
    SliderThumb,
  } from '@chakra-ui/react'
import StyledButton from './styledButton'

import Webcam from  'react-webcam'
import getImageData from '../utils/imageAnalyzer'
import {getAvgRGBAValue, convertRgbToFrequency} from '../utils/colorAnalyzer';
import { startAudio } from '../utils/audioSampler';

const videoConstraints = {
    width: 400,
    height: 500,
    facingMode: "user"
  };

export default function VideoCapture({stopWebcam}) {
    const webcamRef = useRef(null);
    const [analyzingColor, setAnalyzingColor] = useState(false);
    const [intervalId, setIntervalId] = useState(null);
    const [readyToAnalyze, setReadyToAnalyze] = useState(false);
    const [audioSource, setAudioSource] = useState(null);
    const [rgbaValue, setrgbaValue] = useState([0,0,0,0])
    const [brightnessThreshold, setBrightnessThreshold] = useState(8);
    const thresholdRef = useRef();
    const sliderInfoConfig = {
        title:"Threshold slider",
        body:"This slider allows you to control how 'bright' or 'dark' the current video is being perceived. Play around with the slider to hear how the sound changes!"
    }
    thresholdRef.current = brightnessThreshold
    
    useEffect(() => {
            if (!readyToAnalyze || !rgbaValue) return;
            if (!audioSource) {
                startAudio(rgbaValue, setAudioSource)   
            } else {
                audioSource.frequency.value = convertRgbToFrequency(rgbaValue)
            }
        },[rgbaValue, brightnessThreshold])
        
    useEffect(() => {
        if (!analyzingColor && audioSource) {
            audioSource.stop();
            setAudioSource(null)
        }
    })
    const analyzeVideoFrame = async (imageCapture) => {
        let imageData = await getImageData(imageCapture);
        let avgRgbValue = getAvgRGBAValue(imageData, thresholdRef.current);
        setrgbaValue(avgRgbValue);
    };

    const record = async () => {
        setAnalyzingColor(true);
        const mediaStreamTrack = webcamRef.current.stream.getVideoTracks()[0];
        const imageCapture = new ImageCapture(mediaStreamTrack);
        let id = setInterval(() => analyzeVideoFrame(imageCapture, ()=> brightnessThreshold), 100);
        setIntervalId(id);

    };
    const stopRecord = async () => {
        audioSource && await audioSource.stop();
        clearInterval(intervalId);
        setIntervalId(null);
        setAnalyzingColor(false);
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
          {readyToAnalyze &&
          <Flex width="100%" justify="end">
             <IconButton 
                borderRadius={12} 
                position="relative" 
                top={4} 
                right={-2} 
                aria-label='stop video' 
                onClick={()=> endSession()} icon={<CloseIcon/>}/>
          </Flex>
          }
            <Box maxW={400} maxH={450} borderRadius={10} boxShadow={readyToAnalyze ? `0px 0px 18px ${getRgbaString()}` : null} overflow="hidden">
                <Webcam 
                videoConstraints={videoConstraints}
                audio={false}
                ref={webcamRef}
                onUserMedia={() => setReadyToAnalyze(true)}
                />
            </Box>
        {readyToAnalyze ?
        <Container centerContent>
            <ButtonGroup marginTop={10} marginBottom={10} spacing={16}>
                <StyledButton color="white" disabled={analyzingColor} onClick={record}>Analyze</StyledButton>
                <StyledButton color="white" disabled={!analyzingColor || !audioSource} onClick={stopRecord}>Stop</StyledButton>
            </ButtonGroup>  
            <Box height={10} width="100%" borderRadius={14} marginBottom={8} bgColor={getRgbaString()}></Box>
            <Flex align="center" justify="space-between" width="100%" >
                <InfoPopOver config={sliderInfoConfig} infoIcon={<QuestionIcon boxSize="1.5em" color="white"/>}/>
                <Slider 
                    isDisabled={!analyzingColor || !audioSource}
                    width={200}
                    max={100}
                    min={0} 
                    step={1}
                    defaultValue={50}
                    aria-label='brightness threshold slider' 
                    onChangeEnd={(val) => setBrightnessThreshold(val)}>
                    <SliderTrack>
                        <SliderFilledTrack />
                    </SliderTrack>
                    <SliderThumb />
                </Slider>
            </Flex>
        </Container> :
        <Spinner marginTop={100} size='xl' color='white'/>
        }
        </Container>
    )
}