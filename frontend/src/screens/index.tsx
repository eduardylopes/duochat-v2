import { Guard } from '@components/Guard';
import { Template } from '@components/Template';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { Lobby } from './Lobby';
import { Login } from './Login';
import { Register } from './Register';

export function Screens() {
  return (
    <Routes>
      <Route
        element={
          <Template>
            <Outlet />
          </Template>
        }
      >
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />
        <Route path="/lobby" element={<Guard element={<Lobby />} />} />
        <Route path="*" element={<Navigate to="/auth/login" replace />} />
      </Route>
    </Routes>
  );
}
