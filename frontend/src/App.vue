<template>
    <router-view></router-view>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { UserServiceContract } from "./service/UserServiceContract";
import { UserRepositoryContract } from "./repository/UserRepositoryContract";
import { TournamentRepositoryContract } from "./repository/TournamentRepositoryContract";
import { PlayerRepositoryContract } from "./repository/PlayerRepositoryContract";

export default defineComponent({
  name: "App",
  provide() {
    return {
      userService: this.userService,
      userRepository: this.userRepository,
      tournamentRepository: this.tournamentRepository,
      playerRepository: this.playerRepository,
    };
  },
  props: {
    userService: Object as () => UserServiceContract,
    userRepository: Object as () => UserRepositoryContract,
    tournamentRepository: Object as () => TournamentRepositoryContract,
    playerRepository: Object as () => PlayerRepositoryContract,
  },
});
</script>

<style lang="scss">
@import "@/style/colors.scss";
@import "@/style/common.scss";

#app {
  width: 100%;
  min-height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}


body {
  font-family: Arial;
  width: 100vw;
  height: 100vh;
  overflow-x: hidden;

}

body {
    background: $page-background;
}


h1, h2 {
  user-select: none;
}
</style>
