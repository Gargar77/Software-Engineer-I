
const imageDataScraper = (bitmap) => {
  
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      context.drawImage(bitmap,0,0);
      let frame = bitmap ? context.getImageData(0,0,bitmap.width, bitmap.height) : null;
    return frame
}

export default imageDataScraper