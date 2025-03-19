import { StatusBar } from 'expo-status-bar';
import { Container } from './styles';
import Header from 'src/components/Header';
import EventCard from 'src/components/EventCard';
import EventGroup from 'src/components/EventGroup';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { getUserId, listEvents } from 'src/services/calendlyService';

export default function Home() {
  const navigation = useNavigation();
  const [upcomingEvents, setUpcomingEvents] = useState<any[]>([]);
  const [pastEvents, setPastEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchEvents() {
      setLoading(true);
      try {
        // Obtém o URI do usuário logado
        const userUri = await getUserId();
        if (!userUri) throw new Error("User ID não encontrado!");

        // Lista os eventos filtrados pelo invitee_email e pelo usuário (parâmetro obrigatório)
        const eventsData = await listEvents({
          user: userUri,
          status: "active",
          invitee_email: "gac9@aluno.ifnmg.edu.br",
          sort: "start_time:asc",
        });

        const events = eventsData.collection || [];
        const now = new Date();

        // Eventos futuros (Atual): do mais próximo para o mais distante
        const upcoming = events
          .filter((event: any) => new Date(event.start_time) >= now)
          .sort((a: any, b: any) => new Date(a.start_time).getTime() - new Date(b.start_time).getTime());

        // Eventos passados (Histórico): do mais recente para o mais antigo
        const past = events
          .filter((event: any) => new Date(event.start_time) < now)
          .sort((a: any, b: any) => new Date(b.start_time).getTime() - new Date(a.start_time).getTime());

        setUpcomingEvents(upcoming);
        setPastEvents(past);
      } catch (error) {
        console.error("Erro ao listar eventos:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchEvents();
  }, []);

  function handleOpenAppointment(date: string, time: string, isPast: boolean, subject: string, eventId: string) {
    navigation.navigate("AppointmentDetails", {
      date,
      time,
      isNew: false,
      isPast,
      subject,
      eventId, // Passa o eventId para a tela de detalhes
    });
  }

  return (
    <Container>
      <Header />

      {/* Seção de eventos futuros/atuais */}
      <EventGroup title="Atual">
        {loading ? (
          <EventCard title="Carregando eventos..." date="" time="" iconName="info" onPress={() => {}} />
        ) : upcomingEvents.length > 0 ? (
          upcomingEvents.map((event, index) => {
            const dt = new Date(event.start_time);
            // Usa toISOString().split("T")[0] para obter uma data ISO (YYYY-MM-DD)
            const dateStr = dt.toISOString().split("T")[0];
            const timeStr = dt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            // Define o assunto: se meeting_notes_plain existir, usa-o; senão, usa o nome do evento
            const subject = event.meeting_notes_plain || event.name || "";
            const eventId = event.uri; // Aqui, event.uri é o identificador completo
            return (
              <EventCard
                key={index}
                title={event.name || "Evento"}
                date={dateStr}
                time={timeStr}
                iconName="edit"
                onPress={() => handleOpenAppointment(dateStr, timeStr, false, subject, eventId)}
              />
            );
          })
        ) : (
          <EventCard title="Nenhum evento futuro" date="" time="" iconName="info" onPress={() => {}} />
        )}
      </EventGroup>

      {/* Seção de eventos passados */}
      <EventGroup title="Histórico">
        {loading ? (
          <EventCard title="Carregando eventos..." date="" time="" iconName="info" onPress={() => {}} />
        ) : pastEvents.length > 0 ? (
          pastEvents.map((event, index) => {
            const dt = new Date(event.start_time);
            const dateStr = dt.toISOString().split("T")[0];
            const timeStr = dt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            const subject = event.meeting_notes_plain || event.name || "";
            const eventId = event.uri;
            return (
              <EventCard
                key={index}
                title={event.name || "Evento"}
                date={dateStr}
                time={timeStr}
                iconName="info"
                onPress={() => handleOpenAppointment(dateStr, timeStr, true, subject, eventId)}
              />
            );
          })
        ) : (
          <EventCard title="Nenhum evento passado" date="" time="" iconName="info" onPress={() => {}} />
        )}
      </EventGroup>

      <StatusBar style="auto" />
    </Container>
  );
}
