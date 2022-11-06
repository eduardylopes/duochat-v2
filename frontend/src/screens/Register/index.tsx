import { ArrowBackIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  IconButton,
  Input,
  Stack,
  Tooltip,
  useToast,
} from '@chakra-ui/react';
import { useUser } from '@contexts/User';
import UseQuery from '@helpers/useQuery';
import { signUp } from '@services/auth';
import { Field, Form, Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

const loginSchema = Yup.object({
  username: Yup.string().required('Username is required'),
  password: Yup.string().required('Password is required'),
  passwordConfirmation: Yup.string().oneOf(
    [Yup.ref('password'), null],
    'Passwords must match'
  ),
});

export function Register() {
  const { setUser } = useUser();
  const toast = useToast();
  const { params } = UseQuery();
  const navigate = useNavigate();

  const handleSubmit = async (values: any) => {
    const { username, password } = values;

    try {
      await signUp({ username, password });
      toast({
        title: 'User has successfully registered',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      navigate('/auth/login');
    } catch (error: any) {
      if (error.response.status === 400) {
        toast({
          title: 'User already exists',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      } else {
        toast({
          title: 'Unknown error',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    }
  };

  const handleNavigate = () => {
    navigate('/auth/login');
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      w="100%"
      h="100%"
    >
      <Box bg="gray.100" p={4} borderRadius={8} pos="relative">
        <Tooltip label="Back" fontSize="md" placement="left">
          <IconButton
            onClick={handleNavigate}
            aria-label="Voltar"
            icon={<ArrowBackIcon />}
            pos="absolute"
            top={0}
            right={0}
            display="flex"
          />
        </Tooltip>
        <Formik
          initialValues={{
            username: '',
            password: '',
            passwordConfirmation: '',
          }}
          onSubmit={handleSubmit}
          validationSchema={loginSchema}
          style={{ position: 'relative' }}
        >
          {(props) => (
            <Form>
              <Field name="username">
                {({ field, form }: any) => (
                  <FormControl
                    my={2}
                    isInvalid={form.errors.username && form.touched.username}
                  >
                    <FormLabel>Username</FormLabel>
                    <Input {...field} placeholder="username" />
                    <FormErrorMessage>{form.errors.username}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="password">
                {({ field, form }: any) => (
                  <FormControl
                    mb={2}
                    isInvalid={form.errors.password && form.touched.password}
                  >
                    <FormLabel>Password</FormLabel>
                    <Input {...field} placeholder="password" type="password" />
                    <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="passwordConfirmation">
                {({ field, form }: any) => (
                  <FormControl
                    isInvalid={
                      form.errors.passwordConfirmation &&
                      form.touched.passwordConfirmation
                    }
                  >
                    <FormLabel>Password confirmation</FormLabel>
                    <Input {...field} placeholder="password" type="password" />
                    <FormErrorMessage>
                      {form.errors.passwordConfirmation}
                    </FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Stack>
                <Button
                  mt={4}
                  colorScheme="telegram"
                  isLoading={props.isSubmitting}
                  type="submit"
                >
                  Register
                </Button>
              </Stack>
            </Form>
          )}
        </Formik>
      </Box>
    </Box>
  );
}
