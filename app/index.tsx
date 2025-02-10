import { NavigationContainer } from "@react-navigation/native";
import { Redirect } from "expo-router";


export default function Index() {
  return (
    <Redirect href="/(tab)/HomeScreen" />
  );
}

{/*<Redirect href="/auth/WelcomeScreen" />*/}
{/*<Redirect href="/(tab)/HomeScreen" />*/}