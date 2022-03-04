

const getImageBitmap = async (imageCapture) => {
  let imageBitmap = await imageCapture.grabFrame();
  return imageBitmap;
};

const imageDataScraper = (bitmap) => {
      const canvas = document.createElement('canvas');
      canvas.width = bitmap.width;
      canvas.height = bitmap.height;
      const context = canvas.getContext('2d');
      context.drawImage(bitmap,0,0, bitmap.width, bitmap.height);
      let frame = bitmap ? context.getImageData(0,0,bitmap.width, bitmap.height) : null;
    return frame
}

 const getImageData = async (imageCapture) => {
  let imageBitmap = await getImageBitmap(imageCapture);
  return imageDataScraper(imageBitmap).data;
}

export default getImageData

