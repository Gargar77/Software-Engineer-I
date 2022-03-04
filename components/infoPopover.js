import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverBody,
    PopoverFooter,
    PopoverArrow,
    PopoverCloseButton,
  } from '@chakra-ui/react'
  import { InfoIcon } from '@chakra-ui/icons'
  import { Link } from '@chakra-ui/react'
  import { ExternalLinkIcon } from '@chakra-ui/icons'
  import {IconButton, Text} from '@chakra-ui/react'

const infoPopOver = () => (
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
);

export default infoPopOver;