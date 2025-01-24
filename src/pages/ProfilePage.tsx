import { useEffect, useState } from 'react';
import supabase from '../utils/backend/setupSupabase';
import { Link } from 'react-router-dom';

export default function ProfilePage() {
  interface Profile {
    email: string;
    first_name: string;
    last_name: string;
    created_at: string;
    updated_at: string;
    [key: string]: string | number | boolean | null;
  }

  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
        setLoading(true);
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        
        if (userError || !user) {
          console.error(userError || 'No user found');
          setLoading(false);
          return;
        }

        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();
      
        if (profileError) {
          console.error(profileError);
          setLoading(false);
          return;
        }
      
        setProfile({
          email: user.email,
          created_at: user.created_at,
          ...profileData,
        });
        setLoading(false);
      };
    fetchProfile();
  }, []);

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

  if (loading) return <p>Loading...</p>;
  if (!profile) return <Link className='btn' to={'/login'}>To Login</Link>;

  return (
    <main className="h-screen flex justify-center items-center">
      <div className='flex justify-center'>
        <div className="card bg-base-100 w-96 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Profile</h2>
            <p>Email: {profile.email}</p>
              <p>First Name: {profile.first_name}</p>
              <p>Last Name: {profile.last_name}</p>
            <div className="card-actions justify-center">
              <button className='btn' onClick={handleLogout}>Logout</button>
              <Link className='btn bg-lime-700 text-slate-100' to={'./favorites'}>Favorites</Link>
              <Link className='btn bg-lime-700 text-slate-100' to={'./recipe-create'}>Create Recipe</Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}