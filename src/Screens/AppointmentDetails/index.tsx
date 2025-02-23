import { View, Text, Button } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

export default function AppointmentDetails() {
  const route = useRoute();
  const navigation = useNavigation();

  // Garante que os parâmetros sempre tenham um valor padrão
  const { date = "Data não informada", time = "Horário não informado", isNew = false, isPast = false } = route.params || {};

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Detalhes do Agendamento</Text>
      <Text>Data: {date}</Text>
      <Text>Horário: {time}</Text>

      {/* Se o agendamento já aconteceu, não exibe botões */}
      {!isPast && !isNew && (
        <>
          <Button title="Editar Agendamento" onPress={() => {}} />
          <Button title="Cancelar Agendamento" onPress={() => {}} color="red" />
        </>
      )}

      {/* Se for um novo agendamento, só exibe o botão de confirmar */}
      {isNew && <Button title="Confirmar Agendamento" onPress={() => {}} />}

      <Button title="Voltar" onPress={() => navigation.goBack()} />
    </View>
  );
}
