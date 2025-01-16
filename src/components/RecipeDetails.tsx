import { Recipe } from "../utils/fetches/getPopularRecipes";

interface IRecipeDetailsProps {
    recipeById: Recipe | null
}

const RecipeDetails: React.FC<IRecipeDetailsProps> = ({ recipeById }) => {
    return (  
        <div>
            <h3>Ingredients</h3>
            <h3>Preparation</h3>
            <p>{recipeById?.instructions}</p>
            <h3>Additional information</h3>
        </div>
    );
}

export default RecipeDetails;