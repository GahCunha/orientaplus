import { useState, useEffect, SetStateAction } from "react";
import { StatusBar } from "expo-status-bar";
import { Container, calendarTheme } from "./styles";
import Header from "src/components/Header";
import { Calendar } from "react-native-calendars";
import TimeSlot from "src/components/TimeSlot";
import { useNavigation } from "@react-navigation/native";
import { Button, ScrollView, ActivityIndicator, Text } from "react-native";
import { getAvailableTimes } from "src/services/calendlyService";
import { NavigationProps } from "src/types";

export default function AppointmentScreen() {
  const navigation = useNavigation<NavigationProps>();
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [availableTimes, setAvailableTimes] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [markedDates, setMarkedDates] = useState<{ [key: string]: any }>({});
  const [disabledDates, setDisabledDates] = useState<{ [key: string]: any }>({});

  const EVENT_SLUG = "evento";

  useEffect(() => {
    async function fetchAvailableTimes() {
      setLoading(true);
      const times = await getAvailableTimes(EVENT_SLUG);

      const datesWithTimes: { [key: string]: boolean } = {};
      const formattedTimes = times.map((slot: any) => {
        const date = slot.start_time.split("T")[0];
        const time = slot.start_time.split("T")[1].slice(0, 5);
        datesWithTimes[date] = true;
        return { date, time };
      });

      setAvailableTimes(formattedTimes);

      // 🔥 Criar um objeto para destacar os dias com horários disponíveis
      const newMarkedDates: { [key: string]: any } = {};
      const newDisabledDates: { [key: string]: any } = {};

      // Definir os estilos no calendário
      const today = new Date().toISOString().split("T")[0];

      for (let i = 0; i < 30; i++) { // Verificamos os próximos 30 dias
        const currentDate = new Date();
        currentDate.setDate(currentDate.getDate() + i);
        const formattedDate = currentDate.toISOString().split("T")[0];

        if (datesWithTimes[formattedDate]) {
          // Se há horários disponíveis, destacamos
          newMarkedDates[formattedDate] = { selectedColor: "#7E8BF5", selectedTextColor: "#fff" };
        } else {
          // Se não há horários, deixamos o dia desabilitado e opaco
          newDisabledDates[formattedDate] = { disabled: true, disableTouchEvent: false, textColor: "#B0B0B0" };
        }
      }

      setMarkedDates(newMarkedDates);
      setDisabledDates(newDisabledDates);
      setLoading(false);
    }

    fetchAvailableTimes();
  }, []);

  function handleConfirm() {
    if (!selectedDate || !selectedTime) return;

    navigation.navigate("AppointmentDetails", {
      date: selectedDate,
      time: selectedTime,
      isNew: true,
      isPast: false,
    });
  }

  return (
    <Container>
      <Header />
      <Calendar
        onDayPress={(day: { dateString: SetStateAction<string>; }) => setSelectedDate(day.dateString)}
        markedDates={{
          ...markedDates,
          ...disabledDates,
          [selectedDate]: { selected: true, selectedColor: "#007AFF" },
        }}
        theme={{
          ...calendarTheme,
          textDisabledColor: "#B0B0B0", // Define a cor dos dias desabilitados
        }}
      />

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <ScrollView>
          {availableTimes
            .filter((slot) => slot.date === selectedDate)
            .map((slot) => (
              <TimeSlot
                key={slot.time}
                time={slot.time}
                isSelected={selectedTime === slot.time}
                onPress={() => setSelectedTime(slot.time)}
              />
            ))
          }

          {availableTimes.filter((slot) => slot.date === selectedDate).length === 0 && selectedDate && (
            <Text style={{ textAlign: "center", marginTop: 20, color: "#B0B0B0" }}>
              Nenhum horário disponível para essa data.
            </Text>
          )}
        </ScrollView>
      )}

      <Button title="Confirmar Agendamento" onPress={handleConfirm} disabled={!selectedDate || !selectedTime} />

      <StatusBar style="auto" />
    </Container>
  );
}
