import { View, Text } from "react-native";
import { StatusBar } from "expo-status-bar";

export default function ConfigScreen() {
    return(
        <View style={{flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "green"}}>
            <StatusBar style="auto" />
            <Text>Teste2</Text>
        </View>
    );
}