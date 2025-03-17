import { StatusBar } from 'expo-status-bar';
import { Container } from './styles';
import Header from 'src/components/Header';
import EventCard from 'src/components/EventCard';
import EventGroup from 'src/components/EventGroup';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { getUserId, getUserScheduledEvents } from 'src/services/calendlyService';

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

        // Busca os eventos agendados para o usuário
        const eventsData = await getUserScheduledEvents(userUri);
        const events = eventsData.collection || [];
        const now = new Date();

        // Filtra eventos futuros (atual) e passados (histórico)
        const upcoming = events.filter((event: any) => new Date(event.start_time) >= now);
        const past = events.filter((event: any) => new Date(event.start_time) < now);

        setUpcomingEvents(upcoming);
        setPastEvents(past);
      } catch (error) {
        console.error("Erro ao buscar eventos agendados:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchEvents();
  }, []);

  function handleOpenAppointment(date: string, time: string, isPast: boolean) {
    navigation.navigate("AppointmentDetails", {
      date,
      time,
      isNew: false,
      isPast,
    });
  }

  return (
    <Container>
      <Header />

      {/* Grupo de eventos futuros/atuais */}
      <EventGroup title="Atual">
        {loading ? (
          <EventCard title="Carregando eventos..." date="" time="" iconName="info" onPress={() => {}} />
        ) : upcomingEvents.length > 0 ? (
          upcomingEvents.map((event, index) => {
            const dt = new Date(event.start_time);
            const dateStr = dt.toLocaleDateString();
            const timeStr = dt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            return (
              <EventCard
                key={index}
                title={event.name || "Evento"}
                date={dateStr}
                time={timeStr}
                iconName="edit"
                onPress={() => handleOpenAppointment(dateStr, timeStr, false)}
              />
            );
          })
        ) : (
          <EventCard title="Nenhum evento futuro" date="" time="" iconName="info" onPress={() => {}} />
        )}
      </EventGroup>

      {/* Grupo de eventos passados */}
      <EventGroup title="Histórico">
        {loading ? (
          <EventCard title="Carregando eventos..." date="" time="" iconName="info" onPress={() => {}} />
        ) : pastEvents.length > 0 ? (
          pastEvents.map((event, index) => {
            const dt = new Date(event.start_time);
            const dateStr = dt.toLocaleDateString();
            const timeStr = dt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            return (
              <EventCard
                key={index}
                title={event.name || "Evento"}
                date={dateStr}
                time={timeStr}
                iconName="info"
                onPress={() => handleOpenAppointment(dateStr, timeStr, true)}
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
