import { Box } from '@chakra-ui/react';
import { useUser } from '@contexts/User';
import { me } from '@services/auth';
import { ReactNode, useEffect } from 'react';
import { Header } from './Header';

interface TemplateProps {
  children: ReactNode;
}

export function Template({ children }: TemplateProps) {
  const { user, setProcessedAuth, setUser } = useUser();

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
    <Box
      display="flex"
      flexDir="column"
      w="100vw"
      h="100vh"
      bg="gray.700"
      alignItems="center"
    >
      {user && <Header />}
      <Box display="flex" w="1080px" h="100%" px={4} mt={4}>
        {children};
      </Box>
    </Box>
  );
}
