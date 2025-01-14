import { useEffect } from 'react'
import './App.css'
import getRecipe from './utils/fetches/getRecipe'
import getIngredients from './utils/fetches/getIngredients';
import getPopularRecipes from './utils/fetches/getPopularRecipes';
import getNewestRecipes from './utils/fetches/getNewestRecipes';

function App() {

  useEffect(() => {
    getRecipe();
  }, [])

  useEffect(() => {
    getIngredients();
  }, [])

  useEffect(() => {
    getPopularRecipes();
  }, [])

  useEffect(() => {
    getNewestRecipes();
  }, [])

  return (
    <>
      <h1 className='text-3xl font-bold underline'>Recipes App</h1>
    </>
  )
}

export default App
