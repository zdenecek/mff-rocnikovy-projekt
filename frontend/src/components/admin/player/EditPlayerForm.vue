<template>
    <v-row>
        <v-col>
            <h2>Upravit hráče</h2>
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
                <date-field label="Datum narození" type="date" v-model="playerData.birthdate"
                    :rules="rules.birthdate"></date-field>
                <v-btn color="primary" variant="flat" type="submit">Upravit</v-btn>
            </v-form>
        </v-col>
    </v-row>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { usePlayerStore } from '@/stores/playerStore';
import { errorToast, infoToast } from '@/toasts';
import { Player } from "@/model/Player"
import { onMounted } from 'vue';
import DateField from '@/components/form/DateField.vue';

const emit = defineEmits(['player-edited'])

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
const playerData = ref(Player.empty());
const form = ref(null as HTMLFormElement | null);

const props = defineProps({
    player: {
        type: Object as () => Player | null,
        required: true
    }
})


function fillFields(player: Player | null) {
    if (player) playerData.value = new Player(player);
}


watch(() => props.player, fillFields)
onMounted(() => fillFields(props.player))


async function submitForm() {

    const validation = await form.value?.validate();
    if (!validation.valid) {
        return;
    }

    try {
        if (!playerData.value) {
            throw new Error("Player data is null");
        }
        await playerStore.updatePlayer(playerData.value);
        infoToast("Hráč byl upraven.");
        emit('player-edited');

    } catch (error: any) {
        errorToast("Nepodařilo se upravit hráče: " + error.response?.data?.code);
        console.debug(error.message);
    }
};
</script>