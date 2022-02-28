import { useState, useEffect } from 'react'

import Head from 'next/head'
import {Container, Box} from '@chakra-ui/react'
import { Button, Image } from '@chakra-ui/react'
import colorfulBackground from '../public/colorful_background_web.jpg'

import SynesthesiaSimulator from '../components/synesthesiaSimulator'



export default function Home() {
  const [isRecording,setIsRecording] = useState(false);
  return (
    <div>
      <Head>
        <title>Synesthesia</title>
        <meta name="description" content="synethesia simulator" />
      </Head>
      <Box position="absolute"zIndex={-1}>
       <Image fit="cover" heigth="100%" src={colorfulBackground.src}/>
      </Box>
      <main>
        {isRecording ?
          <Container centerContent>
            <Box maxW={400} maxH={300}><SynesthesiaSimulator stopWebcam={() => setIsRecording(false)}/></Box>
          </Container>
          :
          <Container centerContent>
            <Box height={300}></Box>
            <Button onClick={()=> setIsRecording(true)}>Start</Button>
          </Container>
        }
      </main>
      <footer>
     
      </footer>
    </div>
  )
}
