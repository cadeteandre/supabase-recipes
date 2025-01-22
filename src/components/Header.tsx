import { NavLink } from "react-router-dom";

const Header = () => {
    return (  
        <header className="flex justify-between items-center">
            <h1>Logo</h1>
            <nav className="flex gap-4 items-center">
                <NavLink to={'/recipes'}>Recipes</NavLink>
                <NavLink to={'/profile'}>Profile</NavLink>
                <NavLink to={'/signup'}>Signup</NavLink>
            </nav>
        </header>
    );
}

export default Header;