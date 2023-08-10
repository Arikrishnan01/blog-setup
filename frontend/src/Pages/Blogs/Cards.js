import React from 'react';
import { 
    Card,
    CardHeader,
    Avatar,
    CardBody, 
    CardFooter,
    Image,
    Stack,
    Heading,
    Text,
    Button
} from '@chakra-ui/react'

export default function Cards({ title, description, imageURL, newUser}){
    return(
        <div>
            <Card
            direction={{ base: 'column', sm: 'row' }}
            width= "40%"
            margin= "auto"
            mt="2" 
            padding= "4"
            boxShadow='2xl'  
            rounded='md' 
            bg='white'
            _hover={{
                boxShadow: 'dark-lg'
              }}
            overflow='hidden'
            variant='elevated'
            >
            <CardHeader
                avatar={
                    <Avatar sx={{bgcolor: "red" }} aria-label= "recipe">
                        {newUser}
                    </Avatar>
                }
            >
                
            </CardHeader>

            <Image
                objectFit='cover'
                maxW={{ base: '100%', sm: '200px' }}
                src={imageURL}
                alt='Blogs Images'
            />

            <Stack>
                <CardBody>
                <Heading size='md'>{title}</Heading>

                <Text py='2'>
                    {description}
                </Text>
                </CardBody>

                <CardFooter>
                <Button variant='solid' colorScheme='blue'>
                    Buy Latte
                </Button>
                </CardFooter>
            </Stack>
            </Card>
        </div>
    )
}