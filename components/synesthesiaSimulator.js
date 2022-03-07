import React, {useRef, useState, useEffect} from 'react'

import { ButtonGroup, Box, Container, Flex } from '@chakra-ui/react';
import { Spinner } from '@chakra-ui/react';
import {Icon} from '@chakra-ui/icons'
import { IconButton } from '@chakra-ui/react'
import {CloseIcon} from '@chakra-ui/icons'
import { QuestionIcon } from '@chakra-ui/icons';
import {IoMdReverseCamera} from 'react-icons/io';
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



export default function VideoCapture({stopWebcam, logErrorType}) {
    const webcamRef = useRef(null);
    const [currFacingMode, setCurrFacingMode] = useState("user");
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

    const videoConstraints = {
        width: 400,
        height: 500,
        facingMode: currFacingMode
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

    const flipCamera = () => {
        stopRecord();
        if (currFacingMode === "user") {
            setCurrFacingMode({exact:"environment"})
        } else {
            setCurrFacingMode("user")
        }
    }

    return (
        <Container centerContent>
        
            <Box position="relative" marginTop={30} maxW={400} maxH={450} borderRadius={10} boxShadow={readyToAnalyze ? `0px 0px 18px ${getRgbaString()}` : null} overflow="hidden">
                <Webcam 
                videoConstraints={videoConstraints}
                audio={false}
                ref={webcamRef}
                onUserMedia={() => setReadyToAnalyze(true)}
                onUserMediaError={() => {
                    endSession();
                    logErrorType("webcam");
                } }
                />
                {readyToAnalyze && 
                    <IconButton 
                        borderRadius={50} 
                        position="absolute" 
                        top={4} 
                        right={5}
                        opacity={0.8}
                        _hover={{background:'none'}}
                        aria-label='stop video'
                        onClick={()=> endSession()} icon={<CloseIcon/>}/>
                }
                {readyToAnalyze &&
                    <IconButton 
                        position="absolute" 
                        variant="ghost" 
                        icon={<Icon as={IoMdReverseCamera} w={10} h={10} color="white" opacity={0.8}/>}
                        right={5}
                        bottom={5}
                        _hover={{background:'none'}}
                        aria-label='switch cameras'
                        onClick={() => flipCamera()}/>
                }
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