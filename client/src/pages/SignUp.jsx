'use client';

import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Select,
} from '@chakra-ui/react';
import { useState } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';

export const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Flex minH={'100vh'} align={'center'} justify={'center'} bg='#000657'>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'} textAlign={'center'} color='white'>
            Sign up
          </Heading>
          <Text fontSize={'lg'} color={'gray.400'}>
            Unlocking Collaboration in the Stars ✨🪐
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}
        >
          <Stack spacing={4}>
            <HStack>
              <Box>
                <FormControl id='firstName' isRequired>
                  <FormLabel>First Name</FormLabel>
                  <Input type='text' />
                </FormControl>
              </Box>
              <Box>
                <FormControl id='lastName'>
                  <FormLabel>Last Name</FormLabel>
                  <Input type='text' />
                </FormControl>
              </Box>
            </HStack>
            <FormControl id='email' isRequired>
              <FormLabel>Email address</FormLabel>
              <Input type='email' />
            </FormControl>
            <FormControl id='password' isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input type={showPassword ? 'text' : 'password'} />
                <InputRightElement h={'full'}>
                  <Button
                    variant={'ghost'}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
              <FormControl id='lastName' mt={'4'} isRequired>
                <FormLabel>Astrology Sign</FormLabel>
                <Select placeholder='Select' backgroundColor='white'>
                  <option value='Virgo'>Virgo: August 24 - September 23</option>
                  <option value='Libra'>
                    Libra: September 24 - October 23
                  </option>
                  <option value='Scorpio'>
                    Scorpio: October 24 - November 22
                  </option>
                  <option value='Sagittarius'>
                    Sagittarius: November 23 - December 21
                  </option>
                  <option value='Capricorn'>
                    Capricorn: December 22- January 20
                  </option>
                  <option value='Aquarius'>
                    Aquarius: January 21 – February 19
                  </option>
                  <option value='Pisces'>Pisces: February 20 – March 20</option>
                  <option value='Aries'>Aries: March 21- April 20</option>
                  <option value='Taurus'>Taurus: April 21 – May 21</option>
                  <option value='Gemini'>Gemini: May 22 – June 21</option>
                  <option value='Cancer'>Cancer: June 22 – July 23</option>
                  <option value='Leo'>Leo: July 24 – August 23</option>
                </Select>
              </FormControl>
            </FormControl>
            <Link to='/search'>
              <Stack spacing={10} pt={2}>
                <Button
                  loadingText='Submitting'
                  size='lg'
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}
                >
                  Sign up
                </Button>
              </Stack>
            </Link>

            <Stack pt={3}>
              <Text align={'center'}>
                Already a user?{' '}
                <Text color={'blue.400'} display='inline'>
                  <Link to='/login'>Login</Link>
                </Text>
              </Text>
            </Stack>
            <Stack pt={0}>
              <Text align={'center'}>
                <Text color={'blue.400'} textDecoration='underline'>
                  <Link to='/search'>Proceed without an account</Link>
                </Text>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};
