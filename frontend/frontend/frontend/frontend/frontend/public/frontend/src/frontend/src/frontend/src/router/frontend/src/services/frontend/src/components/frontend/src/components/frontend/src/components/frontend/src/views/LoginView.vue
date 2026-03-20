<template>
  <div class="container">
    <div class="card">
      <h2>Login</h2>

      <form @submit.prevent="handleLogin">
        <input v-model="email" type="email" placeholder="E-mail" required />
        <input v-model="password" type="password" placeholder="Senha" required />
        <button type="submit">Entrar</button>
      </form>

      <p v-if="message">{{ message }}</p>

      <p>
        Não tem conta?
        <router-link to="/register">Cadastre-se</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import api from '../services/api';

const email = ref('');
const password = ref('');
const message = ref('');
const router = useRouter();

const handleLogin = async () => {
  try {
    const { data } = await api.post('/auth/login', {
      email: email.value,
      password: password.value
    });

    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));

    router.push('/dashboard');
  } catch (error) {
    message.value = error.response?.data?.message || 'Erro ao fazer login.';
  }
};
</script>
