import Banner from "../components/Banner";
import NewestRecipes from "../components/NewestRecipes";
import PopularRecipes from "../components/PopularRecipes";

const Recipes = () => {
    return (  
        <main className="min-h-screen">
            <Banner />
            <PopularRecipes />
            <NewestRecipes />
        </main>
    );
}

export default Recipes;