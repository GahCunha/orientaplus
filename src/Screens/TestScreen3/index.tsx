import { View, Text } from "react-native";
import { StatusBar } from "expo-status-bar";

export default function TestScreen3() {
    return(
        <View style={{flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "blue"}}>
            <StatusBar style="auto" />
            <Text>Teste3</Text>
        </View>
    );
}