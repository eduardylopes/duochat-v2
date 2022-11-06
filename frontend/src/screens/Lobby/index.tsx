import { Box, useToast } from '@chakra-ui/react';
import { listRooms } from '@services/room';
import { RoomDto } from 'dtos/room.dto';
import { useEffect, useState } from 'react';
import { Room } from './Room';

export function Lobby() {
  const [rooms, setRooms] = useState<RoomDto[]>();
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  useEffect(() => {
    const fetchData = async () => {
      const response = await listRooms();
      setRooms(response.data.data);
    };

    try {
      setLoading(true);
      fetchData();
    } catch (error: any) {
      toast({
        title: 'Fail to retrieve rooms',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <Box
      display="flex"
      w="100%"
      h="100%"
      alignItems="center"
      justifyContent="center"
    >
      {rooms?.map((room) => (
        <Room key={room.id} />
      ))}
    </Box>
  );
}
