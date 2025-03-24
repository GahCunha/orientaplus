import { useState, useEffect, useCallback } from "react";
import { StatusBar } from "expo-status-bar";
import { Container, calendarTheme } from "./styles";
import Header from "src/components/Header";
import { Calendar } from "react-native-calendars";
import TimeSlot from "src/components/TimeSlot";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import {
  Button,
  ScrollView,
  ActivityIndicator,
  Text,
  View,
} from "react-native";
import {
  getAvailableTimes,
  listEvents,
  getUserId,
} from "src/services/calendlyService";
import { NavigationProps } from "src/types";
import {
  ActiveEventContainer,
  ActiveEventTitle,
  ActiveEventDetail,
  ActiveEventMessage,
} from "./styles";

// Função para formatar a data local (YYYY-MM-DD)
function formatLocalDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export default function AppointmentScreen() {
  const navigation = useNavigation<NavigationProps>();

  // Estado para armazenar um agendamento futuro ativo, se houver
  const [activeEvent, setActiveEvent] = useState<any>(null);

  // Estados para agendamento novo (caso não exista agendamento ativo)
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [availableTimes, setAvailableTimes] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [markedDates, setMarkedDates] = useState<{ [key: string]: any }>({});
  const [disabledDates, setDisabledDates] = useState<{ [key: string]: any }>(
    {}
  );

  // Função para buscar o agendamento ativo (futuro) do usuário
  async function fetchActiveEvent() {
    try {
      const userUri = await getUserId();
      if (!userUri) throw new Error("User ID não encontrado!");
      const eventsData = await listEvents({
        user: userUri,
        status: "active",
        invitee_email: "gac9@aluno.ifnmg.edu.br",
        sort: "start_time:asc",
      });
      const events = eventsData.collection || [];
      const now = new Date();
      const upcoming = events.filter(
        (event: any) => new Date(event.start_time) >= now
      );
      if (upcoming.length > 0) {
        setActiveEvent(upcoming[0]); // considera o primeiro evento futuro ativo
      } else {
        setActiveEvent(null);
      }
    } catch (error) {
      console.error("Erro ao buscar evento ativo:", error);
    }
  }

  // Função para buscar horários disponíveis para agendamento novo
  async function fetchAvailableTimesForPeriod() {
    setLoading(true);
    try {
      const times = await getAvailableTimes();
      const datesWithTimes: { [key: string]: boolean } = {};
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
          newMarkedDates[formattedDate] = {
            selectedColor: "#7E8BF5",
            selectedTextColor: "#fff",
          };
        } else {
          newDisabledDates[formattedDate] = {
            disabled: true,
            disableTouchEvent: false,
            textColor: "#B0B0B0",
          };
        }
      }
      setMarkedDates(newMarkedDates);
      setDisabledDates(newDisabledDates);
    } catch (error) {
      console.error("Erro ao buscar horários disponíveis:", error);
    } finally {
      setLoading(false);
    }
  }

  // useEffect para buscar o agendamento ativo na montagem
  useEffect(() => {
    fetchActiveEvent();
  }, []);

  // useFocusEffect para atualizar a listagem sempre que a tela voltar a ficar em foco
  useFocusEffect(
    useCallback(() => {
      fetchActiveEvent();
    }, [])
  );

  // Caso não exista agendamento ativo, buscamos os horários disponíveis para agendamento novo
  useEffect(() => {
    if (!activeEvent) {
      fetchAvailableTimesForPeriod();
    }
  }, [activeEvent]);

  // Atualiza os horários disponíveis quando o usuário muda de mês
  function handleMonthChange(monthData: {
    year: number;
    month: number;
    timestamp: number;
    dateString: string;
  }) {
    // Para simplicidade, essa função pode chamar novamente fetchAvailableTimesForPeriod
    fetchAvailableTimesForPeriod();
  }

  // Quando o usuário seleciona um dia, limpa o horário selecionado
  function handleDayPress(day: { dateString: string }) {
    setSelectedDate(day.dateString);
    setSelectedTime("");
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

  // Se já existir um agendamento ativo, exibimos seus detalhes
  if (activeEvent) {
    const dt = new Date(activeEvent.start_time);
    const dateStr = dt.toISOString().split("T")[0];
    const timeStr = dt.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    const subject = activeEvent.meeting_notes_plain || activeEvent.name || "";
    return (
      <Container>
        <Header />
        <ActiveEventContainer>
          <ActiveEventTitle>
            Você já possui um agendamento ativo:
          </ActiveEventTitle>
          <ActiveEventDetail>Data: {dateStr}</ActiveEventDetail>
          <ActiveEventDetail>Horário: {timeStr}</ActiveEventDetail>
          <ActiveEventDetail>Assunto: {subject}</ActiveEventDetail>
          <Button
            title="Cancelar Agendamento"
            onPress={() =>
              navigation.navigate("AppointmentDetails", {
                date: dateStr,
                time: timeStr,
                isNew: false,
                isPast: false,
                subject,
                eventId: activeEvent.uri,
              })
            }
            color="#d9534f"
          />
          <ActiveEventMessage>
            Para agendar outro, cancele o agendamento atual.
          </ActiveEventMessage>
        </ActiveEventContainer>
        <StatusBar style="auto" />
      </Container>
    );
  }

  // Caso não haja agendamento ativo, exibe o calendário para agendamento novo
  return (
    <Container>
      <Header />
      <Calendar
        onDayPress={handleDayPress}
        onMonthChange={handleMonthChange}
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
            ))}
          {availableTimes.filter((slot) => slot.date === selectedDate)
            .length === 0 &&
            selectedDate && (
              <Text
                style={{ textAlign: "center", marginTop: 20, color: "#B0B0B0" }}
              >
                Nenhum horário disponível para essa data.
              </Text>
            )}
        </ScrollView>
      )}

      <Button
        title="Confirmar Agendamento"
        onPress={handleConfirm}
        disabled={!selectedDate || !selectedTime}
      />

      <StatusBar style="auto" />
    </Container>
  );
}
