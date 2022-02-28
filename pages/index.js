import { useState, useEffect } from 'react'

import Head from 'next/head'
import {Container, Box} from '@chakra-ui/react'
import { Button } from '@chakra-ui/react'

import VideoCapture from '../components/videoCapture'



export default function Home() {
  const [isRecording,setIsRecording] = useState(false);

  return (
    <div>
      <Head>
        <title>Synesthesia</title>
        <meta name="description" content="synethesia simulator" />
      </Head>
        {isRecording ?
        <Container centerContent borderRadius="1g"  marginTop={12}>
          <Box height={300} width={200}><VideoCapture stopWebcam={() => setIsRecording(false)}/></Box>
        </Container>
         :
         <Container centerContent borderRadius="1g"  marginTop={12}>
           <Box height={300} width={200}></Box>
           <Button onClick={()=> setIsRecording(true)}>Start</Button>
         </Container>
         
        }
      <footer>
     
      </footer>
    </div>
  )
}
