<template>
  <div class="container mt-4">
    <h1>Painel de Usuários</h1>

    <UserList 
      :users="currentPageUsers" 
      v-model:selectedUsers="selectedUsers" 
    />

    <ActionButtons 
      :selectedUsers="selectedUsers" 
      :deleteSelectedUsers="deleteSelectedUsers" 
    />

    <PaginationControls 
      :currentPage="currentPage" 
      :totalPages="totalPages" 
      :nextPage="nextPage" 
      :prevPage="prevPage" 
    />
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import UserList from '~/components/userList.vue';
import PaginationControls from '~/components/pagination.vue';
import ActionButtons from '~/components/actionButton.vue';

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

<style scoped src="../styles/userList.css"></style>
