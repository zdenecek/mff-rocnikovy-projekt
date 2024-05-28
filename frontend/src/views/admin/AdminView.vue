<template>
    <v-row>
        <v-col>
            <h2>Admin</h2>
        </v-col>
    </v-row>
    <v-row>
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
