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
  const [projects, setProjects] = useState(data); // Initialize projects with data from projects.json

  const [newProject, setNewProject] = useState({
    image: '',
    title: '',
    price: 0,
    description: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewProject({
      ...newProject,
      [name]: value,
    });
  };

  const handleCreateProject = () => {
    // Create a new project object with a unique ID
    const newProjectWithId = {
      ...newProject,
      id: projects.length + 1,
    };

    // Add the new project to the projects array
    setProjects([...projects, newProjectWithId]);

    // Clear the form fields
    setNewProject({
      image: '',
      title: '',
      price: 0,
      description: '',
    });
  };

  return (
    <div style={{ backgroundColor: '#E9D8FD', minHeight: '100vh' }}>
      <div>
        {/* Header */}
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

      {/* Project Creation Form */}
      <div mx='25%' my='2rem'>
        <Heading size='lg' mb='1rem'>
          Create a Project
        </Heading>
        <Stack spacing={4}>
          <Input
            name='image'
            value={newProject.image}
            onChange={handleInputChange}
            placeholder='Image URL'
          />
          <Input
            name='title'
            value={newProject.title}
            onChange={handleInputChange}
            placeholder='Title'
          />
          <Input
            name='price'
            type='number'
            value={newProject.price}
            onChange={handleInputChange}
            placeholder='Price'
          />
          <Input
            name='description'
            value={newProject.description}
            onChange={handleInputChange}
            placeholder='Description'
          />
          <Button onClick={handleCreateProject} colorScheme='blue'>
            Create Project
          </Button>
        </Stack>
      </div>

      {/* Display Projects */}
      <Grid
        templateColumns={{
          base: '1fr',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(3, 1fr)',
        }}
        gap={4}
        mx='25%'
      >
        {projects
          .filter((val) => {
            if (searchTerm === '') {
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
                      alt={val.title}
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
              </div>
            );
          })}
      </Grid>
    </div>
  );
};
