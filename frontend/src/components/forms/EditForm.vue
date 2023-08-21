<template>
    <form ref="form">
        <input-field class="input-field" label="Název turnaje" v-model="tournamentData.name" :errors="errors?.name" required></input-field>
        <input-field class="input-field" label="Místo konání" v-model="tournamentData.location" :errors="errors?.location" required></input-field>
        <input-field class="input-field" label="Datum začátku" type="date" v-model="tournamentData.startDate" :errors="errors?.startDate" required></input-field>
        <input-field class="input-field" label="Datum konce" type="date" v-model="tournamentData.endDate" :errors="errors?.endDate" required></input-field>
        <input type="submit" @click.prevent="submit" value="Upravit">
    </form>
</template>

<script setup lang="ts">
import { inject, ref } from "vue";
import InputField from "@/components/part/InputField.vue";
import { TournamentRepositoryContract } from '@/repository/TournamentRepositoryContract';
import { useRouter } from "vue-router";
import { Tournament } from "@/model/Tournament";
import { watch } from "vue";

const tournamentRepository = inject("tournamentRepository") as TournamentRepositoryContract;

const props = defineProps({
  tournament: Tournament
});


const tournamentData = ref(Tournament.empty());

watch( () => props.tournament, () => {
    console.log("tournament changed");
    tournamentData.value.name = props.tournament?.name ?? "";
    tournamentData.value.location = props.tournament?.location ?? "";
    tournamentData.value.startDate = props.tournament?.startDate ?? "";
    tournamentData.value.endDate = props.tournament?.endDate ?? "";
});



const form = ref({} as HTMLFormElement);
const router = useRouter();
const errors = ref({} as any)

function submit() {

    if(!form.value.reportValidity()) return;

    console.log(tournamentData.value);
    tournamentRepository.update(tournamentData.value).then((response) => {
        console.log(response);
        router.push({ name: "tournaments" });
    })
    .catch((error) => {
        errors.value = error.data?.errors;
    });
}
</script>

<style lang="scss">
@import "@/style/auth-forms.scss";
</style>