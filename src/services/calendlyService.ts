import axios from "axios";

const TOKEN = "eyJraWQiOiIxY2UxZTEzNjE3ZGNmNzY2YjNjZWJjY2Y4ZGM1YmFmYThhNjVlNjg0MDIzZjdjMzJiZTgzNDliMjM4MDEzNWI0IiwidHlwIjoiUEFUIiwiYWxnIjoiRVMyNTYifQ.eyJpc3MiOiJodHRwczovL2F1dGguY2FsZW5kbHkuY29tIiwiaWF0IjoxNzQyMDYyNjA0LCJqdGkiOiIxMThiZmFkZS0yMWRlLTQ2MjEtOTRmZS04ODAwMDg2NjU2YzYiLCJ1c2VyX3V1aWQiOiI3NzM1MjJmNS1lYjEzLTQxOTItYmE5OC01ZTNmY2FmOGY3MGEifQ.VDJmr97HUCzRlHcqYef1EWYb_d25VIVUbOK4rlSmv-7XnHl3cJ2ygd3WVVNg_klJBs2QYnJMb8WQzfYAuANNyA";
const API_BASE_URL = "https://api.calendly.com";

/** 
 * 🔍 Busca o ID do usuário logado no Calendly 
 */
export const getUserId = async (): Promise<string | null> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users/me`, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "application/json",
      },
    });

    console.log("✅ ID do usuário encontrado:", response.data.resource.uri);
    return response.data.resource.uri;
  } catch (error) {
    console.error("❌ Erro ao buscar User ID:", error.response?.data || error);
    return null;
  }
};

/** 
 * 🔍 Busca os eventos agendados do usuário
 */
export const getUserScheduledEvents = async (
  userUri: string,
  count?: number,
  pageToken?: string,
  sort?: string,
  status?: string,
  maxStartTime?: string,
  minStartTime?: string
): Promise<any> => {
  let queryParams = [
    `user=${encodeURIComponent(userUri)}`,
    `count=${count || 10}`,
  ].join("&");

  if (pageToken) queryParams += `&page_token=${pageToken}`;
  if (sort) queryParams += `&sort=${sort}`;
  if (status) queryParams += `&status=${status}`;
  if (maxStartTime) queryParams += `&max_start_time=${maxStartTime}`;
  if (minStartTime) queryParams += `&min_start_time=${minStartTime}`;

  const url = `${API_BASE_URL}/scheduled_events?${queryParams}`;

  const { data } = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      "Content-Type": "application/json",
    },
  });

  return data;
};

/**
 * Lista os eventos agendados.
 *
 * Parâmetros opcionais:
 * - count: número de registros (padrão: 20)
 * - group: URI do grupo para filtrar eventos
 * - invitee_email: filtra eventos com o email do convidado
 * - page_token: token para paginação
 * - sort: ordenação, ex: "start_time:asc"
 * - status: "active" ou "canceled"
 * - user: URI do usuário para filtrar eventos
 * - max_start_time: data máxima de início (UTC) no formato ISO
 * - min_start_time: data mínima de início (UTC) no formato ISO
 * - organization: URI da organização para filtrar eventos
 */
export const listEvents = async (options?: {
  count?: number;
  group?: string;
  invitee_email?: string;
  page_token?: string;
  sort?: string;
  status?: string;
  user?: string;
  max_start_time?: string;
  min_start_time?: string;
  organization?: string;
}): Promise<any> => {
  let queryParams = `count=${options?.count || 20}`;
  if (options?.group) queryParams += `&group=${encodeURIComponent(options.group)}`;
  if (options?.invitee_email) queryParams += `&invitee_email=${encodeURIComponent(options.invitee_email)}`;
  if (options?.page_token) queryParams += `&page_token=${encodeURIComponent(options.page_token)}`;
  if (options?.sort) queryParams += `&sort=${encodeURIComponent(options.sort)}`;
  if (options?.status) queryParams += `&status=${encodeURIComponent(options.status)}`;
  if (options?.user) queryParams += `&user=${encodeURIComponent(options.user)}`;
  if (options?.max_start_time) queryParams += `&max_start_time=${encodeURIComponent(options.max_start_time)}`;
  if (options?.min_start_time) queryParams += `&min_start_time=${encodeURIComponent(options.min_start_time)}`;
  if (options?.organization) queryParams += `&organization=${encodeURIComponent(options.organization)}`;

  const url = `${API_BASE_URL}/scheduled_events?${queryParams}`;

  try {
    const { data } = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "application/json",
      },
    });
    return data;
  } catch (error: any) {
    console.error("Erro ao listar eventos:", error.response?.data || error.message);
    throw error;
  }
};

/** 
 * 🔍 Busca todos os tipos de evento do usuário e armazena em cache 
 */
let cachedEventTypes: any[] | null = null;

export const getEventTypes = async (): Promise<any[]> => {
  try {
    if (cachedEventTypes) {
      console.log("🔄 Usando eventos armazenados em cache.");
      return cachedEventTypes;
    }

    const userId = await getUserId();
    if (!userId) throw new Error("❌ User ID não encontrado!");

    const response = await axios.get(`${API_BASE_URL}/event_types`, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "application/json",
      },
      params: { user: userId },
    });

    cachedEventTypes = response.data.collection;
    console.log("✅ Tipos de evento encontrados:", cachedEventTypes);
    return cachedEventTypes;
  } catch (error) {
    console.error("❌ Erro ao buscar tipos de eventos:", error.response?.data || error);
    return [];
  }
};

/** 
 * 🔍 Busca o ID de um evento específico pelo seu slug 
 */
export const getEventTypeId = async (eventSlug: string): Promise<string | null> => {
  try {
    const events = await getEventTypes();
    if (events.length === 0) throw new Error("❌ Nenhum evento encontrado!");

    console.log("📋 Lista de eventos disponíveis:");
    events.forEach((e: any) =>
      console.log(`- Slug: ${e.slug}, Nome: ${e.name}`)
    );

    const event = events.find(
      (e: any) => e.slug.toLowerCase() === eventSlug.toLowerCase()
    );

    if (!event) {
      console.error(
        `❌ Evento não encontrado! Slug recebido: "${eventSlug}". Verifique a lista de eventos acima.`
      );
      return null;
    }

    console.log("✅ Evento encontrado:", event.uri);
    return event.uri;
  } catch (error) {
    console.error("❌ Erro ao buscar eventos:", error.response?.data || error);
    return null;
  }
};

/** 
 * ⏳ Busca os horários disponíveis do primeiro evento encontrado
 */
export const getAvailableTimes = async (daysAhead: number = 30): Promise<any[]> => {
  try {
    const events = await getEventTypes();
    if (!events || events.length === 0) throw new Error("Nenhum evento encontrado!");

    const eventType = events[0];
    const eventId = eventType.uri;

    let allAvailableTimes: any[] = [];
    const now = new Date();
    now.setMinutes(now.getMinutes() + 5); // Garante que começa no futuro

    for (let i = 0; i < daysAhead; i += 7) {
      const startDate = new Date(now);
      startDate.setDate(now.getDate() + i);

      const endDate = new Date(startDate);
      endDate.setDate(startDate.getDate() + 6); // Intervalo máximo de 7 dias

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

    return allAvailableTimes;
  } catch (error: any) {
    console.error("❌ Erro ao buscar horários disponíveis:", error.response?.data || error);
    return [];
  }
};

/** 
 * 🔥 Cria um link de agendamento de uso único automaticamente
 */
export async function createSchedulingLink() {
  try {
    const events = await getEventTypes();
    if (!events || events.length === 0) {
      throw new Error("❌ Nenhum evento disponível para criar link de agendamento.");
    }

    const eventType = events[0];
    console.log("✅ Evento selecionado automaticamente:", eventType.name, "-", eventType.uri);

    const requestBody = {
      owner: eventType.uri,
      owner_type: "EventType",
      max_event_count: 1,
    };

    console.log("📤 Enviando requisição com body:", JSON.stringify(requestBody, null, 2));

    const response = await axios.post(`${API_BASE_URL}/scheduling_links`, requestBody, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "application/json",
      },
    });

    console.log("📩 Resposta Completa do Calendly:", JSON.stringify(response.data, null, 2));

    const schedulingUrl = response.data?.resource?.booking_url || null;

    if (!schedulingUrl) {
      throw new Error("❌ A API do Calendly não retornou um booking_url válido.");
    }

    console.log("✅ Link de agendamento criado com sucesso:", schedulingUrl);
    return schedulingUrl;
  } catch (error) {
    console.error(
      "❌ Erro ao criar link de agendamento:",
      JSON.stringify(error.response?.data || error.message, null, 2)
    );
    return null;
  }
}


export const cancelEvent = async (eventId: string, reason: string): Promise<any> => {
  // Extrai o UUID do eventId
  const uuid = eventId.split("/").pop();
  console.log("Tentando cancelar o evento com UUID:", uuid);
  const url = `${API_BASE_URL}/scheduled_events/${uuid}/cancellation`;
  console.log("URL de cancelamento:", url);
  
  const { data } = await axios.post(url, { reason }, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      "Content-Type": "application/json",
    },
  });
  return data;
};

