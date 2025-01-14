import supabase from "../backend/setupSupabase";

const getNewestRecipes = async () => {
    const { data, error } = await supabase
    .from('recipes')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(3)

    console.log(data);
    if(error) console.error(error);
}

export default getNewestRecipes;