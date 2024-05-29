<template>
    <v-row>
        <v-col>
            <h2>Turnaje</h2>
        </v-col>
    </v-row>
    <v-row>
        <v-col>
            <v-data-table :headers="headers" :items="tournaments as Tournament[]" item-key="id" :loading="loading">
                <template v-slot:item.title="{ item }">
                    <td>
                        <router-link :to="{ name: 'tournament', params: { id: item.id, slug: item.slug } }">
                            {{ item.title }}
                        </router-link>
                    </td>
                </template>
            </v-data-table>
        </v-col>
    </v-row>
</template>

<script setup lang="ts">
import { useTournamentStore } from '@/stores/tournamentStore';
import { computed } from 'vue';
import {Tournament} from "@/model/Tournament.ts";

const headers = [
    { title: 'Turnaj', value: 'title', width: '35%' },
    { title: 'Datum', value: 'dateString', width: '20%' },
    { title: 'Počet účastníků', value: 'resultsCount' },
    { title: 'Místo konání', value: 'place', width: "20%" },
    { title: '', },
]

const tournamentStore = useTournamentStore();

const loading = computed(() => tournamentStore.loading);
const tournaments = computed(() => tournamentStore.tournaments);

</script>

<style scoped lang="scss"></style>
