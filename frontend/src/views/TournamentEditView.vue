<script setup lang="ts">
import EditForm from '@/components/forms/EditForm.vue';
import { TournamentRepositoryContract } from '@/repository/TournamentRepositoryContract';
import { inject, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { Tournament } from '@/model/Tournament';
import { Ref } from 'vue';

const route = useRoute();
const tournamentRepository = inject("tournamentRepository") as TournamentRepositoryContract;
const tournament = ref() as Ref<Tournament>;


watch(() => route.params.id , (newVal) => {
    if (newVal === undefined) return;
    console.log("route changed");

    const tournamentNumber = Number.parseInt(route.params.id as string);
    tournamentRepository.get(tournamentNumber)
        .then((data) => {
            console.log("got tournament");
            tournament.value = data;
        })
        .catch((error) => {
            console.log(error);
        });

});

</script>

<template>
    <div>
        <h1>Úprava turnaje</h1>
        <edit-form :tournament="tournament" />
    </div>
</template>