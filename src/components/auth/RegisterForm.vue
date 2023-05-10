<template>
    <form>
        <input-field label="Email" type="email" v-model="email" :errors="errors?.email"></input-field>
        <input-field label="Jméno" type="text" v-model="name" :errors="errors?.name"></input-field>
        <input-field label="Heslo" type="password" v-model="password" :errors="errors?.password"></input-field>
        <input-field label="Potvrdit heslo" type="password" v-model="confirmPassword" :errors="errors?.password_confirmation"></input-field>
        <input type="submit" @click.prevent="register" value="Registrovat" />
        <router-link :to="{ name: 'login'}">přihlašte se</router-link>
    </form>

</template>

<script lang="ts">
import { defineComponent, inject } from "vue";
import InputField from "@/components/part/InputField.vue";
import { UserServiceContract } from "@/service/UserServiceContract";

export default defineComponent({
    components: { InputField },
    name: "RegisterView",
    data: function () {
        return {
            userService : inject('userService') as UserServiceContract,
            name : "",
            email: "",
            password: "",
            confirmPassword: "",
            errors: {} as any,
        };
    },
    methods: {
        register() {
            this.errors = {};
            this.userService.register(this.email, this.name, this.password, this.confirmPassword).catch((error) => {
               this.errors = error.data.errors;
           });
        },
    },
});
</script>

<style lang="scss">

form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    gap: 10px;
}

</style>