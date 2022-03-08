import React from 'react';
import { Box, Flex,Stack, useColorModeValue} from '@chakra-ui/react';


export const Layout = ({ children }) => {
  

  return (
    <Flex
    minH={'100vh'}
    align={'center'}
    justify={'center'}
    bg={useColorModeValue('gray.50', 'gray.800')}>
    <Stack
      spacing={4}
      w={'full'}
      maxW={'md'}
      bg={useColorModeValue('white', 'gray.700')}
      rounded={'xl'}
      boxShadow={'lg'}
      p={6}
      my={12}>
     
     
            {children}
        
      <Flex
        borderColor="gray.200"
        flexDir="column"
        minW="15rem"
        w={{ lg: '30vw' }}
        maxH={{ lg: '100vh' }}
        overflow="auto"
        color="gray.100"
        p={{ base: 4, lg: 8 }}
      >
        
      </Flex>
      </Stack>
    
    </Flex>
  );
};
