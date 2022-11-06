import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Stack,
} from '@chakra-ui/react';
import { Field, Form, Formik } from 'formik';
import { MutableRefObject } from 'react';
import * as Yup from 'yup';

const roomSchema = Yup.object({
  roomName: Yup.string().required('Room name is required'),
  isPrivate: Yup.boolean(),
  password: Yup.string().when('isPrivate', {
    is: true,
    then: Yup.string()
      .required('Password is required')
      .min(4, 'Password must be at least 4 characters'),
  }),
  maxUsers: Yup.number()
    .required('Max users is required')
    .min(2, "You cant't create a room with less than 2 users"),
});

interface CreateRoomModalProps {
  onClose: () => void;
  isOpen: boolean;
  initialFocusRef: MutableRefObject<null>;
}

export function CreateRoomModal({
  onClose,
  initialFocusRef,
  ...props
}: CreateRoomModalProps) {
  const handleSubmit = (values: any) => {
    console.log(values);
    onClose();
  };

  console.count();

  return (
    <Modal {...props} onClose={onClose} initialFocusRef={initialFocusRef}>
      <ModalOverlay />
      <ModalContent bg="gray.800" color="whiteAlpha.900">
        <ModalHeader>Create your room</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <Formik
            initialValues={{
              roomName: '',
              password: '',
              isPrivate: false,
              maxUsers: 1,
            }}
            onSubmit={handleSubmit}
            validationSchema={roomSchema}
          >
            {(props) => (
              <Form>
                <Field name="roomName">
                  {({ field, form }: any) => (
                    <FormControl
                      mb={4}
                      isInvalid={form.errors.roomName && form.touched.roomName}
                    >
                      <FormLabel>Room name</FormLabel>
                      <Input
                        {...field}
                        placeholder="room name"
                        ref={initialFocusRef}
                      />
                      <FormErrorMessage>
                        {form.errors.roomName}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>

                <Field name="isPrivate">
                  {({ field, form }: any) => (
                    <FormControl mb={2}>
                      <FormLabel>Make room private?</FormLabel>
                      <Checkbox {...field}>Yes</Checkbox>
                    </FormControl>
                  )}
                </Field>

                {props.values.isPrivate && (
                  <Field name="password">
                    {({ field, form }: any) => (
                      <FormControl
                        mb={4}
                        isInvalid={
                          form.errors.password && form.touched.password
                        }
                      >
                        <FormLabel>Password</FormLabel>
                        <Input
                          {...field}
                          placeholder="password"
                          type="password"
                        />
                        <FormErrorMessage>
                          {form.errors.password}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                )}

                <Field name="maxUsers">
                  {({ field, form }: any) => (
                    <FormControl
                      mt={4}
                      isInvalid={form.errors.maxUsers && form.touched.maxUsers}
                    >
                      <FormLabel>Max users: {field.value}</FormLabel>
                      <Slider
                        min={1}
                        max={10}
                        step={1}
                        onChange={(value) =>
                          props.setFieldValue('maxUsers', value)
                        }
                        value={field.value}
                      >
                        <SliderTrack bg="red.100">
                          <Box position="relative" right={10} />
                          <SliderFilledTrack bg="green" />
                        </SliderTrack>
                        <SliderThumb boxSize={6} />
                      </Slider>
                      <FormErrorMessage>
                        {form.errors.maxUsers}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Stack direction="row" justifyContent="flex-end" mt={4}>
                  <Button colorScheme="green" mr={3} type="submit">
                    Create
                  </Button>
                  <Button colorScheme="red" onClick={onClose}>
                    Cancel
                  </Button>
                </Stack>
              </Form>
            )}
          </Formik>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
