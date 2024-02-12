<template>
    <v-form @submit.prevent="submit" ref="form">
        <v-row>
            <v-col>
                <div class="flex spaced">
                    <h2>Import hráčů</h2>
                </div>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <csv-import :available-headers="availableHeaders" @dataUpdated="(d) => data = d"></csv-import>
            </v-col>
        </v-row>
        <v-row v-if="hasData">
            <v-col lg="4" md="6" class="flex-col gap-1">
                <h3>Importovat</h3>
                <v-text-field label="Název importu" required v-model="importName" :rules="importNameRules"></v-text-field>
                <v-btn type="submit" color="primary" variant="flat">Importovat</v-btn>
            </v-col>
        </v-row>
    </v-form>
</template>

<script setup lang="ts">
import CsvImport from '@/components/CsvImport.vue';
import { router } from '@/router';
import { usePlayerStore } from '@/stores/playerStore';
import { errorToast, infoToast } from '@/toasts';
import { computed, ref } from 'vue';

const data = ref([] as any[]);
const importName = ref("");
const importNameRules = [
    (v: string) => !!v || "Název nesmí být prázdný"
]
const hasData = computed(() => data.value && data.value.length > 0);
const form = ref(null as HTMLFormElement | null);

const availableHeaders = [
    { title: "Jméno", value: "firstName", matchNames: ['jmeno', 'name', 'krestni', 'krestnijmeno'] },
    {
        title: "Přijmení", value: "lastName", required: true, matchNames: ['prijmeni', 'surname', "lastname"],
        validate: (value: string) => value.length > 1 || "Pole musí být vyplněno"
    },
    {
        title: "Datum narození", value: "birthdate", matchNames: ['datumnarozeni', 'narozeni'],
        validate: (value: string) => !isNaN(Date.parse(value)) || "Musí být datum"
    },
    {
        title: "Číslo ČBS", value: "federationId", matchNames: ['cbs', 'cislo', 'cislohrace', 'cislocbs', 'id'],
        validate: (value: string) => !isNaN(parseInt(value)) || "Musí být číslo",
    }
]

async function submit() {
    const validation = await form.value?.validate();
    if (!validation.valid || !hasData.value) return;


    const playerStore = usePlayerStore();
    try {
        playerStore.importPlayers(importName.value, data.value);
        infoToast("Hráči byli importováni");
        router.push({ name: 'admin-player-list' });
    } catch (e) {
        console.error(e);
        errorToast("Nepodařilo se importovat hráče");
    }

}

</script>

<style scoped></style>
