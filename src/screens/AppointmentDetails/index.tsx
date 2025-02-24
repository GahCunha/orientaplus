import { useRoute } from "@react-navigation/native";
import Header from "src/components/Header";
import { useState } from "react";
import { Modal, TouchableOpacity } from "react-native";
import Notification from "src/components/Notification";
import { Calendar } from "react-native-calendars";

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
  ModalContainer,
  CloseButton,

} from "./styles";
import theme from "src/global/theme";

export default function AppointmentDetails() {
  const route = useRoute();
  const { date: initialDate, time, isNew, isPast, subject = "" } = route.params || {};

  const [date, setDate] = useState(initialDate);
  const [editableSubject, setEditableSubject] = useState(subject);
  const [notification, setNotification] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);

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

        {isNew || !isPast ? (
          <TouchableOpacity onPress={() => setIsCalendarVisible(true)}>
            <DateContainer>
              <MonthText>Dezembro</MonthText>
              <DayText>{date.split("/")[0]}</DayText>
            </DateContainer>
          </TouchableOpacity>
        ) : (
          <DateContainer>
            <MonthText>Dezembro</MonthText>
            <DayText>{date.split("/")[0]}</DayText>
          </DateContainer>
        )}

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

      {notification && (
        <Notification message={notification.message} type={notification.type} onClose={() => setNotification(null)} />
      )}

      <Modal
        visible={isCalendarVisible}
        animationType="fade"
        transparent
        onRequestClose={() => setIsCalendarVisible(false)}
      >
        <ModalContainer>
          <Calendar
            onDayPress={(day) => {
              setDate(day.dateString);
              setIsCalendarVisible(false);
            }}
            markedDates={{
              [date]: { selected: true, selectedColor: theme.colors.primary },
            }}
            theme={{
              selectedDayBackgroundColor: theme.colors.primary,
              todayTextColor: theme.colors.button.confirm,
              arrowColor: theme.colors.primary,
              textMonthFontWeight: "bold",
            }}
            style={{
              borderRadius: 10,
              marginHorizontal: 20,
              backgroundColor: theme.colors.background,
            }}
          />
          <CloseButton onPress={() => setIsCalendarVisible(false)}>
            <ButtonText>Fechar</ButtonText>
          </CloseButton>
        </ModalContainer>
      </Modal>
    </Container>
  );
}


