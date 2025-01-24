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
import LoginPage from './pages/LoginPage';
import Favorites from './pages/Favorites';
import RecipeCreate from './pages/RecipeCreate';

function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path='recipes' element={<Recipes />} />
        <Route path='about' element={<About />} />
        <Route path='signup' element={<SignupPage />} />
        <Route path='login' element={<LoginPage />} />
        
        {/* Protected Routes */}
        <Route 
          path='profile'
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route 
          path='profile/detail/:recipeId' 
          element={
            <ProtectedRoute>
              <Detail />
            </ProtectedRoute>
          }
        />
        <Route 
          path='profile/favorites' 
          element={
            <ProtectedRoute>
              <Favorites />
            </ProtectedRoute>
          }
        />
        <Route 
          path='profile/recipe-create' 
          element={
            <ProtectedRoute>
              <RecipeCreate />
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
