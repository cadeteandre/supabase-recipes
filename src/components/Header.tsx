import { NavLink, Link } from 'react-router-dom';
import LogoHeader from '../../public/svg/LogoHeader';

const Header = () => {
    return (  
        <header className="flex bg-neutral rounded-lg justify-around pt-8 pb-8 mb-10">
            <Link to={'/'}>
                <LogoHeader />
            </Link>
            <nav className="flex gap-4 items-center">
                <NavLink 
                    to={'/'} 
                    className={({ isActive }) => 
                        `btn text-[#ccccc0] hover:text-neutral ${isActive ? 'text-neutral' : 'bg-neutral'}`
                    }
                >
                    Home
                </NavLink>
                <NavLink 
                    to={'/recipes'} 
                    className={({ isActive }) => 
                        `btn text-[#ccccc0] hover:text-neutral ${isActive ? ' text-neutral' : 'bg-neutral'}`
                    }
                >
                    Recipes
                </NavLink>
                <NavLink 
                    to={'/profile'} 
                    className={({ isActive }) => 
                        `btn text-[#ccccc0] hover:text-neutral ${isActive ? ' text-neutral' : 'bg-neutral'}`
                    }
                >
                    Profile
                </NavLink>
                <NavLink 
                    to={'/login'} 
                    className={({ isActive }) => 
                        `btn text-[#ccccc0] hover:text-neutral ${isActive ? ' text-neutral' : 'bg-neutral'}`
                    }
                >
                    Login
                </NavLink>
                <NavLink 
                    to={'/signup'} 
                    className={({ isActive }) => 
                        `btn text-[#ccccc0] hover:text-neutral ${isActive ? ' text-neutral' : 'bg-neutral'}`
                    }
                >
                    Signup
                </NavLink>
            </nav>
        </header>
    );
}

export default Header;