<template>
  <v-row>
    <v-col class="flex spaced">
      <h2>Turnaje</h2>
      <v-btn @click="showFilter = true" v-show="!showFilter">Filtrovat</v-btn>
      <template v-if="showFilter">
        <v-btn @click="hideFilter">Zrušit filtraci</v-btn>
        <v-btn @click="resetFilter">Smazat filtr</v-btn>
      </template>
    </v-col>
  </v-row>
  <v-row v-if="showFilter">
    <v-col lg="3">
      <v-text-field v-model="filter.title" density="compact" label="Název" hide-details="auto" clearable></v-text-field>
    </v-col>
    <v-col lg="3">
      <v-combobox density="compact" class="category-filter" hide-details="auto" v-model="filter.type"
                  :items="TournamentTypes" item-value="value" :return-object="false"
                  chips clearable label="Kategorie" multiple variant="outlined" single-line>
      </v-combobox>
    </v-col>
  </v-row>
  <v-row>
    <v-col class="flex spaced">
      <v-btn variant="tonal" prepend-icon="mdi-plus-circle-outline" :to="{name: 'admin-add-tournament'}">Přidat turnaj
      </v-btn>
      <template v-if="selected.length">
        <v-btn @click="deleteSelected" variant="tonal" prepend-icon="mdi-trash-can-outline">Smazat vybrané</v-btn>
        <v-btn @click="selected = []" prepend-icon="mdi-close">Zrušit výběr ({{ selected.length }})</v-btn>
      </template>
      <template v-else>
      </template>
    </v-col>
  </v-row>
  <v-row>
    <v-col>
      <v-data-table :headers="headers" :items="tournamentsFiltered as Tournament[]" item-key="id" :loading="loading"
                    v-model="selected" show-select>
        <template v-slot:item.title="{ item }">
          <td>
            <router-link :to="{ name: 'tournament', params: { id: item.id, slug: item.slug } }">
              {{ item.title }}
            </router-link>
          </td>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-btn :to="{name:'admin-edit-tournament', params: { id: item.id}}">
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
          <v-btn color="red" @click="deleteTournament(item)">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </template>
        <template v-slot:item.type="{item}">
          <v-icon v-if="item.type === 'team'" title="Týmy" color="primary">mdi-alpha-t-box-outline</v-icon>
          <v-icon v-else-if="item.type === 'pair'" title="Páry" color="secondary">mdi-alpha-p-box-outline</v-icon>
          <v-icon v-else="item.type === 'individual'" title="Individuál" color="green">mdi-alpha-i-box-outline</v-icon>
        </template>
      </v-data-table>
    </v-col>
  </v-row>
  <confirm-dialog ref="confirm"/>
</template>

<script setup lang="ts">
import {Tournament, TournamentType, TournamentTypes} from '@/model/Tournament';
import {useTournamentStore} from '@/stores/tournamentStore';
import {computed, ref} from 'vue';
import ConfirmDialog from '@/components/ConfirmDialog.vue';
import {errorToast, infoToast} from '@/toasts';


const headers = [
  {title: 'Název', value: 'title', sortable: true},
  {title: 'Typ', value: 'type', sortable: true},
  {title: 'Datum', value: 'dateString', sortable: true},
  {title: 'úč.', value: 'resultsCount', sortable: true},
  {title: 'Místo', value: 'place', sortable: true},
  {title: '', key: 'actions'},
]

const confirm = ref(null as null | typeof ConfirmDialog);
const tournamentStore = useTournamentStore();
const loading = computed(() => tournamentStore.loading);
const tournaments = computed(() => tournamentStore.tournaments);
const selected = ref([] as number[])
const selectedTournaments = computed(() =>
    selected.value.map(id =>
        tournaments.value.find((t: Tournament) => t.id === id)))


const showFilter = ref(false);
const filter = ref({
  type: [] as TournamentType[],
  title: ""
});

function hideFilter() {
  showFilter.value = false;
  resetFilter();
}

function resetFilter() {
  filter.value = {
    type: [],
    title: ""
  }
}

const tournamentsFiltered = computed(() => {
  const f = filter.value;
  return tournaments.value.filter((t: Tournament) =>
      (!f.type.length || f.type.includes(t.type))
      && (!f.title || t.title.toLowerCase().includes(f.title.toLowerCase()))
  )
});


function deleteTournament(tournament: any) {
  confirm.value?.show({
    text: `Opravdu si přejete smazat turnaj ${tournament.title}?`,
    onConfirm: async () => {
      try {
        await tournamentStore.deleteTournament(tournament.id)
        infoToast("Turnaj byl smazán")
      } catch (e: any) {
        errorToast("Chyba při mazání turnaje: " + e.message)
      }
    }
  })
}

function deleteSelected() {
  const toDelete = selectedTournaments.value;
  confirm.value?.show({

    text: `Opravdu si přejete smazat následujících ${toDelete.length} turnajů?<br><br>` + toDelete.map(t => t?.title).join("<br>"),
    onConfirm: async () => {
      try {
        await tournamentStore.deleteTournaments(selected.value)
        infoToast("Turnaje byly smazány")
      } catch (e: any) {
        errorToast("Chyba při mazání turnajů: " + e.message)
      }
    }
  })
}
</script>

<style scoped lang="scss"></style>
