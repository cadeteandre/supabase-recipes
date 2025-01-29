import { useEffect, useState } from 'react';
import supabase from '../utils/backend/setupSupabase';
import { Navigate } from 'react-router-dom';
import UserProfileCard from '../components/UserProfileCard';
import Profile from '../interfaces/Profile';

export default function ProfilePage() {

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

  if (loading) return <p>Loading...</p>;
  if (!profile) return <Navigate to="/login" replace />
  return (
    <main className="h-screen">
      <UserProfileCard avatarUrl='' firstName={profile.first_name} lastName={profile.last_name} email={profile.email} setProfile={setProfile} />
    </main>
  );
}