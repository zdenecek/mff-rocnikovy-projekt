<template>
    <form ref="form">
        <input-field class="input-field" label="Název turnaje" v-model="name"></input-field>
        <input-field class="input-field" label="Místo konání" v-model="location"></input-field>
        <input-field class="input-field" label="Datum začátku" type="date" v-model="startDate"></input-field>
        <input-field class="input-field" label="Datum konce" type="date" v-model="endDate"></input-field>
        <input type="submit" @click.prevent="submit" value="Vytvořit">
           
    </form>
</template>

<script setup lang="ts">
import { inject, ref } from "vue";
import InputField from "@/components/part/InputField.vue";
import { TournamentRepositoryContract } from '@/repository/TournamentRepositoryContract';
import { useRouter } from "vue-router";



const tournamentRepository = inject("tournamentRepository") as TournamentRepositoryContract




const name = ref("")
const location = ref("")
const startDate = ref("")
const endDate = ref("")

const tournament = ref({
    name: name,
    location: location,
    startDate: startDate,
    endDate: endDate
});



const form = ref({} as HTMLFormElement );
const router = useRouter();


function submit() {

    if(!form.value.reportValidity()) return;

    /*
    TODO - can be clicked with empty fields
    TODO - upon error show error message, not fail silently
    */

    console.log(tournament.value);
    tournamentRepository.create(tournament.value);

    router.push({ name: "tournaments" });


    
    
}
</script>

<style lang="scss">
@import "@/style/auth-forms.scss";
</style>