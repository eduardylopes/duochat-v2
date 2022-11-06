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
import { useUser } from '@contexts/User';
import UseQuery from '@helpers/useQuery';
import { signIn } from '@services/auth';
import { Field, Form, Formik } from 'formik';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

const loginSchema = Yup.object({
  username: Yup.string().required('Username is required'),
  password: Yup.string().required('Password is required'),
});

export function Login() {
  const { user, processedAuth, setUser } = useUser();
  const toast = useToast();
  const { params } = UseQuery();
  const navigate = useNavigate();

  const handleSubmit = async (values: any) => {
    const { username, password } = values;

    try {
      await signIn(username, password);
      toast({
        title: 'User has successfully logged in',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      setUser({ username });

      if (params.redirect) {
        navigate(decodeURIComponent(params.redirect));
        return;
      }

      navigate('/lobby');
    } catch (error) {
      toast({
        title: 'Username or password incorrect',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleNavigate = () => {
    navigate('/auth/register');
  };

  useEffect(() => {
    if (user) navigate(decodeURIComponent(params.redirect));
  }, [processedAuth]);

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
                    <Input {...field} size="lg" placeholder="username" />
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
                    <Input
                      {...field}
                      size="lg"
                      placeholder="password"
                      type="password"
                    />
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
                <Button
                  mt={4}
                  variant="unstyled"
                  type="button"
                  onClick={handleNavigate}
                >
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
