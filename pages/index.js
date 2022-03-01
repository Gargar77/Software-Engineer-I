import { useState, useEffect } from 'react'

import Head from 'next/head'
import {Container, Box} from '@chakra-ui/react'
import { Button, Image } from '@chakra-ui/react'
import colorfulBackground from '../public/colorful_background_web.jpg'
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
} from '@chakra-ui/react'
import SynesthesiaSimulator from '../components/synesthesiaSimulator'



export default function Home() {
  const [isRecording,setIsRecording] = useState(false);
  return (
    <div>
      <Head>
        <title>Synesthesia</title>
        <meta name="description" content="synethesia simulator" />
      </Head>
      <Box position="absolute" padding={4}>
      <Popover>
        <PopoverTrigger>
          <Button>Trigger</Button>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverHeader>Synesthesia</PopoverHeader>
          <PopoverBody>Are you sure you want to have that milkshake?</PopoverBody>
        </PopoverContent>
      </Popover>
      </Box>
      <Box position="absolute" zIndex={-1} filter={`brightness(${isRecording ? "0.6" : "1"})`}>
       <Image fit="cover" height="100%" src={colorfulBackground.src}/>
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
