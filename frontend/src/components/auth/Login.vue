<template>
  <div>
    <div class="flex justify-center mb-8">
      <Logo></Logo>
    </div>
  <v-card class="elevation-0 form">
    <v-form @submit.prevent="submit" ref="form">
      <h2>Přihlášení</h2>
      <div class="fields">

        <v-text-field label="Email" v-model="email" :rules="emailRules" required density="default"
          :error-messages="errorMessages.email" @input="errorMessages.email = ''"></v-text-field>
        <v-text-field label="Heslo" type="password" v-model="password" :rules="passwordRules" density="default"
          :error-messages="errorMessages.password" @input="errorMessages.password = ''" required></v-text-field>

      </div>
      <v-spacer></v-spacer>
      <v-card-actions class="actions">
   
        <div class="flex ">
          Nemáte účet?
          <RouterLink :to="{ name: 'register' }">Registrujte se</RouterLink>
        </div>
        <v-btn type="submit" :disabled="progress" class="submit" variant="flat"> Přihlásit </v-btn>
      </v-card-actions>
    </v-form>
  </v-card>

</div>

</template>
  
<script setup lang="ts">
import { useAuthStore } from '@/stores/authStore';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Logo from '../Logo.vue';
import { infoToast } from '@/toasts';

const router = useRouter()
const route = useRoute()
const form = ref(null as HTMLFormElement | null);
const authStore = useAuthStore()


// DATA
const email = ref('');
const password = ref('');

// VALIDATION
const emailRules = [
  (v: string) => !!v || 'Vyplňte email',
];
const passwordRules = [
  (v: string) => !!v || 'Vyplňte heslo',
];
const errorMessages = ref({} as any);

// SUBMIT
const progress = ref(false)
async function submit() {
  const validation = await form.value?.validate()
  if (!validation?.valid) {
    return;
  }
  progress.value = true;
  try {
    await authStore.login(email.value, password.value);
    infoToast('Přihlášení proběhlo úspěšně');
    if (route.query.redirect)
      router.push(route.query.redirect as string);
    else router.push({ name: 'home' });
  } catch (error: any) {
    if (error.response?.status === 401) {
      errorMessages.value = { password: 'Špatné heslo' };
    }
    else if (error.response?.status === 404) {
      errorMessages.value = { email: 'Uživatel neexistuje' };
    }
    else {
      errorMessages.value = { email: 'Nastala chyba' };
    }
  } finally {
    progress.value = false
  }
}
</script>
