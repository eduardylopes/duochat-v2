import { Box, Spinner } from '@chakra-ui/react';
import { ReactElement, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useUser } from '../../contexts/User';

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
        return;
      }

      if (!user) {
        navigate(`/auth/login?redirect=${location.pathname}`);
        return;
      }
    };

    execute();
  }, [processedAuth]);

  return (
    <Box w="100%" h="100%">
      {loading ? element : <Spinner size="xl" />}
    </Box>
  );
}
