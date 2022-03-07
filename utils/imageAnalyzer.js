

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

export const fallbackGetImageData = (video) => {
  const { videoWidth, videoHeight } = video;
  console.log(videoHeight, videoWidth)
  const canvas = document.createElement('canvas');
  canvas.width = videoWidth;
  canvas.height = videoHeight;
  const context = canvas.getContext('2d');
  context.drawImage(video, 0, 0, videoWidth, videoHeight);
  let frame = video ? context.getImageData(0, 0, videoWidth, videoHeight) : null;
  return frame?.data;
}

 export const getImageData = async (imageCapture) => {
  let imageBitmap = await getImageBitmap(imageCapture);
  return imageDataScraper(imageBitmap).data;
}


