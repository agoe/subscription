import React, { useEffect, useState } from 'react';
import {
  Input,
  InputGroup,
  InputRightElement,
  Spinner,
  useColorModeValue,
} from '@chakra-ui/react';
import { useField } from '@formiz/core';
import { FormGroup } from '../FormGroup';
import { WarningIcon, CheckCircleIcon } from '@chakra-ui/icons';

export const FormField = (props) => {
  const {
    errorMessage,
    id,
    isValid,
    isSubmitted,
    isValidating,
    resetKey,
    setValue,
    value,
    otherProps,
  } = useField(props);
  const { required, name } = props;
  const {
    children, label, type, placeholder, helper, ...rest
  } = otherProps;
  const [isTouched, setIsTouched] = useState(false);
  const showError = !isValid && (isTouched || isSubmitted);

  const invalidColor = useColorModeValue('red.500', 'red.300');
  const validColor = useColorModeValue('green.500', 'green.300');

  useEffect(() => {
    setIsTouched(false);
  }, [resetKey]);

  const formGroupProps = {
    errorMessage,
    helper,
    id,
    isRequired: !!required,
    label,
    showError,
    name,
    ...rest,
  };
  const iconColor = !isValid ? invalidColor : validColor;
  return (
    <FormGroup {...formGroupProps}>
      <InputGroup>
        <Input
          type={type || 'text'}
          id={id}
          value={value ?? ''}
          onChange={(e) => setValue(e.target.value)}
          onBlur={() => setIsTouched(true)}
          aria-invalid={showError}
          aria-describedby={!isValid ? `${id}-error` : undefined}
          placeholder={placeholder}
        />
        {(isTouched || isSubmitted) && isValidating && (
          <InputRightElement>
            <Spinner size="sm" flex="none" />
          </InputRightElement>
        )}
        {isTouched  && (
              <InputRightElement>
                {!isValid ? (
                  <WarningIcon color={iconColor} w="20px" h="20px" />
                ) : (
                  <CheckCircleIcon color={iconColor} w="20px" h="20px" />
                )}
              </InputRightElement>
            )}
      </InputGroup>
      {children}
    </FormGroup>
  );
};
