<template>
    <v-row>
        <v-col>
            <div class="flex spaced">
                <h2>Hráči</h2>
                <v-btn @click="resetFilter">Smazat filtr</v-btn>
                <v-btn :to="{ name: 'admin-add-player' }" v-if="admin">Přidat hráče</v-btn>
            </div>
        </v-col>
    </v-row>
    <v-row>
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
            <v-data-table  show-select :headers="headers" :items="playersFiltered" item-key="id" :loading="loading"
                no-data-text="Žádný hráč nebyl nalezen.">
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
    { title: 'Jméno', value: 'firstName', sortable: true, width: '15%' },
    { title: 'Příjmení', value: 'lastName', sortable: true, width: '15%' },
    { title: 'Číslo hráče', value: 'federationId', sortable: true, width: '15%' },
    { title: 'Kategorie', value: 'category', sortable: true }
]

const playerStore = usePlayerStore();

const players = computed(() => playerStore.players);
const loading = computed(() => playerStore.loading);

const authStore = useAuthStore();
const admin = computed(() => authStore.admin);

const filter = ref({
    name: '',
    federationId: '',
    category: [] as string[]
});

const categoriesAvailable = Object.values(PlayerCategory) as string[];

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
        (!f.federationId || p.federationId === f.federationId)
    )
});

</script>


<style>
.category-filter {
    width: 100px;
}
</style>
