import './App.css'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import RootLayout from './rootLayout/RootLayout';
import Home from './pages/Home';
import About from './pages/About';
import Detail from './pages/Detail';
import Recipes from './pages/Recipes';
import SignupPage from './pages/SignupPage';
import ProtectedRoute from './components/ProtectedRoute';
import ProfilePage from './pages/ProfilePage';

function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path='recipes' element={<Recipes />} />
        <Route path='about' element={<About />} />
        <Route path='detail/:recipeId' element={<Detail />} />
        <Route path='signup' element={<SignupPage />} />
        
        {/* Protected Routes */}
        <Route 
          path='profile'
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
      </Route>
    )
  )

  return (
    <>
        <RouterProvider router={router} />
    </>
  )
}

export default App
