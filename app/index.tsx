import { NavigationContainer } from "@react-navigation/native";
import { Redirect } from "expo-router";


export default function Index() {
  return (
    <Redirect href="/auth/WelcomeScreen" />
  );
}

{/*<Redirect href="/auth/WelcomeScreen" />*/}
{/*<Redirect href="/(tab)/HomeScreen" />*/}


//git commit -m "Description des modifications"
//git push origin main
//git status
