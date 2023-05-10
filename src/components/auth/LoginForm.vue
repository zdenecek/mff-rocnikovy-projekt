<template>
    <form>
        <input-field label="Email" type="email" v-model="email" :errors="errors?.email"></input-field>
        <input-field label="Heslo" type="password" v-model="password" :errors="errors?.password"></input-field>
        <input type="submit" @click.prevent="login" value="Login" >
        <router-link :to="{ name: 'register' }">Register</router-link>
    </form>
</template>

<script lang="ts">
import { defineComponent, inject } from "vue";
import InputField from "@/components/part/InputField.vue";
import { UserServiceContract } from "@/service/UserServiceContract";

export default defineComponent({
    components: { InputField },
    name: "LoginView",
    data: function () {
        return {
            userService: inject("userService") as UserServiceContract,
            email: "",
            password: "",
            errors: {} as any,
        };
    },
    methods: {
        login() {
            this.errors = {};
            this.userService.login(this.email, this.password).catch((error) => {
                this.errors = error.data?.errors;
            }).then(() =>
                {
                    console.debug("redirecting");
                    this.$router.push({ name: "home" });
                }
            );
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