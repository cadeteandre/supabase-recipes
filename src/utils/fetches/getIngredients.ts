import supabase from "../backend/setupSupabase"

const getIngredients = async () => {
    const { data, error } = await supabase
    .from('ingredients')
    .select('*')
    .eq('recipe_id', '59050822-c13e-40f0-8b58-09dd5c5e4208');
    console.log(data);
    if(error) console.error(error);
}

export default getIngredients;