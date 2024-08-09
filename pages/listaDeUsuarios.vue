<template>
  <div class="container mt-4">
    <h1>Painel de Usuários</h1>

    <div v-if="currentPageUsers.length" class="list-group">
      <label v-for="user in currentPageUsers" :key="user.id" class="list-group-item d-flex gap-2">
        <input class="form-check-input flex-shrink-0" type="checkbox" v-model="selectedUsers" :value="user.id" />
        <span>
          {{ user.name }}
        </span>
      </label>
    </div>
    
    <div v-else>
      <p>Nenhum usuário encontrado.</p>
    </div>

    <div class="d-flex gap-2 mt-3">
      <button
        @click="deleteSelectedUsers"
        :disabled="!selectedUsers.length"
        class="btn btn-danger"
      >
        Excluir
      </button>
      <nuxt-link to="/login">
        <button class="btn btn-secondary">
          Sair
        </button>
      </nuxt-link>
    </div>

    <div v-if="totalPages > 1" class="pagination-controls mt-3 d-flex justify-content-center">
      <button
        @click="prevPage"
        :disabled="currentPage === 1"
        class="btn btn-primary me-2"
      >
        Anterior
      </button>
      <button
        @click="nextPage"
        :disabled="currentPage === totalPages"
        class="btn btn-primary"
      >
        Próxima
      </button>
    </div>

    <p class="page-info">Página Atual: {{ currentPage }}</p>
    <p class="page-info">Total de Páginas: {{ totalPages }}</p>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';

const loggedInUserName = ref(localStorage.getItem('username') || '');

const dummyUsers = [
  { id: 2, name: 'Carlos Oliveira' },
  { id: 3, name: 'Fernanda Costa' },
  { id: 4, name: 'João Santos' },
  { id: 5, name: 'Juliana Pereira' },
  { id: 6, name: 'Luiz Santos' },
  { id: 7, name: 'Maria Oliveira' },
  { id: 8, name: 'Pedro Almeida' },
  { id: 9, name: 'Roberta Souza' },
  { id: 10, name: 'Tiago Lima' },
  { id: 11, name: 'Mariana Lima' }
];

const users = ref([]);
const selectedUsers = ref([]);
const currentPage = ref(1);
const usersPerPage = 10;

onMounted(() => {
  users.value = [
    { id: 1, name: loggedInUserName.value },
    ...dummyUsers
  ];
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
  
  if (currentPage.value > totalPages.value && totalPages.value > 1) {
    currentPage.value = totalPages.value;
  } else if (!currentPageUsers.value.length && currentPage.value > 1) {
    currentPage.value -= 1;
  }
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

<style scoped>
.pagination-controls {
  margin-top: 1rem;
  text-align: center;
}

.page-info {
  font-size: 0.8rem;
  color: #6c757d;
  text-align: center;
  margin-top: 1rem;
}

.d-flex .btn {
  margin-right: 0.5rem;
}
</style>
