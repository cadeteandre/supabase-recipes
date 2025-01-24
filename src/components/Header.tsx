import { Link, NavLink } from "react-router-dom";
import LogoHeader from '../../public/svg/LogoHeader';

const Header = () => {
    return (  
        <header className="navbar flex justify-around items-center pb-8">
            <Link to={'/'}>
                <LogoHeader />
            </Link>
            <nav className="flex gap-4 items-center">
                <NavLink to={'/'}>Home</NavLink>
                <NavLink to={'/recipes'}>Recipes</NavLink>
                <NavLink to={'/profile'}>Profile</NavLink>
                <NavLink to={'/login'}>Login</NavLink>
                <NavLink to={'/signup'}>Signup</NavLink>
            </nav>
        </header>
    );
}

export default Header;