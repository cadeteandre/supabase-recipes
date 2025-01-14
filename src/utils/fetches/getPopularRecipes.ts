import supabase from "../backend/setupSupabase"

const getPopularRecipes = async () => {
    const { data, error} = await supabase
    .from('recipes')
    .select('*')
    .order('rating', {ascending: false})
    .limit(3)

    console.log(data);
    if(error) console.error(error);
}

export default getPopularRecipes;