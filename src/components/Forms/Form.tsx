/* eslint-disable no-nested-ternary */
import React,{useMemo} from 'react';
import { Formiz, useForm, FormizStep } from '@formiz/core';
import { isEmail } from '@formiz/validations';
import {
  Button,
  Box,
  Heading,
  Stack,
  AspectRatio,
  Grid,
} from '@chakra-ui/react';
import { FormField } from './FormField';
import  RadioButtons  from './radioButtons';
import { Header } from '../Header';
import { Layout } from '../Layout';
import {ToastValues } from '../ToastValues';
import {ToastValueFail } from '../ToastValueFail';
import RegisterDataService from '../../services/register.service'
import IRequestData from '../../types/aldRequest.type';
import DatePicker from "./DatePicker";
import { FieldSelect } from "./FieldSelect";
import countryList from "react-select-country-list";
import fontStyles from "../../styles/font.module.css";
import formStyles from "../../styles/form.module.css";

//https://github.com/Solomon198/Lexcare/blob/master/app/src/Forms/familyPlanning.tsx
//https://github.com/Solomon198/Lexcare/tree/master/app/src/components
//https://github.com/BearStudio/start-ui-web/blob/master/src/components/FormGroup/index.tsx
//https://github.com/richardiyama/Signup-Form/blob/master/frontend/two-step-registration/src/components/SignUpForm/FormField.tsx
//https://github.com/richardiyama/Signup-Form
//https://github.com/FabienEssid/formiz-presentation/tree/resolve-07-conditional-fields/src/components
const PreviousButton = (props) => {
  const form = useForm({ subscribe: 'form' });

  if (form.isFirstStep) {
    return <Box />;
  }

  return (
    <Button size="sm" onClick={form.prevStep} variant="ghost" {...props}>
      Previous
    </Button>
  );
};

const NextButton = (props) => {
  const form = useForm({ subscribe: 'form' });
  return (
    <Button
      type="submit"
      size="sm"
      colorScheme="brand"
      isDisabled={
        (form.isLastStep ? !form.isValid : !form.isStepValid)
        && form.isStepSubmitted
      }
      {...props}
    >
      {form.isLastStep ? 'Submit' : 'Next'}
    </Button>
  );
};

const StepperWrapper = ({ title, children, ...rest }) => (
  <Stack {...rest}>
    {title && <Heading fontSize="md">{title}</Heading>}
    <Box bg="gray.50" p="4" borderRadius="md">
      <Grid templateColumns="1fr 2fr 1fr" alignItems="center">
        <Box>
          <PreviousButton />
        </Box>
        {children}
        <Box textAlign="right">
          <NextButton />
        </Box>
      </Grid>
    </Box>
  </Stack>
);



const Steps = (props) => {
  const form = useForm({ subscribe: 'form' });
  const spacing = 2;

  return (
    <Stack
      direction="row"
      display="flex"
      alignItems="center"
      justifyContent="center"
      spacing={spacing}
      {...props}
    >
      {form.steps?.map((step) => {
        const inactiveProps = !step.isVisited
          ? {
            bg: 'gray.100',
            color: 'gray.400',
          }
          : {};

        const visitedProps: any = step.isVisited && !step.isCurrent
          ? {
            bg: 'white',
            color: 'brand.500',
            borderColor: 'currentColor',
            as: 'button',
            type: 'button',
            onClick: () => form.goToStep(step.name),
            _hover: {
              bg: 'brand.500',
              color: 'white',
              borderColor: 'brand.500',
            },
            _focus: {
              boxShadow: 'outline',
            },
          }
          : {};

        const currentProps = step.isCurrent
          ? {
            zIndex: 1,
            bg: 'brand.500',
            color: 'white',
          }
          : {};

        return (
          <AspectRatio key={step.name} w="6" ratio={1}>
            <Box
              zIndex={0}
              borderRadius="full"
              border="2px solid transparent"
              fontWeight={step.isCurrent || step.isVisited ? 'bold' : null}
              outline="none"
              fontSize="xs"
              overflow="visible"
              transition="0.2s"
              _after={
                step.index !== 0
                  ? {
                    content: '""',
                    display: 'block',
                    position: 'absolute',
                    mt: '-1px',
                    mr: '2px',
                    top: '50%',
                    right: '100%',
                    bg:
                        step.isVisited || step.isCurrent
                          ? 'brand.500'
                          : 'gray.100',
                    h: '2px',
                    w: spacing,
                  }
                  : null
              }
              {...inactiveProps}
              {...visitedProps}
              {...currentProps}
            >
              {step.index + 1}
            </Box>
          </AspectRatio>
        );
      })}
    </Stack>
  );
};

export const Form = () => {
  const myForm = useForm();
  const toastValues = ToastValues();
  const toastValueFail = ToastValueFail();
  const options = useMemo(() => countryList().getData(), []);
  const handleSubmit = (values) => {
    
    const data: IRequestData = {
      vorName: myForm.values.vorName,
      nachName: myForm.values.nachName,
      email: myForm.values.email,
      password: myForm.values.password,
      aldKunde : myForm.values.aldKunde
    };

  /*  RegisterDataService.create(data)
  .then((response: any) => {
    toastValues(values);
    console.log(response.data);
  })
  .catch((e: Error) => {
    console.log(e);
    toastValueFail(e)
  })*/
  toastValues(values);

   
    const stepWithError = myForm.getFieldStepName('name');
    if (stepWithError) {
      myForm.goToStep(stepWithError);
    }
  }
  

  return (
    <Formiz connect={myForm} onValidSubmit={handleSubmit}>
      <Layout>
        <form noValidate onSubmit={myForm.submitStep}>
          <Header>Persönliche Angaben</Header>
          <FormizStep name="step1">
          <RadioButtons
            required="Sind sie schon ALD Kunde?"
            name="aldKunde"
            title="Sind Sie bereits Kunde bei ALD?"
            options={["Nein ich bin noch nicht Kunde","Ja, ich bin bereits Kunde"]}
          />
          <h2 className={fontStyles["content-heading"]}>{" "}Wie heißen Sie?{" "}</h2>
          <p className='description'>Bitte alle Vornamen, wie im Ausweis angegeben: </p>
            <FormField name="vorName"  placeholder="Vorname" required="Bitte geben sie Ihren Vornamen an" />
            <FormField name="nachname" placeholder="Nachname" required="Bitte geben sie Ihren Nachnamen an" />
            <h2 className={fontStyles["content-heading"]}>{" "}Wo wohnen Sie?{" "}</h2>
            <div className={formStyles["street-address"]}>
                  <FormField
                    name="street"
                    placeholder="Straße"
                    required="Street is required"
                  />
                  <FormField name="number" placeholder="Nr." />
                </div>

                <FormField
                  name="addresszusatzxxx"
                  placeholder="Addresszusatz(optional)"
                />
                <div className={formStyles["locality"]}>
                  <FormField
                    name="postleitzahl"
                    type="number"
                    placeholder="PLZ"
                    required="PLZ is required"
                  />
                  <FormField
                    name="stadt"
                    placeholder="Stadt"
                    required="Stadt is required"
                  />
                 
                </div>
                <FieldSelect
                  name="country"
                  options={options}
                  required="Country is required"
                  placeholder="Country"
                />
                <h2 className={fontStyles["content-heading"]}>
                  {" "}
                  Ihr Geburtsdatum und -ort{" "}
                </h2>
                <DatePicker name="dob" required="Bitte geben Sie das Geburtsdatum an" />
                <FormField
                  name="birthplace"
                  placeholder="Geburtsort"
                  required="Place of birth is required"
                />
              




            <FormField
              name="email"
              label="Email"
              type="email"
              required="please enter Email"
              validations={[
                {
                  rule: isEmail(),
                  message: 'Not a valid email',
                },
              ]}
            />
          </FormizStep>
          <FormizStep name="step2">
          
            <FormField 
            required="please enter Password"
            name="password" 
            label="Password"
            type="password"
             />
          
      
            <FormField 
            name="passwordConfirm" 
            label="Confirm Password" 
            type="password"
           validations={[
              {
                rule: (value) => myForm.values.password == value,
               deps: [myForm.values.password],
                message: 'Passwords do not match',
              }
            ]}
            />
        
          </FormizStep>
         

          <Stack spacing="6" mt="8">
            
            <StepperWrapper title="Steps">
              <Steps />
            </StepperWrapper>
          </Stack>
        </form>
      </Layout>
    </Formiz>
  );
};
