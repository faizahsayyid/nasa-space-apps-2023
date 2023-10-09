'use client';
import React from 'react';
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';

import { Link } from 'react-router-dom';

export const Login = () => {
  return (
    <Flex minH={'100vh'} align={'center'} justify={'center'} bg={'#000657'}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'} color='white'>
            Sign in to your account
          </Heading>
          <Text fontSize='lg' color={'gray.400'}>
            Step into Your Digital Galaxy 🔮
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl id='email'>
              <FormLabel>Email address</FormLabel>
              <Input type='email' />
            </FormControl>

            <FormControl id='password'>
              <FormLabel>Password</FormLabel>
              <Input type='password' />
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: 'column', sm: 'row' }}
                align={'start'}
                justify={'space-between'}
              >
                <Checkbox>Remember me</Checkbox>
                <Text color={'blue.400'}>Forgot password?</Text>
              </Stack>
              <Button
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}
              >
                Sign in
              </Button>
              <Text align={'center'}>
                <Text color={'blue.400'} textDecoration='underline'>
                  <Link to='/search'>Proceed without an account</Link>
                </Text>
              </Text>
            </Stack>
          </Stack>
        </Box>
        <Text align={'center'}>
          <Text color={'white'} textDecoration='underline'>
            <Link to='/signup'>New? Click here to create an account</Link>
          </Text>
        </Text>
      </Stack>
    </Flex>
  );
};
