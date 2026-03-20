<template>
  <div class="container">
    <div class="card">
      <h2>Bem-vindo(a)!</h2>
      <p><strong>Usuário:</strong> {{ user.name }}</p>
      <p><strong>E-mail:</strong> {{ user.email }}</p>
      <p><strong>Perfil:</strong> {{ user.role }}</p>

      <router-link to="/appointments">
        <button>Ir para Agendamentos</button>
      </router-link>
    </div>
  </div>
</template>

<script setup>
const user = JSON.parse(localStorage.getItem('user') || '{}');
</script>
