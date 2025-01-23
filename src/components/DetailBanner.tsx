import { Recipe } from "../utils/fetches/getPopularRecipes";

interface IDetailsBannerProps {
    recipeById: Recipe | null
}

const DetailBanner: React.FC<IDetailsBannerProps> = ({ recipeById }) => {
    return (  
        <section>
            {recipeById ? (
                <>
                    <div
                        className="hero min-h-80"
                        style={{
                            backgroundImage: `url(${recipeById.image_url})`,
                        }}>
                        <div className="hero-overlay bg-opacity-60"></div>
                        <div className="hero-content text-neutral-content text-center">
                            <div className="max-w-md">
                                <h1 className="mb-5 text-5xl font-bold">{recipeById.name}</h1>
                            </div>
                        </div>
                    </div>
                </>
            ) : <p>Loading...</p> }
        </section>
    );
}

export default DetailBanner;