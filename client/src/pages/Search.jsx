import React, { useState } from 'react';
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
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import data from './projects.json';

export const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div style={{ backgroundColor: '#E9D8FD', minHeight: '100vh' }}>
      <div>
        {/* Header */}

        {/* //Header */}
        <Stack spacing={4} mx='25%'>
          <InputGroup my='100px' bg='white' borderRadius='full'>
            <InputLeftElement pointerEvents='none'>
              <SearchIcon color='purple.500' />
            </InputLeftElement>
            <Input
              type='search'
              onChange={(event) => {
                setSearchTerm(event.target.value);
              }}
              placeholder='Search for projects...'
              _focus={{ borderColor: 'purple.500', boxShadow: 'none' }}
              id='search'
            />
          </InputGroup>
        </Stack>
      </div>

      <Grid
        templateColumns={{
          base: '1fr',
          sm: 'repeat(2, 1fr)', // On small screens (sm), display 2 columns
          md: 'repeat(3, 1fr)', // On medium screens (md), display 3 columns
        }}
        gap={4}
        mx='25%'
      >
        {data
          .filter((val) => {
            if (searchTerm == '') {
              return val;
            } else if (
              val.title.toLowerCase().includes(searchTerm.toLowerCase())
            ) {
              return val;
            }
          })
          .map((val) => {
            return (
              <div className='template' key={val.id}>
                <Card maxW='sm'>
                  <CardBody>
                    <Image
                      src={val.image}
                      alt='Green double couch with wooden legs'
                      borderRadius='lg'
                    />
                    <Stack mt='6' spacing='3'>
                      <Heading size='md'>{val.title}</Heading>
                      <Text>{val.description}</Text>
                      <Text color='blue.600' fontSize='2xl'>
                        ${val.price}/hr
                      </Text>
                    </Stack>
                  </CardBody>
                  <Divider />
                  <CardFooter>
                    <ButtonGroup spacing='2'>
                      <Button variant='solid' colorScheme='blue'>
                        Apply now
                      </Button>
                      <Button variant='ghost' colorScheme='blue'>
                        Save for later
                      </Button>
                    </ButtonGroup>
                  </CardFooter>
                </Card>

                {/* <img src={val.image} alt='' />
                <h3>{val.title}</h3>
                <p className='price'>${val.price}</p> */}
              </div>
            );
          })}
      </Grid>
    </div>
  );
};
