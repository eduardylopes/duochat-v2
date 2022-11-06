import { Box, Spinner } from '@chakra-ui/react';
import { useUser } from '@contexts/User';
import { ReactElement, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

type GuardProps = {
  element: ReactElement;
};

export function Guard({ element }: GuardProps) {
  const [loading, setLoading] = useState(false);
  const { user, processedAuth } = useUser();

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const execute = async () => {
      if (!processedAuth || loading) {
        setLoading(false);
      } else {
        setLoading(true);
      }

      if (!user) {
        navigate(`/auth/login?redirect=${location.pathname}`);
        return;
      }
    };

    execute();
  }, [processedAuth]);

  return (
    <Box
      display="flex"
      w="100%"
      h="100%"
      alignItems="center"
      justifyContent="center"
    >
      {loading ? <Spinner size="xl" /> : element}
    </Box>
  );
}
