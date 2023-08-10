import React from 'react';
import { useState} from 'react';
import { VStack,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    InputRightElement,
    Button
} from '@chakra-ui/react';
import { useToast } from "@chakra-ui/react";
import axios from 'axios';
import { API_URL } from '../../url';
import { useNavigate } from 'react-router-dom';

export default function Login(){
    const history =  useNavigate();
    const [show, setShow] = useState(false);
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const toast = useToast();
    const [loading, setLoading] = useState(false);

    const handleClick = () => {setShow(!show)};

    const submitHandler = async () => {
        setLoading(true);
        if (!email || !password) {
          toast({
            title: "Please Fill all the Feilds",
            status: "warning",
            duration: 5000,
            isClosable: true,
            position: "bottom",
          });
          setLoading(false);
          return;
        }
    
        // console.log(email, password);
        try {
          const config = {
            headers: {
              "Content-type": "application/json",
            },
          };
    
          const { data } = await axios.post(
        `${API_URL}/user/login`,
            { email, password },
            config
          );
  
          toast({
            title: "Login Successful",
            status: "success",
            duration: 5000,
            isClosable: true,
            position: "bottom",
          });
          // localStorage.setItem("userInfo", JSON.stringify(data));
          setLoading(false);
          history('/main');
          
          return data;
        } catch (error) {
          toast({
            title: "Error Occured!",
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

    //   setLoading(true);
    //   if( !email || !password) {
    //       toast({
    //           title: "Please fill all the Feilds",
    //           status: "warning",
    //           duration: 5000,
    //           isClosable: true,
    //           position: "bottom",
    //       });
    //       setLoading(false);
    //       return;
    //   }

    //   const response = await axios.post(`${API_URL}/user/login`, {
    //     email: email,
    //     password: password,
    //   })
    //   toast({
    //       title: "Login successful",
    //       status: "success",
    //       duration: 5000,
    //       isClosable: true,
    //       position: "bottom",
    //   });

    //   setLoading(false)
    //   history('/main')
     
    //   .catch((error) => {
    //       toast({
    //                       title: "Error Occured!!",
    //                       description: error.response.data.message,
    //                       status: "error",
    //                       duration: 5000,
    //                       isClosable: true,
    //                       position: "bottom",
    //                   });
    //                   setLoading(false);
    //   })
  
    //   const data = await response.data;
    //   return data;
    // }
  
    // const submitHanler = () => {
    //   fetchUrl()
    // }

    return(
        <VStack spacing='5px'>

            <FormControl id="email" isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                    placeholder='Enter Your Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </FormControl>

            <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                    <InputGroup>
                        <Input
                            value={password}
                            type={ show? "text": "password"}
                            placeholder='Enter Your Padssword'
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <InputRightElement width="4.5rem">
                            <Button h="1.75rem" size="sm" onClick={handleClick}>
                                { show ? "Hide" : "Show"}
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                    
            </FormControl>

            <Button 
                colorScheme='blue'
                width="100%"
                style={{ marginTop: 15}}
                onClick={submitHandler}
                isLoading={loading}
            >
                Login
            </Button>

        </VStack>
    )
}