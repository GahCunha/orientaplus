import { useRoute } from "@react-navigation/native";
import Header from "src/components/Header";
import { useState } from "react";

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
  SubjectInput
} from "./styles";

export default function AppointmentDetails() {
  const route = useRoute();

  const { date, time, isNew, isPast, subject = "" } = route.params || {};


  const [editableSubject, setEditableSubject] = useState(subject);

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
          placeholderTextColor="#999"
        />
      </SubjectContainer>


      {!isPast && !isNew && (
        <ButtonsContainer>
          <ActionButton backgroundColor="#DDE5B6" onPress={() => console.log("Atualizar horário")}>
            <ButtonText>Atualizar Horário</ButtonText>
          </ActionButton>
          <ActionButton backgroundColor="#333" onPress={() => console.log("Apagar horário")}>
            <ButtonText color="#FFF">Apagar Horário</ButtonText>
          </ActionButton>
        </ButtonsContainer>
      )}

      {isNew && (
        <ActionButton backgroundColor="#B7F4C1" onPress={() => console.log("Agendar horário")}>
          <ButtonText>Agendar horário</ButtonText>
        </ActionButton>
      )}
    </Container>
  );
}