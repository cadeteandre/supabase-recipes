import Banner from "../components/Banner";
import PopularRecipes from "../components/PopularRecipes";


const Home = () => {
    return (  
        <main className="pt-8 pb-6 flex flex-col gap-20">
            <Banner />
            <PopularRecipes />
        </main>
    );
}

export default Home