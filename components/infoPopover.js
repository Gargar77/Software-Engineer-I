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
  import { Link } from '@chakra-ui/react'
  import { ExternalLinkIcon } from '@chakra-ui/icons'
  import {IconButton, Text} from '@chakra-ui/react'

const infoPopOver = (props) => (
    <Popover {...props}>
        <PopoverTrigger>
          <IconButton 
            size="lg" 
            variant="ghost" 
            icon={props.infoIcon}
            />
        </PopoverTrigger>
        <PopoverContent>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverHeader><Text fontWeight="bold">{props.config.title}</Text></PopoverHeader>
          <PopoverBody><Text fontSize='1.2rem'>{props.config.body}</Text></PopoverBody>
          {props.config.resource && <PopoverFooter>
            <Link href={props.config.resource.link} isExternal>
              {props.config.resource.text}<ExternalLinkIcon mx='2px'/>
            </Link>
          </PopoverFooter>}
        </PopoverContent>
      </Popover>
);

export default infoPopOver;