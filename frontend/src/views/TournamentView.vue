<template>
    <v-row>
        <v-col>
            <h2>Turnaje</h2>
        </v-col>
    </v-row>
    <v-row>
        <v-col>
            <v-data-table :headers="headers" :items="tournaments" item-key="id" :loading="loading">
            </v-data-table>
        </v-col>
    </v-row>
</template>

<script setup lang="ts">
import { useTournamentStore } from '@/stores/tournamentStore';
import { computed } from 'vue';

const headers = [
    { title: 'Turnaj', value: 'title', width: '35%' },
    { title: 'Datum', value: 'dateString', width: '20%' },
    { title: 'Místo konání', value: 'place', width: "20%" },
    { title: '', },
]

const tournamentStore = useTournamentStore();

const loading = computed(() => tournamentStore.loading);
const tournaments = computed(() => tournamentStore.tournaments);

</script>

<style scoped lang="scss"></style>
