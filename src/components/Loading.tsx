import { ActivityIndicator, View } from "react-native";
import theme from "../global/theme";

export function Loading() {
    return (
        <View style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: theme.colors.background
        }}>
            <ActivityIndicator color={theme.colors.primary} size="large" />
        </View>
    );
}
