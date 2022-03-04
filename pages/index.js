import { useState, useEffect } from 'react'

import Head from 'next/head'
import {Container, Box} from '@chakra-ui/react'
import { Image, Text, Flex } from '@chakra-ui/react'
import StyledButton from '../components/styledButton'
import colorfulBackground from '../public/colorful_background_web.jpg'
import InfoPopOver from '../components/infoPopover';
import { Link } from '@chakra-ui/react'
import SynesthesiaSimulator from '../components/synesthesiaSimulator'

const infoConfig = {
  title:"Synesthesia",
  body:"A neurological condition in which information meant to stimulate one of your senses stimulates several of your senses.",
  resource:{
    text:"Learn more",
    link:"https://www.healthline.com/health/synesthesia"
  }
}

export default function Home() {
  const [isRecording,setIsRecording] = useState(false);
  return (
    <div>
      <Head>
        <title>Synesthesia</title>
        <meta name="description" content="synethesia simulator" />
      </Head>
      <Box position="absolute" padding={4}>
      {!isRecording && <InfoPopOver config={infoConfig}/>}
      </Box>
      <Box position="absolute" zIndex={-1} filter='auto' brightness={(isRecording ? "0.5" : "1")} blur={isRecording ? '3px' : '0'}>
       <Image fit="cover" height="100%" src={colorfulBackground.src}/>
      </Box>
      <main>
        {isRecording ?
          <Container centerContent marginBottom={10}>
            <Box maxW={400} maxH={300}><SynesthesiaSimulator stopWebcam={() => setIsRecording(false)}/></Box>
          </Container>
          :
          <Container centerContent marginBottom={50}>
            <Flex marginTop='30vh' direction='column' align="center">
              <Text 
                color="white" 
                textShadow='1px 1px black' 
                fontSize='6xl' 
                fontFamily="'Modak', cursive"
                letterSpacing={2}
                marginBottom={12}>Synesthesia</Text>
              <StyledButton size="lg" width={150} onClick={()=> setIsRecording(true)}><Text fontWeight="bold" fontSize='xl'>Start</Text></StyledButton>
            </Flex>
          </Container>
        }
      </main>
      <footer>
       <Text textShadow='1px 1px black' textAlign="center" color="white">Made with ❤️ by <Link isExternal href='https://garybautista.me/' color="#acd9ff">Gary Bautista</Link></Text>
      </footer>
    </div>
  )
}
