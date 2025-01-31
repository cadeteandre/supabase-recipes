import { NavLink } from "react-router-dom";
import { navLinks } from "../constants/navbarData";

const NavItems = () => {
    return (  
        <>
            {navLinks.map(({ id, name, path }) => (
                <NavLink key={id} to={path}
                    className={({ isActive }) => 
                        `btn text-[#ccccc0] border hover:text-neutral ${isActive ? 'text-neutral border-neutral' : 'bg-neutral sm:p-2'}`
                }>
                    {name}
                </NavLink>
            ))}
        </>
    );
}

export default NavItems;