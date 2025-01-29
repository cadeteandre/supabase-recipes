import { Link } from 'react-router-dom';
import LogoHeader from '../../public/svg/LogoHeader';
import { useState } from 'react';
import NavItems from './NavItems';

const Header = () => {

    const [isOpen, setIsOpen] = useState<boolean>(false);

    const toggleMenu = () => {
        setIsOpen((prevIsOpen) => !prevIsOpen);
    }

    return (  
        <header className="bg-neutral rounded-lg pt-8 pb-8 mb-10">
            <div className='max-w-7xl mx-auto'>
                <div className='flex justify-between items-center sm:px-10'>
                    <Link to={'/'}>
                        <LogoHeader />
                    </Link>
                    <button onClick={toggleMenu} className="text-neutral-400 hover:text-white focus:outline-none sm:hidden flex cursor-pointer" aria-label="Toggle menu">
                        <img src={isOpen ? "svg/close.svg" : 'svg/menu.svg'} alt="toggle" className="w-6 h-6" />
                    </button>

                    <nav className="sm:flex hidden gap-4">
                        <NavItems />
                    </nav>
                </div>
            </div>
        </header>
    );
}

export default Header;