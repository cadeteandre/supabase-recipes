import { Link } from "react-router-dom";
import { Recipe } from "../utils/fetches/getPopularRecipes";

interface IRecipeCardProps {
    recipe: Recipe
}

const RecipeCard: React.FC<IRecipeCardProps> = ({ recipe }) => {

    if(!recipe) return <p>Loading...</p>
    return (  
        <div className="bg-base-100 w-72 shadow-xl rounded-lg">
            <Link to={`/detail/${recipe.id}`}>
                <figure className="" >
                    <img
                        src={`${recipe.image_url}`}
                        alt={`${recipe.name} image`}
                        className="w-full rounded-t-lg" />
                </figure>
            </Link>
            <div className="card-body h-60">
                <Link to={`/detail/${recipe.id}`}>
                    <h2 className="card-title text-left">{recipe.name}</h2>
                </Link>
                <p className="text-left text-sm">{recipe.description}</p>
                <div className="card-actions justify-start">
                <button className="btn btn-primary">To the recipe</button>
                </div>
            </div>
        </div>
    );
}

export default RecipeCard;
