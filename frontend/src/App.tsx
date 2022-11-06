import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from './contexts/User';
import { Screens } from './screens';

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <ChakraProvider>
          <Screens />
        </ChakraProvider>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
