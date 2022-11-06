import { Box } from '@chakra-ui/react';
import { ReactNode, useEffect } from 'react';
import { useUser } from '../../contexts/User';
import { me } from '../../services/auth';
import { Header } from './Header';

interface TemplateProps {
  children: ReactNode;
}

export function Template({ children }: TemplateProps) {
  const { user, setUser, setProcessedAuth } = useUser();

  useEffect(() => {
    async function verifyUser() {
      if (!user) {
        try {
          const { data } = await me();
          setUser(data);
        } catch (error: any) {
          // eslint-disable-next-line no-console
          console.error(error);
        } finally {
          setProcessedAuth(true);
        }
      }
    }

    verifyUser();
  }, []);

  return (
    <Box display="flex" w="100vw" h="100vh" bg="gray.700" pos="relative">
      <Header />
      {children};
    </Box>
  );
}
