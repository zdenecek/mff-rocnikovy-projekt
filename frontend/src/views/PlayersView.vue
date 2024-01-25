<template>
    <v-row>
        <v-col>
            <div class="flex spaced">
                <h2>Hráči</h2>
                <v-btn @click="showFilter = true" v-show="!showFilter">Filtrovat</v-btn>
                <template v-if="showFilter">
                    <v-btn @click="hideFilter">Zrušit filtraci</v-btn>
                    <v-btn @click="resetFilter">Smazat filtr</v-btn>
                </template>
                <v-btn :to="{ name: 'admin-add-player' }" v-if="admin">Přidat hráče</v-btn>
            </div>
        </v-col>
    </v-row>

    <v-row v-if="showFilter">
        <v-col class="flex gap-1" lg="8">
            <v-text-field label="Jméno"></v-text-field>
            <v-text-field label="Číslo hráče"></v-text-field>
            <v-text-field label="Kategorie"></v-text-field>
        </v-col>
    </v-row>
    <v-row>
        <v-col>
            <v-data-table :headers="headers" :items="players" item-key="id" :loading="loading">
            </v-data-table>
        </v-col>
    </v-row>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/authStore';
import { usePlayerStore } from '@/stores/playerStore';
import { computed, ref } from 'vue';

const headers = [
    { title: 'Jméno', value: 'firstName', sortable: false, width: '10%' },
    { title: 'Příjmení', value: 'lastName', sortable: true, width: '10%' },
    { title: 'Číslo hráče', value: 'federationId', sortable: true, width: '15%' },
    { title: 'Kategorie', value: 'category', sortable: true }
]

const playerStore = usePlayerStore();

const players = computed(() => playerStore.players);
const loading = computed(() => playerStore.loading);

const authStore = useAuthStore();
const admin = computed(() => authStore.admin);

const showFilter = ref(false);
function hideFilter() {
    showFilter.value = false;
    resetFilter();
}
function resetFilter() {

}

</script>
