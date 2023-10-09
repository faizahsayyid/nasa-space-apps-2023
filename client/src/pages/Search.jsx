import React, { useState } from 'react';
import { useQuery } from 'react-query';

import {
  Input,
  Stack,
  InputGroup,
  InputLeftElement,
  Card,
  Image,
  CardBody,
  CardFooter,
  Heading,
  Text,
  Divider,
  Button,
  ButtonGroup,
  Grid,
  Center,
  Box,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
// import data from './projects.json';
import Navbar from '../components/Navbar';
import { get_projects } from '../api';

export const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const { isLoading, error, data } = useQuery(
    ['get_projects', searchTerm],
    () => get_projects(searchTerm, '6e1d4748-b8ad-4ac3-8360-079245890f59')
  );

  if (isLoading) return 'Loading...';

  return (
    <div style={{ backgroundColor: '#000657', minHeight: '100vh' }}>
      <Stack spacing={4} mx='20%' margin-left='%'>
        <InputGroup my='50px' bg='white' borderRadius='full'>
          <InputLeftElement pointerEvents='none'>
            <SearchIcon color='purple.500' />
          </InputLeftElement>
          <Input
            type='search'
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                setSearchTerm(event.target.value);
              }
            }}
            placeholder='Search for projects...'
            _focus={{ borderColor: 'purple.500', boxShadow: 'none' }}
            id='search'
          />
        </InputGroup>
      </Stack>
      <Center>
        <Grid
          templateColumns={{
            base: '1fr',
            sm: 'repeat(2, 1fr)', // On small screens (sm), display 2 columns
            md: 'repeat(3, 1fr)', // On medium screens (md), display 3 columns
          }}
          gap={4}
          mx='25%'
          height='100%'
        >
          {data.map((val) => {
            return (
              <div className='template' key={val.id}>
                <Box maxW='sm' height='100%' overflow='hidden'>
                  <Card maxW='sm' height='100%'>
                    <CardBody>
                      {val.image_url ? (
                        <Image
                          src={val.image_url}
                          alt='Project Picture'
                          borderRadius='lg'
                        />
                      ) : (
                        <Image
                          src=' https://www.nasa.gov/wp-content/uploads/2021/05/nasa-logo-web-rgb.png' // Replace with your default image source
                          alt='Default Image'
                          borderRadius='lg'
                        />
                      )}
                      <Stack mt='6' spacing='3'>
                        <Heading size='md'>{val.name}</Heading>
                        <Text>{val.description}</Text>
                        <Text fontWeight='bold' fontSize='sm'>
                          Open Roles Available:{' '}
                          {val.roles.map((role, index) => (
                            <span key={index}>
                              {role.toLowerCase()}
                              {index < val.roles.length - 1 ? ', ' : ''}
                            </span>
                          ))}
                        </Text>
                      </Stack>
                    </CardBody>
                    <Divider />
                    <CardFooter>
                      <ButtonGroup spacing='2'>
                        <a
                          href={val.external_url}
                          target='_blank'
                          rel='noopener noreferrer'
                        >
                          <Button variant='solid' colorScheme='blue'>
                            Apply now
                          </Button>
                        </a>
                        <Button variant='ghost' colorScheme='blue'>
                          Save for later
                        </Button>
                      </ButtonGroup>
                    </CardFooter>
                  </Card>
                </Box>
              </div>
            );
          })}
        </Grid>
      </Center>
    </div>
  );
};
