import { createContext } from "react";
import { Recipe } from "../fetches/getPopularRecipes";

interface IPopRecipesContextProps {
    popRecipes: Recipe[] | null;
    setPopRecipes: React.Dispatch<React.SetStateAction<Recipe[] | null>>;
}

export const PopRecipesContext = createContext<IPopRecipesContextProps>(null!);