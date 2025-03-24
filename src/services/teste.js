const axios = require('axios');

const TOKEN = "eyJraWQiOiIxY2UxZTEzNjE3ZGNmNzY2YjNjZWJjY2Y4ZGM1YmFmYThhNjVlNjg0MDIzZjdjMzJiZTgzNDliMjM4MDEzNWI0IiwidHlwIjoiUEFUIiwiYWxnIjoiRVMyNTYifQ.eyJpc3MiOiJodHRwczovL2F1dGguY2FsZW5kbHkuY29tIiwiaWF0IjoxNzQyMDYyNjA0LCJqdGkiOiIxMThiZmFkZS0yMWRlLTQ2MjEtOTRmZS04ODAwMDg2NjU2YzYiLCJ1c2VyX3V1aWQiOiI3NzM1MjJmNS1lYjEzLTQxOTItYmE5OC01ZTNmY2FmOGY3MGEifQ.VDJmr97HUCzRlHcqYef1EWYb_d25VIVUbOK4rlSmv-7XnHl3cJ2ygd3WVVNg_klJBs2QYnJMb8WQzfYAuANNyA";

async function getAvailableTimes(eventTypeId, startTime, endTime) {
  try {
    const response = await axios.get('https://api.calendly.com/event_type_available_times', {
      headers: {
        'Authorization': `Bearer ${TOKEN}`,
        'Content-Type': 'application/json'
      },
      params: {
        event_type: eventTypeId,
        start_time: startTime,
        end_time: endTime
      }
    });

    const availableTimes = response.data;
    
    if (availableTimes.collection && availableTimes.collection.length > 0) {
      // Agrupar resultados por data (apenas data, sem horário)
      const groupedByDate = {};

      availableTimes.collection.forEach(day => {
        const date = new Date(day.start_time).toLocaleDateString();
        if (!groupedByDate[date]) {
          groupedByDate[date] = [];
        }
        if (day.available_slots && day.available_slots.length > 0) {
          day.available_slots.forEach(slot => {
            groupedByDate[date].push({
              start: new Date(slot.start_time).toLocaleTimeString(),
              end: new Date(slot.end_time).toLocaleTimeString()
            });
          });
        }
      });

      // Exibe os resultados agrupados
      Object.keys(groupedByDate).forEach(date => {
        console.log(`Dia: ${date}`);
        if (groupedByDate[date].length > 0) {
          groupedByDate[date].forEach(slot => {
            console.log(`  Disponível: ${slot.start} - ${slot.end}`);
          });
        } else {
          console.log("  Nenhum horário disponível.");
        }
      });
    } else {
      console.log("Nenhum horário disponível encontrado para o período especificado.");
    }
  } catch (error) {
    console.error('Erro ao buscar os horários disponíveis:', error.response ? error.response.data : error.message);
  }
}

// Exemplo de uso:
const eventTypeId = 'https://api.calendly.com/event_types/65785a4b-0c48-4eda-8735-0521a45bd61c'; // Certifique-se de que esse ID seja válido
const startTime = '2025-03-18T00:00:00Z';
const endTime = '2025-03-24T23:59:59Z';

getAvailableTimes(eventTypeId, startTime, endTime);
