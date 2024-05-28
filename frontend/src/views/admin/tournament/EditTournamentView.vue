<template>
  <v-row class="pb-4">
    <v-col cols="auto">
      <h2>Upravit turnaj</h2>
    </v-col>
    <v-col>
      <v-btn prepend-icon="mdi-eye-outline"
        :to="{ name: 'tournament', params: { id: tournament.id, slug: tournament.slug } }">Zobrazit</v-btn>
    </v-col>
  </v-row>
  <v-form ref="form" @submit.prevent="submitForm" validate-on="blur">
    <v-row>
      <v-col cols="12" lg="3">
        <v-text-field v-model="tournament.title" label="Název" required :rules="titleRules"></v-text-field>
      </v-col>
      <v-col cols="12" lg="3">
        <tournament-type-select density="comfortable" v-model="tournament.type" required></tournament-type-select>
      </v-col>
      <v-col cols="12" lg="2">
        <v-select title="Trvání" density="comfortable" :items="timeTypes" v-model="timeType">
        </v-select>
      </v-col>
      <v-col cols="12" lg="2">
        <date-field v-model="tournament.startDate" :label="timeType === 'one' ? 'Datum konání' : 'Začátek'" required
          :rules="startDateRules"></date-field>
      </v-col>
      <v-col cols="12" lg="2" v-if="timeType === 'range'">
        <date-field v-model="tournament.endDate" label="Konec" :required="timeType === 'range'"></date-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" lg="4">
        <v-text-field v-model="tournament.place" label="Místo konání"></v-text-field>
        <v-text-field v-model="tournament.externalDocumentationLink" label="Odkaz na dokumentaci"
          :rules="externalDocumentationLinkRules"></v-text-field>
      </v-col>
      <v-col cols="12" lg="8">
        <v-textarea v-model="tournament.description" label="Popis turnaje"></v-textarea>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <h3>Výsledky</h3>
      </v-col>
    </v-row>
    <v-row>
      <tournament-data-form v-model="data" :tournament-type="tournament.type" :loading="loading"></tournament-data-form>
    </v-row>
    <v-row justify="end">
      <v-col cols="12" lg="auto">
        <v-btn type="submit" color="primary" block variant="flat" :loading="loading">Uložit</v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import _ from 'lodash';

import { useTournamentStore } from '@/stores/tournamentStore';
import { Result, Tournament } from '@/model/Tournament';
import { errorToast, infoToast } from '@/toasts';

import TournamentTypeSelect from '@/components/form/TournamentTypeSelect.vue';
import DateField from '@/components/form/DateField.vue';
import TournamentDataForm from '@/components/form/TournamentDataForm.vue';

const tournament = ref(Tournament.empty());

const tournamentStore = useTournamentStore();
const route = useRoute();
const form = ref(null as HTMLFormElement | null);

const timeType = ref('one');
const timeTypes = [
  { title: 'Jednodenní', value: 'one' },
  { title: 'Vícedenní', value: 'range' },
]


const loading = ref(false);

onMounted(async () => {
  const idStr = route.params.id as string;
  if (!idStr) return;
  const id = Number.parseInt(idStr);

  try {
    loading.value = true;
    tournament.value = await tournamentStore.fetchTournamentById(id)
    data.value = tournament.value.results ?? []
  } catch (e: any) {
    console.error(e);
    errorToast("Chyba při načítání turnaje: " + e.message);
  } finally {
    loading.value = false;
  }
});

const data = ref(tournament.value.results as Result[])

const titleRules = [
  (v: string) => !!v || 'Název je povinný',
  (v: string) => (v && v.length <= 100) || 'Název může mít maximálně 100 znaků'
];

const startDateRules = [
  (v: string) => !!v || 'Datum je povinné'
];

const externalDocumentationLinkRules = [
  (v: string) => !v || v.match(/https?:\/\/[^\s$.?#].[^\s]*/g) !== null || 'Odkaz musí být URL'
];

const router = useRouter();

async function submitForm ()  {
  const validation = await form.value?.validate();
  if (!validation.valid) return;


  loading.value = true;
  try {
    await tournamentStore.updateTournament(tournament.value);
    infoToast("Turnaj byl úspěšně uložen");
    router.push({ name: 'tournament', params: { id: tournament.value.id.toString(), slug: tournament.value.slug } });
  } catch (e: any) {
    console.error(e);
    errorToast("Chyba při ukládání turnaje: " + e.message);
  } finally {
    loading.value = false;
  }
};
</script>
