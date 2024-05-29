<template>
    <v-autocomplete chips density="compact" v-model="model" @update:search="e => searchString = e" :search="searchString"
        :items="playersSearch" autocomplete="off" hide-details="auto"  multiple variant="outlined" 
        :loading="loading" no-filter item-title="title"  :hide-no-data="initial" no-data-text="Hráč nenalezen"
        item-value="id" return-object auto-select-first @update:model-value="fix" hide-spin-buttons>

        <template v-slot:chip="{ item, props }">
            <v-chip v-bind="props" > 
                <template v-slot:append>
                    <v-btn @click="model?.splice(model.indexOf(item.raw), 1) "  icon tabindex="-1" size="small" style="text" density="compact">  <v-icon size="small" title="Zavřít" >mdi-close</v-icon></v-btn>
                </template>
                {{ item.raw.fullName }}  ({{ item.raw.federationId ?? "bez čísla" }}) </v-chip>
        </template>
    </v-autocomplete>
</template>


<script setup lang="ts">

import { Player } from '@/model/Player';
import { usePlayerStore } from '@/stores/playerStore';
import { errorToast } from '@/toasts';

import { ref, defineModel, watch } from 'vue';
import _ from 'lodash';

type PlayerWithLabel = Player & { title?: string };

const searchString = ref("")
const model = defineModel<Player[]>()
const playersSearch = ref([] as PlayerWithLabel[])

const playerStore = usePlayerStore()
const loading = ref(false)
const initial = ref(true)

const DEBOUNCE_TIME = 500

const searchFunction = (() => {
    const f = _.debounce(async (value: string) => {
        try {
        loading.value = true

            const players = await playerStore.searchPlayers(value) as PlayerWithLabel[]
            players.forEach(p => p.title = p.fullName + " (" + (p.federationId ?? 'bez čísla') + ")")
            playersSearch.value = players
        }
        catch (e: any) {
            console.error(e)
            errorToast("Chyba při hledání hráčů: " + e.message)
            throw e;
        } finally {
            initial.value = false;
            loading.value = false
        }
    }, DEBOUNCE_TIME)

    return async (value: string) => {
        if (value.length < 2) return;
        await f(value)
    }
})()

async function fillPlayers(searchValues: string[]) {
    const players = searchValues.map(s => playerStore.searchPlayers(s))
    const searchResults = await Promise.all(players)
    
    const results = searchResults.map( (s, index) => {
        if(!s.length)
            errorToast("Hráč nenalezen: " + searchValues[index])
        else 
            return s[0]
    }).filter(p => p !== undefined) as Player[]

    model.value?.push(...results)
}

watch(searchString, async (search) => {
    if(search.includes(",") || search.includes("-")) {
        const values = search.split(/,|-/).map(s => s.trim()).filter(s => s.length > 0)
        try {
            loading.value = true
            await fillPlayers(values)
        } catch (e: any) {
            errorToast("Chyba při načítání hráčů: " + e.message)
        } finally {
            loading.value = false
        }
        searchString.value = ""
    } else {
        searchFunction(search)
    }
})
watch(model, () => {
    searchString.value = ""
})

// For some reason necessary
function fix(players: Player[]) {
    if(!players.length) return
    players.push(new Player(players.pop()!))
}

</script>

<style scoped>
.v-autocomplete {
    min-width: 300px;
}
</style>