import { Stack, Redirect } from 'expo-router';
import { useUser } from '@clerk/clerk-expo';

export default function Layout() {
    const { isSignedIn, isLoaded } = useUser();

    if (!isLoaded)  return null; //thsi si for a better user experience

       
  
    // Corrected Logic: If the user is NOT signed in, redirect them.
    if (!isSignedIn) {
        return <Redirect href={'/sign-in'} />;
    }
    
  return <Stack screenOptions={{headerShown: false}}/>;
}