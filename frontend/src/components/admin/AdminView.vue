<template>
    <v-row>
        <v-col>
            <h2>Admin</h2>
        </v-col>
    </v-row>
    <v-row>
        <v-col>
            <h2>Turnaje</h2>
            <v-list nav class="pane">
                <v-list-item :to="{ name: 'admin-add-tournament' }" prepend-icon="mdi-plus-outline"> Přidat turnaj</v-list-item>
                <v-list-item :to="{ name: 'admin-tournament-list' }" prepend-icon="mdi-format-list-bulleted-square"> Seznam turnajů</v-list-item>
            </v-list>
        </v-col>
        <v-col>
            <h2>Série</h2>
            <v-list nav class="pane">
                <v-list-item :to="{ name: 'admin-series-list' }" prepend-icon="mdi-folder-multiple-outline"> Seznam sérií</v-list-item>
                <v-list-item :to="{ name: 'admin-add-series' }" prepend-icon="mdi-folder-plus-outline"> Přidat sérii</v-list-item>
            </v-list>
        </v-col>
        <v-col>
            <h2>Uživatelé</h2>
            <v-list nav class="pane">
                <v-list-item :to="{ name: 'admin-user-list' }" prepend-icon="mdi-account-group-outline"> Seznam uživatelů</v-list-item>
            </v-list>
        </v-col>
    </v-row>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
@import "@/styles/colors.scss";
</style>
