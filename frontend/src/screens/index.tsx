import { Outlet, Route, Routes } from 'react-router-dom';
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
        <Route path="/lobby" element={<Lobby />} />
      </Route>
    </Routes>
  );
}
