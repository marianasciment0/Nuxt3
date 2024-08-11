<template>
    <button class="btn btn-primary w-100 py-2" type="submit" :disabled="disabled">
      Entrar
    </button>
  </template>
  
  <script setup>
  import { defineProps } from 'vue';
  
  const props = defineProps({
    disabled: Boolean
  });
  </script>
  