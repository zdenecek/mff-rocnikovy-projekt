<template>
    <v-app>
        <v-container class="fill-height" fluid>
            <v-row align="center" justify="center">
                <v-col cols="12" sm="10" md="6" lg="4">
                    <router-view />
                </v-col>
            </v-row>
        </v-container>
    </v-app>
</template>

<style scoped lang="scss">
@use "@/styles/colors.scss" as *;

.v-application {
    background-color: $tertiary;
}
</style>

<style lang="scss">
@use "@/styles/colors.scss" as *;
.v-card {
    padding:  2em 2.5em 1.5em;
    border: 1px solid $primary;
    background-color: white;
    min-height: 100%;
}
</style>