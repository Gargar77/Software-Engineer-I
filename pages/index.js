import { useState, useEffect } from 'react'

import Head from 'next/head'
import {Container, Box} from '@chakra-ui/react'
import { Button } from '@chakra-ui/react'

import SynesthesiaSimulator from '../components/synesthesiaSimulator'



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
          <Box maxW={400} maxH={300}><SynesthesiaSimulator stopWebcam={() => setIsRecording(false)}/></Box>
        </Container>
         :
         <Container centerContent borderRadius="1g"  marginTop={12}>
           <Box height={300}></Box>
           <Button onClick={()=> setIsRecording(true)}>Start</Button>
         </Container>
         
        }
      <footer>
     
      </footer>
    </div>
  )
}
