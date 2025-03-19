import { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { Container, calendarTheme } from "./styles";
import Header from "src/components/Header";
import { Calendar } from "react-native-calendars";
import TimeSlot from "src/components/TimeSlot";
import { useNavigation } from "@react-navigation/native";
import { Button, ScrollView, ActivityIndicator, Text } from "react-native";
import { getAvailableTimes } from "src/services/calendlyService";
import { NavigationProps } from "src/types";

// Função para formatar a data local (YYYY-MM-DD)
function formatLocalDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export default function AppointmentScreen() {
  const navigation = useNavigation<NavigationProps>();
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [availableTimes, setAvailableTimes] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [markedDates, setMarkedDates] = useState<{ [key: string]: any }>({});
  const [disabledDates, setDisabledDates] = useState<{ [key: string]: any }>({});

  useEffect(() => {
    async function fetchAvailableTimes() {
      setLoading(true);
      const times = await getAvailableTimes();

      const datesWithTimes: { [key: string]: boolean } = {};
      // Agrupa os slots usando a data local
      const formattedTimes = times.map((slot: any) => {
        const dt = new Date(slot.start_time);
        const localDate = formatLocalDate(dt);
        const localTime = dt.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        });
        datesWithTimes[localDate] = true;
        return { date: localDate, time: localTime };
      });

      setAvailableTimes(formattedTimes);

      const newMarkedDates: { [key: string]: any } = {};
      const newDisabledDates: { [key: string]: any } = {};

      const today = new Date();
      for (let i = 0; i < 30; i++) {
        const currentDate = new Date(today);
        currentDate.setDate(today.getDate() + i);
        const formattedDate = formatLocalDate(currentDate);

        if (datesWithTimes[formattedDate]) {
          newMarkedDates[formattedDate] = { selectedColor: "#7E8BF5", selectedTextColor: "#fff" };
        } else {
          newDisabledDates[formattedDate] = { disabled: true, disableTouchEvent: false, textColor: "#B0B0B0" };
        }
      }

      setMarkedDates(newMarkedDates);
      setDisabledDates(newDisabledDates);
      setLoading(false);
    }

    fetchAvailableTimes();
  }, []);

  // Ao selecionar uma data, limpa o horário selecionado
  function handleDayPress(day: { dateString: string }) {
    setSelectedDate(day.dateString);
    setSelectedTime(""); // Limpa o horário selecionado ao mudar a data
  }

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
        onDayPress={handleDayPress}
        markedDates={{
          ...markedDates,
          ...disabledDates,
          [selectedDate]: { selected: true, selectedColor: "#007AFF" },
        }}
        theme={{
          ...calendarTheme,
          textDisabledColor: "#B0B0B0",
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
