import { Box } from '@chakra-ui/react';
import { useUser } from '@contexts/User';
import { ReactNode } from 'react';
import { Header } from './Header';

interface TemplateProps {
  children: ReactNode;
}

export function Template({ children }: TemplateProps) {
  const { user } = useUser();

  return (
    <Box
      display="flex"
      flexDir="column"
      w="100vw"
      h="100vh"
      bg="gray.700"
      alignItems="center"
    >
      <Header />
      <Box display="flex" w="1080px" h="100%" px={4} mt={4}>
        {children};
      </Box>
    </Box>
  );
}
