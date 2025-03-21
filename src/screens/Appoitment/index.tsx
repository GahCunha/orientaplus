import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Container, calendarTheme } from "./styles"; // 🔹 Importamos o tema aqui
import Header from "src/components/Header";
import { Calendar } from "react-native-calendars";
import TimeSlot from "src/components/TimeSlot";
import { useNavigation } from "@react-navigation/native";
import { Button, ScrollView } from "react-native";

export default function AppointmentScreen() {
  const navigation = useNavigation();
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  const availableTimes = ["13:10", "14:00", "15:20", "16:40"];

  function handleConfirm() {
    if (!selectedDate || !selectedTime) return;

    navigation.navigate("AppointmentDetails", {
      date: selectedDate,
      time: selectedTime,
      isNew: true,
      isPast: false
    });
  }

  return (
    <Container>
      <Header />
      <Calendar
        onDayPress={(day) => setSelectedDate(day.dateString)}
        markedDates={{
          [selectedDate]: { selected: true, disableTouchEvent: true, selectedColor: calendarTheme.selectedDayBackgroundColor },
        }}
        theme={calendarTheme}
      />

      <ScrollView>
        {availableTimes.map((time) => (
          <TimeSlot key={time} time={time} isSelected={selectedTime === time} onPress={() => setSelectedTime(time)} />
        ))}
      </ScrollView>


      {/* Botão para confirmar e navegar para AppointmentDetails */}
      <Button title="Confirmar Agendamento" onPress={handleConfirm} disabled={!selectedDate || !selectedTime} />

      <StatusBar style="auto" />
    </Container>
  );
}
