import Banner from "../components/Banner";

const About = () => {
    return (  
        <main className="min-h-screen">
            <Banner />
            <p className="pt-10 pb-6 text-left">
                Hello, we are Amanda and Pedro and we are happy to present our work on Rezeptwelt. While exploring this amazing website, we discovered a gastronomic universe full of delicious recipes, useful tips and culinary inspiration. Rezeptwelt is a place where experienced chefs and novice cooks can unite in their passion for food.
            </p>
            <p className="pb-6 text-left">
                What particularly impressed us was the variety of recipes. From traditional, homey dishes to more innovative creations, there are options for every taste and occasion. Each recipe is carefully selected and tested to ensure that the results are always tasty and worth sharing.
            </p>
            <p className="pb-6 text-left">
                In addition to recipes, Rezeptwelt also offers useful tips for improving your own cooking skills. From preparation techniques to suggestions for flavor combinations, the website invites you to explore and experiment in the kitchen. It is a welcoming and inclusive environment where everyone is encouraged to immerse themselves in the art of cooking and discover new possibilities.
            </p>
            <p className="pb-6 text-left">
                In short, Recipe World is an inspiring gastronomic space that invites us to discover, create and share our passion for cooking. We hope that our presentation has sparked your interest in joining us on this delicious journey into the world of recipes!
            </p>
        </main>
    );
}

export default About;