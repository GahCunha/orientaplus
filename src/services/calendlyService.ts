import axios from "axios";

const TOKEN = "eyJraWQiOiIxY2UxZTEzNjE3ZGNmNzY2YjNjZWJjY2Y4ZGM1YmFmYThhNjVlNjg0MDIzZjdjMzJiZTgzNDliMjM4MDEzNWI0IiwidHlwIjoiUEFUIiwiYWxnIjoiRVMyNTYifQ.eyJpc3MiOiJodHRwczovL2F1dGguY2FsZW5kbHkuY29tIiwiaWF0IjoxNzQyMDYyNjA0LCJqdGkiOiIxMThiZmFkZS0yMWRlLTQ2MjEtOTRmZS04ODAwMDg2NjU2YzYiLCJ1c2VyX3V1aWQiOiI3NzM1MjJmNS1lYjEzLTQxOTItYmE5OC01ZTNmY2FmOGY3MGEifQ.VDJmr97HUCzRlHcqYef1EWYb_d25VIVUbOK4rlSmv-7XnHl3cJ2ygd3WVVNg_klJBs2QYnJMb8WQzfYAuANNyA"; // Substitua pelo seu token real
const API_BASE_URL = "https://api.calendly.com";

/** 
 *  Busca o ID do usuário logado no Calendly 
 */
export const getUserId = async (): Promise<string | null> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users/me`, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "application/json",
      },
    });

    return response.data.resource.uri; // Retorna o ID do usuário
  } catch (error) {
    console.error("❌ Erro ao buscar User ID:", error.response?.data || error);
    return null;
  }
};

/** 
 * Busca todos os tipos de evento do usuário 
 */
export const getEventTypes = async (): Promise<any[]> => {
  try {
    const userId = await getUserId();
    if (!userId) throw new Error("User ID não encontrado!");

    const response = await axios.get(`${API_BASE_URL}/event_types`, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "application/json",
      },
      params: { user: userId },
    });

    return response.data.collection; // Retorna a lista de eventos
  } catch (error) {
    console.error("❌ Erro ao buscar tipos de eventos:", error.response?.data || error);
    return [];
  }
};

/** 
 * 🔍 Busca o ID de um evento específico pelo seu `slug` 
 */
export const getEventTypeId = async (eventSlug: string): Promise<string | null> => {
  const events = await getEventTypes();
  const event = events.find((e: any) => e.slug === eventSlug);

  if (!event) {
    console.error("❌ Evento não encontrado!");
    return null;
  }

  return event.uri; // Retorna o ID do evento encontrado
};

/** 
 * ⏳ Busca os horários disponíveis de um evento pelo ID 
 */
export const getAvailableTimes = async (eventSlug: string, daysAhead: number = 30): Promise<any[]> => {
  try {
    const eventId = await getEventTypeId(eventSlug);
    if (!eventId) throw new Error("Evento não encontrado!");

    let allAvailableTimes: any[] = [];
    const now = new Date();
    now.setMinutes(now.getMinutes() + 5); //  Garante que começa no futuro

    for (let i = 0; i < daysAhead; i += 7) {
      const startDate = new Date(now);
      startDate.setDate(now.getDate() + i);

      const endDate = new Date(startDate);
      endDate.setDate(startDate.getDate() + 6); //  Define um intervalo máximo de 7 dias

      const response = await axios.get(`${API_BASE_URL}/event_type_available_times`, {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          "Content-Type": "application/json",
        },
        params: {
          event_type: eventId,
          start_time: startDate.toISOString(),
          end_time: endDate.toISOString(),
        },
      });

      if (response.data.collection.length > 0) {
        allAvailableTimes = [...allAvailableTimes, ...response.data.collection];
      }
    }

    return allAvailableTimes; // 🔹 Retorna todos os horários disponíveis
  } catch (error) {
    console.error("❌ Erro ao buscar horários disponíveis:", error.response?.data || error);
    return [];
  }
};


