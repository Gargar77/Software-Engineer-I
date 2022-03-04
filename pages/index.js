import { useState, useEffect } from 'react'

import Head from 'next/head'
import {Container, Box} from '@chakra-ui/react'
import { Button, Image, IconButton, Text, Flex } from '@chakra-ui/react'
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
