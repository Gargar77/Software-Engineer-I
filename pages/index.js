import { useState, useEffect } from 'react'

import Head from 'next/head'
import {Container, Box} from '@chakra-ui/react'
import { Button, Image, IconButton, Text } from '@chakra-ui/react'
import StyledButton from '../components/styledButton'
import { InfoIcon } from '@chakra-ui/icons'
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
import { Link } from '@chakra-ui/react'
import { ExternalLinkIcon } from '@chakra-ui/icons'
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
          <IconButton 
            size="lg" 
            variant="ghost" 
            icon={<InfoIcon boxSize="1.5em" color="white"/>}
            />
        </PopoverTrigger>
        <PopoverContent>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverHeader><Text fontWeight="bold">Synesthesia</Text></PopoverHeader>
          <PopoverBody><Text>A neurological condition in which information meant to stimulate one of your senses stimulates several of your senses.</Text></PopoverBody>
          <PopoverFooter>
            <Link href='https://www.healthline.com/health/synesthesia' isExternal>
              Learn more<ExternalLinkIcon mx='2px'/>
            </Link>
          </PopoverFooter>
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
            <StyledButton marginTop='50vh' size="lg" onClick={()=> setIsRecording(true)}>Start</StyledButton>
          </Container>
        }
      </main>
      <footer>
     
      </footer>
    </div>
  )
}
