<template>
    <v-row>
        <v-col>
            <h2>Přidat hráče</h2>
        </v-col>
    </v-row>
    <v-row>
        <v-col>
            <v-form class="flex flex-col gap-05" @submit.prevent="submitForm" ref="form" validate-on="blur">
                <v-text-field label="Křestní jméno" v-model="playerData.firstName" :rules="rules.firstName"
                    required></v-text-field>
                <v-text-field label="Přijmení" v-model="playerData.lastName" :rules="rules.lastName"
                    required></v-text-field>
                <v-text-field label="Číslo hráče ČBS" v-model="playerData.federationId"
                    :rules="rules.federationId"></v-text-field>
                <v-text-field label="Datum narození" type="date" v-model="playerData.birthdate"
                    :rules="rules.birthdate"></v-text-field>
                <v-btn color="primary" variant="flat" type="submit" title="Vytvořit hráče">Vytvořit</v-btn>
            </v-form>
        </v-col>
    </v-row>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { usePlayerStore } from '@/stores/playerStore';
import { errorToast, infoToast } from '@/toasts';

const emit = defineEmits(['player-added'])

const rules = {
    firstName: [

    ],
    lastName: [
        (v: string) => !!v || 'Povinné pole',
    ],
    federationId: [
        (v: string) => !v || !isNaN(Number(v)) || 'Musí být číslo',
    ],
    birthdate: [

    ],
}

const playerStore = usePlayerStore();
const playerData = reactive({
    firstName: undefined as string | undefined,
    lastName: "" as string,
    federationId: undefined as string | undefined,
    birthdate: undefined as string | undefined,
});
const form = ref(null as HTMLFormElement | null);

function resetForm() {
    playerData.firstName = undefined;
    playerData.lastName = "";
    playerData.federationId = undefined;
    playerData.birthdate = undefined;
}

async function submitForm() {

    const validation = await form.value?.validate();
    if (!validation.valid) {
        return;
    }

    try {
        await playerStore.addPlayer(playerData.lastName, playerData.firstName, playerData.federationId);
        infoToast("Hráč byl přidán.");
        emit('player-added');
        resetForm();
    } catch (error: any) {
        errorToast("Nepodařilo se přidat hráče: " + error.response?.data?.code);
        console.debug(error.message);
    }
};
</script>