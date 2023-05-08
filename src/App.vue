<template>
  <nav>
    <router-link :to="{ name: 'home' }">Home</router-link>
    <router-link v-show="!isLoggedIn" :to="{ name: 'login' }">Login</router-link>
    <router-link @click="checkLogin" v-show="isLoggedIn" :to="{ name: 'logout' }">Logout</router-link>
    <router-link v-show="isAdmin" :to="{ name: 'admin' }">Admin</router-link>
  </nav>
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { UserServiceContract } from "./service/UserServiceContract";
import { UserRepositoryContract } from "./repository/UserRepositoryContract";

export default defineComponent({
  name: "App",
  provide() {
    return {
      userService: this.userService,
      userRepository: this.userRepository,
    };
  },
  props: {
    userService: Object as () => UserServiceContract,
    userRepository: Object as () => UserRepositoryContract,
  },
  data() {
    return {
      isLoggedIn: false,
      isAdmin: false,
    };
  },
  mounted() {
    this.checkLogin();
  },
  
  watch: {
    userService() {
      this.checkLogin();
    },
  },
  methods: {
    async checkLogin() {
      console.debug("checking login");
      this.isLoggedIn = await this.userService?.isLoggedIn() ?? false;
      this.isAdmin = (await this.userService?.user())?.isAdmin() ?? false;
    },
  },
});
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
  display: flex;
  justify-content: center;
  gap: 20px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
