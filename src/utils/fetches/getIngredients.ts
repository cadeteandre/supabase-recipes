import supabase from "../backend/setupSupabase"
import { Tables } from "../backend/types";

export type Ingredients = Tables<"ingredients">;

const getIngredients = async (recipeId: string, setIngredients: React.Dispatch<React.SetStateAction<Ingredients[] | null>>) => {
    const { data, error } = await supabase
    .from('ingredients')
    .select('*')
    .eq('recipe_id', recipeId);

    if(error) console.error(error);

    setIngredients(data);
}

export default getIngredients;