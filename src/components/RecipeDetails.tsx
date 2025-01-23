import { useEffect, useState } from "react";
import { JoinedRecipe } from "../utils/backend/joinedRecipeTypes";
import supabase from "../utils/backend/setupSupabase";

interface IRecipeDetailsProps {
    recipeById: JoinedRecipe| null,
}

const RecipeDetails: React.FC<IRecipeDetailsProps> = ({ recipeById }) => {

    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        const checkFavorite = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            const { data } = await supabase
                .from('recipe_favorites')
                .select('*')
                .eq('user_id', user?.id)
                .eq('recipe_id', recipeById?.id);
            if (data && data.length > 0) {
                setIsFavorite(true);
            }
        };
        checkFavorite();
    }, [recipeById?.id]);

    const toggleFavorite = async () => {
        const { data: { user } } = await supabase.auth.getUser();
        if (isFavorite) {
            await supabase
                .from('recipe_favorites')
                .delete()
                .eq('user_id', user?.id)
                .eq('recipe_id', recipeById?.id);
            setIsFavorite(false);
        } else {
            await supabase
                .from('recipe_favorites')
                .insert({ user_id: user?.id, recipe_id: recipeById?.id });
            setIsFavorite(true);
        }
    };
    return (  
        <div className="flex flex-col gap-4">
            <button onClick={toggleFavorite}>
                {isFavorite ? '★' : '☆'}
            </button>
            <h3 className="font-bold">Ingredients</h3>
            {
                recipeById && recipeById.ingredients_recipes.map((ingredient) => (
                    <p key={ingredient.ingredients.name}>
                        {`
                            ${ingredient.quantity !== 0 ? ingredient.quantity : ''} 
                            ${ingredient.ingredients.unit !== null ? ingredient.ingredients.unit : ''} 
                            ${ingredient.ingredients.name}
                        `}
                    </p>
                ))
            }
            <h3 className="font-bold">Preparation</h3>
            {recipeById?.instructions.split(';').map((instruction, index) => (
                <p key={index}>{instruction}</p>
            ))}
            <h3 className="font-bold">Additional information</h3>
            {
                recipeById && recipeById.ingredients_recipes.map((ingredient) => (
                    ingredient.ingredients.additional_info && (
                        <p key={ingredient.ingredients.name}>{ingredient.ingredients.additional_info}</p>
                    )
                ))
            }
        </div>
    );
}
export default RecipeDetails;