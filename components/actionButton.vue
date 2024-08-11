<template>
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
  </template>
  
  <script setup>
  import { defineProps } from 'vue';
  
  const props = defineProps({
    selectedUsers: Array,
    deleteSelectedUsers: Function
  });
  </script>
  