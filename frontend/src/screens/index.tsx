import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { Guard } from '../components/Guard';
import { Template } from '../components/Template';
import { Lobby } from './Lobby';
import { Login } from './Login';

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
        <Route path="/lobby" element={<Guard element={<Lobby />} />} />
        <Route path="*" element={<Navigate to="/auth/login" replace />} />
      </Route>
    </Routes>
  );
}
