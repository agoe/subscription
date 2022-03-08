import React from 'react';
import { Box, useToast } from '@chakra-ui/react';

export const ToastValueFail = () => {
  const toast = useToast();

  return (values) => {
    
    toast({
      title: 'Your registration was not successful,the email entered have been chosen by another user',
      status: 'error',
      duration: null,
      isClosable: true,
      position: 'top',
    } as any);
  };

  
};
