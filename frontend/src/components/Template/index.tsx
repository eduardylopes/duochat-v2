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
    <Box display="flex" w="100vw" h="100vh" bg="gray.700" pos="relative">
      {user && <Header />}
      {children};
    </Box>
  );
}
