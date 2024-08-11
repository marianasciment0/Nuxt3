<template>
    <div class="form-floating mb-3">
      <input 
        :type="type" 
        class="form-control" 
        :id="id" 
        :placeholder="placeholder" 
        :value="modelValue"
        @input="updateValue"
      />
      <label :for="id">{{ label }}</label>
    </div>
  </template>
  
  <script setup>
  import { defineProps, defineEmits } from 'vue';
  
  const props = defineProps({
    id: String,
    type: String,
    placeholder: String,
    label: String,
    modelValue: String
  });
  
  const emits = defineEmits(['update:modelValue']);
  
  const updateValue = (event) => {
    emits('update:modelValue', event.target.value);
  };
  </script>
  