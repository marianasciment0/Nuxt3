<template>
  <div>
    <h1>Lista de Usuários</h1>
    <div v-if="currentPageUsers.length">
      <ul>
        <li v-for="user in currentPageUsers" :key="user.id">
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

    <button
      @click="deleteSelectedUsers"
      :disabled="!selectedUsers.length"
    >
      Excluir
    </button>

    <nuxt-link to="/login">
      <button>
        Sair
      </button>
    </nuxt-link>

    <div v-if="totalPages > 1">
      <button
        @click="prevPage"
        :disabled="currentPage === 1"
      >
        Anterior
      </button>
      <button
        @click="nextPage"
        :disabled="currentPage === totalPages"
      >
        Próxima
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';

const users = ref([]);
const selectedUsers = ref([]);
const currentPage = ref(1);
const usersPerPage = 10;

onMounted(() => {
  users.value = JSON.parse(localStorage.getItem('users') || '[]');
});

const totalPages = computed(() => Math.ceil(users.value.length / usersPerPage));

const currentPageUsers = computed(() => {
  const start = (currentPage.value - 1) * usersPerPage;
  const end = start + usersPerPage;
  return users.value.slice(start, end);
});

const deleteSelectedUsers = () => {
  users.value = users.value.filter(user => !selectedUsers.value.includes(user.id));
  selectedUsers.value = [];
  localStorage.setItem('users', JSON.stringify(users.value));
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value += 1;
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value -= 1;
  }
};
</script>