import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
} from '@chakra-ui/react';
import { useRef, useState } from 'react';

interface CreateRoomModalProps {
  onClose: () => void;
  isOpen: boolean;
}

export function CreateRoomModal(props: CreateRoomModalProps) {
  const [roomName, setRoomName] = useState('');
  const [password, setPassword] = useState('');
  const [maxUsers, setMaxUsers] = useState(5);
  const [isPrivate, setIsPrivate] = useState(false);
  const initialRef = useRef(null);

  console.count();
  return (
    <Modal {...props}>
      <ModalOverlay />
      <ModalContent bg="gray.800" color="whiteAlpha.900">
        <ModalHeader>Create your room</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl>
            <FormLabel>Room name</FormLabel>
            <Input
              ref={initialRef}
              placeholder="room name"
              onChange={(e) => setRoomName(e.target.value)}
              value={roomName}
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Make this room private?</FormLabel>
            <Checkbox
              defaultChecked
              onChange={() => setIsPrivate(!isPrivate)}
              isChecked={isPrivate}
            >
              Yes
            </Checkbox>
          </FormControl>

          {isPrivate && (
            <FormControl mt={4}>
              <FormLabel>Password</FormLabel>
              <Input
                placeholder="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </FormControl>
          )}

          <FormControl mt={4}>
            <FormLabel>Max users: {maxUsers}</FormLabel>
            <Slider
              defaultValue={1}
              min={1}
              max={10}
              step={1}
              onChange={(v) => setMaxUsers(v)}
              value={maxUsers}
            >
              <SliderTrack bg="red.100">
                <Box position="relative" right={10} />
                <SliderFilledTrack bg="tomato" />
              </SliderTrack>
              <SliderThumb boxSize={6} />
            </Slider>
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="green" mr={3}>
            Create
          </Button>
          <Button colorScheme="red" onClick={props.onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
