import React, { useState } from 'react';
import { useQuery } from 'react-query';

import {
  Input,
  Stack,
  InputGroup,
  InputLeftElement,
  Center,
  Box,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { get_projects } from '../api';
import ProjectCard from '../components/ProjectCard';
import { SAMPLE_USER_ID } from '../constants';
import ProjectContainer from '../components/ProjectContainer';

export const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const { isLoading, data } = useQuery(['get_projects', searchTerm], () =>
    get_projects(searchTerm, SAMPLE_USER_ID)
  );

  if (isLoading) return 'Loading...';

  return (
    <div>
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
        <ProjectContainer>
          {data.map((val) => {
            return (
              <div className='template' key={val.project_id}>
                <Box maxW='sm' height='100%' overflow='hidden'>
                  <ProjectCard project={val} />
                </Box>
              </div>
            );
          })}
        </ProjectContainer>
      </Center>
    </div>
  );
};
