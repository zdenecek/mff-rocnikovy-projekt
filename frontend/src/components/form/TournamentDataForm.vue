<template>
    <v-col md="auto">
        <v-btn @click="showImportForm" variant="tonal" block prepend-icon="mdi-file-delimited-outline">Import z
            .csv</v-btn>
    </v-col>
    <v-col lg="auto" v-show="data?.length">
        <v-btn @click="sortByResult" prepend-icon="mdi-sort" variant="tonal" block>Seřadit podle
            výsledku</v-btn>
    </v-col>
    <v-col lg="auto" v-show="data?.length">
        <v-btn @click="renumber" prepend-icon="mdi-order-numeric-ascending" variant="tonal" block>Přečíslovat</v-btn>
    </v-col>
    <v-col lg="auto" v-show="data?.length">
        <v-btn @click="deleteAll" prepend-icon="mdi-delete-sweep" variant="tonal" block>Vymazat výsledky</v-btn>
    </v-col>
    <v-col cols="12">
        <v-data-table :items-per-page="data?.length ?? 1" no-data-text="Žádné výsledky" :headers="headers" :items="data"
            :loading="loading">
            <template v-slot:bottom>
                <div class="pl-4 pt-2 text-grey">
                </div>
                <v-container>
                    <v-row>
                        <v-col lg="auto">
                            <v-btn prepend-icon="mdi-plus" variant="tonal" @click="addRow" color="primary" block>Přidat
                                výsledek</v-btn>
                        </v-col>
                        <v-col class="flex align-center text-grey" lg="auto">
                            Celkem {{ data?.length }} výsledků, {{ playersTotal }} hráčů
                        </v-col>
                    </v-row>
                </v-container>
            </template>
            <template v-slot:item.players="{ item, index }">
                <player-select v-model="item.players" :ref="el => playerSelectRefs[index] = el as any"
                    @keydown.enter="() => handleEnter(index)"></player-select>
            </template>
            <template v-slot:item.rank="{ item, index }">
                <v-text-field v-model.number="item.rank" type="number" hide-spin-buttons density="compact"
                    @keypress.enter="() => handleEnter(index)" hide-details="auto" @blur="sortByRank"></v-text-field>
            </template>
            <template v-slot:item.title="{ item, index }">
                <v-text-field v-model="item.title" density="compact" class="min-w-150"
                    @keypress.enter="() => handleEnter(index)" hide-details="auto"></v-text-field>
            </template>
            <template v-slot:item.scoreAchieved="{ item, index }">
                <v-text-field v-model.number="item.scoreAchieved" type="number" hide-spin-buttons
                    @keypress.enter="() => handleEnter(index)" density="compact" hide-details="auto"
                    @blur="sortByRank"></v-text-field>
            </template>
            <template v-slot:item.actions="{ item }">
                <v-btn icon @click="() => removeRow(item)" tabindex="-1">
                    <v-icon color="red">mdi-delete</v-icon>
                </v-btn>
            </template>
        </v-data-table>
    </v-col>
    <tournament-data-import ref="csvImportForm" @dataImport="handleCsvImport" :tournament-type="tournamentType">

    </tournament-data-import>
</template>
<script lang="ts" setup>
import PlayerSelect from '@/components/form/PlayerSelect.vue';
import { Result, TournamentType } from '@/model/Tournament';
import { nextTick } from 'vue';
import { computed, defineModel, ref } from 'vue';
import TournamentDataImport from './TournamentDataImport.vue';

const data = defineModel<Result[]>()

const props = defineProps({
    tournamentType: {
        type: String as () => TournamentType,
        default: 'team'
    },
    loading: {
        type: Boolean,
        default: false
    }
})
const headers = computed(() => props.tournamentType === 'team' ? [
    { title: 'Pořadí', value: 'rank', width: '5%', sortable: false },
    { title: 'Název týmu', value: 'title', width: "30%", sortable: false },
    { title: 'Hráči', key: 'players', width: "50%", sortable: false },
    { title: 'Výsledek', value: 'scoreAchieved', sortable: false },
    { title: '', key: 'actions', sortable: false },
] : [
    { title: 'Pořadí', value: 'rank', width: '5%', sortable: false },
    { title: 'Hráči', key: 'players', width: "50%", sortable: false },
    { title: 'Výsledek', value: 'scoreAchieved', sortable: false },
    { title: '', key: 'actions', sortable: false },
])
function addRow() {
    if (!data.value) return;
    const newRow = Result.empty();
    newRow.rank = data.value.length + 1;
    data.value.push(newRow);
}
function removeRow(row: Result | undefined) {
    if (!data.value || !row) return;
    let oldIndex = data.value.indexOf(row)
    data.value.splice(oldIndex, 1)
    data.value.forEach((r, index) => {
        if (index >= oldIndex && r.rank) r.rank--;
    })
}
function sortByRank() {
    data.value?.sort((a, b) => a.rank - b.rank)
}
function sortByResult() {
    data.value?.sort((a, b) => (b.scoreAchieved ?? 0) - (a.scoreAchieved ?? 0))
    let currentRank = 0;
    let cummulative = 1;
    let lastScore = undefined as number | undefined;
    data.value?.forEach(r => {
        if (lastScore === r.scoreAchieved) {
            cummulative++;
        }
        else {
            currentRank += cummulative;
            cummulative = 1;
            lastScore = r.scoreAchieved;
        }
        r.rank = currentRank;
    })
}
function renumber() {
    let rememberedNumber = null as null | number | undefined;
    let currentNumber = 0;
    let cummulative = 1;
    data.value?.forEach(r => {
        if (r.rank.toString() === rememberedNumber?.toString()) {
            cummulative++;
        }
        else {
            rememberedNumber = r.rank;
            currentNumber += cummulative;
            cummulative = 1;
        }
        r.rank = currentNumber;
    })
}
function deleteAll() {
    data.value?.splice(0, data.value.length)
}
const playersTotal = computed(() => data.value?.flatMap(r => r.players).length ?? 0)
const playerSelectRefs = ref([] as { $el: HTMLElement }[])
function handleEnter(index: number) {
    if (index + 1 === data.value?.length) addRow()
    nextTick(() => playerSelectRefs.value[index + 1].$el.getElementsByTagName('input')[0]?.focus())
}

const csvImportForm = ref(null as typeof TournamentDataImport | null);
function showImportForm() {
    csvImportForm.value?.show();
}
function handleCsvImport(importData: Result[]) {
    data.value = importData;
    nextTick(() => sortByRank()) // wait for reactivity
}
</script>

<style scoped>
.min-w-150 {
    min-width: 150px;
}
</style>