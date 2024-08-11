<template>
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
  </template>
  
  <script setup>
  import { defineProps } from 'vue';
  
  const props = defineProps({
    currentPage: Number,
    totalPages: Number,
    nextPage: Function,
    prevPage: Function
  });
  </script>
  