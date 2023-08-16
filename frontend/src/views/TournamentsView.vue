<template>
  <div>
    <h1>Turnaje</h1>

    <div v-for="tournament in tournaments.data" :key="tournament.id">
      {{ tournament.title }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { Paginator } from '@/api/Paginator';
import { Tournament } from '@/model/Tournament';
import { TournamentRepositoryContract } from '@/repository/TournamentRepositoryContract';
import { inject, ref } from 'vue';

const tournamentRepository = inject("tournamentRepository") as TournamentRepositoryContract;

let pageNumber = ref(1);
let perPage = ref(15);

let tournaments = ref(Paginator.default<Tournament>());

let loading = ref(false);

async function updateTournaments() {
  console.debug("loading tournaments");
  loading.value = true;
  tournaments.value = await tournamentRepository.getMany(perPage.value, pageNumber.value);
  loading.value = false;
  console.debug("tournaments loaded", tournaments.value);
}

updateTournaments();
</script>
