<template>
    <v-row class="flex spaced align-center">
        <v-col cols="auto">
            <h2>{{ tournament?.title ?? "Turnaj" }}</h2>
        </v-col>
        <v-col cols="auto" v-if="tournament?.externalDocumentationLink">
            <v-btn variant="outlined" :href="tournament.externalDocumentationLink">Dokumentace</v-btn>
        </v-col>
        <v-col v-if="admin && tournament">
            <v-btn prepend-icon="mdi-pen"
                :to="{ name: 'admin-edit-tournament', params: { id: tournament.id } }">Upravit</v-btn>
        </v-col>
    </v-row>
    <v-row>
        <v-col md="4">
            <v-container class="pa-0">
                <template v-if="tournament">
                    <v-row>
                        <v-col>
                            {{ tournament.description }}
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                            <v-table>
                                <tbody>
                                    <tr>
                                        <td colspan="2">{{ tournamentTypeTitle }}</td>
                                    </tr>
                                    <tr>
                                        <td>Místo konání </td>
                                        <td>{{ tournament.place }}</td>
                                    </tr>
                                    <tr>
                                        <td>Datum konání </td>
                                        <td>{{ tournament.dateString }}</td>
                                    </tr>
                                    <tr>
                                        <td v-if="tournament.type == 'team'">Počet týmů</td>
                                        <td v-else-if="tournament.type == 'pair'">Počet párů</td>
                                        <td v-else>Počet hráčů</td>
                                        <td>{{ tournament.results?.length }}</td>
                                    </tr>
                                </tbody>
                            </v-table>
                        </v-col>
                    </v-row>
                </template>
            </v-container>
        </v-col>
        <v-col md="8" v-if="tournament?.results" cols="12" class="d-none d-sm-block pt-0">
            <v-skeleton-loader :loading="loading" type="paragraph@10">
                <v-data-table :headers="headers" :items="tournament.results" :items-per-page="tournament.results.length"
                    item-key="id">
                    <template v-slot:bottom></template>
                    <template v-slot:item.rank="{ item }">
                        <td>{{ item.rank }}.</td>
                    </template>
                    <template v-slot:item.title="{ item }">
                        <td>
                            {{ item.title }}
                        </td>
                    </template>
                    <template v-slot:item.players="{ item }">
                        <td class="players">
                            <template v-for="player, index in item.players">
                                <template v-if="index > 0">, </template>
                                <router-link :to="{ name: 'home' }">
                                    {{ player.fullName }}
                                </router-link>
                            </template>
                        </td>
                    </template>
                </v-data-table>
            </v-skeleton-loader>
        </v-col>
        <v-col cols="12" class="d-sm-none">
            <v-skeleton-loader :loading="loading" type="paragraph@10">
                <v-table density="compact">
                    <tbody>
                        <tr v-for="result in tournament?.results">
                            <td>
                                {{ result.rank }}.
                            </td>
                            <td>
                                <div class="team-name" v-if="teamHaveNames">{{ result.title }}</div>
                                <div>
                                    <template v-for="player, index in result.players">
                                        <template v-if="index > 0">, </template>
                                        <router-link :to="{ name: 'home' }">
                                            {{ player.fullName }}
                                        </router-link>
                                    </template>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </v-table>
            </v-skeleton-loader>
        </v-col>
    </v-row>
</template>
<script setup lang="ts">
import { Result, Tournament, getTournamentTypeTitle } from '@/model/Tournament';
import { useAuthStore } from '@/stores/authStore';
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
const tournamentPreload = computed(() => tournamentStore.tournaments.filter((tournament: Tournament) => tournament.id === id.value)[0]);

// use tournament with result details after the full record is fetched
const tournament = computed<Tournament>(() => tournamentLoad.value ?? tournamentPreload.value ?? null);

const tournamentTypeTitle = computed(() => getTournamentTypeTitle(tournament.value?.type));

// load tournament on id change
watch(id, loadTournament);
// load tournament on mount
onMounted(loadTournament);

const loading = computed(() => tournament.value === null);

const teamHaveNames = computed(() => tournament.value?.type === "team" && tournament.value?.results?.some((result: Result) => result.title));

const headers = computed(() => {
    if (tournament.value?.type === "team" && teamHaveNames.value)
        return [
            { title: 'Pořadí', value: 'rank' },
            { title: 'Tým', value: 'title' },
            { title: 'Hráči v týmu', value: 'players', },
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

const authStore = useAuthStore();
const admin = computed(() => authStore.admin);
</script>

<style scoped>
td.players {
    min-width: 200px;
}

.team-name {
    font-weight: bold;
}
</style>
