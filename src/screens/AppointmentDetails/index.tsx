import { useRoute, useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { TouchableOpacity, Alert, Button, Linking } from "react-native";
import Header from "src/components/Header";
import { cancelEvent, createSchedulingLink } from "src/services/calendlyService";
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
import { StatusBar } from "expo-status-bar";

// Função para converter uma string "YYYY-MM-DD" em um objeto Date local
function parseLocalDate(dateString: string): Date {
  const [year, month, day] = dateString.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function formatDateForDisplay(dateString: string): string {
  const d = parseLocalDate(dateString);
  return d.toLocaleString("pt-BR", { month: "long" });
}

function formatDayForDisplay(dateString: string): number {
  const d = parseLocalDate(dateString);
  return d.getDate();
}

export default function AppointmentDetails() {
  const route = useRoute();
  const navigation = useNavigation();

  // Recebe os parâmetros, incluindo eventId
  const { date: initialDate, time: initialTime, isNew, isPast, subject = "", eventId } = route.params || {};

  // Cria um estado local para o assunto, permitindo edição
  const [editableSubject, setEditableSubject] = useState(subject);

  // Função para cancelar o evento
  async function handleCancelEvent() {
    Alert.alert(
      "Cancelar Evento",
      "Tem certeza que deseja cancelar o evento?",
      [
        { text: "Não", style: "cancel" },
        {
          text: "Sim",
          onPress: async () => {
            try {
              // Extrai o UUID do eventId (ex: "https://api.calendly.com/scheduled_events/GBGBDCAADAEDCRZ2")
              const uuid = eventId.split("/").pop();
              await cancelEvent(uuid, "Cancelado pelo usuário");
              Alert.alert("Evento cancelado com sucesso!");
              navigation.goBack();
            } catch (error: any) {
              Alert.alert("Erro ao cancelar o evento", error.message || "Tente novamente.");
            }
          },
        },
      ]
    );
  }

  // Função para gerar o link de agendamento
  async function handleGenerateLink() {
    try {
      const link = await createSchedulingLink();
      if (link) {
        Alert.alert("Link Gerado", "Link de agendamento gerado com sucesso!", [
          { text: "Acessar", onPress: () => Linking.openURL(link) },
          { text: "Fechar", style: "cancel" },
        ]);
      } else {
        Alert.alert("Erro", "Não foi possível gerar o link de agendamento.");
      }
    } catch (error: any) {
      Alert.alert("Erro", error.message || "Erro desconhecido ao gerar o link.");
    }
  }

  return (
    <Container>
      <Header />

      <HeaderCalendar>
        <TouchableOpacity onPress={navigation.goBack}>
          <DateContainer>
            <MonthText>{formatDateForDisplay(initialDate)}</MonthText>
            <DayText>{formatDayForDisplay(initialDate)}</DayText>
          </DateContainer>
        </TouchableOpacity>

        <TouchableOpacity onPress={navigation.goBack}>
          <TimeText>{initialTime || "Selecionar horário"}</TimeText>
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

      {/* Se for um evento já agendado (não novo) e ainda não cancelado, exibe o botão de cancelar */}
      {!isNew && !isPast && (
        <Button title="Cancelar Evento" onPress={handleCancelEvent} color={theme.colors.button.danger} />
      )}

      {/* Se for um evento novo, exibe o botão para gerar link de agendamento */}
      {isNew && (
        <ActionButton backgroundColor={theme.colors.button.confirm} onPress={handleGenerateLink}>
          <ButtonText>Gerar Link de Agendamento</ButtonText>
        </ActionButton>
      )}

      <StatusBar style="auto" />
    </Container>
  );
}
