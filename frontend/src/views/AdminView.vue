<template>
    <h1>Admin</h1>
    <router-link :to="{ name: 'users' }">Uživatelé</router-link>
    |
    <router-link :to="{ name: 'users' }">Hráči</router-link>

    <router-view></router-view>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({});
</script>
