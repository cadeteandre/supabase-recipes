import Banner from "../components/Banner";
import NewestRecipes from "../components/NewestRecipes";
import PopularRecipes from "../components/PopularRecipes";

const Recipes = () => {
    return (  
        <main className="pt-8 pb-6 flex flex-col gap-20">
            <Banner />
            <PopularRecipes />
            <NewestRecipes />
        </main>
    );
}

export default Recipes;