import { useState } from 'react'

import Head from 'next/head'
import VideoCapture from '../components/videoCapture'
export default function Home() {
  const [isRecording,setIsRecording] = useState(false);
  return (
    <div>
      <Head>
        <title>Synesthesia</title>
        <meta name="description" content="synethesia simulator" />
      </Head>

      <main>
        {isRecording ? 
        <div>
          <VideoCapture/>
          <button onClick={()=> setIsRecording(false)}>Stop Video</button>
        </div> :
        <button onClick={()=> setIsRecording(true)}>Start</button>
        }
      </main>
      <footer>
     
      </footer>
    </div>
  )
}
