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
            </div>
        </v-col>
    </v-row>
    <v-row v-if="showFilter">
        <v-col class="flex gap-1" lg="8">
            <v-text-field label="Jméno" v-model="filter.name" clearable></v-text-field>
            <v-text-field type="number" hide-spin-buttons label="Číslo hráče" v-model="filter.federationId"
                clearable></v-text-field>
            <v-combobox class="category-filter" v-model="filter.category" :items="categoriesAvailable" chips clearable
                label="Kategorie" multiple variant="outlined" density="comfortable" single-line>

            </v-combobox>
        </v-col>
    </v-row>
    <v-row>
        <v-col>
            <v-data-table :headers="headers" :items="playersFiltered" item-key="id" :loading="loading"
                @update:options="updateOptions" no-data-text="Žádný hráč nebyl nalezen.">
                <template v-slot:bottom v-if="hideFooter"></template>
            </v-data-table>
        </v-col>
    </v-row>
</template>

<script setup lang="ts">
import { PlayerCategory } from '@/model/PlayerCategory';
import { useAuthStore } from '@/stores/authStore';
import { usePlayerStore } from '@/stores/playerStore';
import { computed, ref } from 'vue';

const headers = [
    { title: 'Jméno', value: 'firstName', sortable: false, width: '15%' },
    { title: 'Příjmení', value: 'lastName', sortable: true, width: '15%' },
    { title: 'Číslo hráče', value: 'federationId', sortable: true, width: '15%' },
    { title: 'Kategorie', value: 'category', sortable: true }
]

const playerStore = usePlayerStore();

const players = computed(() => playerStore.players);
const loading = computed(() => playerStore.loading);

const showFilter = ref(false);
const filter = ref({
    name: '',
    federationId: '',
    category: [] as string[]
});

const categoriesAvailable = Object.values(PlayerCategory) as string[];

function hideFilter() {
    showFilter.value = false;
    resetFilter();
}
function resetFilter() {
    filter.value = {
        name: '',
        federationId: '',
        category: []
    }
}
const playersFiltered = computed(() => {
    const f = filter.value;
    return players.value.filter(p =>
        (!f.name || p.fullName.toLowerCase().includes(f.name.toLowerCase())) &&
        (!f.category.length || (p.category && f.category.includes(p.category))) &&
        (!f.federationId || p.federationId === f.federationId || p.federationId.toString().includes(f.federationId.toString()))
    )
});

let itemsPerPage = ref(10);
function updateOptions(options: any) {
    itemsPerPage.value = options.itemsPerPage;
}
const hideFooter = computed(() => playersFiltered.value.length <= itemsPerPage.value);
</script>

<style>
.category-filter {
    width: 100px;
}
</style>
