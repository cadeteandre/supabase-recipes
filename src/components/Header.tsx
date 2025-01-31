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
                <div className='flex justify-between items-center px-4 sm:px-6 lg:px-8'>
                    <Link to={'/'}>
                        <LogoHeader />
                    </Link>
                    <button onClick={toggleMenu} className="text-neutral-400 hover:text-white focus:outline-none sm:hidden flex cursor-pointer" aria-label="Toggle menu">
                        <img src={isOpen ? "svg/close.svg" : 'svg/menu.svg'} alt="toggle" className="w-6 h-6" />
                    </button>

                    <nav className="sm:flex hidden gap-2">
                        <NavItems />
                    </nav>
                </div>
            </div>
            <div className={`absolute left-0 right-0 bg-black-200 transition-all duration-300 ease-in-out overflow-hidden z-20 mx-auto sm:hidden block; ${isOpen ? 'max-h-screen' : 'max-h-0 hidden'}`}>
                <nav className="flex flex-col gap-2 my-10 px-10 sm:block sm:mt-0 sm:px-0">
                    <NavItems />
                </nav>
            </div>
        </header>
    );
}

export default Header;