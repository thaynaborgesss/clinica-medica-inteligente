<template>
  <nav class="navbar">
    <h1>Clínica Médica Inteligente</h1>
    <div class="nav-links">
      <router-link to="/dashboard">Dashboard</router-link>
      <router-link to="/appointments">Agendamentos</router-link>
      <button @click="logout">Sair</button>
    </div>
  </nav>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  router.push('/login');
};
</script>
