<template>
  <div v-if="users.length" class="list-group">
    <label v-for="user in users" :key="user.id" class="list-group-item d-flex gap-2">
      <input 
        class="form-check-input flex-shrink-0" 
        type="checkbox" 
        :value="user.id" 
        :checked="isSelected(user.id)"
        @change="handleChange(user.id)"
      />
      <span>{{ user.name }}</span>
    </label>
  </div>
  <div v-else>
    <p>Nenhum usuário encontrado.</p>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  users: Array,
  selectedUsers: Array
});

const emit = defineEmits(['update:selectedUsers']);

const isSelected = (userId) => {
  return props.selectedUsers.includes(userId);
};

const handleChange = (userId) => {
  const updatedSelectedUsers = isSelected(userId)
    ? props.selectedUsers.filter(id => id !== userId)
    : [...props.selectedUsers, userId];
  
  emit('update:selectedUsers', updatedSelectedUsers);
};
</script>
