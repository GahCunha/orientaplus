import { useRoute, useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { TouchableOpacity, Text, Alert, Linking } from "react-native";
import Notification from "src/components/Notification";
import { createSchedulingLink } from "src/services/calendlyService";
import Header from "src/components/Header";

import {
  ActionButton,
  ButtonText,
  Container,
  DateContainer,
  DayText,
  HeaderCalendar,
  MonthText,
  SubjectContainer,
  TimeText,
  SubjectInput,
} from "./styles";
import theme from "src/global/theme";

export default function AppointmentDetails() {
  const route = useRoute();
  const navigation = useNavigation();

  const { date: initialDate, time: initialTime, isNew, isPast, subject = "" } = route.params || {};

  function formatDateForDisplay(dateString: string): string {
    return new Date(dateString + "T00:00:00").toLocaleString("pt-BR", { month: "long" });
  }

  function formatDayForDisplay(dateString: string): number {
    return new Date(dateString + "T00:00:00").getDate();
  }

  const [date, setDate] = useState<string>(initialDate);
  const [time, setTime] = useState<string>(initialTime);
  const [editableSubject, setEditableSubject] = useState<string>(subject);
  const [notification, setNotification] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const [schedulingLink, setSchedulingLink] = useState<string | null>(null);

  /** 🔥 Criar um link de agendamento no Calendly */
  async function handleSchedule() {
    if (!editableSubject.trim()) {
      setNotification({ message: "Digite um assunto antes de agendar!", type: "error" });
      return;
    }

    console.log("📅 Data enviada:", date);
    console.log("⏰ Horário enviado:", time);
    console.log("📨 Criando link de agendamento...");

    try {
      const response = await createSchedulingLink(); // 🔥 Agora sem passar o slug manualmente

      if (response) {
        setSchedulingLink(response);
        setNotification({ message: "Link de agendamento gerado com sucesso!", type: "success" });

        Alert.alert(
          "Agendamento Criado",
          "Clique abaixo para confirmar seu agendamento.",
          [
            { text: "Acessar link", onPress: () => Linking.openURL(response) },
            { text: "Fechar", style: "cancel" }
          ]
        );
      } else {
        throw new Error("Erro ao criar o link de agendamento.");
      }
    } catch (error) {
      console.error("❌ Erro ao gerar link de agendamento:", error);
      setNotification({ message: "Erro ao gerar link de agendamento. Verifique os dados.", type: "error" });
    }
  }

  return (
    <Container>
      <Header />

      <HeaderCalendar>
        <TouchableOpacity onPress={navigation.goBack}>
          <DateContainer>
            <MonthText>{formatDateForDisplay(date)}</MonthText>
            <DayText>{formatDayForDisplay(date)}</DayText>
          </DateContainer>
        </TouchableOpacity>

        <TouchableOpacity onPress={navigation.goBack}>
          <TimeText>{time || "Selecionar horário"}</TimeText>
        </TouchableOpacity>
      </HeaderCalendar>

      <SubjectContainer isEditable={isNew || !isPast}>
        <SubjectInput
          value={editableSubject}
          onChangeText={setEditableSubject}
          editable={isNew || !isPast}
          placeholder="Digite o assunto..."
          placeholderTextColor={theme.colors.neutral.tertiary}
        />
      </SubjectContainer>

      {isNew && (
        <ActionButton backgroundColor={theme.colors.button.confirm} onPress={handleSchedule}>
          <ButtonText>Gerar Link de Agendamento</ButtonText>
        </ActionButton>
      )}

      {schedulingLink && (
        <TouchableOpacity onPress={() => Linking.openURL(schedulingLink)}>
          <Text style={{ color: theme.colors.primary, marginTop: 10 }}>🔗 Acessar link de agendamento</Text>
        </TouchableOpacity>
      )}

      {notification && (
        <Notification message={notification.message} type={notification.type} onClose={() => setNotification(null)} />
      )}
    </Container>
  );
}
