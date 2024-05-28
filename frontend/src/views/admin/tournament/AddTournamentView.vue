<template>
  <v-row class="pb-4">
    <v-col cols="auto">
      <h2>Přidat turnaj</h2>
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
      <tournament-data-form v-model="data" :tournament-type="tournament.type" ></tournament-data-form>
    </v-row>
    <v-row justify="end">
      <v-col cols="12" lg="auto">
        <v-btn type="submit" color="primary" block variant="flat">Uložit</v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>

<script setup lang="ts">
import {  ref } from 'vue';
import _ from 'lodash';

import { useTournamentStore } from '@/stores/tournamentStore';
import { Result, Tournament } from '@/model/Tournament';
import { errorToast } from '@/toasts';

import TournamentTypeSelect from '@/components/form/TournamentTypeSelect.vue';
import DateField from '@/components/form/DateField.vue';
import TournamentDataForm from '@/components/form/TournamentDataForm.vue';
import { onMounted } from 'vue';

const tournament = ref(Tournament.empty());
onMounted(() => {
  tournament.value.results?.push(Result.empty());
});

const tournamentStore = useTournamentStore();

const timeType = ref('one');
const timeTypes = [
  { title: 'Jednodenní', value: 'one' },
  { title: 'Vícedenní', value: 'range' },
]

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

const submitForm = () => {
  // TODO
  // TODO CSV IMPORT

  tournamentStore.updateTournament(tournament.value);
};
</script>
