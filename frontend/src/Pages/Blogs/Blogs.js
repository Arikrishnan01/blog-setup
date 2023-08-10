import React, { useEffect, useState } from 'react';
import './blogs.css';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../../url';
import { useToast } from "@chakra-ui/react";
import axios from 'axios';
import Cards from './Cards';
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

export default function Blogs() {

  // const navigate = useNavigate();
  const toast = useToast();
  const [ loading, setLoading ] = useState(false);
  const [ blogs, setBlogs ] = useState([]);

  const submitHandler = async () => {

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.get(
    `${API_URL}/blog/getAllBlogs`,
        config
      );

      toast({
        title: "Atlas Blogs Fetched Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });

      setLoading(false);
      // history('/main');
      console.log(data)
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


  // const getAllBlogs = async() => {
  //   const response = await axios.get(`${API_URL}/blog/getAllBlogs`)
  //   .catch(error => {
  //     console.log(error.message)
  //   })

  //   const data = response.data;

  //   return data;
  // }

  // useEffect(() => {
  //   getAllBlogs()
  //   .then((data) => setBlogs(data.blogs))
  // },[]);
  // console.log(blogs)

  const getAllBlogs = async() => {
    setLoading(true);
    fetch(`${API_URL}/blog/getAllBlogs`, {
        method: "GET",
      })
      .then((response) => response.json())
      .then((data) => setBlogs(data.data))
      setLoading(false);
    }

  useEffect(() => {
    getAllBlogs()
  },[]);


  // return (
  //   <div>
  //     {
  //       blogs && blogs.map((blog, index) => 
  //         <Cards 
  //           title={blog.title}
  //           description={blog.description}
  //           userName={blog.user.name}
  //           imageURL={blog.imageURL}
  //         />
  //       )
  //     }
  //   </div>
  // )

  return(
    <div>
        {
          blogs &&
          blogs.map((blog, index) => 
          <Card  key={blog.id}
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
                      {blog.newUser}
                  </Avatar>
              }
          >
              
          </CardHeader>
  
          <Image
              objectFit='cover'
              maxW={{ base: '100%', sm: '200px' }}
              src={blog.image}
              alt='Blogs Images'
          />
  
          <Stack>
              <CardBody>
              <Heading size='md'>{blog.title}</Heading>
  
              <Text py='2'>
                  {blog.description}
              </Text>
              </CardBody>
  
              <CardFooter>
              <Button variant='solid' colorScheme='blue'>
                  Buy Latte
              </Button>
              </CardFooter>
          </Stack>
          </Card>        
          )
        }
    </div>
)
}
