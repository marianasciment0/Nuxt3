<template>
    <div>
      <h1>Lista de Usuários</h1>
      <div v-if="users.length">
        <ul>
          <li v-for="user in users" :key="user.id">
            <input
              type="checkbox"
              v-model="selectedUsers"
              :value="user.id"
            />
            {{ user.name }}
          </li>
        </ul>
      </div>
      
      <div v-else>
        <p>Nenhum usuário encontrado.</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  
  const users = ref([]);
  const selectedUsers = ref([]);
  
  onMounted(() => {
    users.value = JSON.parse(localStorage.getItem('users') || '[]');
  });
  </script>
  