import { Navigate, Route, Routes } from 'react-router-dom';
import { Login } from './Login';

export function Screens() {
  return (
    <Routes>
      <Route path="/auth/login" element={<Login />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
