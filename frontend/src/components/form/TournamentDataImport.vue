<template>
    <v-form ref="form">
        <dialog-modal v-model="model">
            <template v-slot:title>
                <h3>Import výsledků z .csv</h3>
            </template>
            <v-container class="pa-0" fluid>
                <v-row>
                    <v-col>
                        <csv-import :available-headers="availableHeaders" @dataUpdated="(d) => data = d"></csv-import>
                    </v-col>
                </v-row>
            </v-container>
            <template v-slot:actions>
                <v-spacer></v-spacer>
                <v-btn @click="model = false" color="primary" variant="tonal">Zavřít</v-btn>
                <v-btn @click="submit" color="primary" variant="flat" :disabled="!hasData">Importovat</v-btn>
            </template>
        </dialog-modal>
    </v-form>
</template>

<script lang="ts" setup>

import { ref, computed } from 'vue';
import CsvImport from '@/components/CsvImport.vue';
import DialogModal from '@/components/DialogModal.vue';
import { usePlayerStore } from '@/stores/playerStore';
import { Player } from '@/model/Player';
import { errorToast } from '@/toasts';
import { Result } from '@/model/Tournament';

const emit = defineEmits(['dataImport']);

const data = ref([] as any[]);
const hasData = computed(() => data.value && data.value.length > 0);
const form = ref(null as HTMLFormElement | null);
const playerStore = usePlayerStore();

const model = ref(false);
function show() {
    model.value = true;
}
defineExpose({ show });


const availableHeaders = computed(() => [
    { title: "Název týmu", value: "title", matchNames: ['nazev', 'tym', 'team', 'teamname', 'name'] },
    {
        title: "Hráči", value: "players", required: true, matchNames: ['players', 'participants', "ids"],
        multiple: true, transform: (value: string[]) => {

            let values = value;
            if (values.length === 1)
                values = values[0].split(/[,;\-]/)

            return values.map(v => v.trim());
        },
    },
    {
        title: "Výsledek", value: "scoreAchieved", matchNames: ['result', 'vysledek', 'score', 'points', 'body', 'vysledky', 'mp', 'imp', 'vp', 'vps', 'vpscore', 'vpscores', 'vpscore', 'imps'],
        validate: (value: string | undefined) => !value || !isNaN(parseFloat(value)) || "Musí být číslo"
    },
    {
        title: "Pořadí", value: "rank", matchNames: ['rank', 'poradi', 'umisteni', 'misto'],
        validate: (value: string | undefined) => value && !isNaN(parseInt(value?.replace(".", ""))) || "Musí být číslo",
    }
]);

function flattenArrayWithStructure<T>(arr: T[][]): { flattened: T[], lengths: number[] } {
    const lengths = arr.map(subArr => subArr.length);
    const flattened = arr.flat();
    return { flattened, lengths };
}

function reconstructArray<T>(flattened: T[], lengths: number[]): T[][] {
    let result = [];
    let currentIndex = 0;
    for (let length of lengths) {
        const subArray = flattened.slice(currentIndex, currentIndex + length);
        result.push(subArray);
        currentIndex += length;
    }
    return result;
}

async function getPlayers(queries: string[][]): Promise<Player[][]> {
    const { flattened, lengths } = flattenArrayWithStructure(queries);
    const result = await playerStore.searchManyPlayers(flattened);
    const playerSearches = reconstructArray(result, lengths);

    const selections = playerSearches.map((players, index1) => {
        return players.map((searchResults, index2) => {
            if (searchResults.length === 0) {
                errorToast(`Hráč '${queries[index1][index2]}' nebyl nalezen`);
                return null;
            }
            return searchResults[0];
        }).filter(p => p !== null) as Player[];
    });
    return selections;
}

async function submit() {
    const validation = await form.value?.validate();
    if (!validation.valid || !hasData.value) return;

    const queries = data.value.map(row => row.players);
    const players = await getPlayers(queries);
    data.value.forEach((row, index) => {
        row.players = players[index];
    });

    model.value = false;
    if (data.value?.[0]?.rank)
        emit('dataImport', data.value.map(row => new Result(row)));
    else
        emit('dataImport', data.value.map((row,index) => new Result({...row, rank: index + 1})));

}
</script>