
<template>
    <v-app>
        <v-container class="outer-container">
            <v-row class="main-wrapper">
                <v-col>
                    <v-card class="elevation-0">
                        <v-container>
                            <v-row>
                                <v-col cols="3" class="flex align-center">
                                    <router-link :to="{ name: 'home' }" class="toolbar-link">
                                        <div class="logo-header-wrapper">
                                            <h1 class="logotype">MATRIKA</h1>
                                        </div>
                                    </router-link>
                                </v-col>
                                <v-col nav cols="7" class="nav-buttons">
                                    <router-link v-for="navButton in topNavButtons" :to="{ name: navButton.name }"
                                        class="router-link">
                                        <div class="link-inner">
                                            {{ navButton.text.toLocaleUpperCase() }}
                                        </div>
                                    </router-link>
                                </v-col>

                                <v-col cols="2" class="account-section justify-end">
                                    <v-menu v-if="user">
                                        <template v-slot:activator="{ props }">
                                            <v-list nav  v-bind="props">
                                                <v-list-item link> 
                                                    <template v-slot:append>
                                                        <v-avatar size="50">
                                                            <v-img :src="avatar1" />
                                                        </v-avatar>
                                                    </template>
                                                    <span class="name"> {{ user?.firstName }}</span>
                                                </v-list-item>
                                            </v-list>
                                        </template>
                                        <v-list density="comfortable">
                                            <v-list-item @click-once="authStore.logout">
                                                <v-list-item-title>Odhlásit</v-list-item-title>
                                            </v-list-item>
                                        </v-list>
                                    </v-menu>
                                    <v-btn v-else :to="{ name: 'login' }" variant="text" class="login-link" color="primary"
                                        size="large">
                                        Přihlásit se
                                    </v-btn>
                                </v-col>
                            </v-row>
                            <v-row v-if="subNav && false">
                                <v-col cols="9" class="subnav flex">
                                    <router-link :to="item.to" v-for="item in subNav">
                                        {{ item.text }}
                                    </router-link>

                                </v-col>
                                <v-col cols="3" class="flex align-center">
                                    <v-text-field prepend-inner-icon="mdi-magnify" variant="solo" density="compact"
                                        class="searchbar w-100" flat :ripple="false" hide-details></v-text-field>
                                </v-col>
                            </v-row>

                            <router-view></router-view>
                        </v-container>
                    </v-card>
                </v-col>
            </v-row>
            <v-row class="footer">
                <v-col class="flex align-center flex-col">
                    <router-link class="link" :to="{ name: 'privacy-policy' }">
                        Ochrana osobních údajů
                    </router-link>
                    <a href="mailto:zdnek.tomis@gmail.com">
                        Webmaster
                    </a>
                    <div class="copy">
                        &copy; Bridžový spolek Havířov {{ new Date().getFullYear() }}
                    </div>

                </v-col>
            </v-row>
        </v-container>
    </v-app>
</template>

<script setup lang="ts">
import avatar1 from "@/assets/avatar2.png";
import { useAuthStore } from "@/stores/authStore";
import { computed } from "vue";
import { useRoute } from "vue-router";
const topNavButtons = [
    {
        name: 'tournaments', text: 'Turnaje'
    },
    {
        name: 'players', text: 'Hráči'
    },
    // {
    //     name: 'series', text: 'Série'
    // },
    // {
    //     name: 'admin', text: 'Admin'
    // }
]

const route = useRoute();
const subNav = computed(() => route.meta.subnav as { to: any; text: string }[] | undefined);

const authStore = useAuthStore();
const user = computed(() => authStore.user);
</script>

<style lang="scss" scoped>
@use "@/styles/colors.scss" as *;

.v-application {
    background-color: $tertiary;
}

.outer-container {
    height: 100%;
    margin: auto;
}

.main-wrapper {

    min-height: calc(100vh - 16px);

    &>.v-col>.v-card {
        padding: 1em 1em;
        border: 1px solid $primary;
        background-color: white;
        min-height: 100%;
        /* TODO: breakpoints */
    }
}

.account-section {
    .v-list {
        padding: 0;

        .v-list-item {
            padding: 0;
            padding-left: 1.2em;
            border-radius: 20px;
        }
    }
}

/* LOGO HEADER */
.logo-header-wrapper {
    display: flex;
    flex-direction: column;
}

.logotype {
    color: $primary;
    font-weight: bold;
    font-size: 2.5em;
    line-height: 1.2em;
    padding-bottom: 0;
}

/* MAIN NAVIGATION */
.toolbar-link,
.router-link,
.link {
    text-decoration: none;
    color: inherit;
}

.nav-buttons {
    display: flex;
    gap: 40px;
    align-items: center;

    .router-link {
        padding-bottom: 5px;
        display: flex;
    }

    .router-link-active {
        background: linear-gradient(to right, $secondary, $primary);
    }

    .router-link:hover:not(.router-link-active) {
        background: $tertiary;
    }

    .link-inner {
        font-size: 1.2em;
        padding-bottom: .5em;
        padding-top: .5em;
        background-color: white;
        color: $primary;
        /* Aligns the border with the text baseline */
    }
}


.account-section {
    display: flex;
    align-items: center;
    gap: 1em;

    .name {
        font-size: 1.2em;
    }
}

.subnav {
    outline: 1px solid transparent;
    min-height: 2.8em;
    gap: 0;
    display: flex;


    a {
        color: $primary;
        text-decoration: none;
        display: flex;
        align-items: center;
        padding: .5em 1.2em;
        border: 1px solid $primary;
        text-transform: uppercase;
        margin-left: -1px;

        text-align: center;

        &:hover {
            background-color: $tertiary;
        }
    }
}

.searchbar {
    border: 1px solid $primary;
    height: 100%;
    display: flex;
    align-items: center;

    &> :deep(div) {
        width: 100%;
    }

}

/* FOOTER */
.footer {
    padding-top: 40px;

    a {
        color: $primary;
        text-decoration: none;
    }

    .copy {
        font-size: smaller;
        font-style: italic;
    }
}
</style>

<style lang="scss">
@use "@/styles/colors.scss" as *;

h2 {
    font-size: 1.5em;
    text-transform: uppercase;
    color: $primary;
}

th {
    font-size: 1.2em;
    color: $primary;
    text-transform: uppercase;
}
</style>