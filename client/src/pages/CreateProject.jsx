import { useState } from 'react';
import {
  Progress,
  Box,
  ButtonGroup,
  Button,
  Heading,
  Flex,
  FormControl,
  GridItem,
  FormLabel,
  Input,
  Select,
  SimpleGrid,
  InputLeftAddon,
  InputGroup,
  Textarea,
  FormHelperText,
  Checkbox,
  Stack,
  InputRightElement,
} from '@chakra-ui/react';
import { useToast } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const ProjectForm = () => {
  const [newProject, setNewProject] = useState({
    image: '',
    title: '',
    description: '',
    domain: '',
    contactEmail: '',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewProject({
      ...newProject,
    });
  };

  return (
    <>
      <Heading w='100%' textAlign={'center'} fontWeight='normal'>
        Create a Project
      </Heading>
      <FormControl mt='2%'>
        <FormLabel htmlFor='image' fontWeight={'normal'}>
          Image URL
        </FormLabel>
        <Input
          type='file'
          name='image'
          onChange={handleChange}
          accept='image/*'
        />
      </FormControl>

      <FormControl mt='2%'>
        <FormLabel htmlFor='title' fontWeight={'normal'}>
          Title
        </FormLabel>
        <Input
          type='text'
          name='title'
          id='title'
          onChange={handleChange}
          value={newProject.title}
          placeholder='Title'
          required
        />
      </FormControl>

      <FormControl mt='2%'>
        <FormLabel htmlFor='description' fontWeight={'normal'}>
          Description
        </FormLabel>
        <Textarea
          name='description'
          id='description'
          onChange={handleChange}
          value={newProject.description}
          placeholder='Description'
          required
        />
      </FormControl>

      <FormControl mt='2%'>
        <FormLabel htmlFor='domain' fontWeight={'normal'}>
          Domain
        </FormLabel>
        <Input
          type='text'
          name='domain'
          id='domain'
          onChange={handleChange}
          value={newProject.domain}
          placeholder='Domain'
          required
        />
      </FormControl>

      <FormControl mt='2%'>
        <FormLabel htmlFor='contactEmail' fontWeight={'normal'}>
          Contact Email
        </FormLabel>
        <Input
          type='email'
          name='contactEmail'
          id='contactEmail'
          onChange={handleChange}
          value={newProject.contactEmail}
          placeholder='Email Address'
          required
        />
      </FormControl>
    </>
  );
};

const ProjectForm2 = () => {
  return (
    <>
      <Heading w='100%' textAlign={'center'} fontWeight='normal' mb='2%'>
        User Details
      </Heading>
      <FormControl as={GridItem} colSpan={[6, 3]}>
        <FormLabel
          htmlFor='country'
          fontSize='sm'
          fontWeight='md'
          color='gray.700'
          _dark={{
            color: 'gray.50',
          }}
        >
          Country / Region
        </FormLabel>
        <Select
          id='country'
          name='country'
          autoComplete='country'
          placeholder='Select option'
          focusBorderColor='brand.400'
          shadow='sm'
          size='sm'
          w='full'
          rounded='md'
        >
          <option>United States</option>
          <option>Canada</option>
          <option>Mexico</option>
        </Select>
      </FormControl>

      <FormControl as={GridItem} colSpan={6}>
        <FormLabel
          htmlFor='street_address'
          fontSize='sm'
          fontWeight='md'
          color='gray.700'
          _dark={{
            color: 'gray.50',
          }}
          mt='2%'
        >
          Street address
        </FormLabel>
        <Input
          type='text'
          name='street_address'
          id='street_address'
          autoComplete='street-address'
          focusBorderColor='brand.400'
          shadow='sm'
          size='sm'
          w='full'
          rounded='md'
        />
      </FormControl>

      <FormControl as={GridItem} colSpan={[6, 6, null, 2]}>
        <FormLabel
          htmlFor='city'
          fontSize='sm'
          fontWeight='md'
          color='gray.700'
          _dark={{
            color: 'gray.50',
          }}
          mt='2%'
        >
          City
        </FormLabel>
        <Input
          type='text'
          name='city'
          id='city'
          autoComplete='city'
          focusBorderColor='brand.400'
          shadow='sm'
          size='sm'
          w='full'
          rounded='md'
        />
      </FormControl>

      <FormControl as={GridItem} colSpan={[6, 3, null, 2]}>
        <FormLabel
          htmlFor='state'
          fontSize='sm'
          fontWeight='md'
          color='gray.700'
          _dark={{
            color: 'gray.50',
          }}
          mt='2%'
        >
          State / Province
        </FormLabel>
        <Input
          type='text'
          name='state'
          id='state'
          autoComplete='state'
          focusBorderColor='brand.400'
          shadow='sm'
          size='sm'
          w='full'
          rounded='md'
        />
      </FormControl>

      <FormControl as={GridItem} colSpan={[6, 3, null, 2]}>
        <FormLabel
          htmlFor='postal_code'
          fontSize='sm'
          fontWeight='md'
          color='gray.700'
          _dark={{
            color: 'gray.50',
          }}
          mt='2%'
        >
          ZIP / Postal
        </FormLabel>
        <Input
          type='text'
          name='postal_code'
          id='postal_code'
          autoComplete='postal-code'
          focusBorderColor='brand.400'
          shadow='sm'
          size='sm'
          w='full'
          rounded='md'
        />
      </FormControl>
    </>
  );
};

const ProjectForm3 = () => {
  return (
    <>
      <Heading w='100%' textAlign={'center'} fontWeight='normal'>
        Social Handles
      </Heading>
      <SimpleGrid columns={1} spacing={6}>
        <FormControl as={GridItem} colSpan={[3, 2]}>
          <FormLabel
            fontSize='sm'
            fontWeight='md'
            color='gray.700'
            _dark={{
              color: 'gray.50',
            }}
          >
            Website
          </FormLabel>
          <InputGroup size='sm'>
            <InputLeftAddon
              bg='gray.50'
              _dark={{
                bg: 'gray.800',
              }}
              color='gray.500'
              rounded='md'
            >
              http://
            </InputLeftAddon>
            <Input
              type='tel'
              placeholder='www.example.com'
              focusBorderColor='brand.400'
              rounded='md'
            />
          </InputGroup>
        </FormControl>

        <FormControl id='email' mt={1}>
          <FormLabel
            fontSize='sm'
            fontWeight='md'
            color='gray.700'
            _dark={{
              color: 'gray.50',
            }}
          >
            About
          </FormLabel>
          <Textarea
            placeholder='you@example.com'
            rows={3}
            shadow='sm'
            focusBorderColor='brand.400'
            fontSize={{
              sm: 'sm',
            }}
          />
          <FormHelperText>
            Brief description of project lead contact.
          </FormHelperText>
          <Stack
            direction={{ base: 'column', sm: 'row' }}
            align={'start'}
            justify={'space-between'}
          >
            <Checkbox>
              <FormHelperText>
                {' '}
                I give consent to share my contact information with interested
                users.
              </FormHelperText>
            </Checkbox>
          </Stack>
        </FormControl>
      </SimpleGrid>
    </>
  );
};

export const CreateProject = () => {
  const toast = useToast();
  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(33.33);

  return (
    <div style={{ backgroundColor: '#000657', minHeight: '100vh' }}>
      <>
        <Box
          bg='white'
          borderWidth='1px'
          rounded='lg'
          shadow='1px 1px 3px rgba(0,0,0,0.3)'
          maxWidth={800}
          p={6}
          m='10px auto'
          as='form'
        >
          <Progress
            hasStripe
            value={progress}
            mb='5%'
            mx='5%'
            isAnimated
          ></Progress>
          {step === 1 ? (
            <ProjectForm />
          ) : step === 2 ? (
            <ProjectForm2 />
          ) : (
            <ProjectForm3 />
          )}
          <ButtonGroup mt='5%' w='100%'>
            <Flex w='100%' justifyContent='space-between'>
              <Flex>
                <Button
                  onClick={() => {
                    setStep(step - 1);
                    setProgress(progress - 33.33);
                  }}
                  isDisabled={step === 1}
                  colorScheme='blue'
                  variant='solid'
                  w='7rem'
                  mr='5%'
                >
                  Back
                </Button>
                <Button
                  w='7rem'
                  isDisabled={step === 3}
                  onClick={() => {
                    setStep(step + 1);
                    if (step === 3) {
                      setProgress(100);
                    } else {
                      setProgress(progress + 33.33);
                    }
                  }}
                  colorScheme='blue'
                  variant='outline'
                >
                  Next
                </Button>
              </Flex>
              {step === 3 ? (
                <Link to={'/search'}>
                  <Button
                    w='7rem'
                    colorScheme='red'
                    variant='solid'
                    onClick={() => {
                      toast({
                        title: 'Project created.',
                        description:
                          "We've created successfully created the project listing!",
                        status: 'success',
                        duration: 3000,
                        isClosable: true,
                      });
                    }}
                  >
                    Submit
                  </Button>
                </Link>
              ) : null}
            </Flex>
          </ButtonGroup>
        </Box>
      </>
    </div>
  );
};
