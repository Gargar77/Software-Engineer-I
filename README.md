# Synesthesia

## Table of contents

- [Overview](#overview)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#My-process)
  - [Built with](#built-with)
  - [Continued development](#continued-development)
- [Author](#author)

## Overview
  The main focus of this project was to simulate how a person could experience Synesthesia, which is a neurological condition in which your senses mix up. In this project, I wanted to simulate hearing colors.

 Users should be able to:
  - see the video produced by their front or back camera (if possible)
  - switch cameras (if possible)
  - hear an audible sound that changes in frequency, depending on the color that the camera is capturing
  - adjust brightness perception of the camera using a slider

### Screenshot
<div style="display:flex">
  <img src="/screenshots/home.png" alt="homepage view" width="20%" height="30%"/>
  <img src="/screenshots/simulator_start.png" alt="simulator start screen" width="20%" height="30%"/>
  <img src="/screenshots/simulator_analyze.png" alt="simulator analyzing" width="20%" height="30%"/>
</div>


### Links

- Live Site URL: [https://synesthesia-fdb51.firebaseapp.com/]

## My process
  The main challenge in this project was to implement a way to take a webcam feed, and convert it into an audible tone
  
#### Extracting pixel Data

See `utils/imageAnalyzer.js` for details.

In order to extract pixel data, I needed access to webcam feed. I used the `React Webcam` library to facilitate this. Afterwards, I used a `<canvas/>` element to tranform this feed into a `Uint8ClampedArray` which holds all the RGBa data for a specific frame.
  
#### Transform pixel data into a single RGB value

see `utils/colorAnalyzer.js`

Once I received the pixel data, I converted it into a single RGBa value by avaraging out the red, green, and blue pixels independently. this gave me an avarage RGBa value.
  
#### Convert RGB value into luminance score

see `utils/colorAnalyzer.js`

Once I have an avarge RGBa value, I converted it into a luminace score, using [this](https://www.w3.org/TR/AERT/#color-contrast) formula.
  
#### Convert luminance score into audible frequency 

The luminance score can then be converted into a frequency value by taking into account the safe range for an `OscillatorNode` of `200 - 1000` and the color range of `0 - 255`.

#### Styled react project
The styling was made possible with Chakra UI components and Freepik graphics
  

### Built with
  - [Next.js](https://nextjs.org/) - open-source web development framework built on top of Node.js
  - [Chakra UI](https://chakra-ui.com/) - React component Library
  - [React icons](https://react-icons.github.io/react-icons/) - icon library for React
  - [React Webcam](https://www.npmjs.com/package/react-webcam) - Webcam component for React
  - [Freepik](https://www.freepik.com/home) - Graphics resource

### Continued development
 Currently, the program emits a single Oscillator Node with varying frequency. My next steps would be to learn more about the different audio nodes and how to build an audio graph, whcih would allow me to create a more complex sound.
 
currently I am using a lumincance method of xonverting color into sound, but I would also like to look into a different method of converting the RGB value into a tone.

## Author
- Website - [Gary Bautista](https://garybautista.me/)



secret: piña colada
