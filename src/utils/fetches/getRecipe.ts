import supabase from "../backend/setupSupabase"

const getRecipe = async () => {
    const { data, error } = await supabase
    .from('recipes')
    .select();
    console.log(data);
    if(error) console.error(error);
}

export default getRecipe;