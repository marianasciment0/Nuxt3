<template>
  <div class="d-flex justify-content-center align-items-center min-vh-100">
    <form class="w-100 mw-50 p-4" @submit.prevent="handleSubmit">
      <h1 class="h3 mb-3 fw-normal text-center">Iniciar sessão</h1>

      <FormInput id="name" type="text" label="Nome:" placeholder="Digite seu nome" v-model="name" />

      <FormInput id="email" type="email" label="Email:" placeholder="Digite seu email" v-model="email" />

      <FormInput id="password" type="password" label="Senha:" placeholder="Digite sua senha" v-model="password" />

      <SubmitButton :disabled="isButtonDisabled" />

      <ErrorMessage :message="error" />
    </form>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import FormInput from '~/components/form.vue';
import SubmitButton from '~/components/submitButton.vue';
import ErrorMessage from '~/components/ErrorMessage.vue';

const router = useRouter();

const name = ref('');
const email = ref('');
const password = ref('');

const pending = ref(false);
const error = ref(null);

const isButtonDisabled = computed(() => {
  return !name.value || !email.value || !password.value || pending.value;
});

const handleSubmit = async () => {
  pending.value = true;
  error.value = null;

  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: JSON.stringify({
        email: email.value,
        password: password.value,
        name: name.value
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Erro. Tente novamente mais tarde.');
    }

    localStorage.setItem('username', name.value);
    
    let users = JSON.parse(localStorage.getItem('users') || '[]');
    users.push({ id: Date.now(), name: name.value });
    localStorage.setItem('users', JSON.stringify(users));
    
    router.push('/userList');
  } catch (err) {
    error.value = 'Erro ao tentar efetuar login. Tente novamente mais tarde.';
  } finally {
    pending.value = false;
  }
};
</script>

<style scoped>
  .mw-50 {
    max-width: 500px;
  }
</style>
