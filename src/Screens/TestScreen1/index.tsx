import { StatusBar } from 'expo-status-bar';
import { Container } from './styles';
import Header from 'src/components/Header';
import { Calendar } from 'react-native-calendars';
import { useState } from 'react';
import theme from 'src/global/theme';

export default function TestScreen1() {
  const [selected, setSelected] = useState('');


  const calendarTheme = {
    selectedDayBackgroundColor: theme.colors.primary, 
    todayTextColor: 'orange',
    arrowColor: 'orange',
    dotColor: 'orange',
    todayDotColor: 'orange'
  };

  return (
    <>
      <Container>
        <Header />
        <Calendar
          onDayPress={(day: { dateString: string }) => {
        setSelected(day.dateString);
        console.log('selected day', day);
          }}
          markedDates={{
        [selected]: { selected: true, disableTouchEvent: true, selectedDotColor: 'orange' }
          }}
          theme={calendarTheme} 
        />
        <StatusBar style="auto" />
      </Container>
    </>
  );
}
