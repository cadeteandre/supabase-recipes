import { useParams } from "react-router-dom";
import DetailBanner from "../components/DetailBanner";
import RecipeDetails from "../components/RecipeDetails";
import { useEffect, useState } from "react";
import getRecipeById from "../utils/fetches/getRecipeById";
import { JoinedRecipe } from "../utils/backend/joinedRecipeTypes";

const Detail = () => {

    const { recipeId } = useParams()

    const [recipeById, setRecipeById] = useState<JoinedRecipe | null>(null);

    useEffect(() => {
        const recipeIdString: string = recipeId ? recipeId?.toString() : '';
        getRecipeById(recipeIdString, setRecipeById);
    }, [recipeId])

    return (  
        <main>
            <DetailBanner recipeById={recipeById} />
            <RecipeDetails recipeById={recipeById} />
        </main>
    );
}

export default Detail;