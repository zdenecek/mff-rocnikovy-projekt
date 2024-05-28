<template>
  <div class="flex-col gap-1">
    <h3>Načtení souboru</h3>
    <div class="flex align-center spaced">
      <v-file-input v-model="file" class="file-input" variant="outlined" hide-details density="comfortable"
        accept=".csv" />
      <v-checkbox label="Soubor má řádek záhlaví" hide-details v-model="fileHasHeaders"></v-checkbox>
    </div>
    <div>
      <h3 v-if="csvData.length > 0" class="mb-4">Načtená data</h3>
      <span v-else>Pro pokračování nahrajte .csv soubor</span>
      <v-data-table :headers="headers" :items="dataFiltered" v-if="csvData.length > 0">
        <template v-slot:item="{ item }">
          <tr>
            <td>
              <v-icon v-show="item.hasErrors" color="red" title="Validace selhala">mdi-alert-circle-outline</v-icon>
            </td>
            <td v-for="header in headers" :key="header.text" :class="{ 'error': item.errors[header.value] }">
              {{ item[header.value] }}
              <span v-if="item.errors[header.value]" class="text-error">({{ item.errors[header.value] }})</span>
            </td>
          </tr>
        </template>

        <template v-slot:headers="{ columns, toggleSort, getSortIcon, isSorted }">
          <th></th>
          <th class="px-4" v-for="column, i in columns">
            <div @click="toggleSort(column)">
              <span class="text">
                {{ column.title }}
              </span>
              <v-icon :class="{ 'hidden': !isSorted(column) }">{{ getSortIcon(column) }}</v-icon>
            </div>
            <v-select class="py-2" hide-details :items="availableHeadersSelect" v-model="selectedHeaders[i]"
              variant="outlined" density="compact">

              <template v-slot:append>

                <v-icon class="px-0" :class="{ 'hidden': !extraColumns?.includes(selectedHeaders[i].title) }"
                  color="error" title="Duplicitní sloupec">mdi-alert-circle</v-icon>
              </template>
            </v-select>
          </th>
        </template>
      </v-data-table>
      <template v-if="hasErrors">
        <h3 v-if="csvData.length > 0">Chyby</h3>
        <v-list>
          <v-list-item v-show="missingColumns.length > 0">
            <template v-slot:prepend>
              <v-icon color="error">mdi-alert-circle</v-icon>
            </template>
            Chybějící sloupce: {{ missingColumns?.join(', ') }}
          </v-list-item>
          <v-list-item v-show="extraColumns.length > 0">
            <template v-slot:prepend>
              <v-icon color="error">mdi-alert-circle</v-icon>
            </template>
            Duplicitní sloupce: {{ extraColumns?.join(', ') }}
          </v-list-item>
          <v-list-item v-show="errorCellCount">
            <template v-slot:prepend>
              <v-icon color="error">mdi-alert-circle</v-icon>
            </template>

            <div class="flex align-center spaced">
              Chyby v datech (celkem {{ errorRowCount }} záznamů, {{ errorCellCount }} buňek)
              <v-checkbox v-model="showErrorRecordsOnly" hide-details label="Zobrazit pouze chybové záznamy"
                density="compact">
              </v-checkbox>
            </div>
          </v-list-item>
        </v-list>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Papa from 'papaparse';
import { watch } from 'vue';
import { computed } from 'vue';

type Validator = (value: string | undefined) => boolean | string | undefined;

interface AvaliableHeader {
  title: string;
  value: string;
  matchNames?: string[];
  ignore?: boolean;
  required?: boolean;
  // validate every single value
  validate?: Validator | Validator[];
  multiple?: boolean;
  transform?: ((value: string) => any) | ((value: string[]) => any);
}

const props = defineProps({
  availableHeaders: {
    type: Array as () => AvaliableHeader[],
    required: true
  }
});

const emits = defineEmits(['dataUpdated']);

const ignoreColumn = { title: 'Zahodit sloupec', value: 'ignore', ignore: true };
const availableHeadersSelect = computed(() => [...props.availableHeaders, ignoreColumn].map(h => ({ title: h.title, value: h })));
const selectedHeaders = ref([] as AvaliableHeader[]);

watch(selectedHeaders, () => {
  updateHandler();
}, { deep: true });

const file = ref(undefined as File[] | undefined);
watch(file, () => fileChanged(true));

function fileChanged(guessHeaders?: boolean ) {
  if (file.value && file.value.length > 0) handleFileUpload(file.value[0], guessHeaders)
  else {
    headers.value = [];
    csvData.value = [];

    resetValidation();
  }
}

const headers = ref([] as any[]);
const csvData = ref([] as any[]);
const fileHasHeaders = ref(true);
watch(fileHasHeaders, () => fileChanged());

function handleFileUpload(file: File, guessHeaders?: boolean ) {
  if (guessHeaders) fileHasHeaders.value = false;
  Papa.parse(file, {

    header: fileHasHeaders.value,
    skipEmptyLines: true,
    complete: (results: any) => {
      headers.value = Object.keys(results.data[0]).map((key, index) => ({ title: fileHasHeaders.value ? key : `Sloupec ${index + 1}`, value: key }));
      selectedHeaders.value = headers.value.map(({ title }) => {
        const normalized = title.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(" ", "");
        const match = props.availableHeaders.find(h => h.matchNames?.includes(normalized));
        if (match) {
          if (guessHeaders) fileHasHeaders.value = true;
          return match;
        }
        else return ignoreColumn;
      });
      csvData.value = results.data;
      updateHandler();
    }
  });

};

function updateHandler() {
  const valid = validate();
  if (valid) emits('dataUpdated', transformData(csvData.value, selectedHeaders.value, headers.value, fileHasHeaders.value))
  else emits('dataUpdated', null)
}

function transformData(data: any[], outHeaders: AvaliableHeader[], inHeaders: { title: string }[], useTitle: boolean) {

  const headers = outHeaders.reduce((acc, header) => {
    if (header.value in acc) acc[header.value]++;
    else if (header.multiple) acc[header.value] = 1;
    return acc;
  }, {} as Record<string, number>);

  return data.map(item => {

    const headerCounts = { ...headers };
    const newItem = {} as any;
    outHeaders.forEach((header, index) => {
      if (header.ignore) return;
      const inHeader = inHeaders[index];
      let value = item[useTitle ? inHeader.title : index];

      if (header.multiple) {
        if (!newItem[header.value]) newItem[header.value] = [];
        newItem[header.value].push(value);
        headerCounts[header.value]--;
        if (headerCounts[header.value] === 0 && header.transform) newItem[header.value] = header.transform(newItem[header.value])
      } else {
        if (header.transform) value = header.transform(value);
        newItem[header.value] = value;
      }
    })
    return newItem;
  })

}

const errorCellCount = ref(0);
const errorRowCount = ref(0);
const missingColumns = ref([] as string[]);
const extraColumns = ref([] as string[]);

const hasErrors = computed(() => errorCellCount.value > 0 || missingColumns.value.length > 0 || extraColumns.value.length > 0);

function validate() {

  let _errorCellCount = 0;
  let _errorRowCount = 0;

  csvData.value.forEach(item => {

    item.errors = {};
    item.hasErrors = false;



    selectedHeaders.value.forEach((selectedHeader, index) => {

      if (!selectedHeader.validate) return;


      const inHeader = headers.value[index];

      let validate = []

      if (!(Symbol.iterator in selectedHeader.validate))
        validate = [selectedHeader.validate]
      else
        validate = selectedHeader.validate

      let result = true as boolean | string | undefined;
      validate.forEach(v => {
        const value = item[inHeader.value];
        result &&= v(value);
      })
      const failed = result === false || typeof result === 'string';

      if (!failed) return;
      _errorCellCount++;
      item.errors[inHeader.value] = typeof result === 'string' ? result : 'Neplatná hodnota';
      item.hasErrors = true;
    })
    if (item.hasErrors) _errorRowCount++;
  })

  errorCellCount.value = _errorCellCount;
  errorRowCount.value = _errorRowCount;
  if (!_errorRowCount) showErrorRecordsOnly.value = false;

  missingColumns.value = props.availableHeaders.filter(h => h.required && !selectedHeaders.value.includes(h)).map(
    h => h.title
  );

  extraColumns.value = Array.from(new Set(selectedHeaders.value.filter(h => !h.ignore && !h.multiple && selectedHeaders.value.filter(h2 => h2 === h).length > 1).map(
    h => h.title
  )));

  return !hasErrors.value;
}

const showErrorRecordsOnly = ref(false);

const dataFiltered = computed(() => {
  if (!showErrorRecordsOnly.value) return csvData.value;
  else return csvData.value.filter((item: any) => item.hasErrors);
})

function resetValidation() {
  errorCellCount.value = 0;
  errorRowCount.value = 0;
  missingColumns.value = [];
  extraColumns.value = [];
}

</script>

<style scoped>
.file-input {

  min-width: 200px;
  max-width: 400px;
}

.hidden {
  visibility: hidden;
}

th:first-child,
td:first-child {
  max-width: 40px;
  width: 40px;
}

th:not(:first-child) {
  min-width: 300px;
  max-width: 400px;

  &>div {
    display: flex;
    gap: 4px;

  }

  .text {
    max-width: 230px;
  }
}

.error {
  background-color: rgba(255, 0, 0, 0.2);
}
</style>