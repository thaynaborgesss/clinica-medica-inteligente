<template>
  <div class="container">
    <div class="card">
      <h2>Cadastro</h2>

      <form @submit.prevent="handleRegister">
        <input v-model="name" type="text" placeholder="Nome" required />
        <input v-model="email" type="email" placeholder="E-mail" required />
        <input v-model="password" type="password" placeholder="Senha" required />

        <select v-model="role">
          <option value="paciente">Paciente</option>
          <option value="secretario">Secretário</option>
        </select>

        <button type="submit">Cadastrar</button>
      </form>

      <p v-if="message">{{ message }}</p>

      <p>
        Já tem conta?
        <router-link to="/login">Entrar</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import api from '../services/api';

const name = ref('');
const email = ref('');
const password = ref('');
const role = ref('paciente');
const message = ref('');
const router = useRouter();

const handleRegister = async () => {
  try {
    await api.post('/auth/register', {
      name: name.value,
      email: email.value,
      password: password.value,
      role: role.value
    });

    message.value = 'Cadastro realizado com sucesso!';
    setTimeout(() => router.push('/login'), 1000);
  } catch (error) {
    message.value = error.response?.data?.message || 'Erro ao cadastrar.';
  }
};
</script>
