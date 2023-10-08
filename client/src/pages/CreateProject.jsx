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
        margin: '2rem',
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
      <Container maxW="sm">
        <Center>
          <Box>
            <form>
              <Stack spacing={4}>
                <Heading size="lg" mb="1rem">
                  Create a Project
                </Heading>

                {/* Upload an Image */}
                <FormControl>
                  <FormLabel>Upload an Image</FormLabel>
                  <InputGroup>
                    <InputLeftElement pointerEvents="none">
                      <Button colorScheme="blue" variant="outline">
                        Upload
                      </Button>
                    </InputLeftElement>
                    <Input
                      type="file"
                      name="image"
                      onChange={handleChange}
                      accept="image/*"
                    />
                  </InputGroup>
                </FormControl>

                {/* Enter a Text Title */}
                <FormControl>
                  <FormLabel>Enter a Text Title</FormLabel>
                  <Input
                    type="text"
                    name="title"
                    onChange={handleChange}
                    value={newProject.title}
                    placeholder="Title"
                  />
                </FormControl>

                {/* Enter a Text Description */}
                <FormControl>
                  <FormLabel>Enter a Text Description</FormLabel>
                  <Textarea
                    name="description"
                    onChange={handleChange}
                    value={newProject.description}
                    placeholder="Description"
                  />
                </FormControl>

                {/* Enter a Text Domain */}
                <FormControl>
                  <FormLabel>Enter a Text Domain</FormLabel>
                  <Input
                    type="text"
                    name="domain"
                    onChange={handleChange}
                    value={newProject.domain}
                    placeholder="Domain"
                  />
                </FormControl>

                {/* Enter an Email Address to Contact */}
                <FormControl>
                  <FormLabel>Enter an Email Address to Contact</FormLabel>
                  <Input
                    type="email"
                    name="contactEmail"
                    onChange={handleChange}
                    value={newProject.contactEmail}
                    placeholder="Email Address"
                  />
                </FormControl>

                <Button
                  onClick={handleCreateProject}
                  colorScheme="teal"
                  size="lg"
                >
                  Create Project
                </Button>
              </Stack>
            </form>
          </Box>
        </Center>
      </Container>
    </ChakraProvider>
  );
};