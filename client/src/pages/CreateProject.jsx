import React, { useState } from 'react';
import {
  Input,
  Stack,
  Heading,
  Button,
  Divider,
  Box,
  FormControl,
  FormLabel,
  Textarea,
  InputGroup,
  InputLeftElement,
  Image,
  ChakraProvider,
  extendTheme,
  Container,
  Center,
} from '@chakra-ui/react';
import data from './projects.json';

const theme = extendTheme({
  styles: {
    global: {
      body: {
        margin: '1rem',
      },
    },
  },
});

export const CreateProject = () => {
  const [newProject, setNewProject] = useState({
    image: '',
    title: '',
    description: '',
    domain: '',
    contactEmail: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProject({ ...newProject, [name]: value });
  };

  const handleCreateProject = () => {
    // Handle the creation of a new project here, e.g., sending data to a server
    console.log(newProject);
  };

  return (
    <ChakraProvider theme={theme}>
      <Container maxW="80%">
        <Center>
          <Box>
            <form>
              <Stack spacing={4}>
                <Heading size="lg" mb="1rem">
                  Create a Project
                </Heading>

                {/* Upload an Image */}
                <FormControl isRequired>
                  <FormLabel>Upload an Image</FormLabel>
                  <InputGroup>
                    <Input
                      type="file"
                      name="image"
                      onChange={handleChange}
                      accept="image/*"
                      required // Add the required attribute here
                    />
                  </InputGroup>
                </FormControl>

                {/* Enter a Text Title */}
                <FormControl isRequired>
                  <FormLabel>Enter a Project Title</FormLabel>
                  <Input
                    type="text"
                    name="title"
                    onChange={handleChange}
                    value={newProject.title}
                    placeholder="Title"
                    required // Add the required attribute here
                  />
                </FormControl>

                {/* Enter a Text Description */}
                <FormControl isRequired>
                  <FormLabel>Enter a Description</FormLabel>
                  <Textarea
                    name="description"
                    onChange={handleChange}
                    value={newProject.description}
                    placeholder="Description"
                    required // Add the required attribute here
                  />
                </FormControl>

                {/* Enter a Text Domain */}
                <FormControl isRequired>
                  <FormLabel>Enter Domains (e.g., domain 1, domain 2)</FormLabel>
                  <Input
                    type="text"
                    name="domain"
                    onChange={handleChange}
                    value={newProject.domain}
                    placeholder="Domain"
                    required // Add the required attribute here
                  />
                </FormControl>

                {/* Enter an Email Address to Contact */}
                <FormControl isRequired>
                  <FormLabel>Contact Email</FormLabel>
                  <Input
                    type="email"
                    name="contactEmail"
                    onChange={handleChange}
                    value={newProject.contactEmail}
                    placeholder="Email Address"
                    required // Add the required attribute here
                  />
                </FormControl>
              </Stack>
            </form>
          </Box>
        </Center>
      </Container>
    </ChakraProvider>
  );
};