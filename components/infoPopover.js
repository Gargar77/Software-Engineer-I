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

const infoPopOver = ({config}) => (
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
          <PopoverHeader><Text fontWeight="bold">{config.title}</Text></PopoverHeader>
          <PopoverBody><Text>{config.body}</Text></PopoverBody>
          {config.resource && <PopoverFooter>
            <Link href={config.resource.link} isExternal>
              {config.resource.text}<ExternalLinkIcon mx='2px'/>
            </Link>
          </PopoverFooter>}
        </PopoverContent>
      </Popover>
);

export default infoPopOver;