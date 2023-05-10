<template>
    <router-view></router-view>
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
});
</script>

<style lang="scss">
@import "@/style/colors.scss";


#app {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: Arial;
  width: 100vw;
  height: 100vh;

}

body {
    background: $page-background;
}

</style>
