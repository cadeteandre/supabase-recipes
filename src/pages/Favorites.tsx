import { useEffect, useState } from "react";
import supabase from "../utils/backend/setupSupabase";
import { JoinedRecipe } from "../utils/backend/joinedRecipeTypes";
import FavoriteCard from "../components/FavoriteCard";

const Favorites = () => {

    const [favoriteRecipes, setFavoriteRecipes] = useState<JoinedRecipe[]>([]);

    useEffect(() => {
        const fetchFavorites = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            const { data, error } = await supabase
                .from('recipe_favorites')
                .select('recipe_id')
                .eq('user_id', user?.id);
    
            if (data) {
                const favoriteRecipesIds = data.map((fav) => fav.recipe_id);
                const { data: recipes } = await supabase
                    .from('recipes')
                    .select('*')
                    .in('id', favoriteRecipesIds);
                setFavoriteRecipes(recipes || []);
            }

            if (error) {
                console.error('Error fetching favorites:', error);
            }
        };
        fetchFavorites();
    }, []);

    return (  
        <div className="min-h-screen">
            <h1>My Favorite Recipes</h1>
                {favoriteRecipes.map((recipe) => (
                    <FavoriteCard recipe={recipe} key={recipe.id} />
                ))}
        </div>
    );
}
export default Favorites;