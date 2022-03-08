import React from 'react';
import { BrowserRouter} from 'react-router-dom';
import {
  ChakraProvider, CSSReset, Box, Flex,
} from '@chakra-ui/react';
import './index.css';
import theme from './theme';

import { Form } from './components/Forms/Form';

function App() {
  return (
    <BrowserRouter>
      
      <ChakraProvider theme={theme}>
        <CSSReset />
        <Flex
          minH="100vh"
          m="auto"
          overflow="hidden"
          flexDirection={{ base: 'column', lg: 'row' }}
        >
          
          <Box flex="1" w="100%" position="relative">
          
            
              <Form />
          
            
          </Box>
        </Flex>
      </ChakraProvider>
      
    </BrowserRouter>
  );
}

export default App;
