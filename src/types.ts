import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type RootStackParamList = {
  AppointmentScreen: undefined;
  AppointmentDetails: {
    date: string;
    time: string;
    isNew: boolean;
    isPast: boolean;
  };
};

// 🔹 Definir o tipo da navegação
export type NavigationProps = NativeStackNavigationProp<RootStackParamList>;
