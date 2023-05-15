<template>
  <div>
    <h1>Hráči</h1>    
    <div v-for="player in players.data" :key="player.id">
      {{ player.name }}
    </div>
  </div>
</template>

<script lang="ts">
import { Paginator } from '@/api/Paginator';
import { Player } from '@/model/Player';
import { PlayerRepositoryContract } from '@/repository/PlayerRepositoryContract';
import { defineComponent, inject, ref } from 'vue';

export default defineComponent({
  setup() {
    const playerRepository = inject("playerRepository") as PlayerRepositoryContract;

    let pageNumber = ref(1);
    let perPage = ref(60);

    let players = ref(Paginator.default<Player>());

    let loading = ref(false);

    async function updatePlayers() {
      console.debug("loading players");
      loading.value = true;
      players.value = await playerRepository.getMany(perPage.value, pageNumber.value);
      loading.value = false;
      console.debug("players loaded", players.value);
    }



    updatePlayers();

    return { players };
  },
});
</script>
