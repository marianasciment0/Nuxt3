<template>
    <p v-if="message" class="text-danger mt-2">Erro: {{ message }}</p>
  </template>
  
  <script setup>
  import { defineProps } from 'vue';
  
  const props = defineProps({
    message: String
  });
  </script>
  