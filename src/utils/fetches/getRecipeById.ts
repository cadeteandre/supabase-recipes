import supabase from "../backend/setupSupabase"

const getRecipeById = async (recipeId: string) => {
    const { data, error } = await supabase
    .from('recipes')
    .select('*')
    .eq('id', recipeId)
    .single()

    console.log(data);
    if(error) console.error(error);
}

export default getRecipeById;