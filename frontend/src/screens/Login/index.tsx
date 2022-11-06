import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Stack,
  useToast,
} from '@chakra-ui/react';
import { Field, Form, Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { signIn } from '../../services/auth';

const loginSchema = Yup.object({
  username: Yup.string().required('Username is required'),
  password: Yup.string().required('Password is required'),
});

export function Login() {
  const toast = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (values: any) => {
    const { username, password } = values;

    try {
      await signIn(username, password);
      toast({
        title: 'User has successfully logged in',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
      navigate('/lobby');
    } catch (error) {
      toast({
        title: 'Username or password incorrect',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
    }
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      w="100%"
      h="100%"
    >
      <Box bg="gray.100" p={4} borderRadius={8}>
        <Formik
          initialValues={{ username: '', password: '' }}
          onSubmit={handleSubmit}
          validationSchema={loginSchema}
        >
          {(props) => (
            <Form>
              <Field name="username">
                {({ field, form }: any) => (
                  <FormControl
                    mb={2}
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
                    isInvalid={form.errors.password && form.touched.password}
                  >
                    <FormLabel>Password</FormLabel>
                    <Input {...field} placeholder="password" type="password" />
                    <FormErrorMessage>{form.errors.password}</FormErrorMessage>
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
                  Login
                </Button>
                <Button mt={4} variant="unstyled" type="button">
                  Create Account
                </Button>
              </Stack>
            </Form>
          )}
        </Formik>
      </Box>
    </Box>
  );
}
