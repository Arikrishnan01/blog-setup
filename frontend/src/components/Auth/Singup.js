import React from 'react';
import { useState} from 'react';
import { VStack,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    // InputRightElement,
    Button
} from '@chakra-ui/react';
import { useToast } from '@chakra-ui/react';
import axios from 'axios';
import { API_URL } from '../../url';
import { useNavigate } from 'react-router-dom';

export default function Signup(){
    const history =  useNavigate();
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [loading, setLoading] = useState(false);
    const toast = useToast();

    const submitHandler =async () => {
        setLoading(true);
        if(!name || !email || !password) {
            toast({
                title: "Please fill all the Feilds",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            setLoading(false);
            return;
        }

        try{
            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            };

            const { data } = await axios.post(`${API_URL}/user/signup`,{
                name, email, password }, 
                config
            );
            toast({
                title: "Registration successful",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });

            setLoading(false);
            history('/main');
            return data;
        }
        catch(error) {
            toast({
                title: "Error Occured!!",
                description: error.response.data.message,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            setLoading(false);
        }

    };


    // const fetchUrl = async() => {

    //     setLoading(true);
    //     if(!name || !email || !password) {
    //         toast({
    //             title: "Please fill all the Feilds",
    //             status: "warning",
    //             duration: 5000,
    //             isClosable: true,
    //             position: "bottom",
    //         });
    //         setLoading(false);
    //         return;
    //     }

    //     try{
    //         const response = await axios.post(`${API_URL}/user/signup`, {
    //             name: name,
    //             email: email,
    //             password: password,
    //           })
    //         toast({
    //             title: "Registration successful",
    //             status: "success",
    //             duration: 5000,
    //             isClosable: true,
    //             position: "bottom",
    //         });
    
    //         setLoading(false)
    //         history('/main')

    //         const data = await response.data;
    //         return data;
    //     //   }
    //     }
    //    catch(error) {
    //         toast({
    //                         title: "Error Occured!!",
    //                         description: error.response.data.message,
    //                         status: "error",
    //                         duration: 5000,
    //                         isClosable: true,
    //                         position: "bottom",
    //                     });
    //                     setLoading(false);
    //     }
    // }
       
    
    //   const submitHandler = () => {
    //     fetchUrl()
    //   }


    return(
        <VStack spacing='5px'>
            <FormControl id="first-name" isRequired>
                <FormLabel>Name</FormLabel>
                <Input
                    placeholder='Enter Your Name'
                    onChange={(e) => setName(e.target.value)}
                />
            </FormControl>

            <FormControl id="email" isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                    placeholder='Enter Your Email'
                    onChange={(e) => setEmail(e.target.value)}
                />
            </FormControl>

            <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                    <InputGroup>
                        <Input
                            type='password'
                            placeholder='Enter Your Padssword'
                            onChange={(e) => setPassword(e.target.value)}
                        />

                    </InputGroup>
                    
            </FormControl>

            <Button 
                colorScheme='teal'
                width="100%"
                style={{ marginTop: 15}}
                onClick={submitHandler}
                isLoading={loading}
            >
                Sign Up
            </Button>

        </VStack>
    )
}