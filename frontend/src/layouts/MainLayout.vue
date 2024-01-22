
<template>
    <!-- Rest of the script and style sections -->
    <v-app>
        <v-app-bar app color="primary" dark>
            <v-container class="nav-container">
                <v-toolbar-title>
                    <router-link :to="{ name: 'home' }" class="toolbar-link">

                        <div id="logo-wrapper">
                            <img src="@/assets/habra.png" alt="Logo" height="40" id="logo">
                            <span>Matrika BS Havířov</span>
                        </div>
                    </router-link>
                </v-toolbar-title>
                <nav class="nav-buttons">
                    <v-btn variant="text" :to="{ name: 'tournaments' }">Turnaje</v-btn>
                    <v-btn variant="text" :to="{ name: 'players' }">Hráči</v-btn>
                </nav>
            </v-container>
        </v-app-bar>

        <v-main>
            <div class="content-wrapper">

                <v-container>
                    <router-view></router-view>
                </v-container>
            </div>
        </v-main>
    </v-app>
</template>

<style>
#logo-wrapper {
    height: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 20px;
}

.content-wrapper {
    padding-top: 20px;
}

.nav-container {
    display: flex;
    gap: 20px;
}

.nav-buttons {
    display: flex;
    gap: 20px;
    flex-grow: 2;
}

.toolbar-link {
    text-decoration: none;
    color: inherit;
}
</style>