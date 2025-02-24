import { useRoute } from "@react-navigation/native";
import Header from "src/components/Header";
import { useState } from "react";
import Notification from "src/components/Notification"; // 🔹 Importando o componente de notificação

import {
  ActionButton,
  ButtonsContainer,
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
  const { date, time, isNew, isPast, subject = "" } = route.params || {};

  const [editableSubject, setEditableSubject] = useState(subject);
  const [notification, setNotification] = useState<{ message: string; type: "success" | "error" } | null>(null);

  function handleSchedule() {
    if (!editableSubject.trim()) {
      setNotification({ message: "Digite um assunto antes de agendar!", type: "error" });
      return;
    }
    setNotification({ message: "Agendamento realizado com sucesso!", type: "success" });
    console.log("Agendar horário", editableSubject);
  }

  function handleUpdate() {
    setNotification({ message: "Horário atualizado com sucesso!", type: "success" });
    console.log("Atualizar horário", editableSubject);
  }

  function handleDelete() {
    setNotification({ message: "Horário apagado com sucesso!", type: "success" });
    console.log("Apagar horário");
  }

  return (
    <Container>
      <Header />

      <HeaderCalendar>
        <DateContainer>
          <MonthText>Dezembro</MonthText>
          <DayText>{date.split("/")[0]}</DayText>
        </DateContainer>
        <TimeText>{time}</TimeText>
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

      {!isPast && !isNew && (
        <ButtonsContainer>
          <ActionButton backgroundColor={theme.colors.button.secondary} onPress={handleUpdate}>
            <ButtonText>Atualizar Horário</ButtonText>
          </ActionButton>
          <ActionButton backgroundColor={theme.colors.button.danger} onPress={handleDelete}>
            <ButtonText color={theme.colors.text_light}>Apagar Horário</ButtonText>
          </ActionButton>
        </ButtonsContainer>
      )}

      {isNew && (
        <ActionButton backgroundColor={theme.colors.button.confirm} onPress={handleSchedule}>
          <ButtonText>Agendar horário</ButtonText>
        </ActionButton>
      )}

      {/* 🔹 Exibe a notificação se houver alguma */}
      {notification && (
        <Notification message={notification.message} type={notification.type} onClose={() => setNotification(null)} />
      )}
    </Container>
  );
}
