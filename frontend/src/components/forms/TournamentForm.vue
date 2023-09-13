<template>
    <form ref="form">
        <input-field class="input-field" label="Název turnaje" v-model="name" :errors="errors?.name" required></input-field>
        <input-field class="input-field" label="Místo konání" v-model="location" :errors="errors?.location" required></input-field>
        <input-field class="input-field" label="Datum začátku" type="date" v-model="startDate" :errors="errors?.startDate" required></input-field>
        <input-field class="input-field" label="Datum konce" type="date" v-model="endDate" :errors="errors?.endDate" required></input-field>
        
        <!-- EVENT listener -->
        <tournament-result @update = "((data : TournamentResultData[]) => tournament.results = data)"></tournament-result>
        
        <input type="submit" @click.prevent="submit" value="Vytvořit">
    </form>
</template>

<script setup lang="ts">
import { inject, onMounted, ref } from "vue";
import InputField from "@/components/part/InputField.vue";
import { TournamentRepositoryContract } from '@/repository/TournamentRepositoryContract';
import { useRouter } from "vue-router";
import TournamentResult from "@/components/forms/TournamentResult.vue";
import { TournamentResultData } from "@/model/TournamentData";



const tournamentRepository = inject("tournamentRepository") as TournamentRepositoryContract




const name = ref("")
const location = ref("")
const startDate = ref("")
const endDate = ref("")

onMounted(() => { name.value = ""; location.value = ""; startDate.value = ""; endDate.value = ""; } )

const tournament = ref({
    name: name,
    location: location,
    startDate: startDate,
    endDate: endDate,
    results: [] as TournamentResultData[]
});



const form = ref({} as HTMLFormElement );
const router = useRouter();
const errors = ref({} as any)



function submit() {

    if(!form.value.reportValidity()) return;

    console.log(tournament.value);
    tournamentRepository.create(tournament.value).then((response) => {
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