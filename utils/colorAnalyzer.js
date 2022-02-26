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