import { Form as FormBootstrap } from 'react-bootstrap';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100vw;
  height: 100vh;
`;

export const Form = styled(FormBootstrap)`
  max-width: 400px;
  padding: 1rem;

  border-radius: 8px;
  background-color: #f6f6f6;
`;
