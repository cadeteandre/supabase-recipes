// import { useEffect } from 'react';
// import supabase from '../backend/setupSupabase';

// export function withAuth(Component: any) {
//   return function AuthenticatedComponent(props: any) {
//     const router = useRouter();

//     useEffect(() => {
//       const checkAuth = async () => {
//         const { data } = await supabase.auth.getUser();

//         if (!data?.user) {
//         // Redirect to login page if user is not authenticated
//           router.push('/login');
//         }
//       };

//       checkAuth();
//     }, []);

//     return <Component {...props} />;
//   };
// }