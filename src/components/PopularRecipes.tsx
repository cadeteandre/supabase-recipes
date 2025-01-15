import { useEffect, useState } from "react";
import RecipeCard from "./RecipeCard";
import getPopularRecipes, { Recipe } from "../utils/fetches/getPopularRecipes";

const PopularRecipes = () => {

    const [popRecipes, setPopRecipes] = useState<Recipe[] | null>([])
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        getPopularRecipes(setPopRecipes);
        setIsLoading(false);
    }, [])

    return ( 
        <section>
            <h2 className="font-bold mb-10">The most popular recipes</h2>
            {isLoading ? (
                <p>Loading...</p>
            ) : popRecipes?.length ? (
                <div className="flex flex-wrap gap-8 w-full items-center justify-center">
                    {popRecipes.map((recipe) => (
                        <RecipeCard key={recipe.id} recipe={recipe} />
                    ))}
                </div>
            ) : (
                <p>No popular recipes found.</p>
            )}
    </section>
    );
}

export default PopularRecipes;