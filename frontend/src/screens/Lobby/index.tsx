import { PlusSquareIcon } from '@chakra-ui/icons';
import { Box, Button, useDisclosure } from '@chakra-ui/react';
import { CreateRoomModal } from './CreateRoomModal';

export function Lobby() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box w="100%" h="100%">
      <Button
        colorScheme="green"
        leftIcon={<PlusSquareIcon />}
        onClick={onOpen}
      >
        Create Room
      </Button>
      <CreateRoomModal isOpen={isOpen} onClose={onClose} />
    </Box>
  );
}
