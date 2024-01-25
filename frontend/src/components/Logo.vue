<template>
    <router-link :to="{ name: 'home' }" class="logo">
            <h1>MATRIKA</h1>
    </router-link>
</template>

<style lang="scss" scoped>
@import "@/styles/colors.scss";

.logo {
    text-decoration: none;
    color: inherit;
}


h1 {
    color: $primary;
    font-weight: bold;
    font-size: 2.5em;
    line-height: 1.2em;
    padding-bottom: 0;
}


</style>