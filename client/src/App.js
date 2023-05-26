import { Landing, Error, Register, ProtectedRoute } from './pages';
import {
  Dashboard,
  Profile,
  SharedLayout,
  Classes,
  Class,
} from './pages/dashboard/';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/'
          element={
            <ProtectedRoute>
              <SharedLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path='classes' element={<Classes />}></Route>
          <Route path='class/:id' element={<Class />}></Route>
          <Route path='profile' element={<Profile />}></Route>
        </Route>
        <Route path='/landing' element={<Landing />} />
        <Route path='/register' element={<Register />} />
        <Route path='*' element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
