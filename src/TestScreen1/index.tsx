import { View, Text } from "react-native";
import { StatusBar } from "expo-status-bar";

export default function TestScreen1() {
    return(
        <View style={{flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "red"}}>
            <StatusBar style="auto" />
            <Text>Teste1</Text>
        </View>
    );
}