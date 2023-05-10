

<template>
  <main-layout>
    <template #header>
      <h1>Databáze výsledků a hráčů<br>Havířovské Bridžové Akademie</h1>
      <nav>
        <router-link class="nav-link" :to="{ name: 'home' }">
          <div class="letter">D</div>
          <div class="title">
            Domů
          </div>
        </router-link>
        <router-link class="nav-link" :to="{ name: 'tournaments' }">
          <div class="letter">T</div>
          <div class="title">
            Turnaje
          </div>
        </router-link>
        <router-link class="nav-link" :to="{ name: 'players' }">
          <div class="letter">H</div>
          <div class="title">
            Hráči
          </div>
        </router-link>
        <router-link class="nav-link" @click="update" v-show="!isLoggedIn" :to="{ name: 'login' }">
          <div class="letter">P</div>
          <div class="title">
            Přihlásit
          </div>
        </router-link>
        <router-link class="nav-link" v-show="isLoggedIn" :to="{ name: 'logout' }">
          <div class="letter">O</div>
          <div class="title">
            Odhlásit
          </div>
        </router-link>
        <router-link class="nav-link" v-show="isAdmin" :to="{ name: 'admin' }">
          <div class="letter">A</div>
          <div class="title">
            Admin
          </div>
        </router-link>
      </nav>
    </template>
    <template #footer-line>
      © Bridžový spolek Havířov, 2014 - {{ thisYear }}; IČO: 26585995; číslo účtu: 2300926146/2010
    </template>
    <template #default>
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </router-view>

    </template>
  </main-layout>
</template>

<script lang="ts">
import { defineComponent, inject, ref } from 'vue'
import MainLayout from '@/layouts/MainLayout.vue';
import { UserServiceContract } from '@/service/UserServiceContract';

export default defineComponent({
  components: {
    MainLayout
  },
  setup() {
    let isLoggedIn = ref(false);
    let isAdmin = ref(false);
    const userService = inject("userService") as UserServiceContract;

    async function update() {
      isLoggedIn.value = await userService.isLoggedIn();
      isAdmin.value = (await userService.user())?.isAdmin() ?? false;
    }
    userService.userStatusChanged.sub(update);
    update();

    const thisYear = new Date().getFullYear();


    return {
      isLoggedIn,
      isAdmin,
      thisYear,
      update
    }
  },

})
</script>

<style lang="scss">
.head {

  @import "@/style/nav.scss";
}

.content {

  h1 {
    font-size: 26px;
    text-align: center;
    margin-bottom: 10px;
    margin-top: 10px;
  }

}
</style>