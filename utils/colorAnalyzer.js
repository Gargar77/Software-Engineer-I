export const calculateDominantColor = (rgbSums) => {
    const [red, green, blue] = rgbSums;
    if (red === green === blue) {
        return 'no winner';
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
        return 'red';
    } else if (winner === 1) {
        return 'green';
    } else if (winner === 2){
        return 'blue'
    }
    return null;
}

const  _getLuminance = (rgbArray) => {
    return (0.299 * rgbArray[0]) + (0.587 * rgbArray[1]) + (0.114 * rgbArray[2])
}

const _convertLuminanceToFrequency = (luminance) => {
    return ((luminance * 800) / 255).toFixed(2)
}

export const convertRgbToFrequency = (rgbArray) => {
    return _convertLuminanceToFrequency(_getLuminance(rgbArray))
};
//method 2: return avg rgb value
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
        return Math.floor((num / numPixels) * 4)
    })
}

export const getRGBsums = (data) => {
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

    return sums;
}