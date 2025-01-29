import { NavLink } from "react-router-dom";
import { navLinks } from "../constants";

const NavItems = () => {
    return (  
        <>
            {navLinks.map(({ id, name, path }) => (
                <NavLink key={id} to={path}
                    className={({ isActive }) => 
                        `btn text-[#ccccc0] hover:text-neutral ${isActive ? 'text-neutral' : 'bg-neutral'}`
                }>
                    {name}
                </NavLink>
            ))}
        </>
    );
}

export default NavItems;