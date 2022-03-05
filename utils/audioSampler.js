import {convertRgbToFrequency} from './colorAnalyzer'

export const startAudio = (rgbaValue, setAudioSource) => {
    const audioContext = new AudioContext();
    const oscillator = new OscillatorNode(audioContext);
    const gainNode = new GainNode(audioContext);

    oscillator.frequency.value = convertRgbToFrequency(rgbaValue)
    // oscillator.connect(audioContext.destination);
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    gainNode.gain.value = 0.03
    setAudioSource(oscillator);
    oscillator.start();
};