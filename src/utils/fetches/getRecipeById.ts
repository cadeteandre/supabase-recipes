import supabase from "../backend/setupSupabase"
import { Recipe } from "./getPopularRecipes";

const getRecipeById = async (recipeId: string, setRecipeById: React.Dispatch<React.SetStateAction<Recipe | null>>) => {
    const { data, error } = await supabase
    .from('recipes')
    .select('*')
    .eq('id', recipeId)
    .single()

    console.log(data);
    if(error) console.error(error);

    setRecipeById(data);
}

export default getRecipeById;