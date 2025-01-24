import { useEffect, useState } from "react";
import RecipeCard from "./RecipeCard";
import getNewestRecipes from "../utils/fetches/getNewestRecipes";
import { Recipe } from "../utils/fetches/getPopularRecipes";

const NewestRecipes = () => {
    const [newestRecipes, setNewestRecipes] = useState<Recipe[] | null>([])
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        getNewestRecipes(setNewestRecipes);
        setIsLoading(false);
    }, [])

    return ( 
        <section className="mt-10">
            <h2 className="font-bold mb-10 text-3xl text-neutral">The latest recipes</h2>
            {isLoading ? (
                <p>Loading...</p>
            ) : newestRecipes && newestRecipes.length ? (
                <div className="flex flex-wrap gap-8 w-full items-center justify-center">
                    {newestRecipes.map((recipe) => (
                        <RecipeCard key={recipe.id} recipe={recipe} />
                    ))}
                </div>
            ) : (
                <p>No recipes found.</p>
            )}
        </section>
    );
}

export default NewestRecipes;