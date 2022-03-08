import React from 'react';
import { Box, useToast } from '@chakra-ui/react';

export const ToastValues = () => {
  const toast = useToast();
  
  return (values) => {
    console.log("values",values);
    toast({
        containerStyle: {
          backgroundColor: '#644af3',
          //borderRadious:'6px'
        },
        render: () => (
          <Box m={3} color="white" p={3} bg="brand.500" borderRadius="md">
            {JSON.stringify(values)}
          </Box>),
      title: 'Your registration was successful',
      desription: values,
      status: 'success',
      duration: 3000,
      isClosable: true,
      position: 'top',
    } as any);
  };

  
};
