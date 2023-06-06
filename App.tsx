import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { List_V2 } from './app/screens/List_V2';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
    <Stack.Navigator>
      {/* <Stack.Screen name="My Todos" component={List} /> */}
      {/* <Stack.Screen name="My Todos V1" component={List_V1} /> */}
      <Stack.Screen name="My Todos V2" component={List_V2} />
    </Stack.Navigator>
  </NavigationContainer>
  );
}
 
