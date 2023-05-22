import {
  Landing,
  Error,
  Register,
  SharedLayout,
  ProtectedRoute,
} from './pages';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Will be a protected route soon*/}
        <Route
          path='/'
          element={
            <ProtectedRoute>
              <SharedLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Landing />} />
          <Route path='all-jobs' element={<Landing />}></Route>
          <Route path='add-job' element={<Landing />}></Route>
          <Route path='profile' element={<Landing />}></Route>
        </Route>
        <Route path='/landing' element={<Landing />} />
        <Route path='/register' element={<Register />} />
        <Route path='*' element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
