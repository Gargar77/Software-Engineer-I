import {convertRgbToFrequency} from './colorAnalyzer'
//source: https://teropa.info/blog/2016/08/30/amplitude-and-loudness.html
export const startAudio = (rgbaValue, setAudioSource) => {
    const audioContext = new AudioContext();
    const oscillator = new OscillatorNode(audioContext);
    const gainNode = new GainNode(audioContext);

    oscillator.frequency.value = convertRgbToFrequency(rgbaValue)
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    gainNode.gain.value = 0.03
    setAudioSource(oscillator);
    oscillator.start();
};