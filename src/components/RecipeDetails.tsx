import { JoinedRecipe } from "../utils/backend/joinedRecipeTypes";

interface IRecipeDetailsProps {
    recipeById: JoinedRecipe| null,
}

const RecipeDetails: React.FC<IRecipeDetailsProps> = ({ recipeById }) => {

    return (  
        <div>
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