import {Button, Text} from '@chakra-ui/react'
const styledButton = (props) => {
    return (
        <Button 
            {...props}
            variant="outline"
            boxShadow="dark-lg"
            borderRadius={18}
            borderWidth={3}
            >
            <Text color={props.color}>
                {props.children}
            </Text>
        </Button>
    )
};

export default styledButton;