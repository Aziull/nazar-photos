import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";


export default function TabLayout() {

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: '#ffd33d',
                headerStyle: {
                    backgroundColor: '#25292e',
                },
                headerShadowVisible: false,
                headerTintColor: '#fff',
                tabBarStyle: {
                    backgroundColor: '#25292e',
                },
            }}>
            <Tabs.Screen name='index' options={{
                headerShown: false,
                title: 'Photos',
                tabBarIcon: ({ color }) => (
                    <Ionicons name='image' color={color} size={24} />
                )
            }} />
        </Tabs>
    )
}