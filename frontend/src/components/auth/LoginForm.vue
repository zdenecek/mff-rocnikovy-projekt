<template>
    <form ref="form">
        <input-field class="input-field" label="Email" type="email" v-model="email" :errors="errors?.email" required></input-field>
        <input-field class="input-field" label="Heslo" type="password" v-model="password" :errors="errors?.password" required></input-field>
        <input type="submit" @click.prevent="login" value="Přihlásit">
        <router-link :to="{ name: 'register' }">Registrace</router-link>
    </form>
</template>

<script setup lang="ts">
import { inject, ref } from "vue";
import InputField from "@/components/part/InputField.vue";
import { UserServiceContract } from "@/service/UserServiceContract";
import { useRouter } from "vue-router";


const userService = inject("userService") as UserServiceContract


const email = ref("")
const password = ref("")
const errors = ref({} as any)

const router = useRouter();

const form = ref({} as HTMLFormElement );

function login() {

    if(!form.value.reportValidity()) return;
    
    userService.login(email.value, password.value)
    .then(() => {
        console.debug("redirecting");
        router.push({ name: "home" });
    }
    ).catch((error) => {
        errors.value = error.data?.errors;
    });
}
</script>

<style lang="scss">
@import "@/style/auth-forms.scss";
</style>