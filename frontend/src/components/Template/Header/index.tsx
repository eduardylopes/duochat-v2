import { ChevronDownIcon, PlusSquareIcon, SearchIcon } from '@chakra-ui/icons';
import {
  Avatar,
  Box,
  Button,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { useUser } from '@contexts/User';
import LocalStorage from '@helpers/LocalStorage';
import SessionStorage from '@helpers/SessionStorage';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreateRoomModal } from './CreateRoomModal';

export function Header() {
  const { user, setUser, setProcessedAuth } = useUser();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    LocalStorage.clear();
    SessionStorage.clear();
    setUser(null);
    navigate('/auth/login');
  };

  return (
    <Stack
      direction="row"
      bg="gray.800"
      w="100%"
      height="72px"
      boxShadow="dark-lg"
      alignItems="center"
    >
      <Box
        display="flex"
        alignItems="center"
        h="100%"
        w="1080px"
        mx="auto"
        px={4}
      >
        <Text color="gray.100" fontSize="2rem">
          duoChat
        </Text>
        <InputGroup flex="1" mx={8}>
          <InputLeftElement
            pointerEvents="none"
            children={<SearchIcon color="gray.400" />}
            h="100%"
          />
          <Input
            type="text"
            size="lg"
            borderWidth={0}
            placeholder="Search for rooms"
            color="gray.400"
            bg="gray.700"
          />
        </InputGroup>
        <Button
          colorScheme="green"
          leftIcon={<PlusSquareIcon />}
          onClick={onOpen}
          mr={6}
        >
          Create Room
        </Button>
        <CreateRoomModal
          isOpen={isOpen}
          onClose={onClose}
          initialFocusRef={initialRef}
        />
        <Box display="flex" ml="auto" alignItems="center" gap={2}>
          <Avatar
            name={user?.username}
            color="gray.100"
            src="https://bit.ly/broken-link"
            size="sm"
            ml="auto"
          />
          <Text color="gray.100">{user?.username}</Text>
          <Menu>
            <MenuButton
              as={IconButton}
              color="gray.100"
              icon={<ChevronDownIcon />}
              variant="none"
            />
            <MenuList>
              <MenuItem onClick={handleLogout}>Sign Out</MenuItem>
            </MenuList>
          </Menu>
        </Box>
      </Box>
    </Stack>
  );
}
