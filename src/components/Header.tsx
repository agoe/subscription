import React from 'react';
import {
  Heading, Box,
} from '@chakra-ui/react';

import { useForm } from '@formiz/core';

export const Header = ({ children}) => {
  const form = useForm({ subscribe: false });

  return (
    <Box mb="6" data-test="header">
      <Heading d="flex" alignItems="center">
        {children}
       
      </Heading>
      
    </Box>
  );
};
