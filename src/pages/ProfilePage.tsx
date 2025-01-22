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
    <div>
      <h1>Profile</h1>
      <p>Email: {profile.email}</p>
      <p>First Name: {profile.first_name}</p>
      <p>Last Name: {profile.last_name}</p>
      <p>Account Created: {profile.created_at}</p>
      <p>Last Updated: {profile.updated_at}</p>
      <button className='btn' onClick={handleLogout}>Logout</button>
    </div>
  );
}