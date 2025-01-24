import Banner from "../components/Banner";
import PopularRecipes from "../components/PopularRecipes";


const Home = () => {
    return (  
        <main className="min-h-screen">
            <Banner />
            <PopularRecipes />
        </main>
    );
}

export default Home