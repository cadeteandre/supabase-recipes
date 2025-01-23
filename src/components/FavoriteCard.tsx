import { JoinedRecipe } from "../utils/backend/joinedRecipeTypes";

interface IFavoriteCardProps {
    recipe: JoinedRecipe;
}

const FavoriteCard: React.FC<IFavoriteCardProps> = ({ recipe }) => {
    return (  
        <div key={recipe.id} className="card card-side">
            <figure>
            <img
                src={`${recipe.image_url}`}
                alt={`${recipe.name}`} />
            </figure>
            <div className="card-body w-full">
            <h2 className="card-title">{recipe.name}</h2>
            <p>{recipe.description}</p>
            {/* <div className="card-actions justify-end">
                <button className="btn btn-primary">Remove from favorites</button>
            </div> */}
            </div>
        </div>
    );
}

export default FavoriteCard;