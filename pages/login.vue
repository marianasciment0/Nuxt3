<template>
  <div class="d-flex justify-content-center align-items-center min-vh-100">
    <form class="w-100 mw-50 p-4" @submit.prevent="handleSubmit">
      <h1 class="h3 mb-3 fw-normal text-center">Iniciar sessão</h1>

      <div class="form-floating mb-3">
        <input type="text" class="form-control" id="name" placeholder="Digite seu nome" v-model="name">
        <label for="name">Nome:</label>
      </div>

      <div class="form-floating mb-3">
        <input type="email" class="form-control" id="email" placeholder="Digite seu email" v-model="email">
        <label for="email">Email:</label>
      </div>

      <div class="form-floating mb-3">
        <input type="password" class="form-control" id="password" placeholder="Digite sua senha" v-model="password">
        <label for="password">Senha:</label>
      </div>

      <button class="btn btn-primary w-100 py-2" type="submit" :disabled="isButtonDisabled">Entrar</button>

      <p v-if="error" class="text-danger mt-2">Erro: {{ error }}</p>
    </form>
  </div>
</template>

<style scoped>
  .mw-50 {
    max-width: 500px;
  }
</style>


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
      throw new Error('Erro. Tente novamente mais tarde.');
    }

    localStorage.setItem('username', name.value);
    
    let users = JSON.parse(localStorage.getItem('users') || '[]');
    users.push({ id: Date.now(), name: name.value });
    localStorage.setItem('users', JSON.stringify(users));
    
    router.push('/listaDeUsuarios');
  } catch (err) {
    error.value = 'Erro ao tentar efetuar login. Tente novamente mais tarde.';
  } finally {
    pending.value = false;
  }
};
</script>
