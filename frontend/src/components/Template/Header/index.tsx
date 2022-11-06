import { ChevronDownIcon, SearchIcon } from '@chakra-ui/icons';
import {
  Avatar,
  Box,
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
} from '@chakra-ui/react';
import { useUser } from '../../../contexts/User';

export function Header() {
  const { user } = useUser();

  return (
    <Stack
      direction="row"
      pos="absolute"
      top={0}
      position="fixed"
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
              <MenuItem>Sign Out</MenuItem>
            </MenuList>
          </Menu>
        </Box>
      </Box>
    </Stack>
  );
}
