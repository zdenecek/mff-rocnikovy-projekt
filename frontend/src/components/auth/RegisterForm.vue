<script setup lang="ts">
import { ref, inject } from "vue";
import InputField from "@/components/part/InputField.vue";
import { UserServiceContract } from "@/service/UserServiceContract";
import { useRouter } from "vue-router";


const userService = inject('userService') as UserServiceContract;

const email = ref("")
const name = ref("")
const password = ref("")
const confirmPassword = ref("")
const errors = ref({} as any)

const router = useRouter();

const form = ref({} as HTMLFormElement);

function register() {

    if (!form.value.reportValidity()) return;

    userService.register(email.value, name.value, password.value, confirmPassword.value).then(() => {
        console.debug("redirecting");
        router.push({ name: "home" });
    }
    ).catch((error) => {
        errors.value = error.data?.errors;
    });
}
</script>

<template>
    <form ref="form">
        <input-field label="Email" type="email" required v-model="email" :errors="errors?.email"></input-field>
        <input-field label="Jméno" type="text"  required v-model="name" :errors="errors?.name"></input-field>
        <input-field label="Heslo" type="password" minlength="8" required v-model="password" :errors="errors?.password"></input-field>
        <input-field label="Potvrdit heslo" type="password" minlength="8"  required v-model="confirmPassword"
                     :errors="errors?.password_confirmation"></input-field>
        <input type="submit" @click.prevent="register" value="Registrovat" />
        <router-link :to="{ name: 'login' }">Přihlášení</router-link>
    </form>
</template>



<style lang="scss">
@import "@/style/auth-forms.scss";
</style>