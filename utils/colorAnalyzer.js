//--Luminance Method: RGB -> Luminance -> sound frequency
const  _getLuminance = (rgbArray) => {
    return (0.299 * rgbArray[0]) + (0.587 * rgbArray[1]) + (0.114 * rgbArray[2])
}

const _convertLuminanceToFrequency = (luminance) => {
    return ((luminance * 800) / 255).toFixed(2)
}
export const convertRgbToFrequency = (rgbArray) => {
    return _convertLuminanceToFrequency(_getLuminance(rgbArray))
};
//--------------------

export const getAvgRGBAValue = (colorDataArray) => {
    const rgbaSums = [0,0,0,0];
    let numPixels = 0;

    for (let i = 0; i < colorDataArray.length; i += 4) {
        rgbaSums[0] += colorDataArray[i];
        rgbaSums[1] += colorDataArray[i + 1];
        rgbaSums[2] += colorDataArray[i + 2];
        rgbaSums[3] += colorDataArray[i + 3];
        numPixels++;
    }
    return rgbaSums.map((num) => {
        // multiplied by 4 to increase brightness of avg rgv value
        return Math.floor((num / numPixels) * 9)
    })
}
