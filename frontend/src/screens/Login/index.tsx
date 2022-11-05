import { Button, Stack } from 'react-bootstrap';
import { Field, Form as FinalForm } from 'react-final-form';
import * as Yup from 'yup';
import ValidateSchema from '../../helpers/ValidateSchema';
import { Container, Form } from './styles';

const loginSchema = Yup.object({
  username: Yup.string().required('Username is required'),
  password: Yup.string().required('Password is required'),
});

export function Login() {
  const onSubmit = (values: any) => {
    console.log(values);
  };

  return (
    <Container>
      <FinalForm
        validate={ValidateSchema(loginSchema)}
        onSubmit={onSubmit}
        render={({ handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <Field name="username">
              {({ input, meta }) => (
                <Form.Group className="mb-3" controlId="username">
                  <Form.Label className="text">Username</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter username"
                    value={input.value}
                    onChange={input.onChange}
                  />
                  {meta.error && (
                    <Form.Control.Feedback type="invalid">
                      Please insert a username.
                    </Form.Control.Feedback>
                  )}
                </Form.Group>
              )}
            </Field>
            <Field name="password">
              {({ input, meta }) => (
                <Form.Group className="mb-3" controlId="password">
                  <Form.Label className="text">Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter password"
                    value={input.value}
                    onChange={input.onChange}
                  />
                  {meta.error && (
                    <Form.Control.Feedback type="invalid">
                      Please insert a password.
                    </Form.Control.Feedback>
                  )}
                </Form.Group>
              )}
            </Field>

            <Stack>
              <Button variant="primary" type="submit">
                Login
              </Button>
            </Stack>
          </Form>
        )}
      />
    </Container>
  );
}
