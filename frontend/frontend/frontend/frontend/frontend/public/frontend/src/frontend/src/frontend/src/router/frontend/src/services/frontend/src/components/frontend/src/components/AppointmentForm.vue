<template>
  <div class="card">
    <h2>Agendar Consulta</h2>

    <form @submit.prevent="handleSubmit">
      <input v-model="form.date" type="date" required />
      <input v-model="form.time" type="time" required />
      <input v-model="form.cep" type="text" placeholder="CEP" required />

      <button type="button" @click="buscarCep">Buscar Endereço</button>

      <input v-model="form.address" type="text" placeholder="Endereço" readonly />
      <textarea v-model="form.notes" placeholder="Observações"></textarea>

      <button type="button" @click="buscarClima">Verificar Clima</button>

      <p v-if="form.weatherAlert"><strong>{{ form.weatherAlert }}</strong></p>

      <button type="submit">Agendar</button>
    </form>

    <p v-if="message">{{ message }}</p>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import api from '../services/api';

const emit = defineEmits(['appointment-created']);

const message = ref('');

const form = reactive({
  date: '',
  time: '',
  cep: '',
  address: '',
  weatherAlert: '',
  notes: ''
});

const buscarCep = async () => {
  try {
    const { data } = await api.get(`/integrations/cep/${form.cep}`);
    form.address = data.address;
  } catch (error) {
    message.value = error.response?.data?.message || 'Erro ao buscar CEP.';
  }
};

const buscarClima = async () => {
  try {
    const { data } = await api.get(`/integrations/weather/${form.date}`);
    form.weatherAlert = data.weatherAlert;
  } catch (error) {
    message.value = error.response?.data?.message || 'Erro ao buscar clima.';
  }
};

const handleSubmit = async () => {
  try {
    await api.post('/appointments', form);
    message.value = 'Consulta agendada com sucesso!';

    form.date = '';
    form.time = '';
    form.cep = '';
    form.address = '';
    form.weatherAlert = '';
    form.notes = '';

    emit('appointment-created');
  } catch (error) {
    message.value = error.response?.data?.message || 'Erro ao agendar consulta.';
  }
};
</script>
