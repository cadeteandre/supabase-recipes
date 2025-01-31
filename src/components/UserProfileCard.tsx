import React from 'react';
import Profile from '../interfaces/Profile';
import supabase from '../utils/backend/setupSupabase';
import { Link } from 'react-router-dom';

interface UserProfileCardProps {
  avatarUrl: string;
  firstName: string;
  lastName: string;
  email: string;
  setProfile: React.Dispatch<React.SetStateAction<Profile | null>>
}

const UserProfileCard: React.FC<UserProfileCardProps> = ({
  avatarUrl,
  firstName,
  lastName,
  email,
  setProfile
}) => {

    const handleLogout = async () => {
        try {
          const { error } = await supabase.auth.signOut();
          if (error) throw error;
    
          console.log('User logged out');
          setProfile(null);
        } catch (err) {
          console.error(err);
        }
      };
  return (
    <article className="max-w-lg mx-auto bg-neutral text-[#ccccc0] rounded-xl shadow-lg overflow-hidden transform transition-all hover:scale-105">
      <div className="flex flex-col items-center p-6">
        <img
          className="w-24 h-24 rounded-2xl border-2 border-[#ccccc0]"
          src={avatarUrl === '' ? '/images/coffee-shop-brett.png' : avatarUrl}
          alt={`${firstName} ${lastName}`}
        />
        
        <h2 className="mt-4 text-2xl text-[#ccccc0] font-bold">
          {firstName} {lastName}
        </h2>
        
        <p className="mt-2 text-[#ccccc0]">{email}</p>
        
        <div className="mt-6 flex space-x-4">
          <button
            className="flex items-center justify-center px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            onClick={handleLogout}
          >
            <span className="mr-2"><img src="/images/open-door.png" alt="door-icon" className='w-8 h-8' /></span> Logout
          </button>
          <Link to={'./favorites'}>
            <button
                className="flex items-center justify-center px-3 py-2 bg-yellow-400 text-white rounded-lg hover:bg-yellow-500 transition-colors"
            >
                <span className="mr-2"><img src="/images/star.png" alt="star-icon" className='w-8 h-8' /></span> Favorites
            </button>
          </Link>
          <Link to={'./recipe-create'}>
            <button
                className="flex items-center justify-center px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
                <span className="mr-2"><img src="/images/idea.png" alt="light-bulb-icon" className='w-8 h-8' /></span> Create Recipe
            </button>
          </Link>
        </div>
      </div>
    </article>
  );
};

export default UserProfileCard;