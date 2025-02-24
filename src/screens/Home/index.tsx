import { StatusBar } from 'expo-status-bar';
import { Container } from './styles';
import Header from 'src/components/Header';
import EventCard from 'src/components/EventCard';
import EventGroup from 'src/components/EventGroup';
import { useNavigation } from '@react-navigation/native';

export default function Home() {
  const navigation = useNavigation();

  const eventCards = [
    {
      title: "Assunto",
      date: "20/02/2025",
      time: "14:00",
      iconName: 'info',
      onPress: () => handleOpenAppointment("20/02/2025", "14:00", true)
    },
    {
      title: "Assunto",
      date: "19/02/2025",
      time: "10:00",
      iconName: 'info',
      onPress: () => handleOpenAppointment("19/02/2025", "10:00", true)
    }
  ];


  function handleOpenAppointment(date, time, isPast) {
    navigation.navigate("AppointmentDetails", {
      date,
      time,
      isNew: false,
      isPast,
    });
  }

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
            onPress={() => handleOpenAppointment("20/02/2025", "14:00", false)}
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
