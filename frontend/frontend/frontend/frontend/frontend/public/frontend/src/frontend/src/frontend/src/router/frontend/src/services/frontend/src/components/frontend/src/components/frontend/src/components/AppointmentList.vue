<template>
  <div class="card">
    <h2>Lista de Agendamentos</h2>

    <div v-if="appointments.length === 0">
      <p>Nenhum agendamento encontrado.</p>
    </div>

    <div v-for="appointment in appointments" :key="appointment._id" class="appointment-item">
      <p><strong>Paciente:</strong> {{ appointment.patient?.name }}</p>
      <p><strong>Data:</strong> {{ appointment.date }}</p>
      <p><strong>Horário:</strong> {{ appointment.time }}</p>
      <p><strong>Endereço:</strong> {{ appointment.address }}</p>
      <p><strong>Clima:</strong> {{ appointment.weatherAlert }}</p>
      <p><strong>Status:</strong> {{ appointment.status }}</p>

      <div class="button-group">
        <button v-if="isSecretary" @click="updateStatus(appointment._id, 'confirmada')">
          Confirmar
        </button>
        <button v-if="isSecretary" @click="updateStatus(appointment._id, 'cancelada')">
          Cancelar
        </button>
        <button @click="removeAppointment(appointment._id)">Excluir</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import api from '../services/api';

const props = defineProps({
  appointments: {
    type: Array,
    default: () => []
  }
});

const emit = defineEmits(['refresh']);

const user = JSON.parse(localStorage.getItem('user') || '{}');
const isSecretary = computed(() => user.role === 'secretario');

const updateStatus = async (id, status) => {
  try {
    await api.put(`/appointments/${id}/status`, { status });
    emit('refresh');
  } catch (error) {
    alert(error.response?.data?.message || 'Erro ao atualizar status.');
  }
};

const removeAppointment = async (id) => {
  try {
    await api.delete(`/appointments/${id}`);
    emit('refresh');
  } catch (error) {
    alert(error.response?.data?.message || 'Erro ao excluir agendamento.');
  }
};
</script>
