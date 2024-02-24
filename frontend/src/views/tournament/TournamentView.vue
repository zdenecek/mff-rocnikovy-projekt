<template>
    <v-row>
        <v-col>
            <h2>{{ tournament?.title ?? "Turnaj" }}</h2>
        </v-col>
    </v-row>
    <v-row>
        <v-col cols="4">
            <p>
                {{ tournament.description }}
            </p>
            <v-table class="pt-4" v-if="tournament">
                <tbody>
                    <tr>
                        <td>{{ tournament.type }}</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Místo konání </td>
                        <td>{{ tournament.place }}</td>
                    </tr>
                    <tr>
                        <td>Datum konání </td>
                        <td>{{ tournament.dateString }}</td>
                    </tr>
                </tbody>
            </v-table>
            <div>
                <v-btn>Dokumentace</v-btn>
            </div>
        </v-col>    
        <v-col cols="8" v-if="tournament?.results">
            <v-data-table :headers="headers" :items="tournament.results" :items-per-page="tournament.results.length"
                item-key="id">
                <template v-slot:bottom></template>
                <template v-slot:item.rank="{ item }">
                    <td>{{ item.rank }}.</td>
                </template>
                <template v-slot:item.players="{ item }">
                    <td>
                        <template v-for="player, index in item.players">
                            <template v-if="index > 0">, </template>
                            <router-link :to="{ name: 'home' }">
                                {{ player.fullName }}
                            </router-link>
                        </template>

                    </td>
                </template>
            </v-data-table>
        </v-col>
    </v-row>
</template>

<script setup lang="ts">
import { Tournament } from '@/model/Tournament';
import { useTournamentStore } from '@/stores/tournamentStore';
import { onMounted } from 'vue';
import { watch } from 'vue';
import { ref } from 'vue';
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const tournamentStore = useTournamentStore();

const route = useRoute();
const id = computed(() => route.params.id ? Number.parseInt(route.params.id as string) : null);

const tournamentLoad = ref(null as null | Tournament);

async function loadTournament() {
    if (tournamentLoad.value?.id === id.value) return;
    if (id.value === null) {
        tournamentLoad.value = null;
        return;
    }
    tournamentLoad.value = await tournamentStore.fetchTournamentById(id.value);
}

// use tournament without result details before the full record is fetched
const tournamentPreload = computed(() => tournamentStore.tournaments.filter(tournament => tournament.id === id.value)[0]);

// use tournament with result details after the full record is fetched
const tournament = computed(() => tournamentLoad.value ?? tournamentPreload.value ?? null);

// load tournament on id change
watch(id, loadTournament);
// load tournament on mount
onMounted(loadTournament);

const loading = computed(() => tournament.value === null);

const teamHaveNames = computed(() => tournament.value?.type === "team" && tournament.value?.results?.some(result => result.title));

const headers = computed(() => {
    if (tournament.value?.type === "team" && teamHaveNames.value)
        return [
            { title: 'Pořadí', value: 'rank' },
            { title: 'Tým', value: 'title' },
            { title: 'Hráči v týmu', value: 'players' },
            { title: 'Výsledek', value: 'scoreAchieved' },
        ]
    else if (tournament.value?.type === "team")
        return [
            { title: 'Pořadí', value: 'rank' },
            { title: 'Tým', value: 'title' },
            { title: 'Výsledek', value: 'scoreAchieved' },
        ]
    else if (tournament.value?.type === "pair")
        return [
            { title: 'Pořadí', value: 'rank' },
            { title: 'Pár', value: 'players' },
            { title: 'Výsledek', value: 'scoreAchieved' },
        ]
    else return [
        { title: 'Pořadí', value: 'rank' },
        { title: 'Hráč', value: 'players' },
        { title: 'Výsledek', value: 'scoreAchieved' },
    ]
});
</script>

<style scoped lang="scss"></style>
