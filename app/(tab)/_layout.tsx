import { Tabs } from "expo-router";
import { Home, List, ChartColumnBig, MapPinHouse } from "lucide-react-native";


export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#007FFF', 
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          backgroundColor: 'white',
          borderTopWidth: 0,
          paddingBottom: 5,
          paddingTop: 5,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: 'bold',
        },
      }}
    >
      <Tabs.Screen
        name="HomeScreen"
        options={{
          tabBarIcon: ({ color, size }) => <Home color={color} size={size}  />,
          tabBarLabel: '',
        }}
      />
        <Tabs.Screen
          name="ResultsScreen"
          options={{
            tabBarIcon: ({ color, size }) => <ChartColumnBig color={color} size={size} />,
            tabBarLabel: '',
          }}
        />
        <Tabs.Screen
          name="geoLoc"
          options={{
            tabBarIcon: ({ color, size }) => <MapPinHouse color={color} size={size} />,
            tabBarLabel: '',
          }}
        />
      <Tabs.Screen
        name="list"
        options={{
          tabBarIcon: ({ color, size }) => <List color={color} size={size} />,
          tabBarLabel: '',
        }}
      />
    </Tabs>
  );
}
