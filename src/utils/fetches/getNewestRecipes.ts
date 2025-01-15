import supabase from "../backend/setupSupabase";
import { Recipe } from "./getPopularRecipes";

const getNewestRecipes = async (setNewestRecipes: React.Dispatch<React.SetStateAction<Recipe[] | null>>) => {
    const { data, error } = await supabase
    .from('recipes')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(3)

    if(error) console.error(error);
    setNewestRecipes(data);
}

export default getNewestRecipes;