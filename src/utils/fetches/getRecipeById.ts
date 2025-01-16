import { JoinedRecipe } from "../backend/joinedRecipeTypes";
import supabase from "../backend/setupSupabase"

const getRecipeById = async (recipeId: string, setRecipeById: React.Dispatch<React.SetStateAction<JoinedRecipe | null>>) => {
    const { data, error } = await supabase
    .from("recipes")
    .select(
        `*,
        categories(name),
        ingredients_recipes(
            quantity,
            ingredients(name, unit, additional_info)
        )`
    )
    .eq("id", recipeId)
    .single();

    if(error) console.error(error);

    setRecipeById(data);
}

export default getRecipeById;