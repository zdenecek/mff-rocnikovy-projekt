<template>
    <v-form @submit.prevent="submit" ref="form">
        <v-row>
            <v-col class="">
                <h2>Import hráčů</h2>
            </v-col>
        </v-row>
        <v-row>
            <v-col lg="4" md="6" class="flex-col gap-1">
                <v-text-field label="Název importu" required v-model="importName" hide-details="auto"
                    :rules="importNameRules"></v-text-field>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <csv-import :available-headers="availableHeaders" @dataUpdated="(d) => data = d"></csv-import>
            </v-col>
        </v-row>
        <v-row justify="end">
            <v-col cols="2">
                <v-btn :loading="loading" type="submit" color="primary" variant="flat" block
                    :disabled="!hasData">Importovat</v-btn>
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

const loading = ref(false);

const availableHeaders = [
    { title: "Jméno", value: "firstName", matchNames: ['jmeno', 'name', 'krestni', 'krestnijmeno', 'firstname'] },
    {
        title: "Přijmení", value: "lastName", required: true, matchNames: ['prijmeni', 'surname', "lastname"],
        validate: (value: string | undefined) => value && value.length > 1 || "Pole musí být vyplněno"
    },
    {
        title: "Datum narození", value: "birthdate", matchNames: ['datumnarozeni', 'narozeni', 'birthdate', 'dateofbirth'],
        validate: (value: string | undefined) => !value || !isNaN(Date.parse(value)) || "Musí být datum"
    },
    {
        title: "Číslo ČBS", value: "federationId", matchNames: ['cbs', 'cislo', 'cislohrace', 'cislocbs', 'federationid'],
        validate: (value: string | undefined) =>  !value ||  !isNaN(parseInt(value)) || "Musí být číslo",
    }
]

async function submit() {
    const validation = await form.value?.validate();
    if (!validation.valid || !hasData.value) return;
    const playerStore = usePlayerStore();
    try {
        loading.value = true;
        await playerStore.importPlayers(importName.value, data.value);
        infoToast("Hráči byli importováni");
        router.push({ name: 'players' });
    } catch (e) {
        console.error(e);
        errorToast("Nepodařilo se importovat hráče");
    } finally {
        loading.value = false;
    }

}

</script>

<style scoped></style>
