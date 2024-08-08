<template>
  <div>
    <h1>Login</h1>
    <form @submit.prevent="handleSubmit">
      <div>
        <label for="name">Nome:</label>
        <input type="text" id="name" v-model="name" placeholder="Digite seu nome">
      </div>
      <div>
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="email" placeholder="Digite seu email">
      </div>
      <div>
        <label for="password">Senha:</label>
        <input type="password" id="password" v-model="password" placeholder="Digite sua senha">
      </div>
      <button type="submit" :disabled="isButtonDisabled">Entrar</button>
    </form>
    <p v-if="error">Erro: {{ error }}</p>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';

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
      throw new Error('Erro ao tentar efetuar login. Tente novamente mais tarde.');
    }

    router.push('/listaDeUsuarios');
  } catch (err) {
    error.value = 'Erro ao tentar efetuar login. Tente novamente mais tarde.';
  } finally {
    pending.value = false;
  }
};
</script>
