import { Recipe } from "../utils/fetches/getPopularRecipes";

interface IDetailsBannerProps {
    recipeById: Recipe | null
}

const DetailBanner: React.FC<IDetailsBannerProps> = ({ recipeById }) => {
    return (  
        <section>
            {recipeById ? (
                <>
                    <img className="w-96 rounded-lg" src={`${recipeById.image_url}`} alt={`${recipeById.name}`} />
                    <h1 className="font-bold">{recipeById.name}</h1>
                </>
            ) : <p>Loading...</p> }
        </section>
    );
}

export default DetailBanner;