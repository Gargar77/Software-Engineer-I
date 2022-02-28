import {convertRgbToFrequency} from './colorAnalyzer'

export const startAudio = (rgbaValue, setAudioSource) => {
    const audioContext = new AudioContext();
    let source = audioContext.createOscillator();
    source.frequency.value = convertRgbToFrequency(rgbaValue)
    source.connect(audioContext.destination);
    setAudioSource(source);
    source.start();
};