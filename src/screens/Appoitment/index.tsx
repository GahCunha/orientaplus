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

// Função para formatar a data em UTC no padrão YYYY-MM-DD
function formatUtcDate(date: Date): string {
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const day = String(date.getUTCDate()).padStart(2, "0");
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
      // Usando a data UTC para agrupar os slots conforme retornado pela API
      const formattedTimes = times.map((slot: any) => {
        const dt = new Date(slot.start_time);
        const utcDate = formatUtcDate(dt);
        // Para o horário, você pode optar por exibir em local ou em UTC; aqui usamos toLocaleTimeString
        const localTime = dt.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        });
        datesWithTimes[utcDate] = true;
        return { date: utcDate, time: localTime };
      });

      setAvailableTimes(formattedTimes);

      const newMarkedDates: { [key: string]: any } = {};
      const newDisabledDates: { [key: string]: any } = {};

      // Vamos construir o calendário para 30 dias usando também a data UTC
      const today = new Date();
      const utcToday = formatUtcDate(today);
      // Converter utcToday para um objeto Date em UTC pode ser feito manualmente:
      const [year, month, day] = utcToday.split("-").map(Number);
      const baseDate = new Date(Date.UTC(year, month - 1, day));

      for (let i = 0; i < 30; i++) {
        const currentDate = new Date(baseDate);
        currentDate.setUTCDate(baseDate.getUTCDate() + i);
        const formattedDate = formatUtcDate(currentDate);

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

  function handleDayPress(day: { dateString: string }) {
    // Agora, day.dateString vem do componente Calendar. Se ele estiver sendo gerado pelo calendário no formato local,
    // pode ser necessário converter para UTC ou ajustar o calendário para usar o mesmo padrão.
    // Uma alternativa é configurar o componente Calendar para usar o formato desejado.
    setSelectedDate(day.dateString);
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
