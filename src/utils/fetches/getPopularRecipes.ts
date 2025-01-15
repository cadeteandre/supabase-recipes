import supabase from "../backend/setupSupabase";
import { Tables } from "../backend/supabase";

export type Recipe = Tables<"recipes">;

const getPopularRecipes = async (setPopRecipes: React.Dispatch<React.SetStateAction<Recipe[] | null>>)  => {
    const { data, error } = await supabase
    .from("recipes")
    .select("*")
    .order("rating", { ascending: false })
    .limit(3);

    if (error) console.error(error);

    setPopRecipes(data);
};

export default getPopularRecipes;