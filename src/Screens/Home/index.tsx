import { StatusBar } from 'expo-status-bar';
import { Container } from './styles';
import Header from 'src/components/Header';
import EventCard from 'src/components/EventCard';
import EventGroup from 'src/components/EventGroup';

export default function Home() {
  const eventCards = [
    {
      title: "Assunto",
      date: "20/02/2025",
      time: "14:00",
      iconName: 'info',
      onPress: () => { }
    },
    {
      title: "Assunto",
      date: "20/02/2025",
      time: "14:00",
      iconName: 'info',
      onPress: () => { }
    },
    {
      title: "Assunto",
      date: "20/02/2025",
      time: "14:00",
      iconName: 'info',
      onPress: () => { }
    },
    {
      title: "Assunto",
      date: "20/02/2025",
      time: "14:00",
      iconName: 'info',
      onPress: () => { }
    },
    {
      title: "Assunto",
      date: "20/02/2025",
      time: "14:00",
      iconName: 'info',
      onPress: () => { }
    }
  ];
  return (
    <>
      <Container>
        <Header />
        <EventGroup title="Atual">
          <EventCard
            title="Assunto"
            date="20/02/2025"
            time="14:00"
            iconName='edit'
            onPress={() => { }}
          />
        </EventGroup>
        <EventGroup title="Histórico">
          {eventCards.map((event, index) => (
            <EventCard
              key={index}
              title={event.title}
              date={event.date}
              time={event.time}
              iconName={event.iconName}
              onPress={event.onPress}
            />
          ))}
        </EventGroup>
        <StatusBar style="auto" />
      </Container>
    </>
  );
}

