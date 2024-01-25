<template>
  <div>
    <div class="flex justify-center mb-8">
      <Logo></Logo>
    </div>
    <v-card class="elevation-0 form">
      <v-form @submit.prevent="submit" ref="form">
        <h2>Registrace</h2>
        <div class="fields">
          <div class="flex gap-1">
            <v-text-field label="Jméno" v-model="firstName" :rules="firstNameRules" required density="comfortable"
              :error-messages="errorMessages.firstName" @input="errorMessages.firstName = ''"></v-text-field>
            <v-text-field label="Přijmení" v-model="lastName" :rules="lastNameRules" required density="comfortable"
              :error-messages="errorMessages.lastName" @input="errorMessages.lastName = ''"></v-text-field>
          </div>
          <v-text-field label="Email" v-model="email" :rules="emailRules" required density="comfortable"
            :error-messages="errorMessages.email" @input="errorMessages.email = ''"></v-text-field>
          <v-text-field label="Heslo" type="password" v-model="password" :rules="passwordRules" density="comfortable"
            :error-messages="errorMessages.password" @input="errorMessages.passwordAgain = ''" required></v-text-field>
          <v-text-field label="Heslo znovu" type="password" v-model="passwordAgain" :rules="passwordAgainRules" density="comfortable"
            :error-messages="errorMessages.passwordAgain" @input="errorMessages.passwordAgain = ''" required></v-text-field>
          <v-checkbox v-model="agreement" :rules="agreementRules">
            <template v-slot:label>
              <span>
                Souhlasím s <router-link :to="{ name: 'home' }"> podmínkami ochrany osobních údajů</router-link>
              </span>
            </template>
          </v-checkbox>
        </div>
        <v-spacer></v-spacer>
        <v-card-actions class="actions">
          <v-btn type="submit" :disabled="progress" class="submit" variant="flat"> Registrovat </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>

  </div>
</template>
  
<script setup lang="ts">
import { useAuthStore } from '@/stores/authStore';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import Logo from '../Logo.vue';
import { infoToast } from '@/toasts';

const router = useRouter()
const form = ref(null as HTMLFormElement | null);
const authStore = useAuthStore()


// DATA
const email = ref('');
const firstName = ref('');
const lastName = ref('');
const password = ref('');
const passwordAgain = ref('');
const agreement = ref('');


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
    await authStore.register(email.value, password.value, firstName.value, lastName.value);
    infoToast('Registrace proběhla úspěšně, nyní se můžete přihlásit.');
    router.push({ name: 'login' });
  } catch (error: any) {
    if (error.response?.status === 409) {
      errorMessages.value = { email: 'Uživatel již existuje' };
    }
    else {
      errorMessages.value = { email: 'Nastala chyba' };
    }
  } finally {
    progress.value = false
  }
}
</script>
